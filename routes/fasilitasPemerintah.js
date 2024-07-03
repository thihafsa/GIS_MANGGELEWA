const express = require('express');
const router = express.Router();
const fasilitasPemerintahController = require('../controllers/fasilitasPemerintahController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FasilitasPemerintahInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *           description: Nama instansi pemerintah
 *         kepala_instansi:
 *           type: string
 *           description: Nama kepala instansi pemerintah
 *         jamBuka:
 *           type: string
 *           format: time
 *           description: Jam buka
 *         jamTutup:
 *           type: string
 *           format: time
 *           description: Jam tutup
 *         fasilitas:
 *           type: string
 *           description: Deskripsi fasilitas yang disediakan
 *         layanan:
 *           type: string
 *           description: Deskripsi layanan yang disediakan
 *         deskripsi_singkat:
 *           type: string
 *           description: Deskripsi singkat tentang fasilitas pemerintah
 *         tags:
 *           type: string
 *           description: Tag untuk fasilitas pemerintah
 *         latitude:
 *           type: number
 *           format: double
 *           description: Latitude lokasi
 *         longitude:
 *           type: number
 *           format: double
 *           description: Longitude lokasi
 *         alamat:
 *           type: string
 *           description: Alamat fasilitas pemerintah
 *         foto:
 *           type: string
 *           format: binary
 *           description: Foto fasilitas pemerintah
 *     FasilitasPemerintah:
 *       allOf:
 *         - $ref: '#/components/schemas/FasilitasPemerintahInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID fasilitas pemerintah
 *               readOnly: true
 *             foto:
 *               type: string
 *               description: URL foto fasilitas pemerintah
 */

/**
 * @swagger
 * /fasilitaspemerintah:
 *   get:
 *     summary: Mendapatkan semua fasilitas pemerintah
 *     tags: [Fasilitas Pemerintah]
 *     responses:
 *       200:
 *         description: Daftar fasilitas pemerintah berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FasilitasPemerintah'
 *   post:
 *     summary: Membuat fasilitas pemerintah baru
 *     tags: [Fasilitas Pemerintah]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FasilitasPemerintahInput'
 *     responses:
 *       201:
 *         description: Fasilitas pemerintah berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPemerintah'
 */
router.route('/')
    .get(fasilitasPemerintahController.getAllFasilitasPemerintah)
    .post(fasilitasPemerintahController.createFasilitasPemerintah);

/**
 * @swagger
 * /fasilitaspemerintah/{id}:
 *   get:
 *     summary: Mendapatkan fasilitas pemerintah berdasarkan ID
 *     tags: [Fasilitas Pemerintah]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pemerintah
 *     responses:
 *       200:
 *         description: Fasilitas pemerintah berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPemerintah'
 *       404:
 *         description: Fasilitas pemerintah tidak ditemukan
 *   put:
 *     summary: Memperbarui fasilitas pemerintah berdasarkan ID
 *     tags: [Fasilitas Pemerintah]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pemerintah
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FasilitasPemerintahInput'
 *     responses:
 *       200:
 *         description: Fasilitas pemerintah berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPemerintah'
 *       404:
 *         description: Fasilitas pemerintah tidak ditemukan
 *   delete:
 *     summary: Menghapus fasilitas pemerintah berdasarkan ID
 *     tags: [Fasilitas Pemerintah]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pemerintah
 *     responses:
 *       204:
 *         description: Fasilitas pemerintah berhasil dihapus
 *       404:
 *         description: Fasilitas pemerintah tidak ditemukan
 */
router.route('/:id')
    .get(fasilitasPemerintahController.getFasilitasPemerintahById)
    .put(fasilitasPemerintahController.updateFasilitasPemerintah)
    .delete(fasilitasPemerintahController.deleteFasilitasPemerintah);

module.exports = router;
