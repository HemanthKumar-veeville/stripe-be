const supportService = require("../services/supportService");

exports.submitRequest = async (req, res, next) => {
  try {
    const request = await supportService.submitRequest(req.body, req.user);
    res
      .status(200)
      .json({ message: "Support request submitted successfully", request });
  } catch (error) {
    next(error);
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    const requests = await supportService.getRequests(req.user);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
