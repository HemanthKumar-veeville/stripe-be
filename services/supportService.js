const { SupportRequest } = require("../models");

exports.submitRequest = async (supportData, user) => {
  const supportRequest = await SupportRequest.create({
    ...supportData,
    userId: user.id,
  });

  return supportRequest;
};

exports.getRequests = async (user) => {
  const requests = await SupportRequest.findAll({ where: { userId: user.id } });
  return requests;
};
