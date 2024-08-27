// frontend/src/hooks/useLogin.js
import { useState, useContext } from 'react';
import { useAuthContext } from './useAuthContext';
import { useSeasonContext } from '../context/SeasonContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ApplicationContext } from '../context/ApplicationContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: authDispatch } = useAuthContext();
  const { setCurrentSeason } = useSeasonContext();
  const { dispatch: appDispatch } = useContext(ApplicationContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Send login request
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const json = await response.json();

      // Decode token to get userId
      const decodedToken = jwtDecode(json.token);
      const userId = decodedToken._id;

      // Fetch user details
      const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.error || 'Failed to fetch user details');
      }

      console.log('User Data:', userData);

      // Fetch histoset and historysetId
      let histoset = 'N/A';
      let historysetId = null;
      let historysetData = null;
      try {
        const historysetResponse = await fetch(`http://localhost:4000/historyset/user/${userId}`);
        historysetData = await historysetResponse.json();

        if (historysetResponse.ok) {
          histoset = historysetData.histoset;
          historysetId = historysetData._id;
          console.log('Fetched historyset:', historysetData);
        } else {
          console.error('Failed to fetch historyset:', historysetData);
        }
      } catch (historysetError) {
        console.error('Historyset fetch error:', historysetError);
      }

      // Fetch the current season
      try {
        const seasonsResponse = await fetch('http://localhost:4000/api/seasons/status/current');
        const seasonsData = await seasonsResponse.json();

        if (seasonsResponse.ok && seasonsData.length > 0) {
          const currentSeason = seasonsData[0];
          setCurrentSeason(currentSeason);
          console.log('Current Season:', currentSeason);
        } else {
          console.error('Failed to fetch current season:', seasonsData);
        }
      } catch (seasonsError) {
        console.error('Seasons fetch error:', seasonsError);
      }

      // Save token and user details to local storage
      const userToken = json.token;
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('userDetails', JSON.stringify({ ...userData, histoset, historysetId }));

      // Update the auth context
      authDispatch({
        type: 'LOGIN',
        payload: {
          ...userData,
          histoset,
          historysetId,
          token: userToken,
        },
      });

      // Store histoset and historysetId in local storage before dispatching
      localStorage.setItem('histoset', histoset);
      localStorage.setItem('historysetId', historysetId);

      // Update the application context
      appDispatch({
        type: 'SET_HISTORYSET',
        payload: { histoset, historysetId },
      });

      // Fetch application data if histoset is not 'na'
      if (histoset !== 'na') {
        await fetchApplicationData(userId);
      }

      // Store in local storage before dispatch
      if (histoset === 'set' || histoset === 'notset') {
        localStorage.setItem('historyset', JSON.stringify(historysetData));
        appDispatch({ type: 'SET_HISTORYSET', payload: historysetData });
      }
      setIsLoading(false);

      // Fetch certifieds after login
      await getCertifieds(userId);

    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      setError(err.message);
    }
  };

  // Function to fetch application data
  const fetchApplicationData = async (userId) => {
    try {
      // Fetch the current season
      const seasonResponse = await axios.get('http://localhost:4000/api/seasons/status/current');
      const currentSeason = seasonResponse.data[0];

      if (!currentSeason) {
        console.error('No current season found.');
        return;
      }

      // Fetch the application data using userID and season_ID
      const applicationResponse = await axios.get('http://localhost:4000/api/applications/user-season', {
        params: {
          userID: userId,
          season_ID: currentSeason._id,
        },
      });

      console.log('Application Response:', applicationResponse.data); // Log the entire response data

      if (applicationResponse.data.length > 0) {
        const application = applicationResponse.data[0]; // Access the first application object
        console.log('Fetched application data:', application);
        localStorage.setItem('application', JSON.stringify(application));
        appDispatch({ type: 'SET_APPLICATION', payload: application });

        // Access the applicationID from the first application object
        const applicationID = application._id;
        if (applicationID) {
          console.log('Application ID:', applicationID); // Log the ApplicationID
          // Fetch payment data based on application ID
          await fetchPaymentData(applicationID);
        } else {
          console.error('Application ID not found in response:', application);
        }
      } else {
        localStorage.setItem('application', JSON.stringify(null));
        appDispatch({ type: 'SET_APPLICATION', payload: null });
      }
    } catch (error) {
      console.error('Error fetching application:', error.response ? error.response.data : 'An error occurred');
    }
  };

  // Function to fetch payment data
  const fetchPaymentData = async (applicationID) => {
    try {
      const paymentResponse = await axios.get(`http://localhost:4000/api/payments/application/${applicationID}`);
      if (paymentResponse.data) {
        console.log('Fetched payment data:', paymentResponse.data);

        // Convert to object if it's an array
        const paymentData = Array.isArray(paymentResponse.data) ? paymentResponse.data[0] : paymentResponse.data;

        localStorage.setItem('paymentStatus', JSON.stringify(paymentData));
        appDispatch({ type: 'SET_PAYMENT_STATUS', payload: paymentData });
      } else {
        localStorage.setItem('paymentStatus', JSON.stringify(null));
        appDispatch({ type: 'SET_PAYMENT_STATUS', payload: null });
      }
    } catch (paymentError) {
      console.error('Error fetching payment data:', paymentError.response ? paymentError.response.data : 'An error occurred');
      localStorage.setItem('paymentStatus', JSON.stringify(null));
      appDispatch({ type: 'SET_PAYMENT_STATUS', payload: null });
    }
  };

  // Function to fetch certifieds
  const getCertifieds = async (userId) => {
    try {
      const certifiedResponse = await axios.get(`http://localhost:4000/certifieds/user/${userId}`);

      if (certifiedResponse.data && certifiedResponse.data.length > 0) {
        console.log('Certified record found:', certifiedResponse.data);
        localStorage.setItem('certified', JSON.stringify(certifiedResponse.data));
        appDispatch({ type: 'SET_CERTIFIED', payload: certifiedResponse.data });
      } else {
        console.log('No certified record found, setting to null.');
        localStorage.setItem('certified', JSON.stringify(null));
        appDispatch({ type: 'SET_CERTIFIED', payload: null });
      }
    } catch (error) {
      console.error('Error fetching certified records:', error.response ? error.response.data : 'An error occurred');
      localStorage.setItem('certified', JSON.stringify(null));
      appDispatch({ type: 'SET_CERTIFIED', payload: null });
    }
  };

  return { login, isLoading, error };
};
