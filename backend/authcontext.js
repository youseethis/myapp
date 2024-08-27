import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Logic to check if user is authenticated
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Assume a function to verify token, e.g., verifyToken(token)
      const isTokenValid = verifyToken(token);
      if (isTokenValid) {
        setUser(storedUser);
      } else {
        // If token is invalid, remove user data from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Function to verify token (implementation depends on your authentication method)
  const verifyToken = (token) => {
    // Example logic to verify token (for demonstration purposes only)
    // In a real application, this should involve server-side verification
    return token === 'valid-token-example'; // Replace with actual token verification logic
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
