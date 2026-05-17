import axios from "axios";

const API = "http://localhost:5000/api/v1/auth";

/**
 * 🔐 LOGIN
 */
const login = (email, password) => {
  return axios.post(`${API}/login`, {
    email,
    password
  });
};

/**
 * 📝 SIGNUP (IMPORTANT FIX)
 */
const register = (data) => {
  return axios.post(`${API}/signup`, data);
};

/**
 * 👤 GET PROFILE
 */
const getMe = () => {
  return axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

/**
 * 🚪 LOGOUT
 */
const logout = () => {
  return axios.post(`${API}/logout`);
};

export default {
  login,
  register,
  getMe,
  logout
};