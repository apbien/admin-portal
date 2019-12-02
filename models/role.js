'use strict';
const Sequalize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'role', {
        role_id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role_name: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { len: [0, 45] }
        },
        role_department: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { len: [0, 45] }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)
