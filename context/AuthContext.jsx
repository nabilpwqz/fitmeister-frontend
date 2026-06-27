import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitmeister_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('fitmeister_token'));

  useEffect(() => {
    if (user) localStorage.setItem('fitmeister_user', JSON.stringify(user));
    else localStorage.removeItem('fitmeister_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('fitmeister_token', token);
    else localStorage.removeItem('fitmeister_token');
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
    setUser(response.data.user);
    setToken(response.data.token);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, { name, email, password });
    setUser(response.data.user);
    setToken(response.data.token);
    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
