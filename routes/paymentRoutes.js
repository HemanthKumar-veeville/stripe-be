const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-setup-intent", paymentController.createSetupIntent);
router.post("/charge-saved-method", paymentController.chargeSavedMethod);
router.post(
  "/update-payment-status",
  paymentController.updatePaymentStatusForAllOrders
);

module.exports = router;
