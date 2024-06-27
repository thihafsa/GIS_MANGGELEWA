const {
    DataTypes
} = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
    },
    role: { // Tambahkan field role
        type: DataTypes.ENUM('Admin', 'User'), // Menggunakan ENUM untuk membatasi pilihan
        allowNull: false,
        defaultValue: 'User', // Default role adalah 'User'
    },
});

module.exports = Users;
