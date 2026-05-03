import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe"

// Initialise Stripe only when a real secret key is provided.
// If payments are not configured, stripe is null and billing routes
// will return a 503 instead of crashing the whole server on startup.
const stripe = process.env.STRIPE_SECRET_KEY &&
               !process.env.STRIPE_SECRET_KEY.includes("placeholder")
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default stripe;