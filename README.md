# MERN Stack Developer Machine Test

## Project Overview

This project is a MERN Stack application developed as part of the Machine Test assignment.

The application allows an administrator to:

* Login securely using JWT authentication
* Create and manage agents
* Upload CSV/XLS/XLSX files containing lead data
* Automatically distribute leads among agents
* View distributed leads on a dashboard

---

## Features

### 1. Admin Authentication

* Secure login using JWT (JSON Web Token)
* Passwords stored in encrypted format using bcrypt
* Protected routes for authenticated users only

### 2. Agent Management

Admin can:

* Add new agents
* View all agents

Each agent contains:

* Name
* Email
* Mobile Number (with country code)
* Password

### 3. File Upload

Supported file formats:

* CSV (.csv)
* Excel (.xls)
* Excel (.xlsx)

Validation includes:

* File type validation
* Empty file validation
* Required column validation

### 4. Lead Distribution

Uploaded records contain:

* FirstName
* Phone
* Notes

The system automatically distributes leads among available agents using a round-robin algorithm.

Example:

If 25 leads and 5 agents exist:

* Agent 1 → 5 Leads
* Agent 2 → 5 Leads
* Agent 3 → 5 Leads
* Agent 4 → 5 Leads
* Agent 5 → 5 Leads

If leads are not evenly divisible, remaining leads are assigned sequentially.

### 5. Dashboard

Dashboard displays:

* Agent information
* Assigned leads
* Lead details
* Distribution summary

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* XLSX

---

# Project Structure

## Backend

backend/

├── controllers/

├── middleware/

├── models/

├── routes/

├── uploads/

├── .env

├── server.js

└── package.json

## Frontend

frontend/

├── src/

│ ├── components/

│ ├── context/

│ ├── pages/

│ ├── App.jsx

│ └── main.jsx

├── package.json

└── vite.config.js

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

## Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Admin Credentials

Use the following credentials to login:

```text
Email: admintest@gmail.com
Password: 12345
```

If credentials are not available in database, create an admin user directly in MongoDB before running the application.

---

# API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "admintest@gmail.com",
  "password": "12345"
}
```

---

## Agents

### Create Agent

```http
POST /api/agents
```

### Get All Agents

```http
GET /api/agents
```

---

## Upload Leads

### Upload CSV/XLS/XLSX File

```http
POST /api/upload
```

Form Data:

```text
file: leads.csv
```

---

## Tasks

### Get Distributed Tasks

```http
GET /api/tasks
```

---

# Sample CSV Format

```csv
FirstName,Phone,Notes
Rahul,9876543210,Interested
Amit,9876543211,Call Tomorrow
Riya,9876543212,Busy
```

---

# Lead Distribution Logic

The application uses a round-robin distribution algorithm.

Example:

```javascript
assignedAgent = agents[i % agents.length];
```

This ensures leads are distributed as evenly as possible among all available agents.

---

# Validation Implemented

## Login

* Required fields validation
* Invalid credentials handling

## Agent Creation

* Required fields validation
* Duplicate email validation
* Password encryption

## File Upload

* File required validation
* Supported format validation
* Empty file validation

## Authentication

* JWT verification
* Protected API routes

---

# Future Improvements

* Agent edit/delete functionality
* Search and filtering
* Pagination
* Role-based access control
* Analytics dashboard
* Export distributed leads

---
# Live Demonstration: https://mern-assignment-0.onrender.com/
# Video Demonstration

Google Drive Video Link:https://drive.google.com/file/d/1H2bmWp95ZxAnvBdhJMbhj6HImwqxKPpV/view?usp=drive_link




# Author

Diptesh Kumar Singh

MERN Stack Developer
