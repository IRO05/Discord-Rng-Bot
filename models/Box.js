const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./database");
const { defaultValueSchemable } = require("sequelize/lib/utils");
const { allowedNodeEnvironmentFlags } = require("process");
const Character = require("../models/Character");

/*
Schema for box table
id to hold the id of the player whos box it is
[charid] to hold a boolean for if that player has the character in their box
[charid]Ability to hold what ability id that player's character holds
[charid]move to hold a boolean for if the player's character has unlocked that move
[charid]hp to hold the player's character health stat
[charid]pwr to hold the player's character power stat 
[charid]spd to hold the player's character speed stat 
[charid]level to hold the level of the player's character 
[charid]xpneeded to hold how much xp the character needs to the next level
*/

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
        defaultValue: "hmn",
    },
    jonjoe1move1: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "kck",
    },
    jonjoe1move2: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    jonjoe1move3: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    jonjoe1Hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:125,
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
    jonjoe1Level: {

        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    jonjoe1Xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

    },
    jonjoe1XpNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
    },
    diojoe1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    diojoe1Ability: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "vmp",
    },
    diojoe1move1: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pnch",
    },
    diojoe1move2: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    diojoe1move3: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    diojoe1Hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:100,
    },
    diojoe1Spd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 140,

    },
    diojoe1Pwr: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 160,

    },
    diojoe1Level: {

        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    dioejoe1Xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    diojoe1XpNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
    },
});

module.exports = Box;