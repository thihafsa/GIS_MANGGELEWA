const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const FasilitasKesehatan = db.define('fasilitasKesehatan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_instansi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kepala_instansi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fasilitas: {
        type: DataTypes.TEXT, // Deskripsi fasilitas (bisa berupa daftar atau teks bebas)
    },
    layanan: {
        type: DataTypes.TEXT, // Deskripsi layanan (bisa berupa daftar atau teks bebas)
    },
    jamBuka: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    jamTutup: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true, // Foto bisa opsional
    },
    deskripsi_singkat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
});

module.exports = FasilitasKesehatan;
