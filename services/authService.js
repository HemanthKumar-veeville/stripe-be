const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const tokenBlacklistService = require("./tokenBlacklistService");

exports.register = async (userData) => {
  const { name, email, password, role } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    name,
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    message: "User created successfully",
  };
};

exports.login = async (loginData) => {
  const { email, password } = loginData;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};

exports.logout = async (user, token) => {
  tokenBlacklistService.blacklistToken(token);
  return true;
};
