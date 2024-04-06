// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    // Perform any additional login operations here
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    // Perform any logout operations here
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
