const FasilitasKesehatan = require('../models/fasilitasKesehatan');
const path = require('path');
const fs = require('fs');
const __path = process.cwd();

// Fungsi untuk mendapatkan semua fasilitas kesehatan
exports.getAllFasilitasKesehatan = async (req, res) => {
    try {
        const fasilitas = await FasilitasKesehatan.findAll();
        res.json(fasilitas);
    } catch (error) {
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan fasilitas kesehatan berdasarkan ID
exports.getFasilitasKesehatanById = async (req, res) => {
    try {
        const fasilitas = await FasilitasKesehatan.findByPk(req.params.id);
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

// Fungsi untuk membuat fasilitas kesehatan baru (dengan atau tanpa foto)
exports.createFasilitasKesehatan = async (req, res) => {
    try {
        const {
            nama_instansi,
            kepala_instansi,
            fasilitas,
            layanan,
            jamBuka,
            jamTutup,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
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

            const uploadPath = path.join(__path, 'uploads', 'kesehatan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/kesehatan/${fileName}`;
        }

        const fasilitasKesehatan = await FasilitasKesehatan.create({
            nama_instansi,
            kepala_instansi,
            fasilitas,
            layanan,
            jamBuka,
            jamTutup,
            foto,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
        });

        res.status(201).json(fasilitasKesehatan);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk update fasilitas kesehatan berdasarkan ID (dengan atau tanpa foto)
exports.updateFasilitasKesehatan = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasKesehatan.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            nama_instansi,
            kepala_instansi,
            fasilitas,
            layanan,
            jamBuka,
            jamTutup,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
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

            const uploadPath = path.join(__path, 'uploads', 'kesehatan', fileName);
            await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/kesehatan/${fileName}`;
        }

        await existingFasilitas.update({
            nama_instansi: nama_instansi || existingFasilitas.nama_instansi,
            kepala_instansi: kepala_instansi || existingFasilitas.kepala_instansi,
            fasilitas: fasilitas || existingFasilitas.fasilitas,
            layanan: layanan || existingFasilitas.layanan,
            jamBuka: jamBuka || existingFasilitas.jamBuka,
            jamTutup: jamTutup || existingFasilitas.jamTutup,
            foto: foto,
            deskripsi_singkat: deskripsi_singkat || existingFasilitas.deskripsi_singkat,
            tags: tags || existingFasilitas.tags,
            latitude: latitude || existingFasilitas.latitude,
            longitude: longitude || existingFasilitas.longitude,
        });

        res.json(existingFasilitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};

// Fungsi untuk menghapus fasilitas kesehatan berdasarkan ID
exports.deleteFasilitasKesehatan = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasKesehatan.findByPk(req.params.id);
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
