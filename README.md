# 🚀 AI Website Builder

An **AI-powered full-stack web application** that enables users to generate modern, responsive websites using simple text prompts.
Built with **Next.js, Node.js, MongoDB, Firebase Authentication, OpenRouter AI, and Razorpay Payments**, and deployed using **AWS (Amplify, EC2, ALB)** with automated CI/CD.

---

## 🌐 Live Demo

* 🔗 Frontend: https://genwebai.online
* 🔗 Backend API: https://api.genwebai.online

---

## ✨ Features

* 🔐 **Authentication**

  * Google Sign-in via Firebase
  * Secure backend token verification

* 🤖 **AI Website Generation**

  * Generate websites using prompts
  * Powered by OpenRouter API (LLM)

* 👤 **User System**

  * Auto user creation on first login
  * Profile with avatar & email

* 💳 **Credits System**

  * Free credits for new users
  * Deducts credits per generation

* 💰 **Payments Integration**

  * Razorpay payment gateway integration
  * Purchase additional credits securely
  * Real-time credit update after successful payment

* ⚡ **Real-time UI**

  * Fast, responsive dashboard
  * Dynamic updates after generation

---

## 🚀 Architecture Flow

* **User (Browser)**
  ↓
* **AWS Amplify (Frontend - Next.js)**
  ↓
* **API Requests**
  ↓
* **Application Load Balancer (AWS)**
  ↓
* **EC2 (Node.js + Express + PM2 + Nginx)**
  ↓
* **MongoDB + Firebase + OpenRouter API + Razorpay**

---

## 🛠️ Tech Stack

### 🎨 Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS
* Redux Toolkit
* Firebase Authentication

---

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Firebase Admin SDK
* OpenRouter API
* Razorpay SDK

---

### ☁️ Cloud & DevOps

* AWS Amplify (Frontend Hosting)
* AWS EC2 (Backend Hosting)
* Application Load Balancer (ALB)
* Nginx (Reverse Proxy)
* PM2 (Process Manager)
* GitHub Actions (CI/CD)
* Linux (Ubuntu)

---

## 🚀 Deployment Architecture

* **Frontend** → AWS Amplify
* **Backend** → EC2 instance
* **Traffic Routing** → Application Load Balancer
* **Reverse Proxy** → Nginx
* **Process Management** → PM2
* **CI/CD** → GitHub Actions

---

## 🔐 Environment Variables

| Variable            | Description               |
| ------------------- | ------------------------- |
| MONGO_URI           | MongoDB connection string |
| OPENROUTER_API_KEY  | AI API key                |
| FIREBASE_PROJECT_ID | Firebase project ID       |
| RAZORPAY_KEY_ID     | Razorpay public key       |
| RAZORPAY_KEY_SECRET | Razorpay secret key       |
| PORT                | Backend port              |

---

## 💳 Payment Flow (Razorpay)

1. User selects a credit plan
2. Frontend creates an order via backend
3. Backend generates Razorpay order
4. Razorpay checkout opens
5. Payment is completed
6. Backend verifies payment signature
7. Credits are added to user account

---

## 🔄 API Flow

1. User logs in via Firebase
2. Frontend sends ID token to backend
3. Backend verifies token
4. User is created in MongoDB (if not exists)

### Website Generation:

* Checks available credits
* Deducts credits
* Calls OpenRouter API
* Returns generated website

### Payments:

* Create Razorpay order
* Verify payment signature
* Update user credits

