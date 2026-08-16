# Architecture Documentation - Legible

## 1. System Architecture

Legible is built as a full-stack monorepo (Vite + React frontend, Express + Node.js backend) using a client-heavy, server-assisted architecture. All state is maintained locally on the client and autosaved to `localStorage`. Server interaction is strictly restricted to the `/api/generate-resume` and `/api/improve-resume` routes, protecting the `GEMINI_API_KEY` from browser exposure.

```mermaid
flowchart TD
    User([User Input / Editor]) -->|State Updates| State[Client State / LocalStorage]
    State -->|Structured JSON| API[/api/generate-resume API Route/]
    API -->|Prompt & Guardrails| Gemini[Google Gemini API]
    Gemini -->|Validated JSON Response| API
    API -->|AI Response + ATS Score| ReviewModal[AI Review Modal]
    ReviewModal -->|Accepted Changes| State
    State -->|Live Reactive Update| LivePreview[ATS Live Preview Component]
    State -->|Client-side Render| ReactPDF[@react-pdf/renderer]
    ReactPDF -->|Download| PDF[Exported ATS PDF File]
```

---

## 2. Core User Flow

1. **Information Input**: User enters details across 6 guided steps (Personal, Target Job, Experience, Education, Skills, Extras) or clicks **Try Sample Resume**.
2. **Autosave**: Every change is stored in `localStorage` (`legible_resume_data_v1`).
3. **AI Generation**: Clicking **Optimize with AI** sends normalized JSON to `/api/generate-resume`.
4. **AI Processing**: Server invokes Gemini API with anti-hallucination prompt guardrails.
5. **Interactive Review**: User reviews proposed AI summary, enhanced bullet points, and ATS analysis before accepting.
6. **Live Preview & Export**: The single-column ATS preview updates instantly. User clicks **Download PDF** for client-side generation.

---

## 3. Gemini Prompting Strategy & Anti-Hallucination Guardrails

Gemini is given strict system instructions to prevent fabrication:

```text
CRITICAL INSTRUCTIONS & ANTI-HALLUCINATION RULES:
1. PRESERVE ALL FACTS: Do NOT invent metrics, percentages, numbers, companies, job titles, technologies, certifications, dates, achievements, or responsibilities.
2. NO FAKE METRICS: If the user says "worked on improving performance", do NOT invent "by 37%".
3. ACTION-ORIENTED BULLETS: Rewrite bullet points using strong action verbs (e.g. Architected, Engineered, Implemented).
```

### JSON Schema Output Contract

Gemini returns structured JSON matching the application contract:

```json
{
  "summary": "Executive 2-3 line role-tailored summary",
  "experience": [
    {
      "company": "Company Name",
      "role": "Position Title",
      "bullets": ["Action-oriented enhanced bullet point 1"]
    }
  ],
  "suggestedSkills": ["Relevant Skill 1", "Relevant Skill 2"],
  "ats": {
    "score": 88,
    "matchedKeywords": ["TypeScript", "React"],
    "missingKeywords": ["Docker"],
    "suggestions": ["Include link to live demo"]
  }
}
```

---

## 4. ATS Analysis Approach

The ATS analyzer evaluates:
- **Matched Keywords**: Overlap between user experience/skills and the target job description.
- **Missing Keywords**: Plausible skills referenced in the job description that the user's background supports.
- **ATS Score**: Calculated score out of 100 based on keyword density and experience completeness.

---

## 5. Client-Side PDF Generation Strategy

`@react-pdf/renderer` renders PDFs directly in the browser via Web APIs:
- Prevents server-side canvas or puppeteer overhead.
- Utilizes standard `Helvetica` fonts guaranteeing ATS parser compatibility.
- Dynamically imported on the client to avoid SSR hydration mismatches.

---

## 6. Security & Privacy

- **API Key Protection**: `GEMINI_API_KEY` is loaded strictly via server environment variables.
- **Google OAuth**: User authentication via Google Identity Services with server-side JWT verification.
- **MongoDB Persistence**: Resume data synced to MongoDB Atlas when authenticated, with localStorage fallback.
- **Sanitized Inputs**: Form inputs are validated before sending to Gemini.
