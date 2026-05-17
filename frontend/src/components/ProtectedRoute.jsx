// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Loader2 } from 'lucide-react';

// /**
//  * @description Higher Order Component to protect routes based on authentication and roles
//  * @param {React.ReactNode} children - The component to render if authorized
//  * @param {Array<string>} roles - Optional array of authorized roles (e.g., ['STUDENT', 'RECRUITER'])
//  */
// const ProtectedRoute = ({ children, roles }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   // Show a premium loader while checking auth state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
//         <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
//         <p className="text-gray-500 font-medium animate-pulse">Authenticating...</p>
//       </div>
//     );
//   }

//   // If not logged in, redirect to login but save the current location to redirect back after login
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If roles are specified and user doesn't have the required role
//   if (roles && !roles.includes(user.role)) {
//     // Redirect to home or a custom "Unauthorized" page
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;