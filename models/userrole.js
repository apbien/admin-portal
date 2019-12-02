'use strict';

const Sequalize = require('sequelize');
const db = require('../database/db');
const User = require(__dirname+'/user');
const Role = require(__dirname+'/role');

var UserRole = db.sequelize.define(
    'user_has_role', {
        user_role_fk: {
            type: Sequalize.INTEGER,
			primaryKey: true,
            references:
            {
                model: 'user',
                key: 'user_id'
            }
        },
        role_user_fk: {
            type: Sequalize.INTEGER,
            references:
            {
                model: 'role',
                key: 'role_id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

User.hasMany(UserRole, { foreignKey: 'user_role_fk'});
Role.hasMany(UserRole, { foreignKey: 'role_user_fk'});

module.exports = UserRole;