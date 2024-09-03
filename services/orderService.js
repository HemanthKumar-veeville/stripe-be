const { Order, Deal, User } = require("../models");

exports.createOrder = async (orderData, user) => {
  const userDetails = await User.findOne({ where: { id: user.id } });

  try {
    const { dealId, amount, isPaid, paymentMethodId, userId } = orderData;

    // Check if the deal exists
    const deal = await Deal.findOne({ where: { id: dealId } });
    if (!deal) {
      throw new Error("Deal not found");
    }

    // Create the order in the database without payment-related logic
    const order = await Order.create({
      amount,
      isPaid,
      dealId,
      customerId: userDetails.stripeCustomerId,
      paymentMethodId,
      dealId,
      userId,
    });

    return order;
  } catch (err) {
    console.error("Error in createOrder:", err.message);
    throw new Error("Failed to create order: " + err.message);
  }
};

// Other service methods...

exports.getOrders = async (dealId, user) => {
  try {
    const orders = await Order.findAll({ where: { dealId } });
    return orders;
  } catch (err) {
    console.error("Error in getOrders:", err.message);
    throw new Error("Failed to fetch orders: " + err.message);
  }
};

exports.getMyOrders = async (user) => {
  try {
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          attributes: ["name"], // Assuming 'name' is the field you want to include
        },
        {
          model: Deal,
          attributes: ["name", "id"], // Assuming 'name' is the field you want to include
        },
      ],
    });
    return orders;
  } catch (err) {
    console.error("Error in getAllOrders:", err.message);
    throw new Error("Failed to fetch orders: " + err.message);
  }
};

exports.getAllOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["name"], // Assuming 'name' is the field you want to include
        },
        {
          model: Deal,
          attributes: ["name"], // Assuming 'name' is the field you want to include
        },
      ],
    });
    return orders;
  } catch (err) {
    console.error("Error in getAllOrders:", err.message);
    throw new Error("Failed to fetch orders: " + err.message);
  }
};

exports.getOrderById = async (orderId, user) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId, customerId: user.id },
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (err) {
    console.error("Error in getOrderById:", err.message);
    throw new Error("Failed to fetch order: " + err.message);
  }
};

exports.updateOrder = async (orderId, orderData, user) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId, customerId: user.id },
    });
    if (!order) {
      throw new Error("Order not found");
    }

    await order.update(orderData);
    return order;
  } catch (err) {
    console.error("Error in updateOrder:", err.message);
    throw new Error("Failed to update order: " + err.message);
  }
};

exports.deleteOrder = async (orderId, user) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId, customerId: user.id },
    });
    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
    return true;
  } catch (err) {
    console.error("Error in deleteOrder:", err.message);
    throw new Error("Failed to delete order: " + err.message);
  }
};
