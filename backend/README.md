# 🚀 Smart Internship & Opportunity Finder - Backend

A high-performance, scalable, and modular backend system built with **Node.js**, **Express.js**, and **MongoDB**. This project provides a robust foundation for an internship portal, featuring role-based access, smart matching, and comprehensive administrative oversight.

---

## ✨ Key Features

- **🔐 Multi-Role Authentication**: Secure JWT-based login/signup for Students, Recruiters, and Admins.
- **📄 Profile Management**: Professional profiles with resume and company logo upload support.
- **💼 Internship Lifecycle**: Full CRUD operations with advanced search, filtering, and status tracking.
- **🧠 Smart Recommendations**: Skill-based matching system that calculates compatibility scores.
- **📝 Application Tracking**: Seamless application flow with automated recruiter notifications.
- **🔖 Bookmarking**: Students can save internships for future reference.
- **🔔 Notification System**: Internal alerts for status changes and system events.
- **🛡️ Admin Dashboard**: Centralized management of users, internships, and applications.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT (Authentication), Bcrypt (Password Hashing)
- **Validation**: Express Validator
- **File Handling**: Multer
- **Logging**: Morgan (Dev mode)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Clone and Install
```bash
# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

### 4. Seed Database
Populate the system with test accounts and sample internships:
```bash
npm run seed
```

### 5. Start the Server
```bash
# Development (with Nodemon)
npm run dev

# Production
npm start
```

---

## 📂 Folder Structure

```text
src/
├── config/        # Database connection & config
├── controllers/   # Business logic (Controllers)
├── middleware/    # Auth, Validation, Multer, Error handler
├── models/        # Mongoose schemas
├── routes/        # API endpoints
├── services/      # Core logic (e.g., matching)
├── utils/         # Helper functions (ApiError, ApiResponse)
├── uploads/       # Storage for resumes and logos
├── seed/          # Initial test data
├── app.js         # Express app configuration
└── server.js      # Entry point
```

---

## 🔗 API Overview

Detailed API documentation and Postman examples can be found in [POSTMAN_COLLECTION.md](./POSTMAN_COLLECTION.md).

### Quick Reference:
| Category | Endpoint | Method | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/register` | `POST` | Public |
| **Profile** | `/api/v1/profiles/me` | `GET` | User |
| **Internships** | `/api/v1/internships/all` | `GET` | Public |
| **Applications** | `/api/v1/applications/apply` | `POST` | Student |
| **Recommendations** | `/api/v1/recommendations/` | `GET` | Student |
| **Admin** | `/api/v1/admin/users` | `GET` | Admin |

---

## 👨‍💻 Test Credentials
- **Recruiter**: `recruiter@example.com` / `password123`
- **Student**: `student@example.com` / `password123`
- **Admin**: `admin@example.com` / `password123`

---

## 🤝 Contributing
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
