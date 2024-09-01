const { Message } = require("../models");

exports.sendMessage = async (user, dealId, messageData) => {
  const message = await Message.create({
    ...messageData,
    senderId: user.id,
    dealId,
  });

  return message;
};

exports.getMessages = async (dealId, user) => {
  const messages = await Message.findAll({ where: { dealId } });
  return messages;
};
