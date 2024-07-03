const express = require('express');
const router = express.Router();
const fasilitasKesehatanController = require('../controllers/fasilitasKesehatanController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FasilitasKesehatanInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *           description: Nama instansi kesehatan
 *         kepala_instansi:
 *           type: string
 *           description: Nama kepala instansi kesehatan
 *         fasilitas:
 *           type: string
 *           description: Deskripsi fasilitas yang disediakan
 *         layanan:
 *           type: string
 *           description: Deskripsi layanan yang disediakan
 *         jamBuka:
 *           type: string
 *           format: time
 *           description: Jam buka
 *         jamTutup:
 *           type: string
 *           format: time
 *           description: Jam tutup
 *         deskripsi_singkat:
 *           type: string
 *           description: Deskripsi singkat tentang fasilitas kesehatan
 *         tags:
 *           type: string
 *           description: Tag untuk fasilitas kesehatan
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
 *           description: Alamat fasilitas kesehatan
 *         foto:
 *           type: string
 *           format: binary
 *           description: Foto fasilitas kesehatan
 *     FasilitasKesehatan:
 *       allOf:
 *         - $ref: '#/components/schemas/FasilitasKesehatanInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID fasilitas kesehatan
 *               readOnly: true
 */

/**
 * @swagger
 * /fasilitaskesehatan:
 *   get:
 *     summary: Mendapatkan semua fasilitas kesehatan
 *     tags: [Fasilitas Kesehatan]
 *     responses:
 *       200:
 *         description: Daftar fasilitas kesehatan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FasilitasKesehatan'
 *   post:
 *     summary: Membuat fasilitas kesehatan baru
 *     tags: [Fasilitas Kesehatan]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               kepala_instansi:
 *                 type: string
 *               fasilitas:
 *                 type: string
 *               layanan:
 *                 type: string
 *               jamBuka:
 *                 type: string
 *                 format: time
 *               jamTutup:
 *                 type: string
 *                 format: time
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
 *               alamat:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Fasilitas kesehatan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKesehatan'
 */
router.route('/')
    .get(fasilitasKesehatanController.getAllFasilitasKesehatan)
    .post(fasilitasKesehatanController.createFasilitasKesehatan);

/**
 * @swagger
 * /fasilitaskesehatan/{id}:
 *   get:
 *     summary: Mendapatkan fasilitas kesehatan berdasarkan ID
 *     tags: [Fasilitas Kesehatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas kesehatan
 *     responses:
 *       200:
 *         description: Fasilitas kesehatan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKesehatan'
 *       404:
 *         description: Fasilitas kesehatan tidak ditemukan
 *   put:
 *     summary: Memperbarui fasilitas kesehatan berdasarkan ID
 *     tags: [Fasilitas Kesehatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas kesehatan
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               kepala_instansi:
 *                 type: string
 *               fasilitas:
 *                 type: string
 *               layanan:
 *                 type: string
 *               jamBuka:
 *                 type: string
 *                 format: time
 *               jamTutup:
 *                 type: string
 *                 format: time
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
 *               alamat:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Fasilitas kesehatan berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKesehatan'
 *       404:
 *         description: Fasilitas kesehatan tidak ditemukan
 *   delete:
 *     summary: Menghapus fasilitas kesehatan berdasarkan ID
 *     tags: [Fasilitas Kesehatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas kesehatan
 *     responses:
 *       204:
 *         description: Fasilitas kesehatan berhasil dihapus
 *       404:
 *         description: Fasilitas kesehatan tidak ditemukan
 */
router.route('/:id')
    .get(fasilitasKesehatanController.getFasilitasKesehatanById)
    .put(fasilitasKesehatanController.updateFasilitasKesehatan)
    .delete(fasilitasKesehatanController.deleteFasilitasKesehatan);

module.exports = router;
