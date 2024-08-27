// frontend/src/context/ApplicationContext.js
import React, { createContext, useReducer, useEffect } from 'react';

// Create ApplicationContext
export const ApplicationContext = createContext();

// Define the reducer function
export const applicationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPLICATION':
      console.log('Setting application:', action.payload);
      return { ...state, application: action.payload };
    case 'SET_PAYMENT_STATUS':
      console.log('Setting payment status:', action.payload);
      return { ...state, paymentStatus: action.payload };
    case 'SET_CERTIFIED':
      console.log('Setting certified:', action.payload);
      return { ...state, certified: action.payload };
    case 'SET_HISTORYSET':
      console.log('Setting historyset:', action.payload);
      return { ...state, historyset: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Provider component
export const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, {
    application: null,
    paymentStatus: null, // Initialize as null instead of an empty array
    certified: null,
    historyset: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    try {
      const storedApplication = JSON.parse(localStorage.getItem('application') || 'null');
      const storedPaymentStatus = JSON.parse(localStorage.getItem('paymentStatus') || 'null');
      const storedCertified = JSON.parse(localStorage.getItem('certified') || 'null');
      const storedHistoryset = JSON.parse(localStorage.getItem('historyset') || 'null');

      if (storedApplication) {
        dispatch({ type: 'SET_APPLICATION', payload: storedApplication });
      }
      if (storedPaymentStatus) {
        dispatch({ type: 'SET_PAYMENT_STATUS', payload: storedPaymentStatus });
      }
      if (storedCertified) {
        dispatch({ type: 'SET_CERTIFIED', payload: storedCertified });
      }
      if (storedHistoryset) {
        dispatch({ type: 'SET_HISTORYSET', payload: storedHistoryset });
      }
    } catch (error) {
      console.error('Failed to parse local storage data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load initial data.' });
    }
  }, []);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};
