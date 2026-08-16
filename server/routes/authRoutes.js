import express from "express";
import { OAuth2Client } from "google-auth-library";
import { connectToDatabase } from "../lib/mongodb.js";
import User from "../models/User.js";

const router = express.Router();
const oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Verify a Google ID token sent from the frontend GSI SDK ───────────────
router.post("/auth/google/verify", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, error: "Missing credential token" });
    }

    // Verify token with Google
    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: image } = payload;

    // Upsert user in MongoDB
    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(503).json({ success: false, error: "Database unavailable" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name: name || "User", email, image: image || "", googleId });
      console.log(`✅ Registered NEW Google user: ${user.email}`);
    } else {
      console.log(`✅ Returning Google user: ${user.email}`);
    }

    return res.json({ success: true, user: { name: user.name, email: user.email, image: user.image } });
  } catch (error) {
    console.error("Google token verification error:", error.message);
    return res.status(401).json({ success: false, error: "Invalid Google token" });
  }
});

// ── Legacy: manual email/name registration ────────────────────────────────
router.post("/auth/google", async (req, res) => {
  try {
    const { name, email, image, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(503).json({ success: false, error: "Database unavailable" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name: name || "User", email, image: image || "", googleId: googleId || "" });
      console.log(`✅ Registered NEW user in MongoDB: ${user.email}`);
    } else {
      console.log(`✅ User already exists in MongoDB: ${user.email}`);
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Auth /api/auth/google Error:", error);
    return res.status(500).json({ success: false, error: "Authentication failed" });
  }
});

export default router;
