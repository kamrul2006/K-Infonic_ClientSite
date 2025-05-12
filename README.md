# 📰 K-Infonic - News Publishing Platform

K-Infonic is a full-stack news publishing web application built with React, Node.js, and MongoDB. It supports **user-generated content**, **role-based navigation**, **admin approval**, and **premium content access** through subscription.

---

## 🌐 Live Site

> 🔗 [Live Demo (if available)](https://your-deployment-link.com)

---

## 📌 Features

- 🔒 **Authentication** with Firebase
- 👥 **Role-Based Access** for Users & Admins
- 📝 Users can **Add Articles**
- 🗂 Admins can **Approve or Reject** articles
- 💎 **Premium Articles** locked behind subscription
- 🖼️ Clean UI with **Dark Mode** and **Responsive Design**
- 📈 Charting & UI Enhancements with Recharts, SweetAlert2, etc.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19 (with Vite)
- 🌐 React Router v7
- 🎨 Tailwind CSS 4 + DaisyUI
- 📦 Axios, SweetAlert2, React Icons, Recharts
- 🔄 React Hook Form, React Select

### Backend
- 🧠 Node.js
- 🚀 Express.js
- 🗃️ MongoDB (no Mongoose)

### Auth
- 🔐 Firebase Authentication

---

## 📂 Folder Structure (Frontend)

src/
├── assets/ # Static assets like logo
├── components/ # Reusable UI components
├── pages/ # Route pages (AddArticle, AllArticles, etc.)
├── Auth/Providers/ # Auth context and hooks
├── layouts/ # Shared layout components (Navbar, Footer)
├── utils/ # Utility functions

yaml
Copy
Edit

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js and npm
- MongoDB (local or cloud)

---

### 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/k-infonic.git
cd k-infonic
Install frontend dependencies
```

```bash
Copy
Edit
npm install
Run development server
```
```bash
Copy
Edit
npm run dev
```
🔌 Backend Setup
Create a separate folder backend/ and add your server.js

Sample backend route for fetching user by email:

```js
Copy
Edit
app.get('/users', async (req, res) => {
    const email = req.query.email;
    const result = await usersCollection.findOne({ email });
    res.send(result);
});
Run server:
```
```bash
Copy
Edit
node server.js
```

🔐 Environment Variables
Create a .env file in your frontend and backend:

.env (Frontend)
```makefile
Copy
Edit
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
...

```

🎨 Screenshots


📚 Scripts
```bash
Copy
Edit
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run eslint
```

👨‍💻 Author
Kamrul Islam Apurba
Frontend Developer 
- kamrulislamapurba@gmail.com