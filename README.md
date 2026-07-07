<div align="center">
  
# 🛡️ SARGENERATION: Enterprise AML & SAR Automation Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-Backend-3776AB.svg?style=for-the-badge&logo=python)](https://python.org/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Ready-success.svg?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)]()

**A Next-Generation Anti-Money Laundering (AML) Interface & AI-Assisted Suspicious Activity Report (SAR) Generator**

[Explore the Code](#-project-structure) · [View Architecture](#-system-architecture) · [Getting Started](#-getting-started)

</div>

---

## 📖 Executive Summary

The **SAR Automation Platform** represents a paradigm shift in compliance workflows. Built originally for the **Barclays Hack-O-Hire** hackathon, this platform solves a critical bottleneck in the financial sector: the time-consuming, manual process of investigating financial crime and drafting Suspicious Activity Reports (SARs).

By providing a **high-fidelity, enterprise-grade React interface** coupled with a **mocked Python ML/AI backend architecture**, this system reduces triage time, enhances investigative clarity through visualizations, and automates regulatory reporting.

---

## 🏗️ System Architecture

The following diagram illustrates the intended end-to-end flow of the platform, from transaction ingestion to final SAR submission.

```mermaid
graph TD
    %% Define Styles
    classDef frontend fill:#3182CE,stroke:#2B6CB0,stroke-width:2px,color:white;
    classDef backend fill:#38A169,stroke:#2F855A,stroke-width:2px,color:white;
    classDef data fill:#D69E2E,stroke:#B7791F,stroke-width:2px,color:white;
    classDef ai fill:#805AD5,stroke:#6B46C1,stroke-width:2px,color:white;

    subgraph "Frontend (React + Vite) 🔵"
        A[Live Alerts Dashboard]:::frontend
        B[Case Explorer & Investigation]:::frontend
        C[Network Graph Visualization]:::frontend
        D[SAR Workflow & Drafting]:::frontend
    end

    subgraph "Backend Engine (Python) 🟢"
        E[API Gateway / Flask App]:::backend
        F[Rule Engine Validator]:::backend
        G[ML Risk Scoring Model]:::backend
    end

    subgraph "AI & ML Processing 🟣"
        H[Generative LLM (SAR Drafter)]:::ai
        I[Typology Pattern Matcher]:::ai
    end

    subgraph "Data Storage 🟡"
        J[(Transaction DB)]:::data
        K[(Audit Logs & Archives)]:::data
    end

    %% Flow Connections
    J -->|Ingest Transactions| G
    G -->|Calculate Risk 0-100| F
    F -->|Flag Suspicious| E
    E -->|Push via WebSockets| A
    
    A -->|Investigate Case| B
    B <-->|Query Relationships| C
    B -->|Trigger Draft| D
    
    D -->|Send Context| H
    H -->|Return Narrative| D
    
    G -.->|Pattern Identification| I
    I -.->|Explainability| B
    
    D -->|Submit & Log| K
```

---

## 🚀 Core Modules & User Journey

### 1. 🚨 Live Alerts & Triage (`/alerts`)
The entry point for compliance analysts. Transactions are ingested and instantly scored.
- **Dynamic Risk Scoring:** Alerts are prioritized using visual risk meters (e.g., 90+ is Critical).
- **KPI Dashboards:** Real-time metrics on pending reviews, critical alerts, and processing times.

### 2. 🕵️‍♂️ Investigation Intelligence (`/investigation`)
Where deep-dive forensic analysis happens.
- **Typology Identification:** AI automatically flags specific ML typologies (e.g., "Structuring", "Funnel Accounts", "Smurfing").
- **Transaction Highlight Maps:** Visualizes geographic or network anomalies.

### 3. 🤖 AI-Assisted SAR Drafting (`/sar-workflow`)
The crown jewel of the automation process.
- **Auto-Narrative Generation:** The system passes case context to an LLM, which structures a FINCEN-compliant SAR narrative.
- **Evidence Compilation:** Auto-attaches triggered rules, related transactions, and KYC anomalies.
- **Human-in-the-Loop:** Analysts can regenerate, edit, and approve the AI's draft.

### 4. 🏛️ Governance & Audit Trail (`/audit`)
Ensuring regulatory compliance for the platform itself.
- **Immutable Logging:** Every button click, edit, and approval is recorded to prove compliance to regulators.

---

## 📂 Project Structure

```text
SARGENERATION/
├── sar-dashboard/
│   ├── backend/                      # Python ML & API Engine
│   │   ├── app.py                    # Flask API Gateway
│   │   ├── ml_engine.py              # Risk Scoring Logic
│   │   ├── sar_generator.py          # AI Narrative Generation Logic
│   │   ├── generate_dummy_data.py    # Data synthesizer for testing
│   │   └── data/                     # Transaction Datasets (CSV)
│   │
│   ├── src/                          # React Frontend Source
│   │   ├── components/               # 🧩 Reusable Enterprise UI Components
│   │   │   ├── CaseTimeline.jsx      # Vertical history timeline
│   │   │   ├── ComplianceValidator.jsx
│   │   │   ├── DataTable.jsx         # Sortable, styled grids
│   │   │   ├── FilterBar.jsx
│   │   │   ├── KPICard.jsx           # Dashboard metric cards
│   │   │   ├── PageHeader.jsx
│   │   │   └── SARGeneratorModal.jsx # Drafting overlay
│   │   │
│   │   ├── pages/                    # 📄 Application Views/Routes
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── CaseExplorerPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── InvestigationPage.jsx
│   │   │   ├── RiskScoringPage.jsx
│   │   │   └── SARDraftPage.jsx
│   │   │
│   │   ├── services/                 # API & Mock Data layers
│   │   │   └── mlService.js
│   │   │
│   │   ├── App.jsx                   # Main Router
│   │   ├── Layout.jsx                # Sidebar & Header wrapper
│   │   └── index.css                 # Global Design Tokens & Variables
│   │
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🛠️ Technology Stack Deep Dive

### Frontend (Client-Side)
- **React 18:** Functional components & hooks architecture.
- **Vite:** Next-generation frontend tooling for instantaneous HMR (Hot Module Replacement).
- **Lucide React:** Clean, consistent, enterprise-grade iconography.
- **Recharts:** Composable charting library built on React components for rendering analytical dashboards.
- **React Router DOM:** Client-side routing for seamless page transitions.

### Backend (Server-Side) *(Foundational)*
- **Python 3:** Core language for ML and scripting.
- **Flask / FastAPI:** Intended for lightweight, highly performant API serving.
- **Pandas / Scikit-Learn:** For data manipulation, rule-engine processing, and risk score prediction.

---

## 💻 Getting Started (Local Development)

### 1. Start the Frontend
```bash
# Clone the repository
git clone https://github.com/darkphoenix2208/SARGENERATION.git

# Navigate to the dashboard directory
cd SARGENERATION/sar-dashboard

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
Navigate to `http://localhost:3000` (or the port provided in your terminal).

### 2. (Optional) Explore the Python Backend
If you want to view or run the backend simulation scripts:
```bash
cd SARGENERATION/sar-dashboard/backend
pip install -r requirements.txt
python app.py
```

---

## 🔮 Future Integration Roadmap

While the frontend is highly polished, the next phase of development involves wiring the backend for production readiness:

1. **LLM API Integration:** Connect `sar_generator.py` to OpenAI (GPT-4) or Anthropic (Claude) for true, dynamic NLP generation of the SAR narrative.
2. **Graph Database:** Implement Neo4j to power the `Investigation Intelligence` network graphs for actual entity resolution.
3. **WebSockets Server:** Replace polling with Socket.io/FastAPI WebSockets for 0-latency live alert feeds.
4. **Auth & RBAC:** Implement JWT-based authentication with Role-Based Access Control (Analyst vs. Manager vs. Auditor).

---
<div align="center">
  <i>Developed for Barclays Hack-O-Hire.</i>
</div>
