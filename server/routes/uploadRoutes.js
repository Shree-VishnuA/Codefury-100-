import express from "express";
import multer from "multer";
import { createRequire } from "module";
import { extractResumeDataWithGemini, improveExistingResumeWithGemini } from "../lib/gemini.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/extract-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded." });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ success: false, error: "Only PDF files are supported currently." });
    }

    // Parse the PDF
    const pdfData = await pdfParse(req.file.buffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Could not extract text from the PDF." });
    }

    // Extract structured data using Gemini
    const extractedData = await extractResumeDataWithGemini(rawText);

    res.json({ success: true, data: extractedData });
  } catch (error) {
    console.error("Error extracting resume data:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to process the uploaded resume." });
  }
});

router.post("/improve-resume", upload.single("resume"), async (req, res) => {
  try {
    let rawText = req.body.resumeText || "";
    const targetRole = req.body.targetRole || "";
    const jobDescription = req.body.jobDescription || "";

    if (!rawText && req.file) {
      if (req.file.mimetype === "application/pdf") {
        const pdfData = await pdfParse(req.file.buffer);
        rawText = pdfData.text;
      } else {
        rawText = req.file.buffer.toString("utf-8"); // Assume txt
      }
    }

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Could not extract text from the uploaded file." });
    }

    const improvedData = await improveExistingResumeWithGemini(rawText, targetRole, jobDescription);

    res.json({ success: true, data: improvedData });
  } catch (error) {
    console.error("Error improving resume:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to improve the resume." });
  }
});

export default router;
