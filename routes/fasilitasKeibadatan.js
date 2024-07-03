const express = require('express');
const router = express.Router();
const fasilitasKeibadatanController = require('../controllers/fasilitasKeibadatanController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FasilitasKeibadatanInput:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *           description: Nama fasilitas keibadatan
 *         fasilitas:
 *           type: string
 *           description: Deskripsi fasilitas
 *         jambuka:
 *           type: string
 *           format: time
 *           description: Jam buka
 *         jamtutup:
 *           type: string
 *           format: time
 *           description: Jam tutup
 *         alamat:
 *           type: string
 *           description: Alamat lokasi fasilitas
 *         longitude:
 *           type: number
 *           format: double
 *           description: Longitude lokasi
 *         latitude:
 *           type: number
 *           format: double
 *           description: Latitude lokasi
 *         foto:
 *           type: string
 *           format: binary
 *           description: Foto fasilitas
 *     FasilitasKeibadatan:
 *       allOf:
 *         - $ref: '#/components/schemas/FasilitasKeibadatanInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID fasilitas keibadatan
 *               readOnly: true
 *             foto:
 *               type: string
 *               description: URL foto fasilitas keibadatan
 */

/**
 * @swagger
 * /fasilitaskeibadatan:
 *   get:
 *     summary: Mendapatkan semua fasilitas keibadatan
 *     tags: [Fasilitas Keibadatan]
 *     responses:
 *       200:
 *         description: Daftar fasilitas keibadatan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FasilitasKeibadatan'
 *   post:
 *     summary: Membuat fasilitas keibadatan baru
 *     tags: [Fasilitas Keibadatan]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FasilitasKeibadatanInput'
 *     responses:
 *       201:
 *         description: Fasilitas keibadatan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKeibadatan'
 */
router.route('/')
    .get(fasilitasKeibadatanController.getAllFasilitasKeibadatan)
    .post(fasilitasKeibadatanController.createFasilitasKeibadatan);

/**
 * @swagger
 * /fasilitaskeibadatan/{id}:
 *   get:
 *     summary: Mendapatkan fasilitas keibadatan berdasarkan ID
 *     tags: [Fasilitas Keibadatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas keibadatan
 *     responses:
 *       200:
 *         description: Fasilitas keibadatan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKeibadatan'
 *       404:
 *         description: Fasilitas keibadatan tidak ditemukan
 *   put:
 *     summary: Memperbarui fasilitas keibadatan berdasarkan ID
 *     tags: [Fasilitas Keibadatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas keibadatan
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/FasilitasKeibadatanInput'
 *     responses:
 *       200:
 *         description: Fasilitas keibadatan berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FasilitasKeibadatan'
 *       404:
 *         description: Fasilitas keibadatan tidak ditemukan
 *   delete:
 *     summary: Menghapus fasilitas keibadatan berdasarkan ID
 *     tags: [Fasilitas Keibadatan]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID fasilitas keibadatan
 *     responses:
 *       204:
 *         description: Fasilitas keibadatan berhasil dihapus
 *       404:
 *         description: Fasilitas keibadatan tidak ditemukan
 */
router.route('/:id')
    .get(fasilitasKeibadatanController.getFasilitasKeibadatanById)
    .put(fasilitasKeibadatanController.updateFasilitasKeibadatan)
    .delete(fasilitasKeibadatanController.deleteFasilitasKeibadatan);

module.exports = router;
