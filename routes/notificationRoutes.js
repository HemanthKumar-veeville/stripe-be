const express = require("express");
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/",
  authMiddleware.verifyToken,
  notificationController.getNotifications
);
router.put(
  "/:notificationId/read",
  authMiddleware.verifyToken,
  notificationController.markNotificationAsRead
);

module.exports = router;
