const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

/*
Schema for ability table
id to hold the abilities unique id of the ability
move1 to hold a move id
move2 to hold a move id

*/

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