const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const JenisFasilitas = db.define('jenis_fasilitas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    marker: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    list_fasilitas: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = JenisFasilitas;
