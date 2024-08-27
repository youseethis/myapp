// frontend/src/components/GetApplication.js
import React, { useContext } from 'react';
import useApplicationData from '../hooks/useApplicationData';
import { ApplicationContext } from '../context/ApplicationContext';

const GetApplication = () => {
  const { dispatch } = useContext(ApplicationContext); // Access the dispatch function from ApplicationContext
  const { applicationExists, applicationData, loading, error } = useApplicationData(dispatch);

  // Handle application existence logic
  if (loading) return null; // Handle loading state if needed

  if (error) {
    console.error('Error fetching application:', error);
    return null; // Handle error state if needed
  }

  return { applicationExists, applicationData }; // Return application existence and data
};

export default GetApplication;
