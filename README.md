# GenForge — AI Resume Generator & ATS Optimizer

> Transform raw career experience into executive, ATS-friendly resumes using Google Gemini AI. End-to-end PDF export, live preview, and strict anti-hallucination resume tailoring.

---

## 🚀 Overview & Problem Statement

Job seekers often struggle to translate their raw work experience into compelling, action-oriented resume bullet points that satisfy Applicant Tracking Systems (ATS). Existing tools either invent fake achievements (hallucination) or lock formatted PDF downloads behind paywalls.

**GenForge** solves this problem by providing a fast, secure, local-first web application that utilizes Google Gemini API to structure, refine, and optimize resumes against specific target job descriptions while guaranteeing strict factual integrity.

---

## ✨ Key Features

- 📄 **6-Step Guided Resume Builder**: Personal info, Target job, Experience, Education, Skills, and Projects/Certifications.
- 🤖 **Server-Side Gemini AI Engine (`/api/generate-resume`)**: Tailors summary and bullet points while keeping `GEMINI_API_KEY` secure.
- 🛡️ **Anti-Hallucination Guardrails**: Strictly enhances verbs and grammar without inventing fake percentages, metrics, or technologies.
- 🎯 **Real-time ATS Compatibility Analyzer**: Scores resume match out of 100, lists matched vs missing keywords, and recommends improvement tips.
- 📄 **Client-Side PDF Generation (`@react-pdf/renderer`)**: Instant high-quality PDF downloads with crisp ATS single-column formatting.
- 💾 **LocalStorage Autosave & Demo Mode**: Never lose progress on page refresh. "Try Sample Resume" button for instant testing.
- 🌗 **Dark / Light UI Theme**: Sleek modern interface with responsive mobile editor and live preview views.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **PDF Engine**: `@react-pdf/renderer`
- **Icons**: `lucide-react`
- **Effects**: `canvas-confetti`

---

## 📋 Prerequisites & Local Setup

1. **Clone or Download the Repository**
2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

1. Push code to GitHub repository.
2. Import project into Vercel Dashboard.
3. In Project Settings -> Environment Variables, add:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL`
4. Click **Deploy**. Vercel will automatically build the Next.js App Router app.

---

## 📂 Project Structure

```text
app/
  page.tsx                  # Main client workspace & state orchestrator
  layout.tsx                # Root layout, fonts, metadata
  globals.css               # Tailwind CSS base rules
  api/
    generate-resume/
      route.ts              # Server-side Gemini API endpoint

components/
  ui/
    Header.tsx              # Top bar, theme toggle, sample data, clear modal
  form/
    StepNavigation.tsx      # 6-step progress bar wizard
    PersonalForm.tsx        # Step 1 contact details
    TargetJobForm.tsx       # Step 2 target role & job description
    ExperienceForm.tsx      # Step 3 dynamic experience list & bullets
    EducationForm.tsx       # Step 4 academic degrees
    SkillsForm.tsx          # Step 5 tag badge skills editor
    AdditionalForm.tsx       # Step 6 projects, certs, achievements
  ats/
    ATSPanel.tsx            # ATS score wheel, matched/missing keywords
  preview/
    LivePreview.tsx         # Real-time single-column ATS resume preview
    ResumePDFDocument.tsx   # React-PDF document definition
    PDFExportButton.tsx     # Client-side PDF export button
  ai/
    AILoadingModal.tsx      # Animated AI processing phases
    AIReviewModal.tsx       # Interactive AI diff & review modal

lib/
  gemini.ts                 # Server Gemini SDK & anti-hallucination prompts
  resume-schema.ts          # Initial resume data schemas
  sample-data.ts            # Fictional candidate dataset for demo mode
  storage.ts                # LocalStorage persistence helpers
  validation.ts             # Step form validation rules

types/
  resume.ts                 # TypeScript data contracts

.env.example                # Template for environment variables
README.md                   # Project documentation
ARCHITECTURE.md             # Architecture overview & diagrams
```

---

## 🔮 Future Improvements

- Custom ATS resume templates (Modern, Minimal, Executive).
- Multiple language resume generation.
- One-click LinkedIn import integration.
