import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Save, 
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const StudentProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    education: [{ school: '', degree: '', year: '' }],
    skills: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profiles/me');
        const profile = res.data.data;
        if (profile) {
          setFormData({
            bio: profile.bio || '',
            location: profile.location || '',
            education: profile.education?.length > 0 ? profile.education : [{ school: '', degree: '', year: '' }],
            skills: profile.skills?.join(', ') || ''
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEducationChange = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index][field] = value;
    setFormData({ ...formData, education: newEdu });
  };

  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, { school: '', degree: '', year: '' }] });
  };

  const removeEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEdu });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('bio', formData.bio);
    data.append('location', formData.location);
    data.append('skills', formData.skills);
    data.append('education', JSON.stringify(formData.education));
    if (resumeFile) {
      data.append('resume', resumeFile);
    }

    try {
      const res = await api.post('/profiles/student/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      // Update local auth context if needed
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8 py-12"><div className="h-40 bg-gray-100 rounded-2xl" /><div className="h-96 bg-gray-100 rounded-2xl" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-5xl font-bold uppercase border-4 border-white shadow-lg">
          {user?.fullName?.charAt(0)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900">{user?.fullName}</h1>
          <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mt-1">{user?.role}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-500 text-sm">
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
        {/* Bio & Basics */}
        <section className="card space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary-600" /> Professional Summary
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">About Me</label>
              <textarea 
                rows="4"
                className="input-field" 
                placeholder="Share your passion, goals, and experience..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Current Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  className="input-field pl-10" 
                  placeholder="e.g. Mumbai, India"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="card space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-primary-600" /> Education
            </h2>
            <button type="button" onClick={addEducation} className="text-primary-600 text-sm font-bold flex items-center hover:underline">
              <Plus className="w-4 h-4 mr-1" /> Add Education
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.education.map((edu, idx) => (
              <div key={idx} className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                {idx > 0 && (
                  <button type="button" onClick={() => removeEducation(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Institution</label>
                  <input className="input-field" placeholder="University Name" value={edu.school} onChange={(e) => handleEducationChange(idx, 'school', e.target.value)} />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Degree</label>
                  <input className="input-field" placeholder="B.Tech, MBA, etc." value={edu.degree} onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)} />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Year</label>
                  <input className="input-field" placeholder="e.g. 2024" value={edu.year} onChange={(e) => handleEducationChange(idx, 'year', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Resume */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="card space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-primary-600" /> Skills
            </h2>
            <p className="text-xs text-gray-500">Add comma-separated skills (e.g. React, Node, Python)</p>
            <input 
              className="input-field" 
              placeholder="React, JavaScript, AWS..." 
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </section>

          <section className="card space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary-600" /> Resume / CV
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center space-y-4 hover:border-primary-400 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto text-primary-600">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{resumeFile ? resumeFile.name : 'Upload New Resume'}</p>
                <p className="text-xs text-gray-500">PDF, DOC (Max 5MB)</p>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={updating}
            className="btn-primary py-4 px-12 text-lg font-bold flex items-center space-x-2 shadow-xl shadow-primary-100"
          >
            <Save className="w-5 h-5" />
            <span>{updating ? 'Updating Profile...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
