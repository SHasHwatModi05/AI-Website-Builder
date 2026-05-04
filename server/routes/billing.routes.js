import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { billing } from "../controllers/billing.controller.js";
import { verifyPayment } from "../controllers/razorpayVerify.controller.js";

const billingRouter = express.Router();

billingRouter.post("/", isAuth, billing);           // Create Razorpay order
billingRouter.post("/verify", isAuth, verifyPayment); // Verify payment signature

export default billingRouter;