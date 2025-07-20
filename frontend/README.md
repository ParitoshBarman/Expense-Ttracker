
# 🌐 Expense Tracker Frontend (React)

This is the **Frontend** for the Fullstack Expense Tracker Web App. It is built using **React + Vite**, styled with custom CSS, and implements role-based dashboards for Employees and Admins.

---

## ✨ Features

- 🔐 **JWT Authentication** (Login/Register)
- 👥 **Role-based Access Control** (Admin / Employee)
- 🧾 **Expense Management** (Add, View, Upload Receipt)
- 📈 **Admin Panel** with:
  - Monthly and Category-wise Charts (Bar + Line)
  - Status Approval (Approve/Reject Expenses)
  - Audit Logs
  - CSV Export of All Expenses
- 🧠 **Global AuthContext** for user handling
- 🔐 **RoleGuard & RoleBased** Component Protection
- 🔄 Skeleton UI Loader for smooth UX
- 📱 Responsive UI

---

## 🧱 Project Structure

```
frontend
├── README.md        
├── eslint.config.js 
├── index.html       
├── package-lock.json
├── package.json     
├── public
│   └── vite.svg     
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── api
│   │   └── axios.js
│   ├── assets
│   │   └── react.svg
│   ├── auth
│   │   ├── AuthContext.jsx
│   │   └── RoleGuard.jsx
│   ├── components
│   │   ├── Navbar.jsx
│   │   └── RoleBased.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AdminPanel.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── routes
│       └── Routes.jsx
└── vite.config.js
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/ParitoshBarman/Expense-Ttracker.git
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** at root
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

4. **Run the frontend**
```bash
npm run dev
```

---

## 🚧 Notes

- Backend must be running at `http://localhost:5000`
- Admin vs Employee views are automatically decided via user role from JWT token.
- Receipts are uploaded using multipart/form-data.
- Admin panel has CSV export, analytics, and audit logs for transparency.

---

## 🧑‍💻 Tech Stack

- **React** (Vite)
- **Context API** for Auth
- **React Router v6**
- **Axios** for API Calls
- **Chart.js** for Admin Analytics
- **CSS3** for Styling (fully custom)
