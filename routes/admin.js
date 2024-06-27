const express = require('express');
const router = express.Router();
const FasilitasPendidikan = require('../models/fasilitasPendidikan'); // Import model FasilitasPendidikan
const authMiddleware = require('../middleware/authMiddleware');

// Rute utama admin (dashboard)
router.get('/',authMiddleware, (req, res) => {
    const user = req.session.user; 
    res.render('admin/index', {
        title: 'Dashboard Admin',
        user
    });
});

// Rute untuk halaman fasilitas pendidikan
router.get('/pendidikan', authMiddleware,async (req, res) => {
    const user = req.session.user; 
    try {
        const fasilitasPendidikan = await FasilitasPendidikan.findAll();
        res.render('admin/pendidikan', {
            fasilitasPendidikan,
            title: 'Fasilitas Pendidikan',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/pendidikan/tambah', authMiddleware,(req, res) => {
    const user = req.session.user; 
    res.render('admin/pendidikan-tambah',{
         title: 'Fasilitas Pendidikan | Tambah',
         user
    });
});

router.get('/pendidikan/:id/edit', authMiddleware,async (req, res) => {
    const user = req.session.user; 
    try {
        const fasilitas = await FasilitasPendidikan.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas pendidikan tidak ditemukan');
        }
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];
        res.render('admin/pendidikan-edit', {
            fasilitas, title: 'Fasilitas Pendidikan | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

module.exports = router;