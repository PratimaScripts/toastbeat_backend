const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = db.sequelize.define(
    'tbl_menu',
        {
            menu_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                field: "name"
            },
            img: {
                type: Sequelize.STRING,
                field: "img"
            },
            price: {
                type: Sequelize.INTEGER,
                field: "price"
            },
            description: {
                type:Sequelize.STRING,
                field: "description"
            },
            cuisine_id: {
                type: Sequelize.INTEGER,
                field: "cuisine_id"
            }
        },
        {
            freezeTableName: true,
            timestamp: false,
            tableName: 'tbl_menu'
        }
)