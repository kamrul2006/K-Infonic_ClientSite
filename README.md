
# 📰 K-Infonic – News Publishing Platform

**K-Infonic** is a full-stack, feature-rich news publishing web application built with **React**, **Node.js**, and **MongoDB**. It empowers users to submit news articles, while admins manage content approval and access control. Premium content is available for subscribed users, offering a dynamic, real-world publishing experience.

---

## 🌐 Live Demo

> 🔗 [Visit the Live Site](https://your-deployment-link.com)
> *(Replace with your actual deployment URL)*

---

## 📌 Features

* 🔐 **Firebase Authentication** – Secure login/signup
* 👥 **Role-Based Access Control** – User & Admin dashboards
* 📝 **User Submissions** – Add, view, and manage articles
* ✅ **Admin Moderation** – Approve or reject user-submitted content
* 💎 **Premium Content** – Paywall for exclusive articles
* 🌓 **Dark Mode** – Toggle light/dark themes
* 📱 **Responsive Design** – Optimized for all devices
* 📊 **Interactive Charts** – Data visualization using Recharts
* 🎨 **Polished UI** – Powered by Tailwind CSS & DaisyUI

---

## 🛠️ Tech Stack

### 🔧 Frontend

* ⚛️ **React 19** (with Vite)
* 🔄 **React Router v7**
* 🌈 **Tailwind CSS 4** + DaisyUI
* ⚙️ **React Hook Form**, **React Select**
* 📦 **Axios**, **SweetAlert2**, **React Icons**, **Recharts**

### ⚙️ Backend

* 🧠 **Node.js**
* 🚀 **Express.js**
* 🗃️ **MongoDB** (Native Driver – no Mongoose)

### 🔐 Authentication

* 🔥 **Firebase Authentication**

---

## 🚀 Getting Started

### 🧰 Prerequisites

* **Node.js** (v16+ recommended)
* **npm**
* **MongoDB** (local or Atlas cloud instance)
* **Firebase Project**

---

### 📦 Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/k-infonic.git
cd k-infonic
```

#### 2. Install Frontend Dependencies

```bash
npm install
```

#### 3. Start Development Server

```bash
npm run dev
```

---

#### Run Backend Server

```bash
node server.js
```

---

## 🔐 Environment Variables

Create `.env` files in both frontend and backend directories.

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# Add other Firebase config variables
```

---

## 📸 Screenshots

<!-- > *Add screenshots or screen recordings here to showcase the UI.* -->
<img src="./src/assets/ss.png" alt="Homepage Screenshot" />


---

## 📜 Common Scripts

```bash
npm run dev        # Start development server
npm run build      # Build app for production
npm run preview    # Preview built app locally
npm run lint       # Run code linting
```

---

## 🧩 Troubleshooting

* **MongoDB Connection Error**
  Ensure your URI string is valid and IP access is enabled if using MongoDB Atlas.

* **Firebase Auth Issues**
  Double-check your Firebase configuration and enabled authentication methods.

* **CORS Issues**
  Make sure `cors()` middleware is enabled on the backend.

---

## 👨‍💻 Author

**Kamrul Islam Apurba**
Frontend Developer
📧 [kamrulislamapurba@gmail.com](mailto:kamrulislamapurba@gmail.com)

---

## 📝 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute as per the license terms.

---


