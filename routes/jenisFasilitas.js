const express = require('express');
const router = express.Router();
const JenisFasilitasController = require('../controllers/jenisFasilitasController');

/**
 * @swagger
 * components:
 *   schemas:
 *     JenisFasilitas:
 *       type: object
 *       required:
 *         - nama
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Jenis Fasilitas
 *         nama:
 *           type: string
 *           description: The name of the Jenis Fasilitas
 *         icon:
 *           type: string
 *           description: The icon URL of the Jenis Fasilitas
 *       example:
 *         id: 1
 *         nama: "Perpustakaan"
 *         icon: "http://example.com/icon.png"
 */

/**
 * @swagger
 * tags:
 *   name: JenisFasilitas
 *   description: The Jenis Fasilitas managing API
 */

/**
 * @swagger
 * /jenisfasilitas:
 *   get:
 *     summary: Returns the list of all the Jenis Fasilitas
 *     tags: [JenisFasilitas]
 *     responses:
 *       200:
 *         description: The list of the Jenis Fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JenisFasilitas'
 */
router.get('/', JenisFasilitasController.getAllJenisFasilitas);

/**
 * @swagger
 * /jenisfasilitas/{id}:
 *   get:
 *     summary: Get the Jenis Fasilitas by id
 *     tags: [JenisFasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jenis Fasilitas id
 *     responses:
 *       200:
 *         description: The Jenis Fasilitas description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JenisFasilitas'
 *       404:
 *         description: The Jenis Fasilitas was not found
 */
router.get('/:id', JenisFasilitasController.getJenisFasilitasById);

/**
 * @swagger
 * /jenisfasilitas:
 *   post:
 *     summary: Create a new Jenis Fasilitas
 *     tags: [JenisFasilitas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               icon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The Jenis Fasilitas was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JenisFasilitas'
 *       500:
 *         description: Some server error
 */
router.post('/', JenisFasilitasController.createJenisFasilitas);

/**
 * @swagger
 * /jenisfasilitas/{id}:
 *   put:
 *     summary: Update the Jenis Fasilitas by id
 *     tags: [JenisFasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jenis Fasilitas id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               icon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The Jenis Fasilitas was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JenisFasilitas'
 *       404:
 *         description: The Jenis Fasilitas was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', JenisFasilitasController.updateJenisFasilitas);

/**
 * @swagger
 * /jenisfasilitas/{id}:
 *   delete:
 *     summary: Remove the Jenis Fasilitas by id
 *     tags: [JenisFasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jenis Fasilitas id
 *     responses:
 *       200:
 *         description: The Jenis Fasilitas was deleted
 *       404:
 *         description: The Jenis Fasilitas was not found
 */
router.delete('/:id', JenisFasilitasController.deleteJenisFasilitas);

module.exports = router;
