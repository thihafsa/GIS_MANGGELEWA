const {
    Sequelize
} = require('sequelize');

const db = new Sequelize({
    database: 'gisManggelewa',
    username: 'gisManggelewa',
    password: 'gisManggelewa',
    host: '127.0.0.1',
    port: 3306,
    dialect: "mysql",
});


module.exports = db;