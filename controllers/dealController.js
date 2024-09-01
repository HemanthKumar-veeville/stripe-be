const dealService = require("../services/dealService");

exports.createDeal = async (req, res, next) => {
  try {
    const deal = await dealService.createDeal(req.user, req.body);
    res.status(201).json(deal);
  } catch (error) {
    next(error);
  }
};

exports.getAllDeals = async (req, res, next) => {
  try {
    const deals = await dealService.getAllDeals(req.user);
    res.status(200).json(deals);
  } catch (error) {
    next(error);
  }
};

exports.getDealById = async (req, res, next) => {
  try {
    const deal = await dealService.getDealById(req.params.dealId, req.user);
    if (deal) {
      res.status(200).json(deal);
    } else {
      res.status(404).json({ message: "Deal not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateDeal = async (req, res, next) => {
  try {
    const updatedDeal = await dealService.updateDeal(
      req.params.dealId,
      req.body,
      req.user
    );
    if (updatedDeal) {
      res.status(200).json(updatedDeal);
    } else {
      res.status(404).json({ message: "Deal not found or unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteDeal = async (req, res, next) => {
  try {
    const result = await dealService.deleteDeal(req.params.dealId, req.user);
    if (result) {
      res.status(200).json({ message: "Deal deleted successfully" });
    } else {
      res.status(404).json({ message: "Deal not found or unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

exports.finalizeDeal = async (req, res, next) => {
  try {
    const result = await dealService.finalizeDeal(req.params.dealId, req.user);
    if (result) {
      res
        .status(200)
        .json({ message: "Deal finalized and payments auto-debited" });
    } else {
      res.status(404).json({ message: "Deal not found or unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
