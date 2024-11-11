const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");
const { defaultValueSchemable } = require("sequelize/lib/utils");
const { allowedNodeEnvironmentFlags } = require("process");

const Box = sequelize.define("box", {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    jonjoe1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    jonjoe1Ability: {
        type: DataTypes.STRING,
        allowNull: false,
        defualtValue: "hmn",
    },
    jonjoe1AbilityName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Hamon",
    },
    jonjoe1move1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    jonjoe1move2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    jonjoe1move3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    jonjoe1move4: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    jonjoe1move5: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    jonjoe1Hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 125,
    },
    jonjoe1Spd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 120,

    },
    jonjoe1Pwr: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 150,

    },


});

module.exports = Box;