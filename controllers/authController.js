const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    await authService.logout(req.user, token);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
