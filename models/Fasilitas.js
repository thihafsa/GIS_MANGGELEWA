const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');
const JenisFasilitas = require('./JenisFasilitas');

const Fasilitas = db.define('fasilitas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_fasilitas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam_buka: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    jam_tutup: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    idjenis: {
        type: DataTypes.INTEGER,
        references: {
            model: JenisFasilitas,
            key: 'id',
        },
        allowNull: false,
    },
});

JenisFasilitas.hasMany(Fasilitas, {
    foreignKey: 'idjenis'
});
Fasilitas.belongsTo(JenisFasilitas, {
    foreignKey: 'idjenis'
});

module.exports = Fasilitas;