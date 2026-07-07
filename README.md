# SAR Automation Platform (SARGENERATION)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-purple.svg)

## 🚀 Overview

The **SAR Automation Platform** is a high-fidelity Enterprise Anti-Money Laundering (AML) platform prototype. It demonstrates the full user journey—from detecting a suspicious transaction to filing a SAR (Suspicious Activity Report)—using a modern, consistent design system.

This project was built for the **Barclays Hack-O-Hire** hackathon.

> **Note:** This repository currently contains a **high-fidelity Frontend Prototype**. The data is mocked to demonstrate the UI/UX architecture and workflow capabilities, paving the way for backend ML/AI integrations.

---

## 🌟 Key Features & User Journey

You can walk through the entire compliance lifecycle using the current UI:

### 1. Monitoring & Triage (`/alerts`)
- **Live Alerts:** A real-time feed of transactions prioritized by auto-calculated **Risk Scores** (e.g., 94/100 = Critical).
- **Actionable Insights:** Analysts can quickly triage alerts and open cases for high-risk individuals.

### 2. Case Investigation (`/cases`)
- **Case Explorer:** Review detailed case histories, assigned analysts, and detected **Typologies** (e.g., "Funnel Accounts").
- **Transaction History:** Slide-over panels provide deep context without losing your place.

### 3. Deep Dive Analysis (`/investigation`)
- **Investigation Intelligence:**
  - **Network Graphs:** Visualizes hidden connections between suspects and other entities.
  - **Typology Cards:** Provides AI pattern matching explanations (e.g., "Structuring: 7 deposits < $10k").

### 4. SAR Drafting (`/sar-workflow`)
- **AI Drafting:** Auto-generated narratives summarizing suspicious activities to save analysts hours of manual writing.
- **Evidence Compilation:** Auto-compiled list of triggered rules and transactions ready for submission.

### 5. Audit & Compliance (`/audit`)
- **Immutable Log:** Every step taken (AI generation, edits, manager review, submission) is tracked for compliance and auditability.

---

## 🎨 Enterprise-Grade Design Architecture

We transformed a basic React application into an **Enterprise-Grade** interface:

- **Global Design Tokens:** Scalable and consistent theming using CSS variables (`var(--color-primary-700)`).
- **Unified Component Library:** 
  - `KPICard` (with trend arrows & accents)
  - `PageHeader` (standardized icons & actions via Lucide React)
  - `DataTable` (zebra striping, sort indicators)
  - `TabPage` (animated transitions)
  - `FilterBar` (consistent search UX)
- **Visual Polish & Micro-Interactions:** Smooth fade-in animations, sliding underline effects, and hover states on all interactive elements.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (Global Design System)
- **Icons:** Lucide React
- **Charts & Data Viz:** Recharts
- **Routing:** React Router DOM

---

## 🚀 Getting Started

To run the dashboard locally, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/darkphoenix2208/SARGENERATION.git
   cd SARGENERATION
   ```

2. **Navigate to the dashboard directory:**
   ```bash
   cd sar-dashboard
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

---

## 🔮 Future Roadmap (Backend & AI Integration)

To make this a fully functional production app, the following backend integrations are planned:

- **Real Database Integration:** Replace mocked JSON arrays with a connection to Postgres/Supabase.
- **Authentication:** Implement JWT/OAuth for secure login and role-based access.
- **Real-Time Data (WebSockets):** Push new alerts and notifications to the dashboard live.
- **True Generative AI:** Integrate with an LLM API (OpenAI/Anthropic) to dynamically generate SAR narratives based on actual selected transaction data.
- **State Persistence:** Implement global state management (Redux/Zustand) and backend saving for draft reports and settings.

---

## 📄 License

This project is licensed under the MIT License.
