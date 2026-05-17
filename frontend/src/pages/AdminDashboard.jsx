import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const usersRes = await api.get('/admin/users');
      const internshipsRes = await api.get('/admin/internships');
      const applicationsRes = await api.get('/admin/applications');

      setUsers(usersRes.data.data || []);
      setInternships(internshipsRes.data.data || []);
      setApplications(applicationsRes.data.data || []);
    } catch (error) {
      console.error('Admin dashboard error:', error);
    }
  };

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-4xl font-bold text-gray-900">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-500">
            Total Users
          </h2>

          <p className="text-3xl font-bold mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-500">
            Total Internships
          </h2>

          <p className="text-3xl font-bold mt-2">
            {internships.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-500">
            Applications
          </h2>

          <p className="text-3xl font-bold mt-2">
            {applications.length}
          </p>
        </div>

      </div>

      {/* Users */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Users
        </h2>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div>
                <h3 className="font-bold">
                  {user.fullName}
                </h3>

                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>
              </div>

              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                {user.role}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;