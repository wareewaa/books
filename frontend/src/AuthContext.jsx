import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    const response = await axios.post('http://localhost:8000/api/login/', { username, password });
    if (response.data) {
      setCurrentUser(response.data); // Assuming the API returns user data on successful login
    }
  };

  const logout = () => {
    // Perform logout. This could involve removing user data from state and any tokens from storage.
    setCurrentUser(null);
    // Optionally, redirect to login or another page.
  };

  useEffect(() => {
    // Optionally, check local storage or session for an existing login session/token on app load
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
