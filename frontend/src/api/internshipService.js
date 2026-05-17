import api from './axios';

const internshipService = {
  /**
   * @description Fetch all internships with optional filters
   */
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
    ).toString();
    const response = await api.get(`/internships/all?${queryParams}`);
    return response.data;
  },

  /**
   * @description Get details of a single internship
   */
  getById: async (id) => {
    const response = await api.get(`/internships/${id}`);
    return response.data;
  },

  /**
   * @description Get internships posted by the logged-in recruiter
   */
  getRecruiterInternships: async () => {
    const response = await api.get('/internships/recruiter');
    return response.data;
  },

  /**
   * @description Post a new internship (Recruiter only)
   */
  create: async (internshipData) => {
    const response = await api.post('/internships/post', internshipData);
    return response.data;
  },

  /**
   * @description Update an internship
   */
  update: async (id, internshipData) => {
    const response = await api.patch(`/internships/${id}`, internshipData);
    return response.data;
  },

  /**
   * @description Delete an internship
   */
  delete: async (id) => {
    const response = await api.delete(`/internships/${id}`);
    return response.data;
  }
};

export default internshipService;
