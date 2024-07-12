const JenisFasilitas = require('../models/JenisFasilitas');
const path = require('path');
const fs = require('fs/promises');
const __path = process.cwd(); // Adjust this path according to your project structure

// Get all Jenis Fasilitas
exports.getAllJenisFasilitas = async (req, res) => {
    try {
        const jenisFasilitas = await JenisFasilitas.findAll();
        res.status(200).json(jenisFasilitas);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error
        });
    }
};

// Get Jenis Fasilitas by ID
exports.getJenisFasilitasById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const jenisFasilitas = await JenisFasilitas.findByPk(id);
        if (jenisFasilitas) {
            res.status(200).json(jenisFasilitas);
        } else {
            res.status(404).json({
                message: 'Jenis Fasilitas not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error
        });
    }
};

// Create a new Jenis Fasilitas
exports.createJenisFasilitas = async (req, res) => {
    let icon = null;
    let marker = null;

    // Handle icon file upload
    if (req.files && req.files.icon) {
        const file = req.files.icon;
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

        const uploadPath =  path.join(__path, 'uploads', 'icons', fileName);
        await file.mv(uploadPath);
        icon = `${fileName}`;
    }

    // Handle marker file upload (assuming similar logic as icon)
    if (req.files && req.files.marker) {
        const file = req.files.marker;
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

        const uploadPath = path.join(__path, 'uploads', 'markers', fileName);
        await file.mv(uploadPath);
        marker = `${fileName}`;
    }

    try {
        const {
            nama,
            list_fasilitas
        } = req.body;
        const newJenisFasilitas = await JenisFasilitas.create({
            nama,
            icon,
            marker,
            list_fasilitas
        });
        res.status(201).json(newJenisFasilitas);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating data',
            error
        });
    }
};

// Update a Jenis Fasilitas
exports.updateJenisFasilitas = async (req, res) => {
    let icon = null;
    let marker = null;

    // Handle icon file upload
    if (req.files && req.files.icon) {
        const file = req.files.icon;
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

        const uploadPath =  path.join(__path, 'uploads', 'icons', fileName);
        await file.mv(uploadPath);
        icon = `${fileName}`;
    }

    // Handle marker file upload (assuming similar logic as icon)
    if (req.files && req.files.marker) {
        const file = req.files.marker;
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

        const uploadPath = path.join(__path, 'uploads', 'markers', fileName);
        await file.mv(uploadPath);
        marker = `${fileName}`;
    }

    try {
        const {
            id
        } = req.params;
        const {
            nama,
            list_fasilitas
        } = req.body;
        const jenisFasilitas = await JenisFasilitas.findByPk(id);
        if (jenisFasilitas) {
            jenisFasilitas.nama = nama;
            if (icon) {
                jenisFasilitas.icon = icon;
            }
            if (marker) {
                jenisFasilitas.marker = marker;
            }
            jenisFasilitas.list_fasilitas = list_fasilitas;
            await jenisFasilitas.save();
            res.status(200).json(jenisFasilitas);
        } else {
            res.status(404).json({
                message: 'Jenis Fasilitas not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating data',
            error
        });
    }
};

// Delete a Jenis Fasilitas
exports.deleteJenisFasilitas = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const jenisFasilitas = await JenisFasilitas.findByPk(id);

        if (!jenisFasilitas) {
            return res.status(404).json({
                message: 'Jenis Fasilitas not found'
            });
        }

        // Menghapus icon jika ada
        if (jenisFasilitas.icon) {
            const iconPath = path.join(__path, 'uploads', 'icons', jenisFasilitas.icon);
            await fs.unlink(iconPath);
        }

        // Menghapus marker jika ada
        if (jenisFasilitas.marker) {
            const markerPath = path.join(__path, 'uploads', 'markers', jenisFasilitas.marker);
            await fs.unlink(markerPath);
        }

        await jenisFasilitas.destroy();

        res.status(200).json({
            message: 'Jenis Fasilitas deleted'
        });
    } catch (error) {
        console.error('Error deleting Jenis Fasilitas:', error);
        res.status(500).json({
            message: 'Error deleting data',
            error
        });
    }
};