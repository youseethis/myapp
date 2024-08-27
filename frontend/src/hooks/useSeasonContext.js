// frontend/src/hooks/useSeasonContext.js
import React from 'react';
import { useSeasonContext } from './context/SeasonContext'; // Import the hook

const SeasonDisplay = () => {
  const { currentSeason } = useSeasonContext();

  return (
    <div>
      {currentSeason ? (
        <p>Current Season: {currentSeason.name}</p> // Adjust this to your data structure
      ) : (
        <p>No current season found.</p>
      )}
    </div>
  );
};

export default SeasonDisplay;
