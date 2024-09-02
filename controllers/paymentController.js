const paymentService = require("../services/paymentService");

exports.createSetupIntent = async (req, res) => {
  try {
    const { customerId, user } = req.body;
    const clientSecret = await paymentService.createSetupIntent({
      customerId,
      user,
    });
    res.status(200).json({ clientSecret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chargeSavedMethod = async (req, res) => {
  try {
    const { dealId } = req.body;
    const paymentIntent = await paymentService.chargeGroupFromOrders(dealId);
    console.log("Payment intent:", paymentIntent);
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
