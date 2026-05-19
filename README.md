# Forsa Platform

> **"Soft skills should not be a privilege."**

Forsa is a platform designed to reduce the soft skills gap among public school students in Egypt and Yemen. It gives students access to free soft skills courses, verified opportunities, and AI-guided support — and gives teachers a classroom-ready 8-week curriculum.

---

## Quick Start

### Option 1 — Run Both Servers Together (Recommended)

From the root `forsa-platform/` folder:

```bash
# Step 1: Install all dependencies
npm install
npm run install:all

# Step 2: Start both servers
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4567

---

### Option 2 — Run Servers Separately

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

---

## Requirements

- Node.js v18 or higher
- npm v9 or higher

Check your version: `node --version`

---

## Project Structure

```
forsa-platform/
├── package.json              ← Root: run both servers with npm run dev
├── README.md
│
├── frontend/                 ← React + Vite + Tailwind CSS
│   ├── package.json
│   ├── vite.config.js        ← Proxies /api to backend port 4567
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx           ← Router setup
│       ├── main.jsx
│       ├── index.css         ← Global styles + Tailwind
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── CourseCard.jsx
│       │   └── OpportunityCard.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Courses.jsx
│           ├── Opportunities.jsx
│           ├── VerifyOpportunity.jsx
│           ├── TeacherResources.jsx
│           ├── Chatbot.jsx
│           ├── Admin.jsx
│           └── About.jsx
│
└── backend/                  ← Node.js + Express
    ├── package.json
    ├── server.js             ← Main server + /api/verify endpoint
    ├── routes/
    │   ├── courses.js        ← GET/POST/PUT/DELETE /api/courses
    │   ├── opportunities.js  ← GET/POST/PUT/DELETE /api/opportunities
    │   ├── curriculum.js     ← GET/POST/PUT/DELETE /api/curriculum
    │   └── organizations.js  ← GET /api/organizations
    └── data/                 ← JSON file storage (edit these directly)
        ├── courses.json
        ├── opportunities.json
        ├── curriculum.json
        └── organizations.json
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with mission, features, stats |
| Courses | `/courses` | 10 free soft skills courses with filters |
| Opportunities | `/opportunities` | 12 verified opportunities with filters |
| Verify | `/verify` | Rule-based opportunity credibility checker |
| Teachers | `/teachers` | 8-week curriculum + teacher toolkit |
| Chatbot | `/chatbot` | Rule-based guidance chatbot |
| Admin | `/admin` | CRUD dashboard for all content |
| About | `/about` | Platform mission and context |

---

## Features

### What Works Now
- All 8 pages with full navigation
- Course and opportunity browsing with live search and multi-filter
- Opportunity verification tool (rule-based, 7 checks, score 0–100)
- AI chatbot with branching logic and personalized recommendations
- 8-week curriculum with expandable week details and teacher toolkit
- Admin dashboard: add, edit, delete courses / opportunities / curriculum weeks
- Status toggle for opportunities (verified / pending / suspicious)
- Responsive design — works on mobile and desktop
- Deep blue + amber color scheme throughout

### Sample Data Included
- 10 courses (communication, leadership, teamwork, confidence, critical thinking, creativity, problem solving, public speaking, career readiness)
- 12 opportunities (scholarships, competitions, trainings, fellowships, youth programs)
- 8 full curriculum weeks with activities, materials, reflection questions
- 6 organizations with contact info

---

## Editing Sample Data

All sample data lives in `backend/data/`. You can edit these JSON files directly:

| File | What it controls |
|------|-----------------|
| `backend/data/courses.json` | All courses shown on /courses |
| `backend/data/opportunities.json` | All opportunities on /opportunities |
| `backend/data/curriculum.json` | All 8 weeks on /teachers |
| `backend/data/organizations.json` | Organization directory (used by chatbot) |

Or use the **Admin Dashboard** at `/admin` to add, edit, and delete items through the UI (requires backend to be running).

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Add a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |
| GET | `/api/opportunities` | Get all opportunities |
| POST | `/api/opportunities` | Add an opportunity |
| PUT | `/api/opportunities/:id` | Update an opportunity |
| DELETE | `/api/opportunities/:id` | Delete an opportunity |
| GET | `/api/curriculum` | Get all curriculum weeks |
| POST | `/api/curriculum` | Add a week |
| PUT | `/api/curriculum/:id` | Update a week |
| DELETE | `/api/curriculum/:id` | Delete a week |
| GET | `/api/organizations` | Get all organizations |
| POST | `/api/verify` | Analyze opportunity for credibility |

---

## What Can Be Improved Later

1. **Real AI Integration** — Replace rule-based verification and chatbot with Claude or GPT API calls
2. **Authentication** — Add user accounts, teacher accounts, admin roles (code is structured for this)
3. **Arabic UI** — Full RTL layout support and Arabic content throughout
4. **Real Opportunity Submissions** — Allow organizations to submit opportunities for review
5. **PDF Downloads** — Generate and serve curriculum PDFs from the backend
6. **Email Notifications** — Notify teachers when new curriculum materials are available
7. **User Progress Tracking** — Track which courses/opportunities students have saved or applied to
8. **Database** — Replace JSON file storage with PostgreSQL or SQLite for production
9. **Deployment** — Deploy to Vercel (frontend) + Railway or Render (backend)
10. **Analytics** — Track which resources students access most

---

## Tech Stack

- **Frontend:** React 18, Vite 5, React Router 6, Tailwind CSS 3
- **Backend:** Node.js, Express 4
- **Storage:** JSON file storage (prototype)
- **Fonts:** Inter (Google Fonts)

---

## Design System

| Token | Value |
|-------|-------|
| Primary blue | `#1a3a6e` |
| Secondary blue | `#1e40af` |
| Accent yellow | `#f59e0b` |
| Background | `#f8fafc` |
| Border | `#e2e8f0` |
| Font | Inter |

---

Built as a prototype for Forsa — a community problem-solving and soft skills intervention for public school students in Egypt and Yemen.
