const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SupportRequest = sequelize.define("SupportRequest", {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Open",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = SupportRequest;
