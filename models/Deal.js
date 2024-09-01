const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Deal = sequelize.define("Deal", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isFinalized: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  organizerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Deal;
