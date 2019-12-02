'use strict';
const Sequalize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'user', {
        user_id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_first_name: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { len:[0,20] }
        },
        user_last_name: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: { len: [0, 30] }
        },
        user_email: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: {
                len: [0, 50],
                isEmail: true
            }
        },
        user_begin_date: {
            type: Sequalize.DATE,
            allowNull: true
        },
        user_end_date: {
            type: Sequalize.DATE,
            allowNull: true
        },
        employment_status: {
            type: Sequalize.ENUM,
            values: ['new_hire', 'on_boarding', 'full_time', 'part_time', 'terminated', 'applied', 'rejected'],
            allowNull: false,
            defaultValue: 'applied'
        },
        user_wage: {
            type: Sequalize.DECIMAL,
            allowNull: true
        }

    },
    {
        timestamps: false,
        freezeTableName: true
    }
)