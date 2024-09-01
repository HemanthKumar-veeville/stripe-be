const userService = require("../services/userService");

exports.getUserProfile = async (req, res, next) => {
  try {
    const profile = await userService.getProfile(req.user);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const profile = await userService.updateProfile(req.user, req.body);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req.user, req.body);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.userId, req.user);
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
