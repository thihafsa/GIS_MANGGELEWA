const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const FasilitasPemerintah = db.define('fasilitasPemerintah', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kepala_instansi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jamBuka: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    jamTutup: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    fasilitas: {
        type: DataTypes.TEXT, // Deskripsi fasilitas (bisa berupa daftar atau teks bebas)
        allowNull: true,
    },
    layanan: {
        type: DataTypes.TEXT, // Deskripsi layanan (bisa berupa daftar atau teks bebas)
        allowNull: true,
    },
    deskripsi_singkat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true, // Foto bisa opsional
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = FasilitasPemerintah;
