import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.routes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";

const app = express();

// ─── Stripe webhook MUST come before express.json() ───────────────────────────
// Stripe requires the raw request body to validate the webhook signature.
// If express.json() runs first, the body is parsed and the signature check fails.
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ─── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── CORS configuration ───────────────────────────────────────────────────────
// WHY: Credentials (httpOnly cookies) require an explicit origin echo-back.
// The "*" wildcard is forbidden when credentials:true, so we use a whitelist.
const corsOptions = {
  origin: function (origin, callback) {
    // WHY: `origin` is undefined for same-origin requests and server-to-server
    // calls (e.g. curl without -H "Origin"). We allow those through.
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "https://genwebai.online",       // production (apex)
      "https://www.genwebai.online",   // production (www)
    ];

    // Also permit any localhost port so local dev works without changing this file.
    const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);

    if (allowedOrigins.includes(origin) || isLocalhost) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true, // WHY: required so the browser sends/receives cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// WHY: Apply CORS middleware globally FIRST so every route, including the
// Stripe webhook, gets the right headers. The middleware also handles
// OPTIONS preflight internally — we do NOT need a separate app.options() call.
// (Express v5 broke app.options("*",...) because path-to-regexp v8 no longer
// accepts bare "*". Using the cors() middleware directly avoids that entirely.)
app.use(cors(corsOptions));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

// Health-check root
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
