# GenForge - Executive AI Resume Generator & ATS Optimizer

> Built for **CodeFury 9.0**. Transform raw career experience into executive, ATS-optimized single-column resumes using Google Gemini AI, featuring a minimal technical editorial design system, live preview, Google OAuth, MongoDB cloud persistence, and vector PDF exports.

---

## 📄 Overview & Key Capabilities

**GenForge** is a full-stack web platform engineered to eliminate resume rejection by Applicant Tracking Systems (ATS). It translates raw project descriptions, job histories, and skill lists into high-impact, ATS-formatted resumes while guaranteeing strict factual integrity (zero hallucination).

### Key Features
- 🎨 **Minimal Editorial Design System**: Tailored theme using IBM Plex Mono & IBM Plex Sans, crisp monochrome borders, and high-contrast redline (`#B3402B`) accents.
- ⚡ **Build from Scratch Mode**: Interactive 6-step guided wizard for Personal Info, Target Job, Experience, Education, Skills, and Projects/Honors.
- 🚀 **Improve Existing Resume Mode**: Upload PDF, Word (`.docx`), or plain text (`.txt`) files for automated AI extraction, rewriting, and enhancement.
- 🤖 **Google Gemini AI Optimization**: Server-side Gemini AI engine (`/api/generate-resume` & `/api/improve-resume`) for role-tailored summaries and bullet point rewrites.
- 🎯 **Real-time ATS Compatibility Analyzer**: Match score out of 100 with matched vs missing skill keywords and actionable optimization suggestions.
- 🔗 **Clickable Portfolio & Project Links**: Full support for both GitHub and Live demo links with clickable hyperlinking in PDF exports.
- 🔒 **Google OAuth & User Authentication**: Seamless sign-in via Google Identity Services (GSI) with automatic user session synchronization.
- 💾 **MongoDB Cloud Persistence & Local Fallback**: Auto-syncs resume data to MongoDB Atlas when logged in, with seamless localStorage fallback for offline editing.
- 📄 **100% Client-Side PDF Generation**: Single-column ATS vector PDF download via `@react-pdf/renderer`.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS + Tailwind CSS (Custom Design Tokens)
- **Typography**: IBM Plex Mono & IBM Plex Sans (Google Fonts)
- **Icons**: Lucide React
- **PDF Engine**: `@react-pdf/renderer`
- **Animations**: Framer Motion & Canvas Confetti

### Backend
- **Runtime**: Node.js + Express (Module / ES imports)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: Google Auth Library (`google-auth-library`) & JWT Verification
- **File Processing**: `multer` & `pdf-parse`

### Deployment
- **Platform**: Vercel (Serverless Functions for `/api/*` + Static Vite Bundle)

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js 18+ and `npm` installed.
- A Google Gemini API Key.
- Optional: MongoDB Atlas URI.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shree-VishnuA/Codefury-100-.git
   cd Codefury-100-
   ```

2. **Install Root Dependencies**:
   ```bash
   npm install
   ```

3. **Install Client & Server Dependencies**:
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=your_mongodb_atlas_connection_string
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

5. **Start Development Servers**:
   Run both frontend and backend concurrently from root:
   ```bash
   npm run dev
   ```
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000

---

## 🚢 Deploying to Vercel

The project includes a pre-configured `vercel.json` and serverless API entrypoint (`api/index.js`).

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Import your repository into [Vercel](https://vercel.com).
3. In Vercel Project Settings -> **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
   - `GOOGLE_CLIENT_ID`
4. Click **Deploy**. Vercel will automatically build the React Vite frontend and serverless Express API.

---

## 📂 Repository Structure

```text
├── api/
│   └── index.js              # Vercel serverless Express entrypoint
├── client/                   # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/           # AI Review & Loading Modals
│   │   │   ├── ats/          # ATS Readiness Compatibility Panel
│   │   │   ├── auth/         # Google OAuth & Email Sign-in Modal
│   │   │   ├── form/         # Step-by-step form wizards (Personal, Experience, Projects...)
│   │   │   ├── landing/      # Landing Page with Editorial Design System
│   │   │   ├── preview/      # Live Preview & React-PDF Canvas Document
│   │   │   ├── resume/       # Resume Improver & PDF Drag-and-Drop Uploader
│   │   │   └── ui/           # Header, Sidebar, Card, Button, Input, Tabs primitives
│   │   ├── lib/              # Resume schemas, sample data, and local storage helpers
│   │   ├── App.jsx           # Main workspace application shell
│   │   └── index.css         # Global styles, fonts, & CSS design tokens
│   └── package.json
├── server/                   # Express Node.js Backend
│   ├── lib/                  # Gemini AI prompts & MongoDB connection manager
│   ├── models/               # User & Resume Mongoose models
│   ├── routes/               # Express API routes (AI, Auth, Resumes, Uploads)
│   ├── index.js              # Express app server entrypoint
│   └── package.json
├── vercel.json               # Vercel monorepo deployment config
└── package.json              # Root npm workspace script runner
```

---

## 📜 License & Credits

Built for **CodeFury 9.0**. Code released under the MIT License.
