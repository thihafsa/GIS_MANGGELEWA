const express = require('express');
const router = express.Router();
const Groqs = require('../lib/Ai'); // Sesuaikan dengan lokasi file Groqs Anda

router.post('/generate-description', async (req, res) => {
    const {
        nama_instansi,
        kepala,
        fasilitas = '', // Set default value to empty string
        layanan = '', // Set default value to empty string
        alamat,
        jam_buka,
        jam_tutup
    } = req.body;

    try {
        const description = await Groqs({
            nama_instansi,
            kepala,
            fasilitas,
            layanan,
            alamat,
            jam_buka,
            jam_tutup
        });

        res.json({
            description
        });
    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({
            error: 'Failed to generate description'
        });
    }
});

module.exports = router;
