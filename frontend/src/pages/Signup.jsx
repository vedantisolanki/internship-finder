import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { UserPlus, Mail, Lock, User, Phone, Briefcase, GraduationCap } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="card shadow-xl border-t-4 border-t-primary-600">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Join SmartIntern and start your journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="input-field pl-10"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="input-field pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="input-field pl-10"
                placeholder="1234567890"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Join as a</label>
            <div className="grid grid-cols-2 gap-4">
              <label 
                className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.role === 'STUDENT' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="role"
                  value="STUDENT"
                  checked={formData.role === 'STUDENT'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <GraduationCap className={`w-5 h-5 mr-2 ${formData.role === 'STUDENT' ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className="font-bold">Student</span>
              </label>

              <label 
                className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.role === 'RECRUITER' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="role"
                  value="RECRUITER"
                  checked={formData.role === 'RECRUITER'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <Briefcase className={`w-5 h-5 mr-2 ${formData.role === 'RECRUITER' ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className="font-bold">Recruiter</span>
              </label>
              <label 
  className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
    formData.role === 'ADMIN'
      ? 'border-primary-600 bg-primary-50 text-primary-700'
      : 'border-gray-200 hover:border-gray-300'
  }`}
>
  <input
    type="radio"
    className="sr-only"
    name="role"
    value="ADMIN"
    checked={formData.role === 'ADMIN'}
    onChange={(e) =>
      setFormData({ ...formData, role: e.target.value })
    }
  />

  <span className="font-bold">Admin</span>
</label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="input-field pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-bold disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
