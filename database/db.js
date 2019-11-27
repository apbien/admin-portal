const Sequelize = require('sequelize'); //Dependency 
const db = {}; //empty array

//creates a variable called sequelize that holds information of the DB to connect to
//mydb = name of my database that I'm pulling from
//root = username for your login of your db
//password = password for your login of your db
const sequelize = new Sequelize('mydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',

    //Pooling reduced db connection overload and increases speed
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});

//create two new variables in the array called sequelize and Sequelize 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//returns array
module.exports = db;