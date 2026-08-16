import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, default: "My Legible Resume" },
    personal: { type: Object, default: {} },
    targetJob: { type: Object, default: {} },
    experience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    skills: { type: Object, default: {} },
    projects: { type: Array, default: [] },
    certifications: { type: Array, default: [] },
    achievements: { type: Array, default: [] },
    atsScore: { type: Number, default: 0 },
    atsAnalysis: { type: Object, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
