// frontend/src/components/ApplicationTabs/ApplicationForm.js
import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slide,
} from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ApplicationContext } from '../../context/ApplicationContext'; // Import ApplicationContext
import { handleSubmit } from './Handlesubmit'; // Import the handleSubmit function

const ApplicationForm = () => {
  // State variables for controlling form and its fields
  const [attendedCourse, setAttendedCourse] = useState(''); // User's response to course attendance
  const [specifyYear, setSpecifyYear] = useState(''); // Year of attendance
  const [certificateNo, setCertificateNo] = useState(''); // Certificate number
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded certificate file
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState(null); // Error message state
  const { user, dispatch } = useAuthContext(); // Retrieve user data and dispatch from AuthContext
  const { dispatch: applicationDispatch } = useContext(ApplicationContext); // Retrieve application dispatch from ApplicationContext

  // Log user.histoset for debugging
  useEffect(() => {
    console.log('user.histoset:', user.histoset);
  }, [user.histoset]);

  // Function to handle change in the attended course radio buttons
  const handleAttendedCourseChange = (event) => {
    setAttendedCourse(event.target.value);
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  // Function to submit the form
  const onSubmit = () => {
    handleSubmit({
      user,
      attendedCourse,
      specifyYear,
      certificateNo,
      uploadedFile,
      setLoading: setIsLoading,
      setError,
      dispatch, // Pass the dispatch function here
      applicationDispatch, // Pass the application dispatch function here
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Display the form */}
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Application Form
          </Typography>
          <Divider />

          {/* Check if user has no previous attendance (user.histoset is 'notset') */}
          {user.histoset === 'notset' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Have you ever attended this course before?
              </Typography>
              <RadioGroup
                row
                name="attendedCourse"
                value={attendedCourse}
                onChange={handleAttendedCourseChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          )}

          {/* If attendedCourse is 'yes', show additional fields for details */}
          {user.histoset === 'notset' && attendedCourse === 'yes' && (
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              {/* Specify Year Dropdown */}
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Specify Year</InputLabel>
                <Select
                  value={specifyYear}
                  onChange={(e) => setSpecifyYear(e.target.value)}
                  label="Specify Year"
                  displayEmpty
                  sx={{
                    fontSize: '0.875rem',
                    height: 30,
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Specify Year</em>
                  </MenuItem>
                  {Array.from({ length: 24 }, (_, i) => 2000 + i).map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Certificate Number Input */}
              <TextField
                label="Certificate No"
                placeholder="Certificate No"
                variant="outlined"
                value={certificateNo}
                onChange={(e) => setCertificateNo(e.target.value)}
                sx={{
                  flex: 1,
                  fontSize: '0.875rem',
                  height: 30,
                  '& .MuiInputBase-input': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'black',
                  },
                }}
                InputLabelProps={{ style: { fontSize: '0.875rem' } }}
                InputProps={{ style: { fontSize: '0.875rem', height: 30 } }}
              />

              {/* File Upload for Certificate */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <label style={{ fontSize: 11 }}>Upload certificate</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    height: '30px',
                    lineHeight: '30px',
                  }}
                />
              </Box>
            </Box>
          )}

          {/* User Information Display */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 120 }}>Full Name:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={user ? `${user.Fname} ${user.Lname}` : ''}
                InputProps={{ readOnly: true }}
                sx={{ fontSize: '0.875rem', height: 30 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 120 }}>Gender:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={user ? user.gender : ''}
                InputProps={{ readOnly: true }}
                sx={{ fontSize: '0.875rem', height: 30 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 120 }}>Phone:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={user ? user.Phone : ''}
                InputProps={{ readOnly: true }}
                sx={{ fontSize: '0.875rem', height: 30 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 120 }}>Email:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={user ? user.email : ''}
                InputProps={{ readOnly: true }}
                sx={{ fontSize: '0.875rem', height: 30 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 120 }}>Physical Address:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={user ? user.address : ''}
                InputProps={{ readOnly: true }}
                sx={{ fontSize: '0.875rem', height: 30 }}
              />
            </Box>
          </Box>

          {/* Submit Button */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>

          {/* Display Error Message */}
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Slide>
    </Box>
  );
};

export default ApplicationForm;
