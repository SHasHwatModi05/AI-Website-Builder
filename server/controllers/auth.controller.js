import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

// ─── Helper: lazy Firebase Admin initialisation ───────────────────────────────
// WHY: Initialised on first request, not at module load time.
// ES modules hoist all imports and run leaf modules (this file) BEFORE
// dotenv.config() in index.js, so process.env is empty at module level.
function ensureFirebaseInitialised() {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

// ─── Google Auth ──────────────────────────────────────────────────────────────
export const googleAuth = async (req, res) => {
  try {
    ensureFirebaseInitialised();

    const { idToken } = req.body;

    // WHY: We MUST verify the token server-side. Trusting client-sent name/email
    // without verification would let anyone impersonate any user.
    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    // Throws if the token is invalid, expired, or from the wrong Firebase project.
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name, picture } = decoded;

    // Upsert: create user on first login, update avatar on subsequent logins.
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar: picture });
    } else {
      user.avatar = picture;
      await user.save();
    }

    // Sign our own JWT — this is what lives in the httpOnly cookie.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // WHY cookie flags:
    //   httpOnly: true  — JS cannot read it (XSS protection)
    //   secure:   true  — only sent over HTTPS (required for sameSite:"None")
    //   sameSite: "None"— REQUIRED for cross-site cookies.
    //                     Frontend (genwebai.online) ≠ API (api.genwebai.online)
    //                     so the browser considers this cross-site.
    //                     "Lax" / "Strict" would silently drop the cookie.
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // must be true when sameSite is "None"
      sameSite: "None",      // capital N — case-sensitive in some environments
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("[googleAuth] error:", error);
    return res.status(401).json({ message: "Auth failed", error: error.message });
  }
};


// ─── Logout ───────────────────────────────────────────────────────────────────
export const logOut = async (req, res) => {
  try {
    // WHY: clearCookie flags must EXACTLY match the flags used when setting the
    // cookie, otherwise the browser won't remove it.
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error}` });
  }
};