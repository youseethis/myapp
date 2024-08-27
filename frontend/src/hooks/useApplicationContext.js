// frontend/src/hooks/useApplicationContext.js
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';
import { useAuthContext } from './useAuthContext';

export const useApplicationContext = () => {
  const { state, dispatch } = useContext(ApplicationContext);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!state) {
    throw new Error('useApplicationContext must be used within an ApplicationContextProvider');
  }

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch the current season
        const seasonResponse = await axios.get('http://localhost:4000/api/seasons/status/current');
        const currentSeason = seasonResponse.data[0]; // Assuming it returns an array

        if (!currentSeason) {
          setError('No current season found.');
          setLoading(false);
          return;
        }

        // Fetch the application data using userID and season_ID
        const applicationResponse = await axios.get('http://localhost:4000/api/applications/user-season', {
          params: {
            userID: user._id,
            season_ID: currentSeason._id,
          },
        });

        if (applicationResponse.data) {
          // Dispatch to update the application context
          dispatch({ type: 'SET_APPLICATION', payload: applicationResponse.data });
        } else {
          dispatch({ type: 'SET_APPLICATION', payload: null });
          setError('No application found for the current season.');
        }
      } catch (err) {
        setError(err.response ? err.response.data : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user, dispatch]);

  return { state, loading, error };
};
