const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentMethodId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentIntent: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Order;
