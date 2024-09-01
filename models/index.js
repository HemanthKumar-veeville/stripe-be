const sequelize = require("../config/database");
const User = require("./User");
const Deal = require("./Deal");
const Message = require("./Message");
const Notification = require("./Notification");
const Order = require("./Order");
const Review = require("./Review");
const SupportRequest = require("./SupportRequest");

// Define associations with explicit foreignKey names
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Deal, { foreignKey: "organizerId" });
Deal.belongsTo(User, { foreignKey: "organizerId" });

User.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(User, { foreignKey: "customerId" });

User.hasMany(Message, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "senderId" });

Deal.hasMany(Message, { foreignKey: "dealId" });
Message.belongsTo(Deal, { foreignKey: "dealId" });

Deal.hasMany(Order, { foreignKey: "dealId" });
Order.belongsTo(Deal, { foreignKey: "dealId" });

Deal.hasMany(Review, { foreignKey: "dealId" });
Review.belongsTo(Deal, { foreignKey: "dealId" });

User.hasMany(SupportRequest, { foreignKey: "userId" });
SupportRequest.belongsTo(User, { foreignKey: "userId" });

// Sync the database with the altered associations
sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  User,
  Deal,
  Message,
  Notification,
  Order,
  Review,
  SupportRequest,
};
