const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewInput:
 *       type: object
 *       properties:
 *         komentar:
 *           type: string
 *           description: Komentar review
 *         id_user:
 *           type: integer
 *           description: ID pengguna yang memberikan review
 *         id_fasilitas_pendidikan:
 *           type: integer
 *           description: ID fasilitas pendidikan yang direview
 *         id_fasilitas_kesehatan:
 *           type: integer
 *           description: ID fasilitas kesehatan yang direview
 *         id_fasilitas_pemerintah:
 *           type: integer
 *           description: ID fasilitas pemerintah yang direview
 *         id_fasilitas_keibadatan:
 *           type: integer
 *           description: ID fasilitas keibadatan yang direview
 *     Review:
 *       allOf:
 *         - $ref: '#/components/schemas/ReviewInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID review
 *               readOnly: true
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Mendapatkan semua review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Daftar review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *   post:
 *     summary: Membuat review baru
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Mendapatkan review berdasarkan ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID review
 *     responses:
 *       200:
 *         description: Review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review tidak ditemukan
 *   put:
 *     summary: Memperbarui review berdasarkan ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       200:
 *         description: Review berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review tidak ditemukan
 *   delete:
 *     summary: Menghapus review berdasarkan ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID review
 *     responses:
 *       204:
 *         description: Review berhasil dihapus
 *       404:
 *         description: Review tidak ditemukan
 */
router.route('/:id')
    .get(reviewsController.getReviewById)
    .put(reviewsController.updateReview)
    .delete(reviewsController.deleteReview);
/**
 * @swagger
 * /reviews/kesehatan/{id}:
 *   get:
 *     summary: Mendapatkan review berdasarkan ID fasilitas kesehatan
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas kesehatan
 *     responses:
 *       200:
 *         description: Review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/kesehatan/:id', reviewsController.getReviewsByFasilitasKesehatanId);

/**
 * @swagger
 * /reviews/pendidikan/{id}:
 *   get:
 *     summary: Mendapatkan review berdasarkan ID fasilitas pendidikan
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pendidikan
 *     responses:
 *       200:
 *         description: Review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/pendidikan/:id', reviewsController.getReviewsByFasilitasPendidikanId);

/**
 * @swagger
 * /reviews/pemerintah/{id}:
 *   get:
 *     summary: Mendapatkan review berdasarkan ID fasilitas pemerintah
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pemerintah
 *     responses:
 *       200:
 *         description: Review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/pemerintah/:id', reviewsController.getReviewsByFasilitasPemerintahId);

/**
 * @swagger
 * /reviews/keibadatan/{id}:
 *   get:
 *     summary: Mendapatkan review berdasarkan ID fasilitas keibadatan
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas keibadatan
 *     responses:
 *       200:
 *         description: Review berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Gagal mengambil data
 */
router.get('/keibadatan/:id', reviewsController.getReviewsByFasilitasKeibadatanId);
/**
 * @swagger
 * /{tag}:
 *   post:
 *     summary: Menambah review berdasarkan jenis fasilitas
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag untuk jenis fasilitas (kesehatan, pendidikan, pemerintah, keibadatan)
 *       - in: body
 *         name: review
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             komentar:
 *               type: string
 *               description: Komentar atau review yang ditambahkan
 *             id_fasilitas:
 *               type: integer
 *               description: ID fasilitas terkait
 *             id_user:
 *               type: integer
 *               description: ID pengguna yang menambahkan review
 *     responses:
 *       '201':
 *         description: Review berhasil ditambahkan
 *       '400':
 *         description: Permintaan tidak valid
 *       '500':
 *         description: Gagal menambahkan review
 */
router.post('/:tag', reviewsController.addReviewByTag);

module.exports = router;