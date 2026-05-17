import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Save, 
  Upload,
  AlignLeft,
  CheckCircle,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

const RecruiterProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    companyName: '',
    companyBio: '',
    companyLocation: '',
    companyWebsite: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profiles/me');
        const profile = res.data.data.profile;
        if (profile) {
          setFormData({
            companyName: profile.companyName || '',
            companyBio: profile.companyBio || '',
            companyLocation: profile.companyLocation || '',
            companyWebsite: profile.companyWebsite || ''
          });
          if (profile.companyLogo) {
            setPreviewUrl(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${profile.companyLogo}`);
          }
        }
      } catch (err) {
        console.error("Failed to fetch recruiter profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('companyName', formData.companyName);
    data.append('companyBio', formData.companyBio);
    data.append('companyLocation', formData.companyLocation);
    data.append('companyWebsite', formData.companyWebsite);
    if (logoFile) {
      data.append('logo', logoFile);
    }

    try {
      await api.post('/profiles/recruiter/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Company profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8 py-12 max-w-4xl mx-auto"><div className="h-40 bg-gray-100 rounded-2xl" /><div className="h-96 bg-gray-100 rounded-2xl" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary-600 transition-colors font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="relative group">
          <div className="w-32 h-32 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border-4 border-white shadow-lg">
            {previewUrl ? (
              <img src={previewUrl} alt="Company Logo" className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-12 h-12" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Upload className="w-6 h-6 text-white" />
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-extrabold text-gray-900">{formData.companyName || 'Your Company Name'}</h1>
          <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mt-1">Recruiter Profile</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 text-gray-500 text-sm">
            <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {user?.email}</span>
            <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {user?.phoneNumber}</span>
          </div>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 text-sm ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="card space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-primary-600" /> Company Basics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
              <input 
                required
                className="input-field" 
                placeholder="Tech Solutions Inc."
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  className="input-field pl-10" 
                  placeholder="https://example.com"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Company Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  required
                  className="input-field pl-10" 
                  placeholder="e.g. Bangalore, KA"
                  value={formData.companyLocation}
                  onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="card space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <AlignLeft className="w-5 h-5 mr-2 text-primary-600" /> About the Company
          </h2>
          <textarea 
            rows="6"
            className="input-field" 
            placeholder="Describe your company culture, mission, and why students should join..."
            value={formData.companyBio}
            onChange={(e) => setFormData({ ...formData, companyBio: e.target.value })}
          />
        </section>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={updating}
            className="btn-primary py-4 px-12 text-lg font-bold flex items-center space-x-2 shadow-xl shadow-primary-100"
          >
            <Save className="w-5 h-5" />
            <span>{updating ? 'Updating...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfile;
