const Reviews = require('../models/reviews');
const FasilitasPendidikan = require('../models/fasilitasPendidikan');
const FasilitasKesehatan = require('../models/fasilitasKesehatan');
const FasilitasPemerintah = require('../models/fasilitasPemerintah');
const FasilitasKeibadatan = require('../models/fasilitasKeibadatan');
const Users = require('../models/users');

// Fungsi untuk mendapatkan semua review
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            include: [{
                    model: FasilitasPendidikan,
                    as: 'fasilitasPendidikan', // Pastikan asosiasi 'fasilitasPendidikan' ada
                },
                {
                    model: FasilitasKesehatan,
                    as: 'fasilitasKesehatan', // Pastikan asosiasi 'fasilitasKesehatan' ada
                },
                {
                    model: FasilitasPemerintah,
                    as: 'fasilitasPemerintah', // Pastikan asosiasi 'fasilitasPemerintah' ada
                },
                {
                    model: FasilitasKeibadatan,
                    as: 'fasilitasKeibadatan', // Pastikan asosiasi 'fasilitasKeibadatan' ada
                },
                {
                    model: Users,
                    as: 'user',
                }
            ],
        });

        res.json(reviews.map(review => {
            let fasilitas = null;

            // Tentukan fasilitas yang sesuai berdasarkan asosiasi yang ditemukan
            if (review.fasilitasPendidikan) {
                fasilitas = review.fasilitasPendidikan;
            } else if (review.fasilitasKesehatan) {
                fasilitas = review.fasilitasKesehatan;
            } else if (review.fasilitasPemerintah) {
                fasilitas = review.fasilitasPemerintah;
            } else if (review.fasilitasKeibadatan) {
                fasilitas = review.fasilitasKeibadatan;
            }

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

// Fungsi untuk menambah review berdasarkan jenis fasilitas
exports.addReviewByTag = async (req, res) => {
    try {
        const {
            komentar,
            id_fasilitas,
            id_user
        } = req.body;

        // Menentukan model dan kolom berdasarkan tag
        let model;
        let foreignKey;
        switch (req.params.tag) {
            case 'kesehatan':
                model = FasilitasKesehatan;
                foreignKey = 'id_fasilitas_kesehatan';
                break;
            case 'pendidikan':
                model = FasilitasPendidikan;
                foreignKey = 'id_fasilitas_pendidikan';
                break;
            case 'pemerintah':
                model = FasilitasPemerintah;
                foreignKey = 'id_fasilitas_pemerintah';
                break;
            case 'keibadatan':
                model = FasilitasKeibadatan;
                foreignKey = 'id_fasilitas_keibadatan';
                break;
            default:
                return res.status(400).json({
                    error: 'Jenis fasilitas tidak valid'
                });
        }

        // Pastikan fasilitas yang akan direview sudah ada
        const fasilitas = await model.findByPk(id_fasilitas);
        if (!fasilitas) {
            return res.status(404).json({
                error: 'Fasilitas tidak ditemukan'
            });
        }

        // Menambahkan review ke dalam database
        const newReview = await Reviews.create({
            komentar,
            [foreignKey]: id_fasilitas,
            id_user
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal menambahkan review'
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
            id_fasilitas_kesehatan,
            id_fasilitas_pemerintah,
            id_fasilitas_keibadatan
        } = req.body;

        // Validasi: Pastikan hanya satu id_fasilitas yang diisi
        const fasilitasCount = [id_fasilitas_pendidikan, id_fasilitas_kesehatan, id_fasilitas_pemerintah, id_fasilitas_keibadatan].filter(id => id !== undefined).length;
        if (fasilitasCount !== 1) {
            return res.status(400).json({
                error: 'Hanya boleh mengisi satu id_fasilitas'
            });
        }

        const review = await Reviews.create({
            komentar,
            id_user,
            id_fasilitas_pendidikan,
            id_fasilitas_kesehatan,
            id_fasilitas_pemerintah,
            id_fasilitas_keibadatan
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
            id_fasilitas_kesehatan,
            id_fasilitas_pemerintah,
            id_fasilitas_keibadatan
        } = req.body;

        // Validasi: Pastikan hanya satu id_fasilitas yang diisi (jika ada perubahan)
        const fasilitasCount = [id_fasilitas_pendidikan, id_fasilitas_kesehatan, id_fasilitas_pemerintah, id_fasilitas_keibadatan].filter(id => id !== undefined).length;
        if (fasilitasCount > 1) {
            return res.status(400).json({
                error: 'Hanya boleh mengisi satu id_fasilitas'
            });
        }

        await existingReview.update({
            komentar: komentar || existingReview.komentar,
            id_user: id_user || existingReview.id_user,
            id_fasilitas_pendidikan: id_fasilitas_pendidikan || existingReview.id_fasilitas_pendidikan,
            id_fasilitas_kesehatan: id_fasilitas_kesehatan || existingReview.id_fasilitas_kesehatan,
            id_fasilitas_pemerintah: id_fasilitas_pemerintah || existingReview.id_fasilitas_pemerintah,
            id_fasilitas_keibadatan: id_fasilitas_keibadatan || existingReview.id_fasilitas_keibadatan
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


// Fungsi untuk mendapatkan review berdasarkan ID fasilitas kesehatan
exports.getReviewsByFasilitasKesehatanId = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                id_fasilitas_kesehatan: req.params.id
            },
            include: [{
                    model: FasilitasKesehatan,
                    as: 'fasilitasKesehatan'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews.map(review => ({
            ...review.toJSON(),
            fasilitas: review.fasilitasKesehatan,
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan review berdasarkan ID fasilitas pendidikan
exports.getReviewsByFasilitasPendidikanId = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                id_fasilitas_pendidikan: req.params.id
            },
            include: [{
                    model: FasilitasPendidikan,
                    as: 'fasilitasPendidikan'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews.map(review => ({
            ...review.toJSON(),
            fasilitas: review.fasilitasPendidikan,
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan review berdasarkan ID fasilitas pemerintah
exports.getReviewsByFasilitasPemerintahId = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                id_fasilitas_pemerintah: req.params.id
            },
            include: [{
                    model: FasilitasPemerintah,
                    as: 'fasilitasPemerintah'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews.map(review => ({
            ...review.toJSON(),
            fasilitas: review.fasilitasPemerintah,
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};

// Fungsi untuk mendapatkan review berdasarkan ID fasilitas keibadatan
exports.getReviewsByFasilitasKeibadatanId = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                id_fasilitas_keibadatan: req.params.id
            },
            include: [{
                    model: FasilitasKeibadatan,
                    as: 'fasilitasKeibadatan'
                },
                {
                    model: Users,
                    as: 'user'
                }
            ],
        });

        res.json(reviews.map(review => ({
            ...review.toJSON(),
            fasilitas: review.fasilitasKeibadatan,
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Gagal mengambil data'
        });
    }
};