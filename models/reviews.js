const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');
const Users = require('./users'); // Pastikan path sesuai dengan struktur proyek Anda
const Fasilitas = require('./Fasilitas'); // Import model Fasilitas

const Reviews = db.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    komentar: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id',
        },
    },
    id_fasilitas: {
        type: DataTypes.INTEGER,
        references: {
            model: Fasilitas,
            key: 'id',
        },
    },
});

// Definisi relasi dengan Users
Reviews.belongsTo(Users, {
    foreignKey: 'id_user',
    as: 'user'
});

// Definisi relasi dengan Fasilitas
Reviews.belongsTo(Fasilitas, {
    foreignKey: 'id_fasilitas',
    as: 'fasilitas'
});

module.exports = Reviews;