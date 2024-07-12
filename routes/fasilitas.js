const express = require('express');
const router = express.Router();
const FasilitasController = require('../controllers/fasilitasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Fasilitas:
 *       type: object
 *       required:
 *         - nama
 *         - jam_buka
 *         - jam_tutup
 *         - alamat
 *         - idjenis
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Fasilitas
 *         nama:
 *           type: string
 *           description: The name of the Fasilitas
 *         jam_buka:
 *           type: string
 *           description: Opening time
 *         jam_tutup:
 *           type: string
 *           description: Closing time
 *         alamat:
 *           type: string
 *           description: Address of the Fasilitas
 *         foto:
 *           type: string
 *           description: Photo URL of the Fasilitas
 *         latitude:
 *           type: number
 *           description: Latitude coordinate
 *         longitude:
 *           type: number
 *           description: Longitude coordinate
 *         deskripsi:
 *           type: string
 *           description: Description of the Fasilitas
 *         idjenis:
 *           type: integer
 *           description: Foreign key referencing Jenis Fasilitas
 *       example:
 *         id: 1
 *         nama: "Perpustakaan"
 *         jam_buka: "08:00"
 *         jam_tutup: "17:00"
 *         alamat: "Jl. Pendidikan No. 10"
 *         foto: "http://example.com/foto.jpg"
 *         latitude: -6.1751
 *         longitude: 106.8650
 *         deskripsi: "Perpustakaan dengan koleksi buku lengkap"
 *         idjenis: 1
 */

/**
 * @swagger
 * tags:
 *   name: Fasilitas
 *   description: The Fasilitas managing API
 */

/**
 * @swagger
 * /fasilitas:
 *   get:
 *     summary: Returns the list of all the Fasilitas
 *     tags: [Fasilitas]
 *     responses:
 *       200:
 *         description: The list of the Fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fasilitas'
 */
router.get('/', FasilitasController.getAllFasilitas);

/**
 * @swagger
 * /fasilitas/{id}:
 *   get:
 *     summary: Get the Fasilitas by id
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Fasilitas id
 *     responses:
 *       200:
 *         description: The Fasilitas description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fasilitas'
 *       404:
 *         description: The Fasilitas was not found
 */
router.get('/:id', FasilitasController.getFasilitasById);

/**
 * @swagger
 * /fasilitas/jenis/{idjenis}:
 *   get:
 *     summary: Get all Fasilitas by Jenis Fasilitas id
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: idjenis
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jenis Fasilitas id
 *     responses:
 *       200:
 *         description: List of Fasilitas for the specified Jenis Fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fasilitas'
 *       404:
 *         description: No Fasilitas found for the specified Jenis Fasilitas
 */
router.get('/jenis/:idjenis', FasilitasController.getFasilitasByIdJenis);


/**
 * @swagger
 * /fasilitas:
 *   post:
 *     summary: Create a new Fasilitas
 *     tags: [Fasilitas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               jam_buka:
 *                 type: string
 *               jam_tutup:
 *                 type: string
 *               alamat:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *               idjenis:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The Fasilitas was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fasilitas'
 *       500:
 *         description: Some server error
 */
router.post('/', FasilitasController.createFasilitas);

/**
 * @swagger
 * /fasilitas/{id}:
 *   put:
 *     summary: Update the Fasilitas by id
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Fasilitas id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               jam_buka:
 *                 type: string
 *               jam_tutup:
 *                 type: string
 *               alamat:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *               idjenis:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The Fasilitas was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fasilitas'
 *       404:
 *         description: The Fasilitas was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', FasilitasController.updateFasilitas);

/**
 * @swagger
 * /fasilitas/{id}:
 *   delete:
 *     summary: Remove the Fasilitas by id
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Fasilitas id
 *     responses:
 *       200:
 *         description: The Fasilitas was deleted
 *       404:
 *         description: The Fasilitas was not found
 */
router.delete('/:id', FasilitasController.deleteFasilitas);

module.exports = router;
