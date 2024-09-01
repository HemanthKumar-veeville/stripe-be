const reviewService = require("../services/reviewService");

exports.submitReview = async (req, res, next) => {
  try {
    const review = await reviewService.submitReview(
      req.params.dealId,
      req.body,
      req.user
    );
    res.status(200).json({ message: "Review submitted successfully", review });
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews(req.params.dealId, req.user);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
