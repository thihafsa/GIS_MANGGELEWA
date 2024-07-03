const {
    Sequelize
} = require('sequelize');

const db = new Sequelize({
    database: 'gisManggelewa',
    username: 'manggelewa',
    password: 'manggelewa',
    host: '8.222.137.54',
    port: 3306,
    dialect: "mysql",
});


module.exports = db;
