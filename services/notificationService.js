const { Notification } = require("../models");

exports.getNotifications = async (user) => {
  const notifications = await Notification.findAll({
    where: { userId: user.id },
  });
  return notifications;
};

exports.markAsRead = async (notificationId, user) => {
  const notification = await Notification.findOne({
    where: { id: notificationId, userId: user.id },
  });
  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};
