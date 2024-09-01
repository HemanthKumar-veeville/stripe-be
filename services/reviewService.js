const { Review } = require("../models");

exports.submitReview = async (dealId, reviewData, user) => {
  const review = await Review.create({
    ...reviewData,
    dealId,
    reviewerId: user.id,
  });

  return review;
};

exports.getReviews = async (dealId, user) => {
  const reviews = await Review.findAll({ where: { dealId } });
  return reviews;
};
