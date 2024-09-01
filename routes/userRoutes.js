const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/profile",
  authMiddleware.verifyToken,
  userController.getUserProfile
);
router.put(
  "/profile",
  authMiddleware.verifyToken,
  userController.updateUserProfile
);
router.put(
  "/change-password",
  authMiddleware.verifyToken,
  userController.changePassword
);
router.delete(
  "/:userId",
  authMiddleware.verifyToken,
  userController.deleteUser
);

module.exports = router;
