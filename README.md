# 📊 Smart BI 

<p align="center">
  <img src="Frontend/Assets/img/logomci.jpeg" width="120" alt="MCI Logo">
</p>

<p align="center">
  <strong>Graduation Project – MCI Academy 2026</strong><br>
  An Automated, AI-powered Business Intelligence pipeline using <b>n8n</b>, <b>AI Agent</b>, and <b>Excel</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Engine-n8n-FF6C37?style=for-the-badge&logo=n8n" alt="n8n">
  <img src="https://img.shields.io/badge/Frontend-Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap" alt="Bootstrap">
  <img src="https://img.shields.io/badge/AI-Deep_Analysis-blue?style=for-the-badge&logo=openai" alt="AI">
  <img src="https://img.shields.io/badge/Architecture-Event--Driven-success?style=for-the-badge" alt="Status">
</p>
 
---

## 🧠 Project Overview

The Smart BI Reporting System is an intelligent ecosystem designed to bridge the gap between raw data and executive decision-making. It transforms standard Excel sales data into high-level strategic insights through a professional data analyst's workflow.

🔄 The Intelligent Pipeline:
- 🔐 Secure Auth: Multi-user system with encrypted passwords (Bcrypt).

- ⚡ Fast Track: Instant KPI extraction (Total Sales, Top Products) and real-time Chart.js visualization.

- 🧠 Slow Track: Strategic AI-driven analysis (SWOT, Trends) delivered via automated n8n workflows.

---

## 🚀 Key Features

* **Agnostic Data Ingestion**: Upload any standard Excel sales file; the system adapts to the schema.
* **Dynamic Dashboard**: Real-time visual feedback using Chart.js/Bootstrap.
* **Security Gate**: Backend MIME-type validation to prevent malicious file uploads.
* **AI Strategic Reporting**: Full business analysis (SWOT, Trends, Forecasts) generated via LLMs.
* **Direct Outreach**: Automated multi-stage email delivery via SMTP.

---

## 🏗️ System Architecture

### 🔁 Workflow Orchestration
The core logic resides in **n8n**, where incoming Webhooks trigger parallel execution streams:

#### 1. Fast Track (Latency: < 2s)
* **Validation**: Strict MIME-type checking for data integrity.
* **Aggregation**: Real-time calculation of Total Revenue, Order Volume, and Top Products.
* **Delivery**: Updates the frontend via JSON and sends a "Quick Glance" email.

#### 2. Slow Track (Executive Intelligence)
* **Contextual Analysis**: Data is batch-processed and sent to an AI Agent (GPT-4o/Claude) for qualitative insights.
* **Strategic Email Delivery**: Instead of static files, the AI crafts a professional, structured email report containing SWOT analysis and actionable business recommendations.

---

## 🖥️ Project Showcase

### 1️⃣ Intelligent Dashboard
> **Light Mode**
> **Operation Workflow:** From an empty state to a data-rich environment.

| Initial State | Processed Results |
| :---: | :---: |
| ![Initial](Frontend/Assets/img/Lightdashboard_preview_placeholder.png) | ![Results](Frontend/Assets/img/afterdashboard_preview_placeholderLight.png) |
| *Secure upload zone & RTL support* | *Real-time KPIs & Sales Trend Analysis* |

> **Dark Mode**
> **Operation Workflow:** From an empty state to a data-rich environment.

| Initial State | Processed Results |
| :---: | :---: |
| ![Initial](Frontend/Assets/img/dashboard_preview_placeholder.png) | ![Results](Frontend/Assets/img/afterdashboard_preview_placeholder.png) |
| *Secure upload zone & RTL support* | *Real-time KPIs & Sales Trend Analysis* |


---

### 2️⃣ Fast Track Logic & Outreach
> **The Automation Backbone:** Visualizing the n8n logic and the immediate user feedback.

<div align="center">
  <img src="Frontend/Assets/img/workflow_preview_placeholder.png" width="80%" alt="n8n Logic">
  <p><i>n8n workflow handling ingestion and security validation.</i></p>
</div>

> **Instant Insight Email:**
<div align="center">
  <img src="Frontend/Assets/img/Fast_Email.jpg" width="400" alt="Fast Track Email">
  <p><i>Automated HTML summary sent within seconds of upload.</i></p>
</div>

---

### 3️⃣ Slow Track (Strategic AI Analysis)
> **Advanced Intelligence:** The transition from raw numbers to executive-level strategy delivered via email.

<div align="center">
  <img src="Frontend/Assets/img/Slow_work_flow.png" width="80%" alt="Slow Track Logic">
</div>

<details>
<summary><b>📧 Click to View Sample Strategic AI Email Report (Detailed)</b></summary>
<br>
<div align="center">
  <img src="Frontend/Assets/img/Slow_work_flow_email.png" width="450" alt="Strategic Report Email 1">
</div>

<div align="center">
  <img src="Frontend/Assets/img/Slow_work_flow_email2.png" width="450" alt="Strategic Report Email 2">
</div>

<div align="center">
  <img src="Frontend/Assets/img/Slow_work_flow_email3.png" width="450" alt="Strategic Report Email 3">
    <p><i>The final AI-generated strategic report, sent as a high-level executive email.</i></p>
</div>
</details>

---
---

## 🎯 System Logic & User Journey

The system is designed to provide a seamless transition from raw data ingestion to deep strategic intelligence, following a structured **Event-Driven** approach.

### 1️⃣ Operational Workflow
1.  **Data Ingestion**: User uploads an Excel/CSV sales file via the secure dashboard.
2.  **Fast Track (Synchronous)**: The system validates the file and immediately pushes KPIs and charts to the UI.
3.  **Initial Alert**: A "Quick Glance" confirmation email is dispatched via SMTP.
4.  **Slow Track (Asynchronous)**: The AI Agent initiates a deep-dive analysis in the background.
5.  **Strategic Delivery**: A final, comprehensive AI-generated report is sent directly to the user's inbox.

---

### 2️⃣ Architecture & Logic Diagrams
> Visualizing the interaction between the User, n8n Orchestrator, AI Agent, and Mail Servers.

#### **A. Use Case Diagram**
*High-level view of system boundaries and actor interactions.*
<div align="center">
  <img src="Frontend/Assets/img/Use_case.png" width="90%" alt="Use Case Diagram">
</div>

#### **B. Sequence Diagram (Execution Flow)**
*Detailed execution timeline showing the Synchronous vs. Asynchronous processing paths.*
<div align="center">
  <img src="Frontend/Assets/img/Full_use_case.png" width="90%" alt="Full Sequence Diagram">
</div>

---
## 🗂️ Project Structure

```bash
Smart-BI-Project/
├── Backend/            # Flask API & SQLite Engine
│   ├── SmartBi.py      # Core Backend Logic
│   └── DataBase/       # SQL Schemas & database.db
├── Frontend/           # UI Components (HTML, CSS, JS)
│   ├── auth.html       # Secure Entry Point
│   └── index.html      # Analytics Dashboard
├── n8n-Workflows/      # Automation .json exports
├── Samples/            # Standardized Excel datasets
└── Manual Analysis/    # Benchmarks (Jupyter Notebooks)
```
---

## 🧩 Technologies Used

* Backend: Python 3.10, Flask, Flask-CORS.

* Security: Hashed passwords using bcrypt (Salted).

* Database: SQLite (Relational, File-based for high-speed local processing).

* Frontend: Bootstrap 5 (RTL Support), Chart.js, Vanilla JavaScript.

* Automation: n8n (Webhook-driven reporting).

---

## 👥 Project Team

**Abdelwahab Shandy – Team Lead & Automation Architect**

**Hadeer Abdelaziz – Business Intelligence  & QA**

**Hamed Tarek – Backend & Database Developer**

**Howarah Ali Abdo – Data Analyst (Jupyter & BI)**

**Marwan Singer – Frontend Developer & UI/UX**

**Sanaa Ahmed Mohamed – Graphic Designer** 

**Abdelrahman Taher – Writer & Presentation**

---

## 🏁 Core Idea

> **Turning data into a competitive advantage by automating the bridge between Excel and AI.**

---

⭐ If you find this project useful, please consider giving it a star!

_Graduation Project – MCI Academy 2026_