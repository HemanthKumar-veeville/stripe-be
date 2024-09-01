const { Order, Deal } = require("../models");

exports.createOrder = async (orderData, user) => {
  const { dealId, amount } = orderData;
  const deal = await Deal.findOne({ where: { id: dealId } });
  if (!deal) {
    throw new Error("Deal not found");
  }

  const order = await Order.create({
    amount,
    dealId,
    customerId: user.id,
  });

  return order;
};

exports.getOrders = async (dealId, user) => {
  const orders = await Order.findAll({ where: { dealId } });
  return orders;
};

exports.getOrderById = async (orderId, user) => {
  const order = await Order.findOne({
    where: { id: orderId, customerId: user.id },
  });
  return order;
};

exports.updateOrder = async (orderId, orderData, user) => {
  const order = await Order.findOne({
    where: { id: orderId, customerId: user.id },
  });
  if (!order) {
    throw new Error("Order not found");
  }

  await order.update(orderData);
  return order;
};

exports.deleteOrder = async (orderId, user) => {
  const order = await Order.findOne({
    where: { id: orderId, customerId: user.id },
  });
  if (!order) {
    throw new Error("Order not found");
  }

  await order.destroy();
  return true;
};
