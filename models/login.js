'use strict';
const Sequalize = require('sequelize'); 
const db = require('../database/db'); 

module.exports = db.sequelize.define(
    'login', {
        login_id: {
            type: Sequalize.STRING,
            primaryKey: true,
            allowNull: false,
            validate: { len: [3, 10] }
        },
        login_password: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { len: [7,100] }
        },
        user_login_fk: {
            type: Sequalize.INTEGER,
            references: {
                model: 'user',
                key: 'user_id'
            }
        }
    },
    {
        timestamps: false, 
        freezeTableName: true 
    }
)
