const Users = require('../models/users');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const __path = process.cwd();

// Fungsi untuk mendapatkan semua user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan user berdasarkan ID
exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User dengan ID tersebut tidak ditemukan'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Gagal mengambil data user:', error);
        res.status(500).json({
            error: 'Gagal mengambil data user'
        });
    }
};
// Fungsi untuk mencari user berdasarkan email dan password
exports.findUserByEmailAndPassword = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body; // Ambil email dan password dari body request

        // Validasi input (pastikan email dan password tidak kosong)
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email dan password harus diisi'
            });
        }

        // Cari user berdasarkan email
        const user = await Users.findOne({
            where: {
                email
            },
            // attributes: ['id', 'name', 'email'] // Opsional: batasi atribut yang dikembalikan
        });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                error: 'User tidak ditemukan'
            });
        }

        // Verifikasi password (gunakan bcrypt atau library serupa)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Login berhasil
            res.json({
                message: 'Login berhasil',
                user
            }); // Atau kirim token JWT
        } else {
            // Password salah
            res.status(401).json({
                error: 'Password salah'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Terjadi kesalahan server'
        });
    }
};

// Fungsi untuk membuat user baru (dengan atau tanpa foto)
exports.createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role
        } = req.body; // Mengambil role dari body

        // Validasi input
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                error: 'Semua field wajib diisi'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let foto = null;

        if (req.files && req.files.foto) {
            const file = req.files.foto;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({
                    msg: 'Tipe file tidak valid'
                });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({
                    msg: 'Ukuran file terlalu besar'
                });
            }

            const uploadPath = path.join(__path, 'uploads', 'users', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/users/${fileName}`;
        }

        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
            foto,
            role, // Menambahkan role ke data pengguna
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Email sudah terdaftar'
            });
        }
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk update user berdasarkan ID (dengan atau tanpa foto)
exports.updateUser = async (req, res) => {
    try {
        const existingUser = await Users.findByPk(req.params.id);
        if (!existingUser) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            username,
            email,
            password,
            role
        } = req.body; // Mengambil role (opsional)

        // Hash password baru jika ada
        let hashedPassword = existingUser.password;
        // Jika password yang dikirimkan tidak kosong, hash password baru
        if (password !== '') {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
        let foto = existingUser.foto; // Default menggunakan foto lama

        if (req.files && req.files.foto) {
            const file = req.files.foto;
            const fileSize = file.size;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({
                    msg: 'Tipe file tidak valid'
                });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({
                    msg: 'Ukuran file terlalu besar'
                });
            }

            const uploadPath = path.join(__path, 'uploads', 'users', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/users/${fileName}`;
        }

        await existingUser.update({
            username: username || existingUser.username,
            email: email || existingUser.email,
            password: hashedPassword,
            foto: foto,
            role: role || existingUser.role, // Update role jika ada, atau pertahankan role lama
        });

        if (req.session && req.session.user && req.session.user.id === existingUser.id) {
            req.session.user = {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role,
                foto: existingUser.foto,
            };
            await req.session.save();
        }

        res.json(existingUser);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Email sudah terdaftar'
            });
        }
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};

// Fungsi untuk menghapus user berdasarkan ID
exports.deleteUser = async (req, res) => {
    try {
        const existingUser = await Users.findByPk(req.params.id);
        if (!existingUser) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        // Hapus file foto jika ada
        if (existingUser.foto) {
            const filePath = path.join(__path, existingUser.foto);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const deleted = await existingUser.destroy();

        if (deleted) {
            res.json({
                message: 'Data berhasil dihapus'
            });
        } else {
            res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal menghapus data'
        });
    }
};