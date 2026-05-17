import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InternshipList from './pages/InternshipList';
import InternshipDetails from './pages/InternshipDetails';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentProfile from './pages/StudentProfile';
import RecruiterProfile from './pages/RecruiterProfile';
import Notifications from './pages/Notifications';
import ApplicationTracking from './pages/ApplicationTracking';
import SavedInternship from './pages/SavedInternship';
import PostInternship from './pages/PostInternship';
import ResumeAnalysis from './pages/ResumeAnalysis';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="internships" element={<InternshipList />} />
        <Route path="internship/:id" element={<InternshipDetails />} />
        <Route 
  path="student-dashboard" 
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  } 
/>
<Route
  path="admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="profile"
  element={
    <ProtectedRoute>
      <StudentProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="recruiter-profile"
  element={
    <ProtectedRoute>
      <RecruiterProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="applications"
  element={
    <ProtectedRoute>
      <ApplicationTracking />
    </ProtectedRoute>
  }
/>
<Route
  path="saved"
  element={
    <ProtectedRoute>
      <SavedInternship />
    </ProtectedRoute>
  }
/>
<Route
  path="post-internship"
  element={
    <ProtectedRoute>
      <PostInternship />
    </ProtectedRoute>
  }
/>
<Route 
  path="recruiter-dashboard" 
  element={
    <ProtectedRoute>
      <RecruiterDashboard />
    </ProtectedRoute>
  } />

  <Route
  path="resume-analysis"
  element={
    <ProtectedRoute>
      <ResumeAnalysis />
    </ProtectedRoute>
  }
/>
</Route>

  <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;