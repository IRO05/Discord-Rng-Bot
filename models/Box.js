const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

const Box = sequelize.define("box", {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },

});

module.exports = Box;