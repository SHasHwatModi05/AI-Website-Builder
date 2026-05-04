import crypto from "crypto";
import User from "../models/user.model.js";
import { PLANS } from "../config/plan.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType,
      userId,
    } = req.body;

    // 1. Recreate the expected signature using HMAC-SHA256
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // 2. Compare with the signature Razorpay sent
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed: invalid signature" });
    }

    // 3. Signature is valid — update user credits & plan
    const plan = PLANS[planType];
    if (!plan) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { credits: plan.credits },
      plan: plan.plan,
    });

    return res.status(200).json({ message: "Payment verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Verification error: ${error}` });
  }
};
