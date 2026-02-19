# 🚗 Netradyne Alerts Dashboard – Demo Clone

This project is a full-stack demo clone of a Netradyne-style Alerts Dashboard.

It dynamically displays alert cards from a local JSON file, supports filtering and sorting, and allows users to view full alert details in a popup modal.

---

# 🛠 Tech Stack

### Frontend
- React (Vite)
- CSS

### Backend
- Node.js
- Express

---

# 📂 Project Structure

```
netradyne-demo/
│
├── backend/
│   ├── server.js        # Express API server
│   ├── alerts.json      # Dummy alert data
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Prerequisites

Make sure the following are installed:

- Node.js (v16 or above recommended)
- npm

Check versions:

```bash
node -v
npm -v
```

---

# 🚀 Complete Setup & Run Instructions

Follow these steps after cloning the repository.

---

## 1️⃣ Clone The Repository

```bash
git clone <your-repository-url>
cd netradyne-demo
```

---

## 2️⃣ Install & Run Backend

### Navigate to backend folder:

```bash
cd backend
```

### Install dependencies:

```bash
npm install
```

### Start the backend server:

```bash
node server.js
```

You should see:

```
Server running on http://localhost:5000
```

Backend is now running at:

```
http://localhost:5000
```

⚠️ Keep this terminal running.

---

## 3️⃣ Install & Run Frontend

Open a **new terminal window**.

### Navigate to frontend folder:

```bash
cd frontend
```

### Install dependencies:

```bash
npm install
```

### Start development server:

```bash
npm run dev
```

You should see something like:

```
Local: http://localhost:5173
```

Open this URL in your browser:

```
http://localhost:5173
```

Dashboard should now be running successfully.

---
