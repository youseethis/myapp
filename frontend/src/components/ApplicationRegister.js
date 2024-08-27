import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, Select, Grid } from '@mui/material';

const ApplicationRegister = ({ onClose }) => {
  const [attended, setAttended] = useState('');
  const [times, setTimes] = useState('');
  const [certificates, setCertificates] = useState([]);

  const handleTimesChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setTimes(value);
    setCertificates((prevCertificates) => {
      if (value > prevCertificates.length) {
        return [
          ...prevCertificates,
          ...Array.from({ length: value - prevCertificates.length }, () => ({
            year: '',
            certificateNo: '',
            certificateFile: null
          }))
        ];
      }
      return prevCertificates.slice(0, value);
    });
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = certificates.map((certificate, i) =>
      i === index ? { ...certificate, [field]: value } : certificate
    );
    setCertificates(updatedCertificates);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    handleCertificateChange(index, 'certificateFile', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Attended:', attended);
    if (attended === 'Yes') {
      console.log('Times:', times);
      console.log('Certificates:', certificates);
    }
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        border: '1px solid #ccc',
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="body1" gutterBottom>
        Do you have attended RCN Quality Control previously?
      </Typography>
      <FormControl fullWidth margin="normal">
        <Select
        sx={{ '& input': { height: '1.2rem', padding: '0.5rem' } }} // Adjust height and padding
          value={attended}
          onChange={(e) => setAttended(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>Select an option</MenuItem>
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>
      {attended === 'Yes' && (
        <>
          <TextField
            label="How many times?"
            type="number"
            fullWidth
            margin="normal"
            value={times}
            onChange={handleTimesChange}
            inputProps={{ min: 0 }}
            sx={{ '& input': { height: '1.2rem', padding: '0.5rem' } }} // Adjust height and padding
          />
          {certificates.map((certificate, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <TextField
                  label="Year"
                  type="number"
                  fullWidth
                  value={certificate.year}
                  onChange={(e) => handleCertificateChange(index, 'year', e.target.value)}
                  sx={{ '& input': { height: '1.2rem', padding: '0.5rem' } }} // Adjust height and padding
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="No of Certificate"
                  fullWidth
                  value={certificate.certificateNo}
                  onChange={(e) => handleCertificateChange(index, 'certificateNo', e.target.value)}
                  sx={{ '& input': { height: '1.2rem', padding: '0.5rem' } }} // Adjust height and padding
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload Certificate PDF
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </Button>
                {certificate.certificateFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {certificate.certificateFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          ))}
        </>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

const Application = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleBoxClick = () => {
    setIsRegistering(true);
  };

  const handleClose = () => {
    setIsRegistering(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
      }}
    >
      {!isRegistering && (
        <Box
          onClick={handleBoxClick}
          sx={{
            padding: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            border: '1px solid #ccc',
            transition: 'background-color 0.3s, color 0.3s',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white',
              '& .hover-text': {
                display: 'none',
              },
              '& .hover-text-hover': {
                display: 'block',
              },
            },
          }}
        >
          <Typography variant="h6" color="textSecondary" className="hover-text">
            There is no Active Application
          </Typography>
          <Typography
            variant="h6"
            color="white"
            className="hover-text-hover"
            sx={{ display: 'none' }}
          >
            Create Application
          </Typography>
        </Box>
      )}
      {isRegistering && (
        <>
          <Typography variant="h6" gutterBottom align="center">
            Register a New Application
          </Typography>
          <ApplicationRegister onClose={handleClose} />
        </>
      )}
    </Box>
  );
};

export default Application;
