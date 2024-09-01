const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.getProfile = async (user) => {
  const profile = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["password"] },
  });
  return profile;
};

exports.updateProfile = async (user, profileData) => {
  const updatedUser = await User.update(profileData, {
    where: { id: user.id },
    returning: true,
  });
  return updatedUser[1][0];
};

exports.changePassword = async (user, passwordData) => {
  const { currentPassword, newPassword } = passwordData;
  const existingUser = await User.findOne({ where: { id: user.id } });

  const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
  if (!isMatch) {
    throw new Error("Invalid current password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await existingUser.update({ password: hashedPassword });

  return true;
};

exports.deleteUser = async (userId, user) => {
  if (user.role !== "Admin" && user.id !== parseInt(userId, 10)) {
    throw new Error("Unauthorized - Only admins can delete other users");
  }

  const userToDelete = await User.findOne({ where: { id: userId } });
  if (!userToDelete) {
    throw new Error("User not found");
  }

  await userToDelete.destroy();
  return true;
};
