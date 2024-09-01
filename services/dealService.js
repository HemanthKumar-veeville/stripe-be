const { Deal, User } = require("../models");

exports.createDeal = async (user, dealData) => {
  if (user.role !== "Organizer") {
    throw new Error("Unauthorized - Only organizers can create deals");
  }

  const deal = await Deal.create({
    ...dealData,
    organizerId: user.id,
  });

  return deal;
};

exports.getAllDeals = async (user) => {
  const deals = await Deal.findAll({
    where: user.role === "Organizer" ? { organizerId: user.id } : {},
  });

  return deals;
};

exports.getDealById = async (dealId, user) => {
  const deal = await Deal.findOne({
    where: { id: dealId, organizerId: user.id },
  });
  return deal;
};

exports.updateDeal = async (dealId, dealData, user) => {
  const deal = await Deal.findOne({
    where: { id: dealId, organizerId: user.id },
  });
  if (!deal) {
    throw new Error("Deal not found or unauthorized");
  }

  await deal.update(dealData);
  return deal;
};

exports.deleteDeal = async (dealId, user) => {
  const deal = await Deal.findOne({
    where: { id: dealId, organizerId: user.id },
  });
  if (!deal) {
    throw new Error("Deal not found or unauthorized");
  }

  await deal.destroy();
  return true;
};

exports.finalizeDeal = async (dealId, user) => {
  const deal = await Deal.findOne({
    where: { id: dealId, organizerId: user.id },
  });
  if (!deal) {
    throw new Error("Deal not found or unauthorized");
  }

  deal.isFinalized = true;
  await deal.save();

  // Additional logic to auto-debit payments would go here
  return true;
};
