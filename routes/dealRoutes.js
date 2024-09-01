const express = require("express");
const dealController = require("../controllers/dealController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware.verifyToken, dealController.createDeal);
router.get("/", authMiddleware.verifyToken, dealController.getAllDeals);
router.get("/:dealId", authMiddleware.verifyToken, dealController.getDealById);
router.put("/:dealId", authMiddleware.verifyToken, dealController.updateDeal);
router.delete(
  "/:dealId",
  authMiddleware.verifyToken,
  dealController.deleteDeal
);
router.post(
  "/finalize/:dealId",
  authMiddleware.verifyToken,
  dealController.finalizeDeal
);

module.exports = router;
