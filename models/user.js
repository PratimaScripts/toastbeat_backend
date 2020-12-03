const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.sequelize.define(
    'tbl_user',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        user_uuid: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            field: "user_uuid"
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            field: "username"
        },
        name: {
            type: Sequelize.STRING,
            field: "name"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            field: "email"
        },
        password: {
            type: Sequelize.STRING,
            field: "password"
        },
        cuisine: {
            type: Sequelize.STRING,
            field: "cuisine"
        }
    },    

    {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    }
)