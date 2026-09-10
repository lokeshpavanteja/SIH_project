# MatchWise AI 🚀

### AI-Powered Government & Private Scheme Discovery Platform for Entrepreneurs

**MatchWise AI** is an intelligent scheme discovery and matching platform designed to help entrepreneurs, startups, MSMEs, and aspiring business owners discover **relevant government and private funding opportunities** based on their individual profile.

Instead of forcing users to search through hundreds of schemes manually, MatchWise AI analyzes information such as **location, age, education, business type, sector, income, turnover, organization type, and funding requirements** to surface schemes that are more relevant to them.

🔗 **Live Demo:** https://matchwiseai.vercel.app/

🔗 **GitHub Repository:** https://github.com/lokeshpavanteja/SIH_project

---

## 🎯 Problem Statement

Entrepreneurs in India have access to a large number of:

* Government schemes
* Startup funding programs
* MSME schemes
* Grants and subsidies
* Business loans
* State-level schemes
* Private grants
* CSR programs
* Corporate startup programs
* Incubators and accelerators

However, discovering the **right scheme** is difficult because information is distributed across different websites and portals.

Users often struggle to determine:

* Which schemes they are eligible for
* Which schemes match their business sector
* What documents are required
* How much funding is available
* Whether a scheme is currently active
* Where to apply
* Which opportunities are government or privately funded

**MatchWise AI aims to simplify this discovery process through personalized matching.**

---

# 💡 Solution

MatchWise AI creates a personalized profile for each user and uses that profile to identify relevant funding and support opportunities.

### Basic workflow

```text
User
  ↓
Language Selection
  ↓
User Onboarding
  ↓
Profile Creation
  ↓
Eligibility & Profile Matching
  ↓
Recommended Schemes
  ↓
Scheme Details
  ↓
Save / Start Application
  ↓
Track Application Progress
```

The application provides separate areas for:

* **Recommended Schemes**
* **Scheme Discovery**
* **My Schemes**
* **User Profile**

The project also maintains scheme source and verification information to improve transparency around scheme data.

---

# ✨ Key Features

## 1. Personalized Scheme Recommendations

Users provide information about themselves and their business, including:

* Age
* State and district
* Education
* Business sector
* Organization type
* Annual income
* Annual turnover
* Existing loans
* Startup/business stage

The platform uses this information to identify schemes that may be relevant to the user.

---

## 2. Government & Private Opportunities

The platform supports multiple types of opportunities.

### Government

* Central Government Schemes
* State Government Schemes
* Government Agency Programs
* Government-backed programs
* Startup schemes
* MSME schemes
* Grants
* Subsidies
* Business loans

### Private

* Private grants
* Startup funding
* Corporate programs
* CSR programs
* Private loans
* Business funding
* Incubator and accelerator opportunities

The underlying scheme model explicitly distinguishes between `government` and `private` scheme types.

---

## 3. Multilingual Support 🌐

MatchWise AI is designed with multilingual accessibility in mind.

Supported languages include:

* English
* Hindi
* Telugu
* Tamil
* Kannada
* Malayalam
* Marathi
* Bengali
* Gujarati
* Punjabi
* Odia
* Assamese
* Urdu

This makes the platform more accessible to entrepreneurs across different regions of India.

---

## 4. Scheme Match Score

Each scheme can contain a personalized **match score** and reasons explaining why it has been recommended.

Example:

```text
Match Score: 92%

✓ Your state is eligible
✓ Your business sector matches
✓ Your organization type is eligible
✓ Your income is within the required limit
✓ Required documents are available
```

This helps users understand **why a particular opportunity was recommended**, rather than simply receiving a list of schemes.

---

## 5. Scheme Details

Users can open a scheme to view information such as:

* Scheme description
* Funding amount
* Funding type
* Eligibility
* Benefits
* Required documents
* Application process
* Important conditions
* Deadline
* Official website
* Source organization
* Verification status
* Last updated information

The project's `Scheme` model contains dedicated fields for eligibility, benefits, required documents, application steps, official URLs, verification status, and update dates.

---

## 6. Save Schemes 🔖

Users can save interesting schemes and access them later.

Saved schemes are persisted locally using browser `localStorage`.

---

## 7. Application Tracking

Users can add a scheme to **My Schemes** and track their application progress.

Supported statuses include:

```text
Started
   ↓
In Progress
   ↓
Ready to Apply
```

The application also maintains a progress percentage for started schemes.

---

## 8. Document Readiness

The platform models document readiness for scheme applications.

Users can identify:

* Available documents
* Missing documents
* Document readiness score
* Required documents for a scheme

This can help entrepreneurs prepare their applications before visiting the official application portal.

---

## 9. Trusted Sources & Verification

MatchWise AI maintains source information for schemes, including:

* Source organization
* Source URL
* Country
* Source type
* Scheme type
* Verification status
* Last successful synchronization
* Number of schemes associated with the source

The current implementation includes sources such as **myScheme.gov.in, Startup India, MSME/CHAMPIONS, BIRAC, Startup Karnataka, Google for Startups, Microsoft for Startups, AWS Activate, Y Combinator, Tata Social Enterprise Challenge, and HDFC Bank programs**.

> **Important:** Users should always verify eligibility, deadlines, funding amounts, and application requirements on the official scheme website before applying.

---

# 🤖 AI Integration

MatchWise AI integrates Google's Gemini API for AI-powered functionality.

The backend initializes the Gemini client using:

```text
GEMINI_API_KEY
```

If the API key is unavailable, the server has fallback behavior for AI-related functionality.

---

# 🏗️ Technology Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* Motion (Framer Motion)
* Lucide React

## Design System & UI/UX

* **Aesthetic**: Premium Enterprise Dark Mode (Zinc 950 base)
* **Design Inspiration**: Shadcn UI, Linear, Kokonut UI
* **Components**: Glassmorphism panels, sophisticated glow effects, micro-interactions
* **Typography**: Tightly kerned Inter/Geist fonts for a professional SaaS feel

## Backend

* Node.js
* Express.js
* TypeScript
* Vite middleware

## AI

* Google Gemini API

## Data

* TypeScript scheme database
* CSV scheme dataset
* LocalStorage for client-side user/application state

## Deployment

* Vercel

The repository's `package.json` confirms the React, TypeScript, Vite, Express, Tailwind, Motion, Lucide, and Google GenAI dependencies.

---

# 📁 Project Structure

```text
SIH_project/
│
├── api/
│
├── src/
│   ├── components/
│   │   ├── BottomNavBar
│   │   ├── DiscoveryView
│   │   ├── GrantDetailModal
│   │   ├── LanguageSelection
│   │   ├── MyStartedView
│   │   ├── OnboardingView
│   │   ├── ProfileView
│   │   ├── RecommendedView
│   │   ├── StartApplicationModal
│   │   ├── Toast
│   │   └── TopAppBar
│   │
│   ├── data/
│   │   ├── mockData.ts
│   │   └── schemeDatabase.ts
│   │
│   ├── App.tsx
│   ├── types.ts
│   └── ...
│
├── sih_entrepreneur_schemes_expanded.csv
├── parseCsv.mjs
├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── index.html
```

The repository currently contains the frontend source, API/server code, scheme CSV dataset, configuration files, and supporting scripts.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/lokeshpavanteja/SIH_project.git
```

```bash
cd SIH_project
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The backend reads the Gemini API key from the `GEMINI_API_KEY` environment variable.

---

## 4. Run the Development Server

```bash
npm run dev
```

The development server is configured through `server.ts`.

---

## 5. Build the Project

```bash
npm run build
```

---

## 6. Preview the Production Build

```bash
npm run preview
```

---

# 🔌 API Health Check

The backend exposes a health-check endpoint:

```text
GET /api/health
```

Example response:

```json
{
  "status": "ok",
  "timestamp": "2026-09-09T00:00:00.000Z"
}
```

This endpoint can be used to verify that the backend is running correctly.

---

# 🧠 Matching Architecture

The platform represents each scheme using structured eligibility information.

For example:

```text
Scheme
│
├── Location
├── Age
├── Education
├── Sector
├── Organization Type
├── Income
├── Turnover
├── Loan Requirements
├── Benefits
├── Required Documents
└── Funding Information
```

The user profile is then compared against these characteristics to generate relevant recommendations.

Conceptually:

```text
                 ┌─────────────────────┐
                 │    User Profile     │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Eligibility Engine  │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │ Scheme Database     │
                 │                     │
                 │ Government          │
                 │ Private             │
                 │ Grants              │
                 │ Loans               │
                 │ Subsidies           │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Match Score +       │
                 │ Recommendation      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Recommended Schemes │
                 └─────────────────────┘
```

---

# 📊 Scheme Data Model

Each scheme can contain information such as:

```text
Scheme ID
Scheme Name
Provider
Scheme Type
Government Level
Country
State
Description
Funding Amount
Funding Nature
Deadline
Category
Target Beneficiaries
Business Category
Eligibility
Benefits
Required Documents
Application Process
Official Website
Source
Verification Status
Last Updated
```

This structured approach makes it possible to build more advanced matching and filtering functionality in future versions.

---

# 🔐 Data & Security

The current prototype uses browser `localStorage` for user profile and started-scheme persistence.

The application stores:

* User profile
* Selected language
* Started schemes

in the browser's local storage.

For a production deployment, the following improvements are recommended:

* Secure authentication
* Password hashing
* Database-backed user accounts
* Server-side authorization
* Encrypted sensitive data
* Secure session management
* Proper secrets management
* Audit logging
* Rate limiting
* Input validation

**Do not store real passwords or sensitive personal documents in the current prototype's client-side storage.**

---

# 🏆 Smart India Hackathon (SIH)

MatchWise AI is designed as a potential solution for the **Smart India Hackathon** ecosystem by addressing the difficulty entrepreneurs face while discovering and understanding funding and support programs.

### Expected Impact

The platform aims to:

* Reduce the time required to discover relevant schemes
* Improve awareness of government programs
* Improve accessibility through regional languages
* Help entrepreneurs understand eligibility
* Help users prepare required documents
* Connect users with official application sources
* Reduce information fragmentation
* Make scheme discovery more personalized

---

# 🔮 Future Enhancements

### 1. Real-Time Scheme Synchronization

Automatically retrieve updated information from official government and private sources.

### 2. Advanced AI Matching

Use an AI/ML ranking model to calculate more accurate scheme-match scores.

### 3. Personalized AI Assistant

Allow users to ask:

> "Which schemes can I apply for with my current business profile?"

and receive contextual recommendations.

### 4. Document Intelligence

Allow users to upload documents and automatically identify:

* Missing documents
* Expired documents
* Incorrect documents
* Required certificates

### 5. Deadline Notifications

Notify users before important application deadlines.

### 6. State-Level Expansion

Increase coverage of schemes from every Indian state and Union Territory.

### 7. Verified Scheme Updates

Automatically detect changes in:

* Eligibility
* Funding amount
* Deadlines
* Application links
* Scheme status

### 8. Entrepreneur–Investor Matching

Connect eligible startups with relevant investors and funding opportunities.

---

# 👥 Target Users

MatchWise AI can support:

* Aspiring entrepreneurs
* Startup founders
* MSMEs
* Small business owners
* Individual entrepreneurs
* Student entrepreneurs
* Rural entrepreneurs
* Women entrepreneurs
* NGOs
* Social enterprises
* Early-stage startups

---

# ⚠️ Disclaimer

MatchWise AI is a **scheme discovery and recommendation platform**.

The platform does not guarantee:

* Eligibility
* Funding approval
* Grant approval
* Loan approval
* Application acceptance

Scheme information may change over time.

Users should always verify the latest eligibility criteria, deadlines, terms, and application requirements on the **official scheme/provider website** before submitting an application.

---

# 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git commit -m "Add: your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

This project includes Apache-2.0 licensed source material where indicated in the source code.

Check individual files and dependencies for their respective licenses before redistributing the complete application.

---

# 👨‍💻 Project

**MatchWise AI**

AI-powered scheme discovery and matching platform for entrepreneurs.

🌐 **Live:** https://matchwiseai.vercel.app/
💻 **Repository:** https://github.com/lokeshpavanteja/SIH_project

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Built for innovation, accessibility, and better discovery of entrepreneurial opportunities.**
