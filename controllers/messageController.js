const messageService = require("../services/messageService");

exports.sendMessage = async (req, res, next) => {
  try {
    const message = await messageService.sendMessage(
      req.user,
      req.params.dealId,
      req.body
    );
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages(
      req.params.dealId,
      req.user
    );
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
