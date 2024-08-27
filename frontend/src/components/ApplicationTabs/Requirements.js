import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Requirements = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Requirements
      </Typography>
      <Divider />
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Nullam ut venenatis magna. Sed ut turpis eget magna pharetra dictum nec non erat. In consequat metus nec quam tincidunt fermentum.
      </Typography>
    </Box>
  );
};

export default Requirements;
