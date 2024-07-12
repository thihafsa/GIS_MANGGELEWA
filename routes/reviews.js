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
 *         id_fasilitas:
 *           type: integer
 *           description: ID fasilitas yang direview
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

module.exports = router;