// migrations.js
const sequelize = require("./config/database");
const logger = require("./utils/logger");

const runMigrations = async () => {
  try {
    await sequelize.sync({ alter: true });
    logger.info("Database synchronized successfully.");
  } catch (err) {
    logger.error("Failed to synchronize the database:", err);
    process.exit(1); // Exit the process with a failure code
  }
};

runMigrations(); // Run migrations manually by executing this file
