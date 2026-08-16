import express from "express";
import { processResumeWithGemini } from "../lib/gemini.js";
import { connectToDatabase } from "../lib/mongodb.js";
import Resume from "../models/Resume.js";

const router = express.Router();

// Generate & Optimize Resume with Gemini AI
router.post("/generate-resume", async (req, res) => {
  try {
    const body = req.body || {};
    const safePayload = {
      ...body,
      personal: {
        fullName: body.personal?.fullName || "Candidate",
        email: body.personal?.email || "candidate@example.com",
        summary: body.personal?.summary || "",
        ...body.personal,
      },
      targetJob: {
        targetRole: body.targetJob?.targetRole || "Software Professional",
        industry: body.targetJob?.industry || "Technology",
        ...body.targetJob,
      },
    };

    const aiResult = await processResumeWithGemini(safePayload);
    return res.json({ success: true, data: aiResult });
  } catch (error) {
    console.error("API /api/generate-resume Error:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error during resume optimization",
    });
  }
});

// GET saved user resume
router.get("/resumes", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] || req.query.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: User ID required" });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(503).json({ success: false, error: "Database unavailable" });
    }

    const resume = await Resume.findOne({ userId }).sort({ updatedAt: -1 });
    return res.json({ success: true, data: resume || null });
  } catch (error) {
    console.error("GET /api/resumes Error:", error);
    return res.status(500).json({ success: false, error: "Database operation failed" });
  }
});

// POST / Save/Update user resume
router.post("/resumes", async (req, res) => {
  try {
    const body = req.body;
    const userId = req.headers["x-user-id"] || body.userId || body.personal?.email;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: User ID required" });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(503).json({ success: false, error: "Database connection failed" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { userId },
      {
        userId,
        personal: body.personal || {},
        targetJob: body.targetJob || {},
        experience: body.experience || [],
        education: body.education || [],
        skills: body.skills || {},
        projects: body.projects || [],
        certifications: body.certifications || [],
        achievements: body.achievements || [],
        atsScore: body.atsScore || 0,
        atsAnalysis: body.atsAnalysis || null,
      },
      { upsert: true, returnDocument: "after" }
    );

    console.log(`✅ Saved resume data to MongoDB for user: ${userId}`);
    return res.json({ success: true, data: updatedResume });
  } catch (error) {
    console.error("POST /api/resumes Error:", error);
    return res.status(500).json({ success: false, error: "Failed to save resume to MongoDB" });
  }
});

export default router;
