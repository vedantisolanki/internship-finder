import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Bookmark, MapPin } from 'lucide-react';

const SavedInternships = () => {
  const [savedInternships, setSavedInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedInternships = async () => {
      try {
        const res = await api.get('/saved');

        setSavedInternships(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch saved internships', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedInternships();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <Bookmark className="w-7 h-7 text-primary-600" />
        <h1 className="text-3xl font-bold">Saved Internships</h1>
      </div>

      {savedInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedInternships.map((item) => (
            <Link
              to={`/internships/${item.internship?._id}`}
              key={item._id}
              className="border rounded-xl p-5 hover:shadow-lg transition-all bg-white"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {item.internship?.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.internship?.company || 'Company'}
              </p>

              <div className="flex items-center text-sm text-gray-400 mt-3">
                <MapPin className="w-4 h-4 mr-1" />
                {item.internship?.location}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-16">
          No saved internships found.
        </div>
      )}
    </div>
  );
};

export default SavedInternships;