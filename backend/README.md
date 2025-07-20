
# 💼 Expense Tracker API (Backend)

This is the backend for the Fullstack Expense Tracker app for remote teams. It provides secure authentication, role-based access, expense tracking, audit logging, admin analytics, CSV export, and file uploads.

---

## 🚀 Features

- 🔐 JWT Authentication (Login/Register)
- 👥 Role-based access control (Employee/Admin)
- 📊 Expense tracking (with status management)
- 📈 Admin analytics with insights (category/month-wise)
- 📝 Audit logs of key actions
- 🧾 CSV export for reports
- 📁 Receipt upload support
<!-- - 🐳 Docker-ready (optional) -->

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **JWT** for Auth
- **Multer** for file uploads
- **json2csv** for CSV export

---

## 📁 Project Structure (MVC Pattern)

```
backend
├── README.md
├── config
│   └── db.js
├── controllers
│   ├── analyticsController.js
│   ├── auditLogController.js 
│   ├── authController.js     
│   └── expenseController.js  
├── index.js
├── middlewares
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── uploadMiddleware.js
├── models
│   ├── AuditLog.js
│   ├── Expense.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── analyticsRoutes.js
│   ├── auditRoutes.js
│   ├── authRoutes.js
│   └── expenseRoutes.js
└── uploads  // updoaded files
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/ParitoshBarman/Expense-Ttracker.git
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key
```

4. **Run the server**
```bash
npm run start
```

---

## 🔐 API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Expenses
- `POST /api/expenses` (Employee)
- `GET /api/expenses/my` (Employee)
- `GET /api/expenses/all` (Admin)
- `PUT /api/expenses/:id/status` (Admin)
- `GET /api/expenses/export/csv` (Admin)
- `POST /api/expenses/with-receipt` (File upload)

### Audit Logs
- `GET /api/audit` (Admin)

### Analytics
- `GET /api/analytics/category` (Admin)
- `GET /api/analytics/monthly` (Admin)

---



---

## 📬 Postman Collection

To test all available API routes easily, a Postman collection is included.

- **File Name:** `Expense Ttracker.postman_collection.json`
- **Location:** Root of the backend directory

### 📥 How to Use

1. Open **Postman**
2. Go to **File > Import**
3. Select `Expense Ttracker.postman_collection.json` from the backend folder
4. Use the saved requests to test all routes including:
   - 🔐 Authentication
   - 📤 File uploads
   - 📊 Analytics
   - ✅ Status updates
   - 📁 CSV export

> ⚠️ Ensure the server is running and the `.env` is configured before testing.

📎 [Click to Download Expense Ttracker.postman_collection.json](./Expense%20Ttracker.postman_collection.json)

---
