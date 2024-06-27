const express = require('express');
const router = express.Router();
const fasilitasPendidikanController = require('../controllers/fasilitasPendidikanController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FasilitasPendidikanInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *           description: Nama sekolah
 *         fasilitas:
 *           type: string
 *           description: Deskripsi fasilitas yang disediakan
 *         deskripsi_singkat:
 *           type: string
 *           description: Deskripsi singkat tentang fasilitas pendidikan
 *         tags:
 *           type: string
 *           description: Tag untuk fasilitas pendidikan
 *         latitude:
 *           type: number
 *           format: double
 *           description: Latitude lokasi
 *         longitude:
 *           type: number
 *           format: double
 *           description: Longitude lokasi
 *         jamBuka:
 *           type: string
 *           format: time
 *           description: Jam buka 
 *         jamTutup:
 *           type: string
 *           format: time
 *           description: Jam tutup 
 *         kepala_sekolah:
 *           type: string
 *           description: Nama kepala sekolah
 *         jumlah_murid:
 *           type: integer
 *           description: Jumlah murid
 *         jumlah_guru:
 *           type: integer
 *           description: Jumlah guru
 *     FasilitasPendidikan:
 *       allOf:
 *         - $ref: '#/components/schemas/FasilitasPendidikanInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID fasilitas pendidikan
 *               readOnly: true
 *             foto:
 *               type: string
 *               description: URL foto fasilitas pendidikan
 */

/**
 * @swagger
 * /fasilitaspendidikan:
 *   get:
 *     summary: Mendapatkan semua fasilitas pendidikan
 *     tags: [Fasilitas Pendidikan]
 *     responses:
 *       200:
 *         description: Daftar fasilitas pendidikan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FasilitasPendidikan'
 *   post:
 *     summary: Membuat fasilitas pendidikan baru
 *     tags: [Fasilitas Pendidikan]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               fasilitas:
 *                 type: string
 *               deskripsi_singkat:
 *                 type: string
 *               tags:
 *                 type: string
 *               latitude:
 *                 type: number
 *                 format: double
 *               longitude:
 *                 type: number
 *                 format: double
 *               jamBuka:
 *                 type: string
 *                 format: time
 *               jamTutup:
 *                 type: string
 *                 format: time
 *               kepala_sekolah:
 *                 type: string
 *               jumlah_murid:
 *                 type: integer
 *               jumlah_guru:
 *                 type: integer
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Fasilitas pendidikan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPendidikan'
 */
router.route('/')
    .get(fasilitasPendidikanController.getAllFasilitasPendidikan)
    .post(fasilitasPendidikanController.createFasilitasPendidikan);

/**
 * @swagger
 * /fasilitaspendidikan/{id}:
 *   get:
 *     summary: Mendapatkan fasilitas pendidikan berdasarkan ID
 *     tags: [Fasilitas Pendidikan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pendidikan
 *     responses:
 *       200:
 *         description: Fasilitas pendidikan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPendidikan'
 *       404:
 *         description: Fasilitas pendidikan tidak ditemukan
 *   put:
 *     summary: Memperbarui fasilitas pendidikan berdasarkan ID
 *     tags: [Fasilitas Pendidikan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pendidikan
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FasilitasPendidikanInput'
 *     responses:
 *       200:
 *         description: Fasilitas pendidikan berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasPendidikan'
 *       404:
 *         description: Fasilitas pendidikan tidak ditemukan
 *   delete:
 *     summary: Menghapus fasilitas pendidikan berdasarkan ID
 *     tags: [Fasilitas Pendidikan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas pendidikan
 *     responses:
 *       204:
 *         description: Fasilitas pendidikan berhasil dihapus
 *       404:
 *         description: Fasilitas pendidikan tidak ditemukan
 */
router.route('/:id')
    .get(fasilitasPendidikanController.getFasilitasPendidikanById)
    .put(fasilitasPendidikanController.updateFasilitasPendidikan)
    .delete(fasilitasPendidikanController.deleteFasilitasPendidikan);

module.exports = router;
