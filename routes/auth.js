const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
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
 *                   description: Pesan sukses
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     foto:
 *                       type: string
 *       401:
 *         description: Email atau password salah
 *       500:
 *         description: Kesalahan server
 */
router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        console.log(req.body);
        // Validasi input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email dan password harus diisi'
            });
        }

        // Cari pengguna berdasarkan email
        const user = await Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({
                message: 'Email atau password salah'
            });
        }

        // Verifikasi password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Email atau password salah'
            });
        }

        // Simpan data pengguna di session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            foto: user.foto,
        };

        // Kirim respon JSON dengan detail pengguna
        return res.status(200).json({
            message: 'Login berhasil',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                foto: user.foto,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
});
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               role:
 *                 type: string
 *                 description: User's role (optional)
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Missing username, email, or password
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Username, email, and password are required'
            });
        }

        // Check if user with same email already exists
        const existingUser = await Users.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        // Return success message
        return res.status(200).json({
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
});

module.exports = router;