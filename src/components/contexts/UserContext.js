import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const googleSheetURL = process.env.REACT_APP_API_KEY_MEMBER;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there's a user session saved in cookies
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, phone) => {
    try {
      const url = `${googleSheetURL}?email=${email}&phone=${phone}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); 
      if (data.error) {
        throw new Error(data.error);
      }

      setUser(data);
      // Save user session in a cookie
      Cookies.set('user', JSON.stringify(data), {
        expires: 7, // Set the cookie to expire in 7 days
        // secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        sameSite: 'Strict', // Prevent CSRF attacks
      });
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user'); // Remove user session from cookies
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
