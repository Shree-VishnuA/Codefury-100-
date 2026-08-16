import express from "express";
import { connectToDatabase } from "../lib/mongodb.js";
import User from "../models/User.js";

const router = express.Router();

// Register/Verify user on Google Auth login
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
      user = await User.create({
        name: name || "User",
        email,
        image: image || "",
        googleId: googleId || "",
      });
      console.log(`✅ Registered NEW user in MongoDB: ${user.email} (ID: ${user._id})`);
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
