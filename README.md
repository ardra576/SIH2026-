# SKILLBRIDGE AI

> **"Learn Smarter. Identify Skills. Grow Faster."**  
> *AI-Powered Personalized Learning and Competency Intelligence Platform*  
> **Smart India Hackathon 2026**

---

## 🌟 Project Overview

**SkillBridge AI** is an intelligent educational and competency assessment platform engineered to solve the SIH 2026 problem statement: *"AI enabled learning platform"*.

The platform continuously drives a 5-step competency growth cycle:
```
PROFILE  ──►  ASSESS  ──►  ANALYZE  ──►  PERSONALIZE  ──►  REASSESS
```

Alongside a multimodal learning material processing pipeline:
```
UPLOAD MATERIAL (PDF/PPTX/Notes)
      │
      ▼
AI PROCESSING & CONCEPT EXTRACTION
      │
      ▼
CONTEXTUAL MCQ / QUIZ GENERATION
      │
      ▼
INSTANT EVALUATION & DETAILED EXPLANATIONS
      │
      ▼
PROGRESS & COMPETENCY VELOCITY TRACKING
```

---

## 🚀 Key Features

1. **Learner Profiling & Onboarding**: Lightweight profile onboarding with credentials, career track, and technical & soft skills taxonomy.
2. **AI Competency Assessment**: Diagnostic examinations with customized difficulty levels (Beginner, Medium, Hard) that dynamically recalibrate competency metrics.
3. **Skill-Gap Diagnostic Analysis**: Tri-level segmentation (**Strong** ≥70%, **Moderate** 50–69%, and **Critical Gaps** <50%) paired with dynamic AI strategic insights.
4. **Personalized Learning Pathways**: Algorithmic curriculum recommendations directly mapped to detected deficiencies.
5. **Multimodal Material Ingestion**:
   - **PDFs**: Full text parsing via `pdf-parse`
   - **PPTX Slide Decks**: Pure JavaScript slide XML extraction via `adm-zip`
   - **Lecture Notes & Markdown**: Direct semantic processing
   - **Web URLs**: Online reference material capture
6. **Automated Concept Extraction**: Scans materials for structural headings, key themes, and high-frequency terminology.
7. **Robust AI Quiz Generator (Core SIH Feature)**:
   - Built with strict schema validation (`cleanAIJsonResponse`)
   - Guarantees 4 distinct options, verified 0-based answer indices, and pedagogical rationale
   - Resilient against Markdown code fences and formatting anomalies
   - Interactive single-question stepper with progress indicators
8. **Automated Quiz Grading & Scorecards**: Instant calculation of correct/wrong answers, performance badges, and option explanations.
9. **Before-vs-Current Progress Tracking**: Longitudinal delta analysis (`+27% Improvement`) with unlockable milestone badges.
10. **Dual Mode / SIH Demo Mode**: Operates seamlessly with the live **Google Gemini API** or completely offline with high-quality fallback demo data for fail-safe judging demonstrations.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18
  - Vite
  - React Router DOM v6
  - Lucide React (modern icon suite)
  - Custom Vanilla CSS Design System (Deep Navy, glassmorphism, responsive CSS grid/flexbox)
- **Backend**:
  - Node.js (v18+)
  - Express.js
  - Multer (memory-buffered multipart uploads)
  - `pdf-parse` (PDF extraction)
  - `adm-zip` (PPTX slide XML extraction)
  - CORS, Dotenv
- **Artificial Intelligence**:
  - Google Gemini API (`gemini-1.5-flash` / `gemini-2.0-flash`)
  - Strict JSON schema enforcement with automated 1-time fallback retry

---

## 📁 Project Architecture

```
skillbridge-ai/
├── package.json                 # Root monorepo configuration
├── run-dev.js                   # Cross-platform concurrent dev runner
├── .env.example                 # Environment configuration template
├── .gitignore
├── README.md
│
├── server/                      # Express Backend
│   ├── server.js                # Express entry point & middleware
│   ├── package.json
│   ├── routes/
│   │   ├── health.js            # GET /api/health
│   │   ├── materials.js         # POST /api/process-material
│   │   ├── quiz.js              # POST /api/generate-quiz, /api/evaluate-quiz
│   │   ├── assessment.js        # POST /api/generate-assessment
│   │   └── analysis.js          # POST /api/analyze-skills, /api/recommend-learning
│   ├── services/
│   │   ├── geminiService.js     # Gemini REST API caller with retry logic
│   │   └── materialParser.js    # PDF & PPTX text & topic extractor
│   ├── utils/
│   │   ├── jsonCleaner.js       # cleanAIJsonResponse schema validator
│   │   └── demoData.js          # SIH demo & fallback datasets
│   └── uploads/
│
└── client/                      # React + Vite Frontend
    ├── index.html               # Entry HTML with Outfit/Inter typography
    ├── package.json
    ├── vite.config.js           # Vite dev server with /api proxy
    └── src/
        ├── index.css            # Deep Navy glassmorphic design system
        ├── main.jsx
        ├── App.jsx              # Routes & navigation shell
        ├── components/          # Navbar, Sidebar, StatCard, SkillMeter, Toast, etc.
        ├── pages/               # Landing, Setup, Dashboard, Assessment, Quiz, etc.
        ├── services/api.js      # Client API client with fail-safe error handling
        ├── utils/storage.js     # Synchronous LocalStorage manager
        └── data/initialState.js # Realistic SIH student demo profile
```

---

## ⚡ Quick Start & Installation

### 1. Install All Dependencies

From the root directory:
```bash
npm run install:all
```
*(Or install separately: `npm install` in root, `cd server && npm install`, `cd ../client && npm install`)*

### 2. Environment Configuration (Optional)

Create a `.env` file in the root or `server/` directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: If you do not have a Gemini API key yet, **leave it blank**. SkillBridge AI will automatically activate **Demo Mode** with realistic datasets.

### 3. Launch Development Server

Run both client and server concurrently:
```bash
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Service**: [http://localhost:3000](http://localhost:3000)
- **API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 🛡️ SIH Demo Mode vs. Live AI Mode

| Capability | Live AI Mode (`GEMINI_API_KEY`) | Demo Mode (Offline / No Key) |
| :--- | :--- | :--- |
| **Status Indicator** | Emerald "Live Gemini AI" badge | Violet "Demo Mode Active" badge |
| **Material Upload** | Real PDF/PPTX text & concept extraction | Real PDF/PPTX text & concept extraction |
| **Quiz Generation** | Live Gemini flash model with strict JSON cleaning | Realistic curated topic question bank |
| **Competency Assessment**| Dynamic Gemini test questions | Comprehensive multi-competency exam bank |
| **Skill Gap Insights** | Generative AI executive analysis | Synthetic diagnostic insight generator |
| **Stability** | 100% fail-safe (retries & falls back on error) | 100% offline resilient, zero crash guarantee |

---

## 🔧 Troubleshooting

- **Port already in use**: Change `PORT=3001` in `server/.env` or kill processes holding port 3000 or 5173.
- **Vite API connection**: The frontend Vite configuration proxies `/api` to `http://localhost:3000`. Ensure the backend is running.
- **Clear Demo Data**: Click **Settings** in the sidebar and select **"Clear Demo Data & Reset Application"** to restore factory presets.
