const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/:dealId/reviews",
  authMiddleware.verifyToken,
  reviewController.submitReview
);
router.get(
  "/:dealId/reviews",
  authMiddleware.verifyToken,
  reviewController.getReviews
);

module.exports = router;
