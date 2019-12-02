const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('mydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
