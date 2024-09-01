const express = require("express");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/:dealId/messages",
  authMiddleware.verifyToken,
  messageController.sendMessage
);
router.get(
  "/:dealId/messages",
  authMiddleware.verifyToken,
  messageController.getMessages
);

module.exports = router;
