const notificationService = require("../services/notificationService");

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotifications(req.user);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(
      req.params.notificationId,
      req.user
    );
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (error) {
    next(error);
  }
};
