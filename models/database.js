const Sequelize = require("sequelize");

// initialize the database in sqlite to save locally

const sequelize = new Sequelize("database", "user", "password", {
    dialect: "sqlite",
    host: "localhost",

    storage: "database.sqlite",
    logging: false,

});

module.exports = sequelize;