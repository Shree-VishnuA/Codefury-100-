import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { connectToDatabase } from "./lib/mongodb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from server/ directory so it works both locally and on Vercel
dotenv.config({ path: path.join(__dirname, ".env") });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Connect DB on startup
connectToDatabase();

// API Routes
app.use("/api", resumeRoutes);
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Legible Express Backend", timestamp: new Date() });
});

// Serve frontend static build files from client/dist if available
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.status(404).send("Legible API Backend is running. Frontend dev server is on http://localhost:5173");
    }
  });
});

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  if (req.path.startsWith("/api")) {
    res.status(err.status || 500).json({ success: false, error: err.message || "An unexpected server error occurred." });
  } else {
    next(err);
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Legible Express Server running on http://localhost:${PORT}`);
  });
}

export default app;
