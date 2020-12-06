const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_cuisine',
        {
            cuisine_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: "name"
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_cuisine'
        }
)