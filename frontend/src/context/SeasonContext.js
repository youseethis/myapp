// frontend/context/SeasonContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const SeasonContext = createContext();

// Create a custom hook for accessing the SeasonContext
export const useSeasonContext = () => useContext(SeasonContext);

// Provider component
export const SeasonContextProvider = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState(null);

  useEffect(() => {
    // Check if there is a stored season in local storage
    const storedSeason = JSON.parse(localStorage.getItem('currentSeason'));
    if (storedSeason) {
      setCurrentSeason(storedSeason);
    }
  }, []);

  useEffect(() => {
    if (currentSeason) {
      // Store the current season in local storage
      localStorage.setItem('currentSeason', JSON.stringify(currentSeason));
    }
  }, [currentSeason]);

  return (
    <SeasonContext.Provider value={{ currentSeason, setCurrentSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};
