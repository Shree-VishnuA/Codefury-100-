import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectToDatabase } from "./lib/mongodb.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "GenForge Express Backend", timestamp: new Date() });
});

// Serve frontend static build files from client/dist if available
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.status(404).send("GenForge API Backend is running. Frontend dev server is on http://localhost:5173");
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 GenForge Express Server running on http://localhost:${PORT}`);
});
