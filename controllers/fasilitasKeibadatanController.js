const FasilitasKeibadatan = require('../models/fasilitasKeibadatan');
const path = require('path');
const fs = require('fs');
const __path = process.cwd();

// Fungsi untuk mendapatkan semua fasilitas keibadatan
exports.getAllFasilitasKeibadatan = async (req, res) => {
    try {
        const fasilitas = await FasilitasKeibadatan.findAll();
        res.json(fasilitas);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan fasilitas keibadatan berdasarkan ID
exports.getFasilitasKeibadatanById = async (req, res) => {
    try {
        const fasilitas = await FasilitasKeibadatan.findByPk(req.params.id);
        if (fasilitas) {
            res.json(fasilitas);
        } else {
            res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk membuat fasilitas keibadatan baru (dengan atau tanpa foto)
exports.createFasilitasKeibadatan = async (req, res) => {
    try {
        const {
            nama,
            fasilitas,
            jambuka,
            jamtutup,
            alamat,
            longitude,
            latitude
        } = req.body;

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

            if (fileSize > 5000000) { // Batasan ukuran file (5 MB)
                return res.status(422).json({
                    msg: 'Ukuran file terlalu besar'
                });
            }

            const uploadPath = path.join(__path, 'uploads', 'keibadatan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/keibadatan/${fileName}`;
        }

        const fasilitasKeibadatan = await FasilitasKeibadatan.create({
            nama,
            fasilitas,
            jambuka,
            jamtutup,
            alamat,
            longitude,
            latitude,
            foto
        });

        res.status(201).json(fasilitasKeibadatan);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk update fasilitas keibadatan berdasarkan ID (dengan atau tanpa foto)
exports.updateFasilitasKeibadatan = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasKeibadatan.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            nama,
            fasilitas,
            jambuka,
            jamtutup,
            alamat,
            longitude,
            latitude
        } = req.body;

        let foto = existingFasilitas.foto;

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

            if (fileSize > 5000000) { // Batasan ukuran file (5 MB)
                return res.status(422).json({
                    msg: 'Ukuran file terlalu besar'
                });
            }

            const uploadPath = path.join(__path, 'uploads', 'keibadatan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/keibadatan/${fileName}`;

            // Hapus file foto lama jika ada
            if (existingFasilitas.foto) {
                const filePath = path.join(__path, existingFasilitas.foto);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        await existingFasilitas.update({
            nama: nama || existingFasilitas.nama,
            fasilitas: fasilitas || existingFasilitas.fasilitas,
            jambuka: jambuka || existingFasilitas.jambuka,
            jamtutup: jamtutup || existingFasilitas.jamtutup,
            alamat: alamat || existingFasilitas.alamat,
            longitude: longitude || existingFasilitas.longitude,
            latitude: latitude || existingFasilitas.latitude,
            foto: foto || existingFasilitas.foto,
        });

        res.json(existingFasilitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};

// Fungsi untuk menghapus fasilitas keibadatan berdasarkan ID
exports.deleteFasilitasKeibadatan = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasKeibadatan.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        // Hapus file foto jika ada
        if (existingFasilitas.foto) {
            const filePath = path.join(__path, existingFasilitas.foto);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const deleted = await existingFasilitas.destroy();

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
