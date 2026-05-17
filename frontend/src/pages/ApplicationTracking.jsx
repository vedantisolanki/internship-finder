import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Briefcase, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const styles = {
    Applied: 'bg-orange-50 text-orange-700 border-orange-100',
    Shortlisted: 'bg-blue-50 text-blue-700 border-blue-100',
    Rejected: 'bg-red-50 text-red-700 border-red-100',
    Selected: 'bg-green-50 text-green-700 border-green-100'
  };

  const icons = {
    Applied: <Clock className="w-3 h-3 mr-1" />,
    Shortlisted: <Filter className="w-3 h-3 mr-1" />,
    Rejected: <XCircle className="w-3 h-3 mr-1" />,
    Selected: <CheckCircle className="w-3 h-3 mr-1" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[status] || styles.Applied}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const ApplicationTracking = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        setApplications(res.data.data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div className="animate-pulse space-y-6 py-12 max-w-5xl mx-auto">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Application Tracking</h1>
          <p className="text-gray-500 mt-1">Keep track of your journey and interview status.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          <span className="font-bold text-primary-600">{applications.length}</span>
          <span>Applications Submitted</span>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block card !p-0 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Internship Role</th>
                  <th className="px-6 py-4">Applied On</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{app.internship?.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{app.internship?.recruiter?.fullName || 'Partner Co.'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link to={`/internships/${app.internship?._id}`} className="text-gray-400 hover:text-primary-600 transition-colors inline-flex items-center text-sm font-bold">
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="card space-y-4 border-l-4 border-l-primary-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{app.internship?.title}</h3>
                    <p className="text-sm text-gray-500">{app.internship?.recruiter?.fullName}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                  <Link to={`/internships/${app.internship?._id}`} className="text-primary-600 text-xs font-bold flex items-center">
                    View Posting <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No applications yet</h3>
          <p className="text-gray-500 mt-1 max-w-xs mx-auto">Start exploring internships and take the first step towards your career!</p>
          <Link to="/internships" className="btn-primary mt-6 inline-block">Browse Internships</Link>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracking;
