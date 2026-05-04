import { PLANS } from "../config/plan.js";
import Razorpay from "razorpay";

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;
    const plan = PLANS[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({ message: "Invalid paid plan" });
    }

    // Initialize inside the function — env vars are guaranteed loaded by now
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: plan.price * 100,
      currency: "INR",
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        credits: plan.credits,
        plan: plan.plan,
      },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      planType,
      userId: userId.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Billing error: ${error}` });
  }
};