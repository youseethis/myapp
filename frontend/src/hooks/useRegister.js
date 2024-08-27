// frontend/src/hooks/useRegister.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import generateRandomPassword from '../utils/passwordUtils'; // Import function to generate random password

const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData, histoset) => {
    try {
      setLoading(true);
      const password = generateRandomPassword(8); // Generate random password
      const userDataWithPassword = { ...userData, password }; // Include password in userData

      // Log the registration data for debugging
      console.log('Sending registration data:', userDataWithPassword);

      // Add user and send email
      const response = await axios.post('/users/register', userDataWithPassword, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newUser = response.data; // Get the newly added user data

      console.log('User registration successful:', newUser);

      // Add historyset entry
      const historysetData = {
        histoset: histoset,
        userID: newUser._id,
      };

      console.log('Adding historyset data:', historysetData);

      const historysetResponse = await axios.post('/historyset', historysetData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Historyset entry successful:', historysetResponse.data);

      toast.success('User and historyset added successfully');
      // Store registered email in localStorage
      localStorage.setItem('registeredEmail', userData.email);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error during registration:', err.response?.data);
      setError(err.response?.data?.message || 'Error'); // Handle specific error messages if available
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    error,
    register,
  };
};

export default useRegister;
