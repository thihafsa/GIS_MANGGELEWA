const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const Users = require('../models/users');
const Reviews = require('../models/reviews');
const Fasilitas = require('../models/Fasilitas');
const {
    getJenisFasilitasData,
    getListFasilitasData,
    getFasilitasByJenisId
} = require('../middleware/getJenisFasilitasData');
const JenisFasilitas = require('../models/JenisFasilitas');


// Rute utama admin (dashboard)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
    try {
        const user = req.session.user;

        // Ambil jenisFasilitasList dari database
        const jenisFasilitasData = await getJenisFasilitasData(req);

        res.render('admin/index', {
            title: 'Dashboard Admin',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/profile', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        res.render('admin/profile', {
            title: 'Profile',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/jenisfasilitas', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        const jenisFasilitas = await JenisFasilitas.findAll();
        res.render('admin/jenisfasilitas', { // Pastikan template dan data sesuai dengan kebutuhan Anda
            jenisFasilitas,
            title: 'Jenis Fasilitas',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data jenis fasilitas');
    }
});

router.get('/jenisfasilitas/tambah', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        res.render('admin/jenisfasilitas-tambah', {
            title: 'Jenis Fasilitas| Tambah',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data jenis fasilitas');
    }
});
router.get('/jenisfasilitas/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitas = await JenisFasilitas.findByPk(req.params.id);

        if (!jenisFasilitas) {
            return res.status(404).send('Jenis fasilitas tidak ditemukan');
        }

        const jenisFasilitasData = await getJenisFasilitasData(req);
        res.render('admin/jenisfasilitas-edit', {
            title: 'Jenis Fasilitas| Edit',
            user,
            jenisFasilitas,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data jenis fasilitas');
    }
});

router.get('/users', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        const UserData = await Users.findAll();
        res.render('admin/users', {
            UserData,
            title: 'Users',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data fasilitas pendidikan');
    }
});

router.get('/users/tambah', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    const jenisFasilitasData = await getJenisFasilitasData(req);
    res.render('admin/users-tambah', {
        title: 'Users| Tambah',
        user,
        jenisFasilitasList: jenisFasilitasData,
    });
});

router.get('/users/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        const UserData = await Users.findByPk(req.params.id);
        if (!UserData) {
            return res.status(404).send('Users tidak ditemukan');
        }
        res.render('admin/users-edit', {
            UserData,
            title: 'Users | Edit',
            user,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data Users');
    }
});
router.get('/reviews', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        const reviews = await Reviews.findAll({
            include: [{
                    model: Fasilitas,
                    as: 'fasilitas',
                    include: [{
                        model: JenisFasilitas,
                    }]
                },
                {
                    model: Users,
                    as: 'user'
                }
            ]
        });


        res.render('admin/reviews', {
            ReviewsData: reviews,
            title: 'Reviews',
            user,
            jenisFasilitasList: jenisFasilitasData, // Pastikan jenisFasilitasData didefinisikan sebelumnya
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data reviews');
    }
});

// Rute untuk halaman fasilitas berdasarkan jenis
router.get('/:jenis', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    const jenisFasilitas = req.params.jenis; // Ambil jenis fasilitas dari parameter

    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        // Anda bisa menggunakan model `JenisFasilitas` atau tabel yang sesuai dengan struktur Anda
        const jenisFasilitasRecord = await JenisFasilitas.findOne({
            where: {
                nama: jenisFasilitas
            }
        });

        const fasilitas = await getFasilitasByJenisId(jenisFasilitasRecord.id);
        res.render('admin/fasilitas', {
            fasilitas,
            title: `Fasilitas ${jenisFasilitas}`, // Sesuaikan judul berdasarkan jenis fasilitas
            user,
            jenisFasilitas,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Terjadi kesalahan saat mengambil data fasilitas ${jenisFasilitas}`);
    }
});

// Rute untuk tambah fasilitas baru berdasarkan jenis
router.get('/:jenis/tambah', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    const jenisFasilitas = req.params.jenis;

    try {
        const jenisFasilitasData = await getJenisFasilitasData(req);
        const listFasilitas = await getListFasilitasData(jenisFasilitas);
        const jenisFasilitasRecord = await JenisFasilitas.findOne({
            where: {
                nama: jenisFasilitas
            }
        });

        if (!jenisFasilitasRecord) {
            throw new Error(`Jenis fasilitas ${jenisFasilitas} not found`);
        }
        const idJenisfasil = jenisFasilitasRecord.id
        res.render('admin/fasilitas-tambah', {
            title: `Fasilitas ${jenisFasilitas} | Tambah`,
            user,
            idJenisfasil,
            listFasilitas,
            jenisFasilitas,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


// Rute untuk edit fasilitas berdasarkan jenis
router.get('/:jenis/:id/edit', authMiddleware, isAdmin, async (req, res) => {
    const user = req.session.user;
    const jenisFasilitas = req.params.jenis;
    const idFasilitas = req.params.id;
    const jenisFasilitasData = await getJenisFasilitasData(req);
    const listFasilitas = await getListFasilitasData(jenisFasilitas);
    const jenisFasilitasRecord = await JenisFasilitas.findOne({
        where: {
            nama: jenisFasilitas
        }
    });

    if (!jenisFasilitasRecord) {
        throw new Error(`Jenis fasilitas ${jenisFasilitas} not found`);
    }
    const idJenisfasil = jenisFasilitasRecord.id
    try {
        // Menggunakan model yang sesuai dengan struktur Anda
        const fasilitas = await Fasilitas.findByPk(idFasilitas);

        if (!fasilitas) {
            return res.status(404).send(`Fasilitas ${jenisFasilitas} tidak ditemukan`);
        }

        // Misalkan fasilitas memiliki field fasilitas yang berupa string yang perlu diubah ke array
        fasilitas.fasilitas = fasilitas.fasilitas ? fasilitas.fasilitas.split(',') : [];

        res.render('admin/fasilitas-edit', {
            fasilitas,
            title: `Fasilitas ${jenisFasilitas} | Edit`,
            user,
            listFasilitas,
            idJenisfasil,
            jenisFasilitas,
            jenisFasilitasList: jenisFasilitasData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Terjadi kesalahan saat mengambil data fasilitas ${jenisFasilitas}`);
    }
});

module.exports = router;