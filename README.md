# FacultyAI Recruitment System

AI-enabled faculty recruitment platform for automated resume evaluation, technical assessment, psychometric screening, and administrative decision support.

## Dataset
https://drive.google.com/drive/folders/1ce5eOycBV3gvPSAyXLM8hvEdEAUD2Qmn?usp=sharing

## Psychometric and technical question
https://docs.google.com/spreadsheets/d/1awODGC7HHvRcsP8ZV2sbj5Ki363UA1i1/edit?usp=sharing&ouid=102664418869510839959&rtpof=true&sd=true

https://docs.google.com/spreadsheets/d/1G6a6SJgLDzLPdkw8Z3VzvaxDUWzOZ_9A/edit?usp=sharing&ouid=107113917061979164833&rtpof=true&sd=true

## Project Overview

FacultyAI Recruitment System solves the challenge of unbiased and scalable faculty candidate evaluation for academic hiring committees. It was developed to centralize recruitment tasks into a modern front-end application that combines resume parsing, department-specific technical testing, and psychometric profiling.

The project is built for university HR teams, department coordinators, hiring committees, and faculty applicants. It provides a guided candidate journey from online application submission through AI-assisted resume scoring and structured test workflows.

Core functionality includes PDF resume extraction, skill matching against department requirements, adaptive technical question loading, psychometric question delivery, and a results dashboard. The platform delivers business value by reducing manual screening, accelerating candidate shortlisting, and providing consistent evaluation across departments.

Technically, the application is a React + Vite front-end that leverages local browser storage, file parsing libraries, and algorithmic scoring. It demonstrates enterprise-quality UI patterns, state management with context providers, and analytics-driven reporting for recruitment decisions.

---

## Project Features

- **AI Resume Analysis**
  - Extracts text from uploaded PDF resumes.
  - Detects relevant skills and computes a resume-fit score.
  - Highlights missing skill categories for improvement.

- **Candidate Application Flow**
  - Collects candidate metadata: name, email, phone, department.
  - Supports secure PDF resume upload.
  - Onboards candidate into the recruitment workflow.

- **Technical Assessment**
  - Loads department-specific questions from `technical_questions.xlsx`

  - Allows subject selection and timed exam sections.
  - Auto-grades answers for immediate scoring.

- **Psychometric Evaluation**
  - Loads department-relevant questions from CSV- 'psychometric_questions.csv'
  - Measures personality and professional fit.
  - Calculates a psychometric score to complement technical results.

- **Results Generation**
  - Combines resume, technical, and psychometric scores.
  - Produces a weighted final score and recommendation flag.
  - Generates a downloadable PDF evaluation report.

- **Admin Dashboard**
  - Password-protected admin area.
  - Displays candidate history and ranking.
  - Visualizes scores with bar and pie charts.
  - Supports clearing candidate history.

- **Local Candidate Persistence**
  - Stores recruitment records in browser `localStorage`.
  - Preserves candidate history across sessions.

- **Responsive Navigation**
  - Uses React Router for page routing.
  - Mobile-friendly navigation menu.
  - Clear route structure for all user pages.

---

## Objectives

- **Primary objective**
  - Build an end-to-end digital recruitment workflow for faculty hiring with automated scoring and analytics.

- **Secondary objectives**
  - Demonstrate AI and data-driven candidate evaluation.
  - Provide a scalable front-end architecture with reusable components.
  - Enable smooth candidate progression from application to final results.

- **Expected outcomes**
  - Faster applicant screening.
  - Consistent shortlisting based on measurable criteria.
  - Transparent candidate performance reports.
  - Administrative visibility into hiring funnel metrics.

---

## Technologies Used

### Frontend
- **React 18**
  - Core UI framework for interactive page rendering.
- **Vite**
  - Fast build and development tooling.
- **React Router DOM**
  - Client-side routing for nested page navigation.
- **Tailwind CSS**
  - Utility-first styling for scalable layouts.
- **Framer Motion**
  - Smooth motion effects and page animations.
- **Radix UI**
  - Accessible primitives for form controls, dialogs, and menus.

### Backend
  - Candidate persistence is handled in-browser via `localStorage`.

### Database
- **Browser localStorage**
  - Candidate records and session metadata are stored locally.
  - No external database server is required.

### AI/ML Technologies
- **Text Extraction + Heuristic Scoring**
  - Uses `pdfjs-dist` for PDF parsing.
  - Applies skill detection and weighted scoring logic in `src/lib/resumeAnalyzer.ts`.
- **Domain-specific evaluation**
  - Maps required department skills to resume content.
  - Works as a lightweight AI-inspired recruiter assistant.

### Additional Libraries
- **`jspdf`**
  - Generates PDF evaluation reports for download.
- **`papaparse`**
  - Parses CSV psychometric question files.
- **`xlsx`**
  - Loads Excel-based technical questions.
- **`sonner`**
  - Notification and toast display library.
- **`recharts`**
  - Charting library for admin analytics.
- **`lucide-react`**
  - Icon library for UI affordances.
- **`react-hook-form`**
  - Form handling support in candidate workflows.
- **`@tanstack/react-query`**
  - Query client scaffolding for future data fetching.

---

## System Architecture
![Architecture](screenshots/Architecture.jpeg)
### Client Layer
- `src/App.tsx`
  - Top-level route definitions and providers.
- `src/pages/*`
  - User-facing screens and workflows.
- `src/components/*`
  - Navigation, route protection, UI primitives.

### Business Logic Layer
- `src/context/AuthContext.tsx`
  - Admin authentication and session state.
- `src/context/RecruitmentContext.tsx`
  - Candidate lifecycle management.
- `src/lib/*`
  - Resume analysis, question loaders, report generation.

### Data Layer
- `localStorage`
  - Candidate history persistence.
- `public/data/`
  - Static question assets loaded at runtime.

### External Services Layer
- `pdfjs-dist`
  - PDF parsing engine.
- Static file fetching via the browser.

#### Architecture Diagram

```
[ User Browser ] 
      |
      v
[ React UI Layer ]
      |
      v
[ Routing / Pages ]
      |
      v
[ Recruitment Context ]
      |
      +--> [ Resume Analyzer ]
      +--> [ Question Loader ]
      +--> [ PDF Report Generator ]
      |
      v
[ Browser Storage (localStorage) ]
      |
      v
[ Admin Dashboard Visualization ]
```

---

## Project Workflow

1. User accesses the application through the browser.
2. User selects “Apply” and completes profile + resume upload.
3. The app validates the PDF, extracts text, and analyzes the resume.
4. Resume scoring is processed against department-specific skills.
5. The candidate proceeds to the technical assessment.
6. The system loads questions from Excel and auto-grades answers.
7. The candidate completes psychometric questions from CSV.
8. Final score is calculated, recommendation is determined, and results are shown.

---

## Module Description

### Home Page
- **Purpose:** Marketing and introduction page.
- **Features:** Hero section, feature cards, workflow summary, CTA buttons.
- **Workflow:** Directs candidates to career listings and application form.
- **Input:** None.
- **Output:** Navigation to candidate flows.

### Apply Page
- **Purpose:** Candidate onboarding and resume submission.
- **Features:** Form fields, department selection, PDF upload.
- **Workflow:** Collects candidate details, extracts resume text, sets current candidate state.
- **Input:** Name, email, phone, department, resume PDF.
- **Output:** `currentCandidate` object and resume analysis route transition.

### Resume Analysis Page
- **Purpose:** Display AI resume evaluation.
- **Features:** Resume score, detected skills, missing skills, category breakdown.
- **Workflow:** Reads `currentCandidate.resumeAnalysis`, shows results, advances candidate.
- **Input:** Resume analysis data from `analyzeResume`.
- **Output:** Candidate progress to technical assessment.

### Technical Test Page
- **Purpose:** Department-specific exam module.
- **Features:** Subject selection, timed questions, answer tracking, auto submission.
- **Workflow:** Loads Excel-based questions, runs timed sections, calculates technical score.
- **Input:** Selected subjects, candidate answers.
- **Output:** Technical score and updated candidate state.

### Psychometric Test Page
- **Purpose:** Behavioral and mindset measurement.
- **Features:** CSV question loading, progress tracking, option selection.
- **Workflow:** Presents psychometric questions, scores responses, computes final recommendation.
- **Input:** Candidate answers to psychometric questions.
- **Output:** Final candidate score and recommendation.

### Results Page
- **Purpose:** Final evaluation summary and report generation.
- **Features:** Score cards, final score breakdown, PDF download.
- **Workflow:** Reads completed candidate state and bundles results for presentation.
- **Input:** Candidate scores from prior assessments.
- **Output:** Downloadable PDF report.

### Admin Login Page
- **Purpose:** Secure admin access control.
- **Features:** Login form, credential validation.
- **Workflow:** Authenticates admin using hard-coded credentials and redirects to dashboard.
- **Input:** Admin username and password.
- **Output:** Authenticated session.

### Admin Page
- **Purpose:** Recruitment analytics and candidate history.
- **Features:** Candidate rankings, bar chart, pie chart, KPIs, clear history.
- **Workflow:** Reads stored candidate history and presents aggregated metrics.
- **Input:** `candidates` from localStorage.
- **Output:** Data visualizations and administrative insights.

### Auth Context
- **Purpose:** Manage admin authentication state.
- **Features:** Login/logout, localStorage persistence.
- **Workflow:** Protects `/admin` route through `ProtectedRoute`.
- **Input:** Credentials.
- **Output:** `isAuthenticated` boolean.

### Recruitment Context
- **Purpose:** Candidate lifecycle state management.
- **Features:** Current candidate, candidate list, updates, persistence.
- **Workflow:** Stores recruitment data locally and allows application state transitions.
- **Input:** Candidate objects.
- **Output:** Candidate history for admin and result generation.

### Resume Analyzer
- **Purpose:** Extract semantic information from uploaded resumes.
- **Features:** PDF parsing, skill detection, category scoring.
- **Workflow:** Uses `pdfjs-dist` and heuristic keyword matching to compute a score.
- **Input:** Extracted resume text and required skills list.
- **Output:** `ResumeAnalysis` object.

### Question Loader
- **Purpose:** Load assessment content from static assets.
- **Features:** Excel and CSV parsing, sheet selection, department mapping.
- **Workflow:** Fetches static files from `public/data`.
- **Input:** Candidate department and selected subjects.
- **Output:** Structured question lists.

### PDF Generator
- **Purpose:** Create downloadable result reports.
- **Features:** Styled PDF output, score summary, recommendation banner.
- **Workflow:** Renders candidate data into a PDF document.
- **Input:** Candidate performance data.
- **Output:** `Faculty_Recruitment_Result.pdf`.

---

## User Roles

- **Candidate**
  - Applies for faculty positions.
  - Uploads resume, takes technical and psychometric tests.
  - Views evaluation results.

- **Admin**
  - Logs in through `/admin/login`.
  - Reviews candidate ranking, scores, and recommendations.
  - Clears history and manages dashboard analytics.

- **Recruiter / Hiring Committee**
  - Uses results dashboard to shortlist candidates.
  - Interprets final evaluation and PDF reports.
  - Makes hiring decisions with data support.

- **Faculty Applicant**
  - Same as Candidate in this implementation.

> Note: The app does not currently implement separate backend roles beyond candidate and admin, but the workflow is designed for academic recruiters and hiring managers.

---

## Screenshots

## Home Page
![Home](screenshots/home.png)

## Apply Page
![Apply](screenshots/apply.png)

## Resume Analysis Page
![Resume Analysis](screenshots/resume-analysis.png)

## Technical Test Page
![Technical Test](screenshots/technical-test.png)

## Psychometric Test Page
![Psychometric Test](screenshots/psychometric-test.png)

## Results Page
![Results](screenshots/results.png)

## Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

---

## API Documentation

This project does not expose backend REST APIs. The workflow is implemented entirely in the browser using:

- Static asset fetch for `public/data/technical_questions.xlsx`
- Static asset fetch for `public/data/psychometric_questions.csv`
- Browser `localStorage` for candidate persistence

No `POST /api/*` or server-side endpoints are included in this frontend-only implementation.

---

## Database Design

### Storage
- **Browser localStorage**
  - `candidate_history`
  - Stores serialized candidate records.

### Candidate schema
- `id`
- `name`
- `email`
- `phone`
- `department`
- `resumeFile`
- `resumeAnalysis`
- `resumeScore`
- `technicalScore`
- `technicalSubjects`
- `technicalAnswers`
- `psychometricScore`
- `psychometricAnswers`
- `finalScore`
- `recommended`
- `completedSteps`
- `timestamp`

### Relationships
- One candidate record per application
- Candidate `resumeAnalysis` links to uploaded resume content
- Candidate test answers are grouped by subject

### ER-style text description
```
Candidate
  ├─ has one ResumeAnalysis
  ├─ has many TechnicalAnswers grouped by subject
  ├─ has many PsychometricAnswers
  ├─ has one FinalScore
```

---

## Folder Structure

```
.
├── public
│   ├── data
│   │   ├── psychometric_questions.csv
│   │   └── technical_questions.xlsx
│   ├── _redirects
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── components
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ui
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── RecruitmentContext.tsx
│   ├── lib
│   │   ├── pdfGenerator.ts
│   │   ├── questionLoader.ts
│   │   ├── resumeAnalyzer.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── AdminLoginPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── ApplyPage.tsx
│   │   ├── CareersPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── PsychometricTestPage.tsx
│   │   ├── ResumeAnalysisPage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── TechnicalTestPage.tsx
│   │   └── NotFound.tsx
│   ├── data
│   │   └── questions.ts
│   ├── hooks
│   └── styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── bun.lockb
```

---

## Installation Guide

```bash
git clone https://github.com/<your-org>/facultyai-recruitment-system.git
cd facultyai-recruitment-system
npm install
```

### Environment setup
No required `.env` file is included. The app uses default Vite runtime settings and optional `BASE_PATH` for deployment base path.

### Run development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Usage Guide

1. Open the application in the browser after `npm run dev`.
2. Visit `Home` to understand the recruitment capabilities.
3. Click `Apply` to submit candidate details and upload a resume.
4. Review the AI-generated resume analysis.
5. Complete the technical test section with department-specific subjects.
6. Answer the psychometric questions to finish the assessment.
7. View the final evaluation and download the PDF report.
8. Login as admin at `/admin/login` using the admin credentials.
9. Review candidate metrics and score rankings in the admin dashboard.

---

## Configuration

### Environment variables
- `BASE_PATH`
  - Optional base path for Vite builds.
- `GITHUB_REPOSITORY`
  - Used by Vite config to compute base path in CI/CD if present.

### Config files
- `vite.config.ts`
  - Build configuration and alias resolution.
- `tailwind.config.ts`
  - Styling utilities and theme extensions.
- `tsconfig.json`
  - TypeScript path aliases and compiler options.
- `package.json`
  - Scripts and dependency definitions.

### Runtime settings
- Admin auth uses localStorage persistence key: `admin_session`
- Candidate history uses localStorage key: `candidate_history`

---

## Testing

### Unit Testing
The project includes Vitest support.

```bash
npm test
```

### Watch mode
```bash
npm run test:watch
```

### Manual Testing
- Validate candidate flow from `Apply` to `Results`
- Confirm PDF generation works
- Test admin login, dashboard charts, and history persistence
- Verify question loading from `public/data/`

---

## Results

The application produces:
- A resume score based on keyword and skills matching
- A technical exam score derived from Excel-driven MCQs
- A psychometric score from structured CSV questions
- A final weighted score and recommendation decision
- A downloadable PDF result report

### Result placeholders
- `screenshots/results.png`
- `screenshots/admin-dashboard.png`

---

## Security Features

- **Authentication**
  - Admin route secured via `ProtectedRoute`.
  - Login state persisted in `localStorage`.

- **Authorization**
  - Only authenticated admins can access `/admin`.

- **Input Validation**
  - Candidate form verifies required fields and valid PDF input.
  - Technical and psychometric workflows enforce answer selection.

- **Data Protection**
  - Local browser storage is used instead of remote persistence, reducing backend exposure.
  - Resume text is parsed locally without external uploads.

---

## Future Enhancements

1. Add backend API with PostgreSQL or MongoDB persistence.
2. Replace hard-coded admin credentials with secure login and user management.
3. Add recruiter / hiring manager roles and permissions.
4. Implement real AI model integration for resume semantic matching.
5. Add real-time collaboration and reviewer comments.
6. Support document upload formats beyond PDF.
7. Add email notifications and applicant tracking.
8. Add candidate filtering, search, and export CSV/XLSX.
9. Enable analytics dashboards for department-level hiring trends.
10. Add automated interview scheduling and calendar integration.

---

## Challenges Faced

- Handling PDF resume extraction accurately in the browser with `pdfjs-dist`.
- Mapping department names and subject sheets across Excel and CSV assets.
- Preserving candidate workflow state while switching between pages.
- Building chart and dashboard visuals from local storage records.
- Creating a secure admin guard without a backend authentication system.

---

## Learning Outcomes

- Building a complete React recruitment workflow with Vite and Tailwind.
- Using browser file APIs for PDF and spreadsheet parsing.
- Designing candidate state management with React Context.
- Applying heuristic AI techniques for resume scoring.
- Constructing admin analytics views using Recharts.
- Working with local persistence in a frontend-only application.

---

## Deployment

Deploy with a static site host:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Recommended commands:
```bash
npm install
npm run build
npm run preview
```

Set `BASE_PATH` when deploying to a subdirectory.

---

## System Requirements

### Hardware
- Processor: Dual-core CPU
- RAM: 4 GB minimum
- Storage: 200 MB free disk space

### Software
- Operating System: Windows, macOS, Linux
- Node.js: v18+ recommended
- Browser: Latest Chrome, Edge, Firefox, Safari
- No database server required for frontend-only mode

---

## Authors

- FacultyAI Team
- Project implemented by the repository owner and contributors

---

## License

MIT License. See `LICENSE` for full terms.

---

## Acknowledgements

- React
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- Recharts
- jsPDF
- pdf.js / `pdfjs-dist`
- PapaParse
- xlsx
- Sonner
