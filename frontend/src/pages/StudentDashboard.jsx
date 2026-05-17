import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Briefcase, 
  BookMarked, 
  CheckCircle, 
  Bell, 
  TrendingUp, 
  User, 
  MapPin, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, icon: Icon, children, link, linkText }) => (
  <div className="card h-full flex flex-col">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      {link && (
        <Link to={link} className="text-primary-600 text-sm font-semibold hover:underline flex items-center">
          {linkText} <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    recommendations: [],
    saved: [],
    applications: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [recRes, savedRes, appRes, notifRes] = await Promise.all([
          api.get('/recommendations'),
          api.get('/saved'),
          api.get('/applications/my'),
          api.get('/notifications')
        ]);

        setData({
          recommendations: recRes.data.data.slice(0, 3),
          saved: savedRes.data.data.slice(0, 3),
          applications: appRes.data.data.slice(0, 5),
          notifications: notifRes.data.data.slice(0, 5)
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-100 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="glass p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-bold uppercase ring-4 ring-white shadow-lg">
            {user?.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.fullName.split(' ')[0]}! 👋</h1>
            <p className="text-gray-500 mt-1">Check your latest updates and recommended opportunities.</p>
          </div>
        </div>
        <Link to="/profile" className="btn-primary">View Profile</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Updates */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Applications Status */}
          <DashboardCard title="My Applications" icon={CheckCircle} link="/applications" linkText="View All">
            {data.applications.length > 0 ? (
              <div className="space-y-4">
                {data.applications.map(app => (
                  <div key={app._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                    <div>
                      <h4 className="font-bold text-gray-900">{app.internship?.title}</h4>
                      <p className="text-sm text-gray-500">{app.internship?.recruiter?.fullName || 'Company'}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      app.status === 'Selected' ? 'bg-green-100 text-green-700' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      app.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 italic">No applications yet. Start applying!</div>
            )}
          </DashboardCard>

          {/* Recommended Internships */}
          <DashboardCard title="Recommended for You" icon={TrendingUp} link="/recommendations" linkText="See More">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.recommendations.map(intern => (
                <Link to={`/internships/${intern._id}`} key={intern._id} className="p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{intern.matchScore}% Match</span>
                    <Briefcase className="w-4 h-4 text-gray-300 group-hover:text-primary-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 group-hover:text-primary-600">{intern.title}</h4>
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {intern.location}
                  </div>
                </Link>
              ))}
              {data.recommendations.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500 italic">Complete your skills to get recommendations.</div>
              )}
            </div>
          </DashboardCard>
        </div>

        {/* Right Column - Quick Access */}
        <div className="space-y-8">
          
          {/* Notifications */}
          <DashboardCard title="Recent Alerts" icon={Bell} link="/notifications" linkText="View All">
            <div className="space-y-4">
              {data.notifications.map(notif => (
                <div key={notif._id} className={`p-3 rounded-lg text-sm flex items-start space-x-3 ${notif.isRead ? 'opacity-60' : 'bg-primary-50 border-l-4 border-primary-500'}`}>
                  <div className="shrink-0 mt-1">
                    <Bell className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-gray-700 leading-tight">{notif.message}</p>
                </div>
              ))}
              {data.notifications.length === 0 && (
                <div className="text-center py-8 text-gray-500 italic">All caught up!</div>
              )}
            </div>
          </DashboardCard>

          {/* Saved Internships */}
          <DashboardCard title="Saved" icon={BookMarked} link="/saved" linkText="View All">
            <div className="space-y-3">
              {data.saved.map(item => (
                <Link to={`/internships/${item.internship?._id}`} key={item._id} className="block p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm">{item.internship?.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.internship?.location}</p>
                </Link>
              ))}
              {data.saved.length === 0 && (
                <div className="text-center py-8 text-gray-500 italic">No saved internships.</div>
              )}
            </div>
          </DashboardCard>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
