const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const transporters = require('../middleware/mailer');

// Generate a unique OTP (for demonstration purposes, a 6-digit random number)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Store OTP in memory (in a real-world scenario, consider using a persistent storage)
const otpStorage = {};

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent to email
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post('/forgot-password', async (req, res) => {
    const {
        email
    } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const otp = generateOtp();
        otpStorage[email] = otp;

        const mailOptions = {
            from: 'SIGADMIN <sigmanggelewa@gmail.com>',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporters.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Error sending email'
                });
            }
            console.log('Email sent: ' + info.response);
            req.session.otpVerified = true;
            res.status(200).json({
                message: 'OTP sent to email',
                redirectTo: '/otp'
            });

        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});
/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify the OTP and reset the password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid OTP
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post('/verify-otp', async (req, res) => {
    const {
        email,
        otp
    } = req.body;
    try {
        // Check if the OTP is correct
        if (otpStorage[email] !== parseInt(otp)) {
            return res.status(400).json({
                message: 'Invalid OTP'
            });
        }

        // Find the user
        const user = await Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Assume that password reset happens elsewhere, e.g., through a password reset form

        // Clear OTP from storage
        delete otpStorage[email];
        req.session.resetPassword = true;
        res.status(200).json({
            message: 'OTP verified successfully',
            redirectTo: '/reset-password'
        });


    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP to the user's email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP resent successfully
 *       404:
 *         description: User not found or OTP not generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found or OTP not generated
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post('/resend-otp', async (req, res) => {
    const {
        email
    } = req.body;
    try {
        if (!otpStorage[email]) {
            return res.status(404).json({
                message: 'OTP not generated or expired'
            });
        }

        const otp = otpStorage[email];

        const mailOptions = {
            from: 'SIGADMIN <sigmanggelewa@gmail.com>',
            to: email,
            subject: 'Resend Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporters.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Error sending email'
                });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'OTP resent successfully'
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newSecurePassword123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post('/reset-password', async (req, res) => {
    const {
        email,
        newPassword
    } = req.body;
    try {
        // Find the user
        const user = await Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Hash the new password before saving
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: 'Password reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

/**
 * @swagger
 * /auth/login:
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
 * /auth/register:
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
                message: 'Username, email, dan password harus diisi'
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
                message: 'User dengan email ini sudah ada'
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
            message: 'User berhasil register'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
});




module.exports = router;