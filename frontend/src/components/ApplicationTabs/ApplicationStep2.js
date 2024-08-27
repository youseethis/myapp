// ApplicationStep2.js
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ApplicationStep2 = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Full-width Application Progress Box */}
      <Box
        sx={{
          width: '50vw', // Use 100vw to cover the entire viewport width
          maxWidth: '100%', // Ensure it doesn't exceed the container's width
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: '#fff',
          mb: 2,
          mx: 'auto', // Center the box if there's any margin
        }}
      >
        <Typography variant="h6" gutterBottom>
          Application Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            30% Complete
          </Typography>
          <Typography variant="body2" color="textSecondary">
            30%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={30} sx={{ height: 10, borderRadius: 5 }} />
      </Box>

      {/* Independent Box for Payment Control Number */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          mx: 'auto', // Center this box as well
        }}
      >
        <Typography variant="h6" gutterBottom>
          Payment Control No.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          868767565656
        </Typography>
      </Box>
    </Box>
  );
};

export default ApplicationStep2;
