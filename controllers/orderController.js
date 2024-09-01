const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body, req.user);
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders(req.query.dealId, req.user);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId, req.user);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrder(
      req.params.orderId,
      req.body,
      req.user
    );
    if (updatedOrder) {
      res
        .status(200)
        .json({ message: "Order updated successfully", updatedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const result = await orderService.deleteOrder(req.params.orderId, req.user);
    if (result) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};
