const express = require("express");
const supportController = require("../controllers/supportController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware.verifyToken, supportController.submitRequest);
router.get("/", authMiddleware.verifyToken, supportController.getRequests);

module.exports = router;
