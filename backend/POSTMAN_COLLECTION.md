# Smart Internship & Opportunity Finder - Postman API Documentation

This document provides examples for all available APIs. You can copy these into Postman to test the backend.

**Base URL**: `http://localhost:5000/api/v1`

---

## 🔐 Authentication

### 1. Register User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Body (JSON)**:
```json
{
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "role": "STUDENT",
    "phoneNumber": "1234567890"
}
```

### 2. Login User
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Body (JSON)**:
```json
{
    "email": "jane@example.com",
    "password": "password123"
}
```

---

## 👤 Profiles

### 3. Get My Profile
- **Method**: `GET`
- **Endpoint**: `/profiles/me`
- **Headers**: `Authorization: Bearer <token>`

### 4. Update Student Profile
- **Method**: `POST`
- **Endpoint**: `/profiles/student/update`
- **Body (form-data)**:
    - `bio`: "Passionate developer"
    - `skills`: "React,Node.js"
    - `location`: "Mumbai"
    - `resume`: [File Upload]

---

## 💼 Internships

### 5. Get All Internships
- **Method**: `GET`
- **Endpoint**: `/internships/all?location=Remote&type=Remote`

### 6. Post Internship (Recruiter Only)
- **Method**: `POST`
- **Endpoint**: `/internships/post`
- **Body (JSON)**:
```json
{
    "title": "Software Engineer Intern",
    "description": "Building cool stuff",
    "skillsRequired": "Java,Python",
    "location": "Bangalore",
    "stipend": "15,000",
    "duration": "6 months",
    "type": "On-site"
}
```

---

## 📝 Applications

### 7. Apply for Internship
- **Method**: `POST`
- **Endpoint**: `/applications/apply`
- **Body (JSON)**:
```json
{
    "internshipId": "INTERNSHIP_ID_HERE"
}
```

### 8. Update Application Status (Recruiter Only)
- **Method**: `PATCH`
- **Endpoint**: `/applications/status/APPLICATION_ID_HERE`
- **Body (JSON)**:
```json
{
    "status": "Shortlisted"
}
```

---

## ✨ Recommendations

### 9. Get Recommendations
- **Method**: `GET`
- **Endpoint**: `/recommendations`
- **Headers**: `Authorization: Bearer <token>`

---

## 🔖 Saved / Bookmarks

### 10. Save Internship
- **Method**: `POST`
- **Endpoint**: `/saved/save`
- **Body (JSON)**:
```json
{
    "internshipId": "INTERNSHIP_ID_HERE"
}
```

---

## 🛠️ Admin Features

### 11. View All Users
- **Method**: `GET`
- **Endpoint**: `/admin/users`

### 12. View All Applications
- **Method**: `GET`
- **Endpoint**: `/admin/applications`
