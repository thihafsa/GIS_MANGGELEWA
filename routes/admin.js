const express = require('express');
const router = express.Router();
const FasilitasPendidikan = require('../models/fasilitasPendidikan'); // Import model FasilitasPendidikan

// Rute utama admin (dashboard)
router.get('/', (req, res) => {
    res.render('admin/index');
});

// Rute untuk halaman fasilitas pendidikan
router.get('/pendidikan', async (req, res) => {
    try {
        const fasilitasPendidikan = await FasilitasPendidikan.findAll();
        res.render('admin/pendidikan', {
            fasilitasPendidikan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/pendidikan/tambah', (req, res) => {
    res.render('admin/pendidikan-tambah');
});

router.get('/pendidikan/:id/edit', async (req, res) => {
    try {
        const fasilitas = await FasilitasPendidikan.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas pendidikan tidak ditemukan');
        }
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];
        res.render('admin/pendidikan-edit', {
            fasilitas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

module.exports = router;