const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const FasilitasKeibadatan = db.define('fasilitasKeibadatan', {
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
    alamat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = FasilitasKeibadatan;
