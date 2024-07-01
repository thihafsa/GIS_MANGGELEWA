const express = require('express');
const router = express.Router();
const FasilitasPendidikan = require('../models/fasilitasPendidikan'); // Import model FasilitasPendidikan
const authMiddleware = require('../middleware/authMiddleware');
const FasilitasKesehatan = require('../models/fasilitasKesehatan');

// Rute utama admin (dashboard)
router.get('/', authMiddleware, async(req, res) => {
    const user = req.session.user;
    const kesehatanCount = await FasilitasKesehatan.count();
    const pendidikanCount = await FasilitasPendidikan.count();

    res.render('admin/index', {
        title: 'Dashboard Admin',
        user,
        kesehatanCount,
        pendidikanCount
    });
});

// Rute untuk halaman fasilitas pendidikan
router.get('/pendidikan', authMiddleware, async (req, res) => {
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

router.get('/pendidikan/tambah', authMiddleware, (req, res) => {
    const user = req.session.user;
    res.render('admin/pendidikan-tambah', {
        title: 'Fasilitas Pendidikan | Tambah',
        user
    });
});

router.get('/pendidikan/:id/edit', authMiddleware, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitas = await FasilitasPendidikan.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas pendidikan tidak ditemukan');
        }
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];
        res.render('admin/pendidikan-edit', {
            fasilitas,
            title: 'Fasilitas Pendidikan | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/kesehatan', authMiddleware, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitasKesehatan = await FasilitasKesehatan.findAll();
        res.render('admin/kesehatan', {
            fasilitasKesehatan,
            title: 'Fasilitas Kesehatan',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/kesehatan/tambah', authMiddleware, (req, res) => {
    const user = req.session.user;
    res.render('admin/kesehatan-tambah', {
        title: 'Fasilitas Kesehatan | Tambah',
        user
    });
});

router.get('/kesehatan/:id/edit', authMiddleware, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitas = await FasilitasKesehatan.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas Kesehatan tidak ditemukan');
        }
        // Mengubah fasilitas menjadi array jika ada data, atau array kosong jika tidak ada
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];

        // Mengubah layanan menjadi array jika ada data, atau array kosong jika tidak ada
        fasilitas.layanan = fasilitas.layanan ? fasilitas.layanan.split(',') : [];
        res.render('admin/kesehatan-edit', {
            fasilitas,
            title: 'Fasilitas Kesehatan | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas Kesehatan');
    }
});



module.exports = router;