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

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email dan password harus diisi'
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
                error: 'Email atau password salah'
            });
        }

        // Verifikasi password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Email atau password salah'
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

        // Redirect berdasarkan role
        if (user.role === 'Admin') {
            res.redirect('/admin');
        } else if (user.role === 'User') {
            res.redirect('/'); // Ganti dengan rute halaman user Anda
        } else {
            res.status(403).json({
                error: 'Peran tidak valid'
            }); // Atau redirect ke halaman error
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Terjadi kesalahan server'
        });
    }
});


module.exports = router;
