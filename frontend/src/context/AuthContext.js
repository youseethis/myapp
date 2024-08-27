// frontend/src/context/AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (userToken && userDetails) {
      dispatch({ type: 'LOGIN', payload: { ...userDetails, token: userToken } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
