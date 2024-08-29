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
      // console.log(data); 
      if (data.error) {
        throw new Error(data.error);
      }
      data.isAdmin = data.isAdmin === 1
      data.isClubPaid = data.isClubPaid === 1
      data.isRecPaid = data.isRecPaid === 1
      data.isProspect = data.isProspect ===1 
      

      setUser(data);
      // Save user session in a cookie
      Cookies.set('user', JSON.stringify(data), {
        expires: 7, // Set the cookie to expire in 7 days
        // secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        sameSite: 'Strict', // Prevent CSRF attacks
      });
      return {success:true}
    } catch (error) {
      return {success:false}
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user'); // Remove user session from cookies
  };

  return (
    <UserContext.Provider value={{ user,setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
