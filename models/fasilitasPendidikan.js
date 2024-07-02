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
    nama: {
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
    alamat: {
        type: DataTypes.TEXT, // Adjust the data type according to your needs
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
    kepala_sekolah: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jumlah_murid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    jumlah_guru: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = FasilitasPendidikan;
