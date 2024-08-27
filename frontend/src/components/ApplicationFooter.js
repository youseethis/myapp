// frontend\src\components\ApplicationFooter.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ApplicationFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        p: 2,
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Mwijae Bakari Project. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Contact me: 0659421728
      </Typography>
    </Box>
  );
};

export default ApplicationFooter;
