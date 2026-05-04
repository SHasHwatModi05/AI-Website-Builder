# 🚀 AI Website Builder

An **AI-powered full-stack web application** that enables users to generate modern, responsive websites using simple text prompts.  
Built with **Next.js, Node.js, MongoDB, Firebase Authentication, and OpenRouter AI**, and deployed using **AWS (Amplify, EC2, ALB)** with automated CI/CD.

---

## 🌐 Live Demo

- 🔗 Frontend: https://genwebai.online  
- 🔗 Backend API: https://api.genwebai.online  

---

## ✨ Features

- 🔐 **Authentication**
  - Google Sign-in via Firebase
  - Secure backend token verification

- 🤖 **AI Website Generation**
  - Generate websites using prompts
  - Powered by OpenRouter API (LLM)

- 👤 **User System**
  - Auto user creation on first login
  - Profile with avatar & email

- 💳 **Credits System**
  - Free credits for new users
  - Deducts credits per generation

- ⚡ **Real-time UI**
  - Fast, responsive dashboard
  - Dynamic updates after generation

---

## 🚀 Architecture Flow

- **User (Browser)**  
  ↓  
- **AWS Amplify (Frontend - Next.js)**  
  ↓  
- **API Requests**  
  ↓  
- **Application Load Balancer (AWS)**  
  ↓  
- **EC2 (Node.js + Express + PM2 + Nginx)**  
  ↓  
- **MongoDB + Firebase + OpenRouter API**


---

## 🛠️ Tech Stack

### 🎨 Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- Redux Toolkit
- Firebase Authentication

---

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase Admin SDK
- OpenRouter API

---

### ☁️ Cloud & DevOps
- AWS Amplify (Frontend Hosting)
- AWS EC2 (Backend Hosting)
- Application Load Balancer (ALB)
- Nginx (Reverse Proxy)
- PM2 (Process Manager)
- GitHub Actions (CI/CD)
- Linux (Ubuntu)

---

## 🚀 Deployment Architecture

- **Frontend** → AWS Amplify  
- **Backend** → EC2 instance  
- **Traffic Routing** → Application Load Balancer  
- **Reverse Proxy** → Nginx  
- **Process Management** → PM2  
- **CI/CD** → GitHub Actions  

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SHasHwatModi05/AI-Website-Builder.git
cd AI-Website-Builder

## ⚙️ Setup & Configuration

### 2️⃣ Backend Setup

cd server  
npm install  

Create a `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_uri  
OPENROUTER_API_KEY=your_api_key  
FIREBASE_PROJECT_ID=your_project_id  

Run backend:

npm run dev  

---

### 3️⃣ Frontend Setup

cd client  
npm install  
npm run dev  

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| MONGO_URI | MongoDB connection string |
| OPENROUTER_API_KEY | AI API key |
| FIREBASE_PROJECT_ID | Firebase project ID |
| PORT | Backend port |

---

## 🔄 API Flow

1. User logs in via Firebase  
2. Frontend sends ID token to backend  
3. Backend verifies token  
4. User is created in MongoDB (if not exists)  
5. Generate API:  
   - Checks credits  
   - Deducts credits  
   - Calls OpenRouter API  
   - Returns generated website  
