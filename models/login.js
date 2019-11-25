'use strict';

const Sequalize = require('sequelize'); //uses Dependency
const db = require('../database/db'); //grabs the returned array from this directory

//returning the 'login' column from the db as an array
module.exports = db.sequelize.define(
    'login',
    {
        login_id: {
            type: Sequalize.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [3, 10]
            }
        },
        login_password: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: {
                len: [7,100]
            }
        },
        user_login_fk: {
            type: Sequalize.INTEGER,
            references: //how to reference a foreign-key
            {
                model: 'user',
                key: 'user_id'
            }
        }
    },
    {
        timestamps: false, //allows you to see when queries were made - false because unnecessary for now
        freezeTableName: true //prevents from adding an 's' to the end of a table name
    }
)
