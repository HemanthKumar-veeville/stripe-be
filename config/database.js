const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.dbUrl, {
  dialect: "postgres",
  logging: config.env === "development" ? console.log : false,
});

module.exports = sequelize;
