const FasilitasPemerintah = require('../models/fasilitasPemerintah');
const path = require('path');
const fs = require('fs');
const __path = process.cwd();
// Fungsi untuk membuat fasilitas pemerintah baru (dengan atau tanpa foto)
exports.createFasilitasPemerintah = async (req, res) => {
    try {
        const {
            nama,
            kepala_instansi,
            jamBuka,
            jamTutup,
            fasilitas,
            layanan,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
            alamat,
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

              const uploadPath = path.join(__path, 'uploads', 'pemerintah', fileName);
              await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/pemerintah/${fileName}`;
        }

        const fasilitasPemerintah = await FasilitasPemerintah.create({
            nama,
            kepala_instansi,
            jamBuka,
            jamTutup,
            fasilitas,
            layanan,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
            alamat,
            foto,
        });

        res.status(201).json(fasilitasPemerintah);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk mendapatkan semua fasilitas pemerintah
exports.getAllFasilitasPemerintah = async (req, res) => {
    try {
        const fasilitasPemerintah = await FasilitasPemerintah.findAll();
        res.json(fasilitasPemerintah);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan fasilitas pemerintah berdasarkan ID
exports.getFasilitasPemerintahById = async (req, res) => {
    try {
        const fasilitasPemerintah = await FasilitasPemerintah.findByPk(req.params.id);
        if (!fasilitasPemerintah) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }
        res.json(fasilitasPemerintah);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk memperbarui fasilitas pemerintah berdasarkan ID (dengan atau tanpa foto)
exports.updateFasilitasPemerintah = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasPemerintah.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            nama,
            kepala_instansi,
            jamBuka,
            jamTutup,
            fasilitas,
            layanan,
            deskripsi_singkat,
            tags,
            latitude,
            longitude,
            alamat,
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

             const uploadPath = path.join(__path, 'uploads', 'pemerintah', fileName);
             await file.mv(uploadPath);
            foto = `${req.protocol}://${req.get('host')}/pemerintah/${fileName}`;
        }

        await existingFasilitas.update({
            nama: nama || existingFasilitas.nama,
            kepala_instansi: kepala_instansi || existingFasilitas.kepala_instansi,
            jamBuka: jamBuka || existingFasilitas.jamBuka,
            jamTutup: jamTutup || existingFasilitas.jamTutup,
            fasilitas: fasilitas || existingFasilitas.fasilitas,
            layanan: layanan || existingFasilitas.layanan,
            deskripsi_singkat: deskripsi_singkat || existingFasilitas.deskripsi_singkat,
            tags: tags || existingFasilitas.tags,
            latitude: latitude || existingFasilitas.latitude,
            longitude: longitude || existingFasilitas.longitude,
            alamat: alamat || existingFasilitas.alamat,
            foto: foto,
        });

        res.json(existingFasilitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};

// Fungsi untuk menghapus fasilitas pemerintah berdasarkan ID
exports.deleteFasilitasPemerintah = async (req, res) => {
    try {
        const existingFasilitas = await FasilitasPemerintah.findByPk(req.params.id);
        if (!existingFasilitas) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        // Hapus file foto jika ada
        if (existingFasilitas.foto) {
            const filePath = path.join(__dirname, 'uploads', 'pemerintah', path.basename(existingFasilitas.foto));
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
        console.error(error);
        res.status(500).json({
            error: 'Gagal menghapus data'
        });
    }
};
