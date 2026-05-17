import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  LogOut,
  Bell,
  Menu,
  X,
  PlusCircle
} from 'lucide-react';

const NavLinks = ({ setIsOpen }) => {
  const { user } = useAuth();

  const role = user?.role?.toUpperCase();

  return (
    <>
      {/* Home */}
      <Link
        to="/"
        onClick={() => setIsOpen(false)}
        className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
      >
        Home
      </Link>

      {/* Dashboard */}
      {user && (
        <Link
          to={
            role === 'ADMIN'
              ? '/admin-dashboard'
              : role === 'RECRUITER'
              ? '/recruiter-dashboard'
              : '/student-dashboard'
          }
          onClick={() => setIsOpen(false)}
          className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
        >
          Dashboard
        </Link>
      )}

      {/* Browse */}
      <Link
        to="/internships"
        onClick={() => setIsOpen(false)}
        className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
      >
        Browse
      </Link>

      {/* STUDENT LINKS */}
      {user && role === 'STUDENT' && (
        <>
          <Link
            to="/saved"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
          >
            Saved
          </Link>

          <Link
            to="/resume-analysis"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
          >
            Resume Analysis
          </Link>
        </>
      )}

      {/* RECRUITER LINKS */}
      {user && role === 'RECRUITER' && (
        <Link
          to="/post-internship"
          onClick={() => setIsOpen(false)}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-bold transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Internship</span>
        </Link>
      )}
    </>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role?.toUpperCase();

  const handleLogout = async () => {
    await logout();

    navigate('/login');

    setIsOpen(false);
  };

  const getProfileRoute = () => {
    if (role === 'RECRUITER') return '/recruiter-profile';

    if (role === 'ADMIN') return '/admin-dashboard';

    return '/profile';
  };

  return (
    <nav className="glass sticky top-0 z-50 px-4 md:px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-primary-600"
        >
          <Briefcase className="w-8 h-8" />

          <span className="hidden sm:inline">
            SmartIntern
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks setIsOpen={() => {}} />
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 border-l pl-4 border-gray-200">

              {/* Notifications */}
              <Link
                to="/notifications"
                className="text-gray-500 hover:text-primary-600"
              >
                <Bell className="w-5 h-5" />
              </Link>

              {/* Profile */}
              <Link
                to={getProfileRoute()}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold uppercase ring-2 ring-white">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>

            </div>
          ) : (
            <div className="flex items-center space-x-3">

              <Link
                to="/login"
                className="text-gray-600 font-medium hover:text-primary-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn-primary"
              >
                Sign Up
              </Link>

            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">

          {user && (
            <Link
              to="/notifications"
              className="text-gray-500 hover:text-primary-600"
            >
              <Bell className="w-5 h-5" />
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-primary-600"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 space-y-6 animate-fade-in">

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-4">
            <NavLinks setIsOpen={setIsOpen} />
          </div>

          {/* Mobile User Section */}
          <div className="pt-6 border-t border-gray-100">

            {user ? (
              <div className="space-y-4">

                {/* Mobile Profile */}
                <Link
                  to={getProfileRoute()}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 text-gray-700 font-bold"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 uppercase">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>

                  <span>
                    {user?.fullName || 'User'}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 font-bold"
                >
                  <LogOut className="w-5 h-5" />

                  <span>Logout</span>
                </button>

              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;