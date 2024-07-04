const {
    Sequelize
} = require('sequelize');

const db = new Sequelize({
    database: 'gisManggelewa',
    username: 'gisManggelewa',
    password: 'gisManggelewa',
    host: '35.240.249.138',
    port: 3306,
    dialect: "mysql",
});


module.exports = db;