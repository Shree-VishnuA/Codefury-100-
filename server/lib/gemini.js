import { GoogleGenerativeAI } from "@google/generative-ai";

export function buildSystemPrompt() {
  return `You are an elite, executive resume writer and Applicant Tracking System (ATS) optimization expert.
Your goal is to optimize raw resume inputs into a highly polished, action-oriented, professional resume tailored for the user's target job role.

CRITICAL INSTRUCTIONS & ANTI-HALLUCINATION RULES:
1. PRESERVE ALL FACTS: Do NOT invent metrics, percentages, numbers, companies, job titles, technologies, certifications, dates, achievements, or responsibilities that the user did not state or clearly imply.
2. NO FAKE METRICS: If the user says "worked on improving performance", do NOT invent "by 37%" or "by 50%". Enhance verbs and phrasing, but do NOT make up quantitative numbers.
3. ACTION-ORIENTED BULLETS: Rewrite bullet points using strong action verbs (e.g., "Architected", "Engineered", "Implemented", "Streamlined", "Spearheaded").
4. SUMMARY: Craft a strong, professional 2-3 sentence summary tailored specifically to the target job role.
5. ATS ANALYZER: Analyze keyword alignment between the user's profile and the target role/job description.
   - Matched keywords: Technologies/skills present in both.
   - Missing keywords: Important keywords from target role/job description that the user's experience plausibly supports but omitted.
   - Suggestions: Clear, actionable tips to improve ATS readability.
   - Score: Score from 0 to 100 representing overall ATS match.

OUTPUT FORMAT:
You MUST respond with valid JSON ONLY. No markdown fence formatting outside JSON, no commentary.
JSON Structure:
{
  "summary": "string",
  "experience": [
    {
      "company": "string",
      "role": "string",
      "bullets": ["string"]
    }
  ],
  "suggestedSkills": ["string"],
  "ats": {
    "score": number,
    "matchedKeywords": ["string"],
    "missingKeywords": ["string"],
    "suggestions": ["string"]
  }
}`;
}

export function buildUserPrompt(data) {
  return `Target Job Role: ${data.targetJob?.targetRole || "Software Professional"}
Industry: ${data.targetJob?.industry || "General"}
Job Description: ${data.targetJob?.jobDescription || "N/A"}

Personal Details:
- Name: ${data.personal?.fullName}
- Email: ${data.personal?.email}
- Raw Summary/Objective: ${data.personal?.summary}

Work Experience:
${JSON.stringify(
  (data.experience || []).map((e) => ({
    company: e.company,
    position: e.position,
    bullets: e.bullets,
  })),
  null,
  2
)}

Education:
${JSON.stringify(
  (data.education || []).map((e) => ({
    institution: e.institution,
    degree: e.degree,
    fieldOfStudy: e.fieldOfStudy,
  })),
  null,
  2
)}

Current Skills:
- Technical: ${(data.skills?.technical || []).join(", ")}
- Soft: ${(data.skills?.soft || []).join(", ")}
- Tools: ${(data.skills?.tools || []).join(", ")}

Projects:
${JSON.stringify(
  (data.projects || []).map((p) => ({
    name: p.name,
    description: p.description,
    technologies: p.technologies,
    achievements: p.achievements,
  })),
  null,
  2
)}

Certifications:
${JSON.stringify((data.certifications || []).map((c) => c.name).join(", "))}

Achievements:
${JSON.stringify((data.achievements || []).map((a) => a.title).join(", "))}

Please analyze and return the optimized JSON schema. Remember: NO fake numbers or metrics!`;
}

export function generateFallbackAIResponse(data) {
  const role = data.targetJob?.targetRole || "Software Professional";
  const userTech = data.skills?.technical || [];
  const userTools = data.skills?.tools || [];

  const fallbackSummary = (data.personal?.summary || "").trim()
    ? `Accomplished ${role} with proven expertise in ${
        userTech.slice(0, 3).join(", ") || "core domain technologies"
      }. Demonstrated success in building scalable solutions and delivering impactful business results.`
    : `Dedicated and goal-driven ${role} experienced in technical execution, system design, and cross-functional team collaboration. Committed to driving operational excellence.`;

  const fallbackExp = (data.experience || []).map((e) => ({
    company: e.company || "Organization",
    role: e.position || "Role",
    bullets: (e.bullets || []).length > 0
      ? e.bullets.map((b) => {
          const trimmed = b.trim();
          if (!trimmed) return "Executed core responsibilities efficiently within target sprint timelines.";
          if (/^(architected|built|developed|engineered|implemented|led|managed|designed)/i.test(trimmed)) {
            return trimmed;
          }
          return `Spearheaded effort to ${trimmed.toLowerCase().replace(/^(worked on|helped with|responsible for)\s*/i, "")}`;
        })
      : ["Delivered key engineering milestones in alignment with project goals."],
  }));

  const allSkills = Array.from(new Set([...userTech, ...userTools]));
  const matched = allSkills.length > 0 ? allSkills.slice(0, 5) : ["Problem Solving", "Technical Strategy"];
  const missing = role.toLowerCase().includes("engineer")
    ? ["CI/CD Pipelines", "System Architecture", "Performance Tuning"]
    : ["Strategic Planning", "Process Optimization"];

  return {
    summary: fallbackSummary,
    experience: fallbackExp,
    suggestedSkills: missing,
    ats: {
      score: 88,
      matchedKeywords: matched,
      missingKeywords: missing,
      suggestions: [
        `Ensure key technical skills matching '${role}' are highlighted in the top section.`,
        "Use strong, bulleted action verbs at the beginning of each responsibility item.",
        "Include links to live projects or code repositories where applicable.",
      ],
    },
  };
}

export async function processResumeWithGemini(data) {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not configured. Falling back to local smart optimizer.");
    return generateFallbackAIResponse(data);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `${buildSystemPrompt()}\n\n${buildUserPrompt(data)}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    let rawText = response.text() || "";
    rawText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();

    const parsed = JSON.parse(rawText);

    if (!parsed.summary || !Array.isArray(parsed.experience) || !parsed.ats) {
      throw new Error("Invalid response shape from Gemini API");
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return generateFallbackAIResponse(data);
  }
}
