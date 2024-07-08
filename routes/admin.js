const express = require('express');
const router = express.Router();
const FasilitasPendidikan = require('../models/fasilitasPendidikan'); // Import model FasilitasPendidikan
const FasilitasKesehatan = require('../models/fasilitasKesehatan');
const FasilitasPemerintah = require('../models/fasilitasPemerintah');
const FasilitasKeibadatan = require('../models/fasilitasKeibadatan');
const isAdmin = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const Users = require('../models/users');
const Reviews = require('../models/reviews');


// Rute utama admin (dashboard)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    const kesehatanCount = await FasilitasKesehatan.count();
    const pendidikanCount = await FasilitasPendidikan.count();
    const pemerintahCount = await FasilitasPemerintah.count();
    const keibadatanCount = await FasilitasKeibadatan.count();

    res.render('admin/index', {
        title: 'Dashboard Admin',
        user,
        kesehatanCount,
        pendidikanCount,
        pemerintahCount,
        keibadatanCount
    });
});

// Rute untuk halaman fasilitas pendidikan
router.get('/pendidikan', authMiddleware, isAdmin, async (req, res) => {
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

router.get('/pendidikan/tambah', authMiddleware, isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin/pendidikan-tambah', {
        title: 'Fasilitas Pendidikan | Tambah',
        user
    });
});

router.get('/pendidikan/:id/edit', authMiddleware, isAdmin, async (req, res) => {
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

router.get('/kesehatan', authMiddleware, isAdmin, async (req, res) => {
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

router.get('/kesehatan/tambah', authMiddleware, isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin/kesehatan-tambah', {
        title: 'Fasilitas Kesehatan | Tambah',
        user
    });
});

router.get('/kesehatan/:id/edit', authMiddleware, isAdmin, async (req, res) => {
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
router.get('/pemerintah', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitasPemerintah = await FasilitasPemerintah.findAll();
        res.render('admin/pemerintah', {
            fasilitasPemerintah,
            title: 'Fasilitas Pemerintah',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});
router.get('/pemerintah/tambah', authMiddleware, isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin/pemerintah-tambah', {
        title: 'Fasilitas Pemerintah | Tambah',
        user
    });
});
router.get('/pemerintah/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitas = await FasilitasPemerintah.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas Pemerintah tidak ditemukan');
        }
        // Mengubah fasilitas menjadi array jika ada data, atau array kosong jika tidak ada
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];

        // Mengubah layanan menjadi array jika ada data, atau array kosong jika tidak ada
        fasilitas.layanan = fasilitas.layanan ? fasilitas.layanan.split(',') : [];
        res.render('admin/pemerintah-edit', {
            fasilitas,
            title: 'Fasilitas Pemerintah | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas Pemerintah');
    }
});


router.get('/keibadatan', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitasKeibadatan = await FasilitasKeibadatan.findAll();
        res.render('admin/keibadatan', {
            fasilitasKeibadatan,
            title: 'Fasilitas Keibadatan',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});
router.get('/keibadatan/tambah', authMiddleware, isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin/keibadatan-tambah', {
        title: 'Fasilitas Keibadatan | Tambah',
        user
    });
});

router.get('/keibadatan/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const fasilitas = await FasilitasKeibadatan.findByPk(req.params.id);
        if (!fasilitas) {
            return res.status(404).send('Fasilitas keibadatan tidak ditemukan');
        }
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];
        res.render('admin/keibadatan-edit', {
            fasilitas,
            title: 'Fasilitas Keibadatan | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const UserData = await Users.findAll();
        res.render('admin/users', {
            UserData,
            title: 'Users',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/users/tambah', authMiddleware, isAdmin, (req, res) => {
    const user = req.session.user;
    res.render('admin/users-tambah', {
        title: 'Users| Tambah',
        user
    });
});

router.get('/users/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const UserData = await Users.findByPk(req.params.id);
        if (!UserData) {
            return res.status(404).send('Users tidak ditemukan');
        }
        res.render('admin/users-edit', {
            UserData,
            title: 'Users | Edit',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data Users');
    }
});
router.get('/reviews', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const reviews = await Reviews.findAll({
            include: [{
                    model: FasilitasPendidikan,
                    as: 'fasilitasPendidikan',
                },
                {
                    model: FasilitasKesehatan,
                    as: 'fasilitasKesehatan',
                },
                {
                    model: FasilitasPemerintah,
                    as: 'fasilitasPemerintah',
                },
                {
                    model: FasilitasKeibadatan,
                    as: 'fasilitasKeibadatan',
                },
                {
                    model: Users,
                    as: 'user',
                }
            ],
        });

        res.render('admin/reviews', {
            ReviewsData: reviews,
            title: 'Reviews',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data reviews');
    }
});
module.exports = router;