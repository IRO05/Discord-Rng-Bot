const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

const Ability = sequelize.define("ability", {

    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    move1: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    move2: {
        type: DataTypes.STRING,
        allowNull: false,

    },
});

module.exports = Ability;