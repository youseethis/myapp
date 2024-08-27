// frontend/src/components/ApplicationInfoDisplay.js
import React, { useContext } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { ApplicationContext } from '../context/ApplicationContext';

const ApplicationInfoDisplay = () => {
  const {
    application,
    paymentStatus,
    certified,
    historyset,
    error,
    loading,
  } = useContext(ApplicationContext);

  // Helper function to format and display JSON objects
  const renderJsonObject = (data) => (
    <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  return (
    <Box sx={{ p: 3 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Application Status
          </Typography>
          {application ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1"><strong>Application Data:</strong></Typography>
              {renderJsonObject(application)}
            </Box>
          ) : (
            <Typography variant="body1">No application found for the current season.</Typography>
          )}

          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Status
          </Typography>
          {paymentStatus ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1"><strong>Payment Data:</strong></Typography>
              {renderJsonObject(paymentStatus)}
            </Box>
          ) : (
            <Typography variant="body1">No payment information available.</Typography>
          )}

          <Typography variant="h6" sx={{ mb: 2 }}>
            Certified Status
          </Typography>
          {certified ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1"><strong>Certified Data:</strong></Typography>
              {renderJsonObject(certified)}
            </Box>
          ) : (
            <Typography variant="body1">No certification information available.</Typography>
          )}

          <Typography variant="h6" sx={{ mb: 2 }}>
            Historyset
          </Typography>
          {historyset ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1"><strong>Historyset Data:</strong></Typography>
              {renderJsonObject(historyset)}
            </Box>
          ) : (
            <Typography variant="body1">No historyset information available.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ApplicationInfoDisplay;
