const { Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

const Character = sequelize.define("character", {

    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability4: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability5: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ability6: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    baseHp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    baseSpd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    basePwr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,

    }

});

module.exports = Character;