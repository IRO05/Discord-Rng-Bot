const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");

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