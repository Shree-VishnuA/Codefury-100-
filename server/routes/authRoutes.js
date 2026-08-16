import express from "express";
import { OAuth2Client } from "google-auth-library";
import { connectToDatabase } from "../lib/mongodb.js";
import User from "../models/User.js";

const router = express.Router();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "81774566095-e3grg9guvd5f0frjjo5em3bqgido2pp9.apps.googleusercontent.com";
const oauthClient = new OAuth2Client(CLIENT_ID);

router.post("/auth/google/verify", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, error: "Missing credential token" });
    }

    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: image } = payload;

    const userObj = { name: name || "User", email, image: image || "" };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ name: name || "User", email, image: image || "", googleId });
          console.log(`✅ Registered NEW Google user: ${user.email}`);
        } else {
          console.log(`✅ Returning Google user: ${user.email}`);
        }
      }
    } catch (dbErr) {
      console.warn("⚠️ MongoDB offline or unreachable, proceeding with verified Google token:", dbErr.message);
    }

    return res.json({ success: true, user: userObj });
  } catch (error) {
    console.error("Google token verification error:", error.message);
    return res.status(401).json({ success: false, error: "Invalid Google token" });
  }
});

router.post("/auth/google", async (req, res) => {
  try {
    const { name, email, image, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const userObj = { name: name || "User", email, image: image || "" };

    try {
      const conn = await connectToDatabase();
      if (conn) {
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ name: name || "User", email, image: image || "", googleId: googleId || "" });
          console.log(`✅ Registered NEW user in MongoDB: ${user.email}`);
        } else {
          console.log(`✅ User already exists in MongoDB: ${user.email}`);
        }
      }
    } catch (dbErr) {
      console.warn("⚠️ MongoDB offline, returning user session:", dbErr.message);
    }

    return res.json({ success: true, user: userObj });
  } catch (error) {
    console.error("Auth /api/auth/google Error:", error);
    return res.status(500).json({ success: false, error: "Authentication failed" });
  }
});

export default router;
