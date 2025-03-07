const Reviews = require('../models/reviews');
const Fasilitas = require('../models/Fasilitas');
const Users = require('../models/users');

// Fungsi untuk mendapatkan semua review
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            include: [{
                    model: Fasilitas,
                    as: 'fasilitas', // Pastikan asosiasi 'fasilitas' ada
                },
                {
                    model: Users,
                    as: 'user',
                }
            ],
        });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};


// Fungsi untuk mendapatkan review berdasarkan ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Reviews.findByPk(req.params.id, {
            include: [{
                    model: Fasilitas,
                    as: 'fasilitas'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        if (review) {
            res.json(review);
        } else {
            res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan review berdasarkan ID fasilitas
exports.getReviewByIdFasilitas = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                id_fasilitas: req.params.id
            },
            include: [{
                    model: Fasilitas,
                    as: 'fasilitas'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk membuat review baru berdasarkan ID fasilitas
exports.createReviewByIdFasilitas = async (req, res) => {
    try {
        const {
            komentar,
            id_user,
            id_fasilitas
        } = req.body;
        
        // Validasi: Pastikan id_fasilitas dan id_user tersedia
        if (!id_fasilitas || !id_user) {
            return res.status(400).json({
                error: 'Harap sertakan id_fasilitas dan id_user'
            });
        }

        const review = await Reviews.create({
            komentar,
            id_user,
            id_fasilitas
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk membuat review baru
exports.createReview = async (req, res) => {
    try {
        const {
            komentar,
            id_user,
            id_fasilitas
        } = req.body;

        // Validasi: Pastikan hanya satu id_fasilitas yang diisi
        if (!id_fasilitas) {
            return res.status(400).json({
                error: 'Harap sertakan id_fasilitas'
            });
        }

        const review = await Reviews.create({
            komentar,
            id_user,
            id_fasilitas
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal membuat data'
        });
    }
};

// Fungsi untuk update review berdasarkan ID
exports.updateReview = async (req, res) => {
    try {
        const existingReview = await Reviews.findByPk(req.params.id);
        if (!existingReview) {
            return res.status(404).json({
                error: 'Data tidak ditemukan'
            });
        }

        const {
            komentar,
            id_user,
            id_fasilitas
        } = req.body;

        // Validasi: Pastikan hanya satu id_fasilitas yang diisi
        if (id_fasilitas === undefined) {
            return res.status(400).json({
                error: 'Harap sertakan id_fasilitas'
            });
        }

        await existingReview.update({
            komentar: komentar || existingReview.komentar,
            id_user: id_user || existingReview.id_user,
            id_fasilitas: id_fasilitas || existingReview.id_fasilitas
        });

        res.json(existingReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal memperbarui data'
        });
    }
};

// Fungsi untuk menghapus review berdasarkan ID
exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Reviews.destroy({
            where: {
                id: req.params.id
            },
        });
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
