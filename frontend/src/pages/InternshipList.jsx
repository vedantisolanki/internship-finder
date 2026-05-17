import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    skills: '',
    minStipend: ''
  });

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
      ).toString();
      const res = await api.get(`/internships/all?${queryParams}`);
      setInternships(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: '', location: '', type: '', skills: '', minStipend: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header & Search */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Find Your Next <span className="text-primary-600">Opportunity</span></h1>
          <p className="text-gray-500 mt-2 text-lg">Browse thousands of verified internships from top companies.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input 
              name="search"
              placeholder="Search by role, company, or keywords..." 
              className="input-field pl-12 py-4 text-base shadow-lg border-none ring-1 ring-gray-200 focus:ring-2" 
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary px-6 flex items-center space-x-2 ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-600' : ''}`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button onClick={fetchInternships} className="btn-primary px-8 py-4 text-lg">Search</button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-6 border-primary-100 shadow-xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input name="location" className="input-field pl-9 text-sm" placeholder="City or Remote" value={filters.location} onChange={handleFilterChange} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Internship Type</label>
                <select name="type" className="input-field text-sm" value={filters.type} onChange={handleFilterChange}>
                  <option value="">All Types</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Min Stipend (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input name="minStipend" type="number" className="input-field pl-9 text-sm" placeholder="e.g. 10000" value={filters.minStipend} onChange={handleFilterChange} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Skills</label>
                <input name="skills" className="input-field text-sm" placeholder="e.g. React, Node" value={filters.skills} onChange={handleFilterChange} />
              </div>
              <div className="md:col-span-4 flex justify-end pt-2">
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-red-600 font-medium underline">Clear All Filters</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3,4,5,6].map(i => <div key={i} className="h-72 bg-gray-100 animate-pulse rounded-2xl" />)
        ) : internships.length > 0 ? (
          internships.map(intern => (
            <motion.div 
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={intern._id} 
              className="card group hover:shadow-2xl hover:border-primary-200 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-widest border border-green-100">
                  {intern.type}
                </span>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{intern.title}</h3>
                <p className="text-gray-500 font-medium mt-1">{intern.recruiter?.fullName || 'Tech Partner'}</p>
                
                <div className="grid grid-cols-2 gap-y-3 mt-6">
                  <div className="flex items-center text-gray-600 text-xs font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                    {intern.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-xs font-medium">
                    <DollarSign className="w-4 h-4 mr-2 text-primary-400" />
                    {intern.stipend}
                  </div>
                  <div className="flex items-center text-gray-600 text-xs font-medium">
                    <Clock className="w-4 h-4 mr-2 text-primary-400" />
                    {intern.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {intern.skillsRequired?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded border border-gray-100">
                      {skill}
                    </span>
                  ))}
                  {intern.skillsRequired?.length > 3 && <span className="text-[10px] text-gray-400 font-bold">+{intern.skillsRequired.length - 3}</span>}
                </div>
              </div>

              <Link to={`/internships/${intern._id}`} className="btn-primary w-full mt-8 py-3 group-hover:scale-105 transition-transform">
                Apply Now
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 glass rounded-3xl border-dashed border-2 border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No internships found</h2>
            <p className="text-gray-500">Try adjusting your filters or searching for different keywords.</p>
            <button onClick={clearFilters} className="btn-secondary mt-6">View All Opportunities</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipList;
