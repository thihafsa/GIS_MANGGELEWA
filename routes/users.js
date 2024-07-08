const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username pengguna
 *         email:
 *           type: string
 *           format: email
 *           description: Email pengguna
 *         password:
 *           type: string
 *           description: Password pengguna
 *         role:
 *           type: string
 *           enum: [Admin, User]
 *           description: Peran pengguna (Admin atau User)
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID pengguna
 *               readOnly: true
 *             foto:
 *               type: string
 *               description: URL foto pengguna
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Membuat pengguna baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, User]
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Mendapatkan pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Pengguna tidak ditemukan
 *   put:
 *     summary: Memperbarui pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, User]
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Pengguna berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Pengguna tidak ditemukan
 *   delete:
 *     summary: Menghapus pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID pengguna
 *     responses:
 *       204:
 *         description: Pengguna berhasil dihapus
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login berhasil
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Email atau password salah
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.post('/login', usersController.findUserByEmailAndPassword);
module.exports = router;