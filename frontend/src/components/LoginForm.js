// File: frontend/src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, TextField, Typography, Tab, Tabs, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generateRandomPassword from '../utils/passwordUtils'; // Import function to generate random password

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false); // State to control message display
  const { login, isLoading, error } = useLogin();
  const { register, isLoading: isRegistering, error: registerError } = useRegister();

  useEffect(() => {
    const registeredEmail = localStorage.getItem('registeredemail');
    if (registeredEmail) {
      setShowRegistrationMessage(true); // Show registration message in header
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedIn = await login(email, password); // Use password state here
    if (loggedIn) {
      setShowRegistrationMessage(false); // Hide registration message after successful login
      toast.success('Logged in successfully');
    }
  };

  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [Phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const newPassword = generateRandomPassword(8); // Generate random password
    const histoset = 'notset'; // Set histoset value to 'notset'
    register({ Fname, Lname, gender, Phone, email, address, password: newPassword }, histoset); // Pass password and histoset to register function
    localStorage.setItem('registeredemail', email); // Store registered email in localStorage
    setShowRegistrationMessage(true); // Show registration message in header
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Sign In" />
        <Tab label="Register" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabIndex === 0 && (
          <form onSubmit={handleLogin}>
            {showRegistrationMessage ? (
              <Box sx={{ bgcolor: 'green', p: 2, mb: 2, borderRadius: 4 }}>
                <Typography variant="h8" align="center" sx={{ color: 'white', fontStyle: 'italic' }}>
                  Sign in using your email and Password sent to {localStorage.getItem('registeredemail')}
                </Typography>
              </Box>
            ) : ''}{/* Header for Login */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>
        )}
        {tabIndex === 1 && (
          <form onSubmit={handleRegister}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={Fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={Lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {registerError && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{registerError}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isRegistering}
              sx={{ mt: 2 }}
            >
              {isRegistering ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default LoginForm;
