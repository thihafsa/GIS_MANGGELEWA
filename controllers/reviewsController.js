const Reviews = require('../models/reviews');
const FasilitasPendidikan = require('../models/fasilitasPendidikan');
const FasilitasKesehatan = require('../models/fasilitasKesehatan');
const Users = require('../models/users');

// Fungsi untuk mendapatkan semua review
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            include: [{
                    model: FasilitasPendidikan,
                    as: 'fasilitasPendidikan'
                },
                {
                    model: FasilitasKesehatan,
                    as: 'fasilitasKesehatan'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews.map(review => {
            const fasilitas = review.id_fasilitas_pendidikan ?
                review.fasilitasPendidikan :
                review.fasilitasKesehatan;

            return {
                ...review.toJSON(),
                fasilitas,
            };
        }));
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
                    model: FasilitasPendidikan,
                    as: 'fasilitasPendidikan'
                },
                {
                    model: FasilitasKesehatan,
                    as: 'fasilitasKesehatan'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        if (review) {
            const fasilitas = review.id_fasilitas_pendidikan ?
                review.fasilitasPendidikan :
                review.fasilitasKesehatan;

            res.json({
                ...review.toJSON(),
                fasilitas,
            });
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

// Fungsi untuk membuat review baru
exports.createReview = async (req, res) => {
    try {
        const {
            komentar,
            id_user,
            id_fasilitas_pendidikan,
            id_fasilitas_kesehatan
        } = req.body;

        // Validasi: Pastikan hanya salah satu id_fasilitas yang diisi
        if (id_fasilitas_pendidikan && id_fasilitas_kesehatan) {
            return res.status(400).json({
                error: 'Hanya boleh mengisi satu id_fasilitas'
            });
        }

        const review = await Reviews.create({
            komentar,
            id_user,
            id_fasilitas_pendidikan,
            id_fasilitas_kesehatan,
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
            id_fasilitas_pendidikan,
            id_fasilitas_kesehatan
        } = req.body;

        // Validasi: Pastikan hanya salah satu id_fasilitas yang diisi (jika ada perubahan)
        if (id_fasilitas_pendidikan && id_fasilitas_kesehatan) {
            return res.status(400).json({
                error: 'Hanya boleh mengisi satu id_fasilitas'
            });
        }

        await existingReview.update({
            komentar: komentar || existingReview.komentar,
            id_user: id_user || existingReview.id_user,
            id_fasilitas_pendidikan: id_fasilitas_pendidikan || existingReview.id_fasilitas_pendidikan,
            id_fasilitas_kesehatan: id_fasilitas_kesehatan || existingReview.id_fasilitas_kesehatan,
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