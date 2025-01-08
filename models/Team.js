const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

/*
Schema for players team
id for the players id
slot1..3 to hold the id of the character equipped to each slot
*/

const Team = sequelize.define("team", {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    slot1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slot2: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    slot3: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    
});

module.exports = Team;