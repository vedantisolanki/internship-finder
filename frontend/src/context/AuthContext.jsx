import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🔄 Load user on refresh
   */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getMe();

        const userData = res?.data?.data?.user || res?.data?.user || res?.data;

        setUser(userData);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem('accessToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * 🔐 LOGIN (FIXED)
   */
  const login = async (email, password) => {
    const res = await authService.login(email, password);

    const data = res?.data?.data;

    if (!data) {
      throw new Error("Invalid login response");
    }

    const { user, accessToken } = data;

    localStorage.setItem("accessToken", accessToken);
    setUser(user);

    return data; // 🔥 return clean data only
  };

  /**
   * 🚪 LOGOUT
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);