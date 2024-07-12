const Fasilitas = require('../models/Fasilitas');
const path = require('path');
const __path = process.cwd(); // Adjust this path according to your project structure

// Get all Fasilitas
exports.getAllFasilitas = async (req, res) => {
    try {
        const fasilitas = await Fasilitas.findAll();
        res.status(200).json(fasilitas);
    } catch (error) {
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


// Create a new Fasilitas
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

        const uploadPath = path.join(__path, 'uploads', 'fasilitas', fileName);
        await file.mv(uploadPath);
        foto = `${fileName}`;
    }

    try {
        const {
            nama,
            jam_buka,
            jam_tutup,
            alamat,
            latitude,
            longitude,
            deskripsi,
            idjenis
        } = req.body;
        const newFasilitas = await Fasilitas.create({
            nama,
            jam_buka,
            jam_tutup,
            alamat,
            foto,
            latitude,
            longitude,
            deskripsi,
            idjenis
        });
        res.status(201).json(newFasilitas);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating data',
            error
        });
    }
};

// Update a Fasilitas
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

        const uploadPath = path.join(__path, 'uploads', 'fasilitas', fileName);
        await file.mv(uploadPath);
        foto = `${fileName}`;
    }

    try {
        const {
            id
        } = req.params;
        const {
            nama,
            jam_buka,
            jam_tutup,
            alamat,
            latitude,
            longitude,
            deskripsi,
            idjenis
        } = req.body;
        const fasilitas = await Fasilitas.findByPk(id);
        if (fasilitas) {
            fasilitas.nama = nama;
            fasilitas.jam_buka = jam_buka;
            fasilitas.jam_tutup = jam_tutup;
            fasilitas.alamat = alamat;
            if (foto) {
                fasilitas.foto = foto;
            }
            fasilitas.latitude = latitude;
            fasilitas.longitude = longitude;
            fasilitas.deskripsi = deskripsi;
            fasilitas.idjenis = idjenis;
            await fasilitas.save();
            res.status(200).json(fasilitas);
        } else {
            res.status(404).json({
                message: 'Fasilitas not found'
            });
        }
    } catch (error) {
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
