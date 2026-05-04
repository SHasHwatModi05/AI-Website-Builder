import Razorpay from "razorpay";

// WHY lazy init: In ES modules all `import` statements are hoisted and
// executed BEFORE any module body code runs — including dotenv.config().
// So `process.env.RAZORPAY_KEY_ID` is undefined at module load time.
// By deferring `new Razorpay()` to a getter function that is only called
// inside a route handler, we guarantee dotenv has already run.
let _instance = null;

export function getRazorpay() {
  if (!_instance) {
    _instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _instance;
}

