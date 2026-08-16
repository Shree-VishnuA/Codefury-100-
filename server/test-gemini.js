import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + process.env.GEMINI_API_KEY);
    const data = await res.json();
    console.log("Models:", data.models?.map(m => m.name).join(", "));
  } catch (err) {
    console.error(err);
  }
}
test();
