const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');
const FasilitasPendidikan = require('./fasilitasPendidikan'); // Import model FasilitasPendidikan
const FasilitasKesehatan = require('./fasilitasKesehatan'); // Import model FasilitasKesehatan
const Users = require('./users'); // Import model Users

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
    id_fasilitas_pendidikan: { // Foreign key untuk FasilitasPendidikan (opsional)
        type: DataTypes.INTEGER,
        references: {
            model: FasilitasPendidikan,
            key: 'id',
        },
        allowNull: true, // Izinkan null jika review untuk FasilitasKesehatan
    },
    id_fasilitas_kesehatan: { // Foreign key untuk FasilitasKesehatan (opsional)
        type: DataTypes.INTEGER,
        references: {
            model: FasilitasKesehatan,
            key: 'id',
        },
        allowNull: true, // Izinkan null jika review untuk FasilitasPendidikan
    },
});

module.exports = Reviews;
