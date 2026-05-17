import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  PlusCircle, 
  Briefcase, 
  Users, 
  Settings, 
  Trash2, 
  Edit, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="card flex items-center space-x-4">
    <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const RecruiterDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalInternships: 0, totalApplicants: 0 });

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const res = await api.get('/internships/recruiter');
        const data = res.data.data;
        setInternships(data);
        
        const applicantsCount = data.reduce((acc, curr) => acc + (curr.applicants?.length || 0), 0);
        setStats({
          totalInternships: data.length,
          totalApplicants: applicantsCount
        });
      } catch (err) {
        console.error("Failed to fetch recruiter data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await api.delete(`/internships/${id}`);
        setInternships(internships.filter(i => i._id !== id));
      } catch (err) {
        alert("Failed to delete internship");
      }
    }
  };

  if (loading) return <div className="animate-pulse space-y-8"><div className="h-40 bg-gray-100 rounded-2xl" /><div className="grid grid-cols-3 gap-6"><div className="h-32 bg-gray-100 rounded-xl" /><div className="h-32 bg-gray-100 rounded-xl" /><div className="h-32 bg-gray-100 rounded-xl" /></div></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Console</h1>
          <p className="text-gray-500 mt-1">Manage your postings and review talent.</p>
        </div>
        <Link to="/post-internship" className="btn-primary py-3 px-6 flex items-center space-x-2">
          <PlusCircle className="w-5 h-5" />
          <span>Post New Internship</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Postings" value={stats.totalInternships} icon={Briefcase} color="bg-primary-600 text-primary-600" />
        <StatCard title="Total Applications" value={stats.totalApplicants} icon={Users} color="bg-green-600 text-green-600" />
        <StatCard title="Success Rate" value="84%" icon={TrendingUp} color="bg-orange-600 text-orange-600" />
      </div>

      {/* Active Internships Table */}
      <div className="card overflow-hidden !p-0">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Your Active Postings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Internship Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {internships.map((intern) => (
                <tr key={intern._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{intern.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{new Date(intern.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                      {intern.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">{intern.applicants?.length || 0}</span>
                      <Users className="w-4 h-4 text-gray-300" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded uppercase">
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-3">
                      <Link to={`/internships/${intern._id}/applicants`} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Applicants">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link to={`/internships/edit/${intern._id}`} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button onClick={() => handleDelete(intern._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {internships.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                    You haven't posted any internships yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
