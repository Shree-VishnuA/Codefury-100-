import mongoose from "mongoose";

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not set in environment. Database operations disabled.");
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "AI_resume_builder",
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Successfully connected to MongoDB Atlas (Database: AI_resume_builder)!");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    return null;
  }
}
