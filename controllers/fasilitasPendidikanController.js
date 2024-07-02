const FasilitasPendidikan = require('../models/fasilitasPendidikan');
const path = require('path');
const fs = require('fs');
const __path = process.cwd();

// Fungsi untuk mendapatkan semua fasilitas pendidikan
exports.getAllFasilitasPendidikan = async (req, res) => {
    try {
        const fasilitas = await FasilitasPendidikan.findAll();
        res.json(fasilitas);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan fasilitas pendidikan berdasarkan ID
exports.getFasilitasPendidikanById = async (req, res) => {
    try {
        const fasilitas = await FasilitasPendidikan.findByPk(req.params.id);
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
// Fungsi untuk membuat fasilitas pendidikan baru (dengan atau tanpa foto)
exports.createFasilitasPendidikan = async (req, res) => {
    try {
        const {
            nama,
            fasilitas,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
            jamBuka,
            jamTutup,
            kepala_sekolah,
            jumlah_murid,
            jumlah_guru,
            alamat // New field for address
        } = req.body;

        let foto = null;

        // Handle photo upload
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

            const uploadPath = path.join(__path, 'uploads', 'pendidikan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/pendidikan/${fileName}`;
        }

        // Create the record in the database
        const fasilitasPendidikan = await FasilitasPendidikan.create({
            nama,
            fasilitas,
            deskripsi_singkat,
            foto,
            tags,
            latitude,
            longitude,
            jamBuka,
            jamTutup,
            kepala_sekolah,
            jumlah_murid,
            jumlah_guru,
            alamat // Include the address field
        });

        res.status(201).json(fasilitasPendidikan);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};
// Fungsi untuk update fasilitas pendidikan berdasarkan ID (dengan atau tanpa foto)
exports.updateFasilitasPendidikan = async (req, res) => {
    try {
        // Find the existing record by ID
        const existingFasilitas = await FasilitasPendidikan.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            nama,
            fasilitas,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
            jamBuka,
            jamTutup,
            kepala_sekolah,
            jumlah_murid,
            jumlah_guru,
            alamat // New field for address
        } = req.body;

        let foto = existingFasilitas.foto;

        // Handle photo upload
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

            const uploadPath = path.join(__path, 'uploads', 'pendidikan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/pendidikan/${fileName}`;
        }

        // Update the record in the database
        await existingFasilitas.update({
            nama: nama || existingFasilitas.nama,
            fasilitas: fasilitas || existingFasilitas.fasilitas,
            deskripsi_singkat: deskripsi_singkat || existingFasilitas.deskripsi_singkat,
            foto: foto,
            tags: tags || existingFasilitas.tags,
            latitude: latitude || existingFasilitas.latitude,
            longitude: longitude || existingFasilitas.longitude,
            jamBuka: jamBuka || existingFasilitas.jamBuka,
            jamTutup: jamTutup || existingFasilitas.jamTutup,
            kepala_sekolah: kepala_sekolah || existingFasilitas.kepala_sekolah,
            jumlah_murid: jumlah_murid || existingFasilitas.jumlah_murid,
            jumlah_guru: jumlah_guru || existingFasilitas.jumlah_guru,
            alamat: alamat || existingFasilitas.alamat // Include the address field
        });

        res.json(existingFasilitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};


// Fungsi untuk menghapus fasilitas pendidikan berdasarkan ID
exports.deleteFasilitasPendidikan = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasPendidikan.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        // Hapus file foto jika ada
        if (existingFasilitas.foto) {
           const filePath = path.join(__dirname, 'uploads', 'pendidikan', path.basename(existingFasilitas.foto));
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