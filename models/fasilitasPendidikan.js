const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const FasilitasPendidikan = db.define('fasilitasPendidikan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: { // nama sekolah
        type: DataTypes.STRING,
        allowNull: false,
    },
    fasilitas: {
        type: DataTypes.TEXT,
    },
    deskripsi_singkat: {
        type: DataTypes.TEXT,
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
        allowNull: false,
    },
    kepala_sekolah: { // Nama kepala sekolah
        type: DataTypes.STRING,
        allowNull: true,
    },
    jumlah_murid: { // Jumlah murid
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    jumlah_guru: { // Jumlah guru
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = FasilitasPendidikan;