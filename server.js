// server.js or index.js
const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();
