import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  CheckCircle, 
  BookMarked,
  Share2,
  Building,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/internships/${id}`);
        setInternship(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleApply = async () => {
    if (!user) return navigate('/login');
    setApplying(true);
    try {
      await api.post('/applications/apply', { internshipId: id });
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to apply' });
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    if (!user) return navigate('/login');
    setSaving(true);
    try {
      await api.post('/saved/save', { internshipId: id });
      setMessage({ type: 'success', text: 'Internship saved to bookmarks!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Already saved' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8 max-w-4xl mx-auto py-12"><div className="h-10 w-40 bg-gray-100 rounded" /><div className="h-64 bg-gray-100 rounded-3xl" /></div>;
  if (!internship) return <div className="text-center py-20 text-gray-500">Internship not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary-600 transition-colors font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Listings
      </button>

      {/* Hero Section */}
      <div className="glass p-8 rounded-3xl shadow-xl border-primary-50">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-widest">
                {internship.type}
              </span>
              <span className="text-gray-400 text-sm">{new Date(internship.createdAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{internship.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium">
              <div className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary-500" />
                {internship.recruiter?.fullName || 'Partner Company'}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                {internship.location}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="btn-secondary flex-grow flex items-center justify-center space-x-2 py-3 px-6"
            >
              <BookMarked className={`w-5 h-5 ${saving ? 'animate-bounce' : ''}`} />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button className="btn-secondary p-3"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-100">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stipend</p>
            <p className="text-lg font-bold text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-1 text-green-500" /> {internship.stipend}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Duration</p>
            <p className="text-lg font-bold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-1 text-orange-500" /> {internship.duration}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Postings</p>
            <p className="text-lg font-bold text-gray-900 flex items-center">
              <Briefcase className="w-5 h-5 mr-1 text-blue-500" /> {internship.status}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Open Until</p>
            <p className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-1 text-red-500" /> Flexible
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {internship.description}
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-3">
              {internship.skillsRequired?.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-100 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary-500" />
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="card sticky top-24 border-primary-100 ring-4 ring-primary-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Apply for this role</h3>
            <p className="text-sm text-gray-500 mb-6">Your profile and resume will be shared with the recruiter immediately.</p>
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 text-sm ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}

            <button 
              onClick={handleApply}
              disabled={applying || internship.status !== 'Open'}
              className="btn-primary w-full py-4 text-lg font-bold disabled:bg-gray-300 shadow-xl shadow-primary-100"
            >
              {applying ? 'Applying...' : internship.status === 'Open' ? 'Submit Application' : 'Currently Closed'}
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Secure Application Process</p>
          </div>

          <div className="card bg-gray-900 text-white border-none">
            <h3 className="font-bold mb-2">Need Help?</h3>
            <p className="text-gray-400 text-sm mb-4">If you have any questions regarding the application process, feel free to contact our support.</p>
            <Link to="/help" className="text-primary-400 font-bold hover:underline text-sm">Visit Help Center</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
