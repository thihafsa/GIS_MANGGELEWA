const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');
const FasilitasPendidikan = require('./fasilitasPendidikan'); // Import model FasilitasPendidikan
const FasilitasKesehatan = require('./fasilitasKesehatan'); // Import model FasilitasKesehatan
const FasilitasPemerintah = require('./fasilitasPemerintah'); // Import model FasilitasPemerintah
const FasilitasKeibadatan = require('./fasilitasKeibadatan'); // Import model FasilitasKeibadatan
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
        allowNull: true, // Izinkan null jika review untuk fasilitas lain
    },
    id_fasilitas_kesehatan: { // Foreign key untuk FasilitasKesehatan (opsional)
        type: DataTypes.INTEGER,
        references: {
            model: FasilitasKesehatan,
            key: 'id',
        },
        allowNull: true, // Izinkan null jika review untuk fasilitas lain
    },
    id_fasilitas_pemerintah: { // Foreign key untuk FasilitasPemerintah (opsional)
        type: DataTypes.INTEGER,
        references: {
            model: FasilitasPemerintah,
            key: 'id',
        },
        allowNull: true, // Izinkan null jika review untuk fasilitas lain
    },
    id_fasilitas_keibadatan: { // Foreign key untuk FasilitasKeibadatan (opsional)
        type: DataTypes.INTEGER,
        references: {
            model: FasilitasKeibadatan,
            key: 'id',
        },
        allowNull: true, // Izinkan null jika review untuk fasilitas lain
    },
});
// Definisikan hubungan antara Reviews dengan masing-masing fasilitas
Reviews.belongsTo(FasilitasPendidikan, {
    foreignKey: 'id_fasilitas_pendidikan',
    as: 'fasilitasPendidikan'
});
Reviews.belongsTo(FasilitasKesehatan, {
    foreignKey: 'id_fasilitas_kesehatan',
    as: 'fasilitasKesehatan'
});
Reviews.belongsTo(FasilitasPemerintah, {
    foreignKey: 'id_fasilitas_pemerintah',
    as: 'fasilitasPemerintah'
});
Reviews.belongsTo(FasilitasKeibadatan, {
    foreignKey: 'id_fasilitas_keibadatan',
    as: 'fasilitasKeibadatan'
});
Reviews.belongsTo(Users, {
    foreignKey: 'id_user',
    as: 'user'
});
module.exports = Reviews;
