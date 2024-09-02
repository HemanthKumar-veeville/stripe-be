const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware.verifyToken, orderController.createOrder);
router.get("/", authMiddleware.verifyToken, orderController.getOrders);
router.get("/me", authMiddleware.verifyToken, orderController.getMyOrders);
router.get("/all", authMiddleware.verifyToken, orderController.getAllOrders);
router.get(
  "/:orderId",
  authMiddleware.verifyToken,
  orderController.getOrderById
);
router.put(
  "/:orderId",
  authMiddleware.verifyToken,
  orderController.updateOrder
);
router.delete(
  "/:orderId",
  authMiddleware.verifyToken,
  orderController.deleteOrder
);

module.exports = router;
