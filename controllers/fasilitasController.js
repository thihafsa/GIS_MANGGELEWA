const Fasilitas = require('../models/Fasilitas');
const path = require('path');
const JenisFasilitas = require('../models/JenisFasilitas');
const __path = process.cwd(); // Adjust this path according to your project structure

// Get all Fasilitas
exports.getAllFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findAll({
            include: {
                model: JenisFasilitas,
                attributes: ['nama', 'icon', 'marker', 'list_fasilitas']
            }
        });
        res.status(200).json(fasilitas);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            message: 'Error fetching data',
            error
        });
    }
};
// Get Fasilitas by ID
exports.getFasilitasById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const fasilitas = await Fasilitas.findByPk(id);
        if (fasilitas) {
            res.status(200).json(fasilitas);
        } else {
            res.status(404).json({
                message: 'Fasilitas not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error
        });
    }
};

// Get Fasilitas by Id Jenis
exports.getFasilitasByIdJenis = async (req, res) => {
    try {
        const {
            idjenis
        } = req.params;
        const fasilitas = await Fasilitas.findAll({
            where: {
                idjenis: idjenis
            }
        });
        if (fasilitas.length > 0) {
            res.status(200).json(fasilitas);
        } else {
            res.status(404).json({
                message: 'Fasilitas not found for this jenis'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error
        });
    }
};

exports.createFasilitas = async (req, res) => {
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

        const uploadPath = path.join(__dirname, '..', 'uploads', 'fasilitas', fileName);
        await file.mv(uploadPath);
        foto = fileName;
    }

    try {
        const {
            nama_fasilitas,
            jam_buka,
            jam_tutup,
            alamat,
            latitude,
            longitude,
            deskripsi,
            idjenis,
            fasilitas // Add fasilitas field here
        } = req.body;
        // Input validation
        if (!nama_fasilitas) {
            return res.status(400).json({
                message: 'Nama fasilitas harus diisi'
            });
        }

        if (!jam_buka) {
            return res.status(400).json({
                message: 'Jam buka harus diisi'
            });
        }

        if (!jam_tutup) {
            return res.status(400).json({
                message: 'Jam tutup harus diisi'
            });
        }

        if (!alamat) {
            return res.status(400).json({
                message: 'Alamat harus diisi'
            });
        }

        if (!latitude) {
            return res.status(400).json({
                message: 'Latitude harus diisi'
            });
        }

        if (!longitude) {
            return res.status(400).json({
                message: 'Longitude harus diisi'
            });
        }

        if (!deskripsi) {
            return res.status(400).json({
                message: 'Deskripsi harus diisi'
            });
        }

        if (!idjenis) {
            return res.status(400).json({
                message: 'ID jenis harus diisi'
            });
        }

        if (!fasilitas) {
            return res.status(400).json({
                message: 'Fasilitas harus diisi'
            });
        }
        const newFasilitas = await Fasilitas.create({
            nama_fasilitas,
            jam_buka,
            jam_tutup,
            alamat,
            foto,
            latitude,
            longitude,
            deskripsi,
            idjenis,
            fasilitas // Assign fasilitas data
        });

        res.status(201).json(newFasilitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating data',
            error
        });
    }
};

exports.updateFasilitas = async (req, res) => {
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

        const uploadPath = path.join(__dirname, '..', 'uploads', 'fasilitas', fileName);
        await file.mv(uploadPath);
        foto = fileName;
    }

    try {
        const {
            id
        } = req.params;
        const {
            nama_fasilitas,
            jam_buka,
            jam_tutup,
            alamat,
            latitude,
            longitude,
            deskripsi,
            idjenis,
            fasilitas // Add fasilitas field here
        } = req.body;
        // Input validation
        if (!nama_fasilitas && !jam_buka && !jam_tutup && !alamat && !latitude && !longitude && !deskripsi && !idjenis && !fasilitas) {
            return res.status(400).json({
                message: 'Semua field harus diisi'
            });
        }
        if (!nama_fasilitas) {
            return res.status(400).json({
                message: 'Nama fasilitas harus diisi'
            });
        }

        if (!jam_buka) {
            return res.status(400).json({
                message: 'Jam buka harus diisi'
            });
        }

        if (!jam_tutup) {
            return res.status(400).json({
                message: 'Jam tutup harus diisi'
            });
        }

        if (!alamat) {
            return res.status(400).json({
                message: 'Alamat harus diisi'
            });
        }

        if (!latitude) {
            return res.status(400).json({
                message: 'Latitude harus diisi'
            });
        }

        if (!longitude) {
            return res.status(400).json({
                message: 'Longitude harus diisi'
            });
        }

        if (!deskripsi) {
            return res.status(400).json({
                message: 'Deskripsi harus diisi'
            });
        }

        if (!idjenis) {
            return res.status(400).json({
                message: 'ID jenis harus diisi'
            });
        }

        if (!fasilitas) {
            return res.status(400).json({
                message: 'Fasilitas harus diisi'
            });
        }
        const fasilitast = await Fasilitas.findByPk(id);

        if (fasilitast) {
            fasilitast.nama_fasilitas = nama_fasilitas;
            fasilitast.jam_buka = jam_buka;
            fasilitast.jam_tutup = jam_tutup;
            fasilitast.alamat = alamat;
            if (foto) {
                fasilitast.foto = foto;
            }
            fasilitast.latitude = latitude;
            fasilitast.longitude = longitude;
            fasilitast.deskripsi = deskripsi;
            fasilitast.idjenis = idjenis;
            fasilitast.fasilitas = fasilitas; // Assign fasilitas data

            await fasilitast.save();
            res.status(200).json(fasilitast);
        } else {
            res.status(404).json({
                message: 'Fasilitas not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating data',
            error
        });
    }
};

// Delete a Fasilitas
exports.deleteFasilitas = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const fasilitas = await Fasilitas.findByPk(id);
        if (fasilitas) {
            await fasilitas.destroy();
            res.status(200).json({
                message: 'Fasilitas deleted'
            });
        } else {
            res.status(404).json({
                message: 'Fasilitas not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting data',
            error
        });
    }
};