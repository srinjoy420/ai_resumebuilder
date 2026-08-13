# 🤖 AI Resume Reviewer & Interview Preparation Platform

An AI-powered resume analysis and interview preparation platform that helps candidates understand how well their resume matches a job description and prepares them for the interview.

The application uses **Google Gemini AI** to analyze the candidate's resume, self-description, and job description, then generates a personalized interview preparation report and an ATS-friendly resume that can be downloaded as a PDF.

---

## 🚀 Features

### 📄 Resume Analysis

Upload your resume and provide:

* Resume
* Job Description
* Candidate Self Description

The application analyzes the information using AI and generates a personalized report.

### 📊 Resume Match Score

The system generates a **0–100 match score** indicating how well the candidate's resume matches the target job description.

### 💻 Technical Interview Questions

The AI generates technical interview questions based on the skills and requirements mentioned in the job description.

Each question includes:

* Interview question
* Intention behind the question
* Suggested/model answer

### 🧑‍💼 Behavioral Interview Questions

The platform also generates behavioral questions related to:

* Previous experience
* Soft skills
* Work situations
* Problem solving
* Communication

Each question includes an explanation and suggested answer.

### 🧩 Skill Gap Analysis

The application compares the candidate's resume with the job description and identifies missing or weak skills.

Each skill gap is classified by severity:

* Low
* Medium
* Hard

### 🗺️ Personalized Preparation Roadmap

The AI creates a short preparation plan based on the identified skill gaps.

The roadmap contains:

* Day
* Focus area
* Specific tasks

### 📑 AI Resume Generator

The platform can generate a new resume tailored to the target job description.

The generated resume is designed to be:

* ATS friendly
* Professional
* Concise
* Job-specific
* Human-readable

### 📥 PDF Resume Download

The generated HTML resume is converted into an A4 PDF using **Puppeteer + Chrome**.

Users can click **Download Resume** and directly download the generated PDF.

---

# 🏗️ Application Flow

```text
User
 │
 ├── Upload Resume
 │
 ├── Enter Job Description
 │
 └── Enter Self Description
 │
 ▼
Backend API
 │
 ▼
Google Gemini AI
 │
 ├── Resume Match Score
 ├── Technical Questions
 ├── Behavioral Questions
 ├── Skill Gaps
 └── Preparation Roadmap
 │
 ▼
MongoDB
 │
 ▼
Interview Report
 │
 ▼
AI Resume Generator
 │
 ▼
HTML Resume
 │
 ▼
Puppeteer
 │
 ▼
Chrome
 │
 ▼
PDF
 │
 ▼
User Download
```

---

# 🛠️ Tech Stack

## Frontend

* React
* React Router
* Axios
* JavaScript
* SCSS/CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API

## AI

* Google Gemini API
* `@google/genai`

## PDF Generation

* Puppeteer
* Chrome

---

# 📁 Project Structure

```text
ai_resume_builder/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── style/
│   │   └── pages/
│   │
│   └── ...
│
└── backend/
    │
    ├── src/
    │   ├── controller/
    │   ├── services/
    │   ├── models/
    │   ├── routes/
    │   └── ...
    │
    ├── package.json
    └── ...
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd ai_resume_builder
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Puppeteer Chrome

Puppeteer requires a Chrome browser for PDF generation.

Run:

```bash
npx puppeteer browsers install chrome
```

---

## 4. Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

GOOGLE_GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file to GitHub.

Add:

```text
.env
```

to your `.gitignore`.

---

# ▶️ Running the Project

## Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:3000
```

## Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

### Generate Interview Report

```http
POST /api/v1/interview/
```

Generates an AI-powered interview preparation report.

---

### Get Interview Report

```http
GET /api/v1/interview/:interviewId
```

Returns a specific interview report.

---

### Get All Interview Reports

```http
GET /api/v1/interview/
```

Returns the user's interview reports.

---

### Generate Resume PDF

```http
POST /api/v1/interview/resume/pdf/:interviewReportId
```

Generates an AI-tailored resume and returns it as a PDF.

---

# 🧠 AI Report Structure

The generated report contains:

```text
Interview Report
│
├── Match Score
│
├── Technical Questions
│   ├── Question
│   ├── Intention
│   └── Model Answer
│
├── Behavioral Questions
│   ├── Question
│   ├── Intention
│   └── Model Answer
│
├── Skill Gaps
│   ├── Skill
│   └── Severity
│
└── Preparation Plan
    ├── Day
    ├── Focus
    └── Tasks
```

---

# 📄 PDF Generation

The PDF generation process works as follows:

```text
Resume Data
     ↓
Gemini
     ↓
HTML Resume
     ↓
Puppeteer
     ↓
Chrome
     ↓
A4 PDF Buffer
     ↓
Express Response
     ↓
Frontend Blob
     ↓
Browser Download
```

The frontend receives the PDF as a Blob and creates a temporary download URL.

---

# 🎯 Purpose of the Project

The goal of this project is to make interview preparation more personalized.

Instead of using the same preparation material for every job, the application analyzes the candidate's actual resume against the target job description and creates preparation material specifically for that role.

---

# 🔮 Future Improvements

Possible future features:

* User authentication
* Resume history
* Multiple resume templates
* Resume version management
* LinkedIn profile analysis
* Job recommendation system
* Resume ATS score improvement suggestions
* Interview simulation with AI
* Voice-based mock interviews
* Interview performance tracking
* Multiple PDF templates
* Resume keyword optimization
* Job application tracking

---

# 👨‍💻 Author

**Srinjoy Ghosh**

Built as a full-stack AI project combining:

**React + Node.js + Express + MongoDB + Gemini AI + Puppeteer**

---

## ⭐ If you find this project useful

Give the repository a ⭐ on GitHub and feel free to contribute.
