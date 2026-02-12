# 📘 Smart Business Intelligence Reporting System (Smart BI Project)

<p align="center">
  <img src="Frontend/Assets/img/e6ecb39d-3feb-4943-bced-b1204095b566.jpeg" width="150" alt="MCI Logo">
</p>

<p align="center">
  <strong>Graduation Project – MCI Academy 2026</strong><br>
  Automated, AI-powered Business Intelligence reporting system using <b>n8n</b> and <b>Excel</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Engine-n8n-FF6C37?style=for-the-badge&logo=n8n" alt="n8n">
  <img src="https://img.shields.io/badge/Frontend-Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap" alt="Bootstrap">
  <img src="https://img.shields.io/badge/AI-Deep_Analysis-blue?style=for-the-badge&logo=openai" alt="AI">
  <img src="https://img.shields.io/badge/Status-Fast_Track_Complete-success?style=for-the-badge" alt="Status">
</p>

---

## 🧠 Project Overview

The **Smart Business Intelligence Reporting System** is an automated pipeline that transforms raw **Excel sales data** into **actionable insights**. It leverages an **event-driven, asynchronous architecture** to simulate the role of a **Senior Data Analyst**, processing data through two distinct paths:

* ⚡ **Fast Track**: Delivers instant KPIs and dashboard updates.
* 🧠 **Slow Track**: Conducts deep AI-driven statistical analysis and generates professional PDF reports.

---

## 🚀 Key Features

* **Flexible Schema**: Upload any standard Excel sales file.
* **Real-time Dashboard**: Instant visual feedback on sales trends.
* **Security First**: Backend MIME-type validation to ensure data integrity.
* **Automated Outreach**: Immediate email summaries sent via SMTP.
* **No-Backend Architecture**: Powered entirely by **n8n** as a logic engine.

---

## 🏗️ System Architecture

### 🔁 Event-Driven Workflow
The system captures data via a **Webhook** and forks the logic into two parallel streams:

#### ⚡ Fast Track (Instant Response)
* **Data Validation**: Checks for file content and correct `spreadsheet` MIME type.
* **KPI Engine**: Calculates Total Sales, Order Volume, and Top 5 Products.
* **Instant Feedback**: Returns JSON data to the Frontend and sends a summary email.

#### 🧠 Slow Track (Deep Analysis - In Progress)
* **AI Analysis**: Sends aggregated data to an LLM (e.g., GPT-4o) for SWOT and trend detection.
* **PDF Generation**: Crafts a professional report containing deep insights.

---

## 🖥️ Project Showcase

### 1️⃣ User Interface (Frontend)
> **Before Operation:** The initial state of the dashboard, featuring the secure upload zone and email input field.
![Initial Dashboard](Frontend/Assets/img/dashboard_preview_placeholder.png) 
*Clean, RTL-supported interface designed for seamless user interaction.*

> **After Startup:** Real-time data visualization showing the results of processing 2,000 transactions and over $2.2M in revenue.
![Dashboard with Results](Frontend/Assets/img/dashboard_preview_placeholder.png) 
*Dynamic updates of KPIs, the Top 5 products list, and the annual sales trend chart.*

---

### 2️⃣ Fast Track (Instant Analytics)
> **Automation Logic:** The primary n8n workflow that handles data ingestion, Excel parsing, and the security validation gate.
![n8n Fast Track Workflow](Frontend/Assets/img/workflow_preview_placeholder.png)
*Visualizing the concurrent processing and the MIME-type verification logic.*

> **Initial Report Email:** The first automated touchpoint—a smart summary sent to the user's inbox within seconds.
![Fast Track Email Format](Frontend/Assets/img/workflow_preview_placeholder.png)
*Professional HTML template featuring key metrics and immediate business insights.*

---

### 3️⃣ Slow Track (Deep AI Analysis)
> **Advanced AI Logic:** The complex workflow branch where an AI Agent performs deep statistical analysis and trend detection.
![n8n Slow Track Workflow](Frontend/Assets/img/Wait_photo_Afterend_drow.png)
*Orchestrating the transition from raw data to strategic intelligence using LLMs.*

> **Strategic PDF Report:** The final delivery—a comprehensive, AI-generated PDF report attached to a secondary access email.
![Slow Track Email Format](Frontend/Assets/img/workflow_preview_placeholder.png)
*Executive-level reporting including SWOT analysis and future sales forecasts.*

---

## 🗂️ Project Structure

```bash
Smart-BI-Project/
├── Frontend/           # UI Components (HTML, CSS, JS)
├── n8n-Workflows/      # Exported .json workflow files
├── Samples/            # Test datasets for immediate evaluation
└── README.md           # Project documentation
```

---

## 🧩 Technologies Used

* **n8n** – Automation & Backend Engine
* **JavaScript** – Data processing & logic
* **HTML / CSS** – Frontend UI
* **Excel (XLSX)** – Input data format
* **AI / LLMs** – Intelligent data interpretation
* **SMTP** – Automated email delivery

---

## 📊 Sample Data

The `Samples/` folder contains example Excel files for testing:

* `Customer-Purchase-History.xlsx`
* `Online-Store-Orders.xlsx`
* `Retail-Store-Transactions.xlsx`

You can use these files to test the system without creating your own dataset.

---

## ⚙️ Running the Project (Localhost)

### 1️⃣ Frontend

* Open `Frontend/index.html` in your browser
* Upload an Excel file and enter your email

### 2️⃣ n8n

* Run n8n locally (Docker or CLI)
* Import the workflow from:

  ```
  n8n-Workflows/The end of Fast Track(n8n).json
  ```
* Activate the workflow

---

## 🎓 Academic Value

This project demonstrates real-world concepts such as:

* Event-Driven Architecture
* Asynchronous Processing
* Automation Systems
* AI Integration in Business Intelligence
* Low-Code / No-Code Development

---

## 🎯 Use Case Scenario

1. User uploads Excel sales file
2. Instant insights appear on the website
3. Quick report is sent via email
4. Final AI-powered PDF report arrives later

---

## 🏁 Core Idea

> **Transform raw Excel sales files into intelligent, automated, and actionable business reports using n8n and AI.**

---

## 👥 Project Team

- **Abdelwahab Shandy**  
- **Marwan Singer**  
- **Hamed Tarek**  
- **Howarah Ali Abdo**  
- **Hadeer Abdelaziz**
- **Abdelrahman Taher**  
- **Doha Ñageh**   

_Graduation Project – MCI Academy 2026_

---

## 📌 Future Enhancements

* Cloud deployment
* Interactive dashboards
* Role-based access
* Multi-file analysis
* Real-time data sources

---

⭐ If you like this project, feel free to star the repository!