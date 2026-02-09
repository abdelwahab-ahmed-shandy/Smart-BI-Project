# 📘 Smart Business Intelligence Reporting System (Smart BI Project)

> **Graduation Project – MCI Academy 2026**
> Automated, AI-powered Business Intelligence reporting system using **n8n** and **Excel**.

---

## 🧠 Project Overview

The **Smart Business Intelligence Reporting System** is an automated system that transforms raw **Excel sales data** into **actionable insights and professional reports** without relying on a traditional backend.

The system is built around an **event-driven, asynchronous architecture** using **n8n** as the core automation engine, combined with **AI-powered analysis** to simulate the role of a **Senior Data Analyst**.

It processes uploaded Excel files through **two parallel paths**:

* ⚡ **Fast Track** → Instant analysis & quick report
* 🧠 **Slow Track** → Deep AI-driven analysis & final PDF report

---

## 🚀 Key Features

* Upload **any Excel sales file** (flexible schema)
* Instant dashboard-style results on the website
* Automatic email delivery of reports
* Two-level reporting system:

  * Quick insights (Fast Track)
  * Detailed AI-powered report (Slow Track)
* No traditional backend required
* Fully automated using **n8n workflows**
* Designed for **small & medium businesses**

---

## 🏗️ System Architecture

### 🔁 Event-Driven Workflow

1. User uploads an Excel file + email via the Frontend
2. Frontend sends data to **n8n Webhook**
3. n8n processes the file in **two parallel paths**:

#### ⚡ Fast Track (Instant Response)

* Parse Excel data
* Calculate quick KPIs:

  * Total Sales
  * Orders Count
  * Top / Bottom Products
  * Peak Sales Hour
* Return results immediately to the UI
* Send a **quick summary email** to the user

#### 🧠 Slow Track (Deep Analysis)

* Perform advanced statistical analysis
* Apply Pareto Principle (80/20)
* Detect trends and anomalies
* Send data to AI model (Senior Data Analyst role)
* Generate:

  * Executive Summary
  * Insights
  * Recommendations
* Build a **professional PDF report**
* Send the final report via email

---

## 🗂️ Project Structure

```
Smart-BI-Project/
│
├── Frontend/
│   ├── Assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── Js/
│   │       └── main.js
│   └── index.html
│
├── n8n-Workflows/
│   └── The end of Fast Track(n8n).json
│
├── Samples/
│   ├── Customer-Purchase-History.xlsx
│   ├── Online-Store-Orders.xlsx
│   └── Retail-Store-Transactions.xlsx
│
└── README.md
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
- **Doha Ñageh**   
- **Hadeer Abdelaziz**
- **Abdelrahman Taher**  
- **Howarah Ali Abdo**  

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
