const Stripe = require("stripe");
const { stripeSecretKey } = require("../config/config");
const stripe = Stripe(stripeSecretKey);
const { User, Order } = require("../models");

exports.createSetupIntent = async ({ customerId, user }) => {
  try {
    // If customerId is null, create a new customer in Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email, // Assuming you have the user's email
        name: user.name, // Assuming you have the user's name
      });

      customerId = customer.id;

      // Update the user with the new customerId in your database
      await User.update(
        { stripeCustomerId: customerId },
        { where: { id: user.id } }
      );
    }

    console.log("customerId", customerId);
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card", "sepa_debit", "bancontact"], // "card" includes Cartes Bancaires
    });

    return setupIntent.client_secret;
  } catch (error) {
    console.error("Error creating setup intent:", error);
    throw new Error("Failed to create setup intent. Please try again later.");
  }
};

exports.chargeGroupFromOrders = async (dealId) => {
  try {
    // Retrieve all orders associated with the dealId
    const orders = await Order.findAll({
      where: { dealId },
    });
    console.log("Orders:", orders);

    for (const order of orders) {
      if (!order.paymentIntentId) {
        const { amount, customerId, paymentMethodId } = order;

        // Check if the payment method is attached to the correct customer
        let paymentMethod;
        try {
          paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
        } catch (err) {
          throw new Error("Failed to retrieve payment method: " + err.message);
        }

        // If the payment method is attached to a different customer, detach it
        if (paymentMethod.customer && paymentMethod.customer !== customerId) {
          try {
            await stripe.paymentMethods.detach(paymentMethodId);
          } catch (err) {
            throw new Error("Failed to detach payment method: " + err.message);
          }
        }

        // Attach the payment method to the current customer if not already attached
        if (!paymentMethod.customer || paymentMethod.customer !== customerId) {
          try {
            await stripe.paymentMethods.attach(paymentMethodId, {
              customer: customerId,
            });
          } catch (err) {
            throw new Error("Failed to attach payment method: " + err.message);
          }
        }

        // Define allowed payment method types based on the payment method used
        let paymentMethodTypes = ["card"];
        if (paymentMethod.type === "sepa_debit") {
          paymentMethodTypes = ["sepa_debit"];
        } else if (paymentMethod.type === "bancontact") {
          paymentMethodTypes = ["bancontact"];
        } else if (paymentMethod.type === "card") {
          paymentMethodTypes = ["card"]; // "card" includes Cartes Bancaires
        }

        // Create a payment intent with Stripe
        let paymentIntent;
        try {
          paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert amount to cents
            currency: "eur",
            customer: customerId,
            payment_method: paymentMethodId,
            payment_method_types: paymentMethodTypes, // Set allowed payment methods
            off_session: true,
            confirm: true,
            metadata: { orderId: order.id },
          });
        } catch (err) {
          throw new Error("Failed to create payment intent: " + err.message);
        }

        // Update the order with the payment status and paymentIntentId
        await order.update({
          isPaid: paymentIntent.status === "succeeded",
          paymentIntentId: paymentIntent.id,
          paymentIntent: paymentIntent,
        });
      }
    }
  } catch (err) {
    console.error("Error in chargeGroupFromOrders:", err.message);
    throw new Error("Failed to charge the group from orders: " + err.message);
  }
};

exports.updatePaymentStatusForAllOrders = async (dealId) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.findAll({
      where: { dealId },
    });

    for (const order of orders) {
      const { paymentIntentId } = order;

      let paymentIntent;
      try {
        // Retrieve the latest payment intent status from Stripe
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      } catch (err) {
        console.error(
          `Failed to retrieve payment intent for order ${order.id}: ${err.message}`
        );
        continue;
      }

      // Update the order with the latest payment intent and payment status
      await order.update({
        paymentIntent: paymentIntent,
        isPaid: paymentIntent.status === "succeeded",
      });

      console.log(
        `Order ${order.id} updated with payment status: ${paymentIntent.status}`
      );
    }

    console.log(
      "All orders have been checked and updated with the latest payment status."
    );
  } catch (err) {
    console.error("Error in updatePaymentStatusForAllOrders:", err.message);
    throw new Error("Failed to update payment status for all orders.");
  }
};
