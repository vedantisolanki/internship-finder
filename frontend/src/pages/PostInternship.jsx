import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  PlusCircle, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  AlignLeft, 
  CheckCircle,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

const PostInternship = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Remote',
    stipend: '',
    duration: '',
    skillsRequired: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Process skills into array
    const processedData = {
      ...formData,
      skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    try {
      await api.post('/internships/post', processedData);
      navigate('/recruiter/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post internship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary-600 transition-colors font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>

      <div className="card shadow-xl border-t-4 border-t-primary-600">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-4">
            <PlusCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Post an Internship</h1>
          <p className="text-gray-500 mt-2">Find the best talent for your team</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Internship Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  name="title"
                  required
                  className="input-field pl-10"
                  placeholder="e.g. Backend Developer Intern"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  name="location"
                  required
                  className="input-field pl-10"
                  placeholder="e.g. Mumbai or Remote"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
              <select
                name="type"
                className="input-field"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Stipend (Monthly)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  name="stipend"
                  required
                  className="input-field pl-10"
                  placeholder="e.g. 15,000"
                  value={formData.stipend}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  name="duration"
                  required
                  className="input-field pl-10"
                  placeholder="e.g. 6 Months"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Required Skills (Comma separated)</label>
              <input
                name="skillsRequired"
                required
                className="input-field"
                placeholder="e.g. React, Node.js, MongoDB, Figma"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="description"
                  required
                  rows="5"
                  className="input-field pl-10 pt-2"
                  placeholder="Describe the role, responsibilities, and perks..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{loading ? 'Posting...' : 'Post Internship'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostInternship;
