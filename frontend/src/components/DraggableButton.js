import React, { useState } from 'react';
import { Button } from '@mui/material';
import DraggableModal from './DraggableModal'; // Adjust the path as necessary

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Draggable Modal
      </Button>
      <DraggableModal open={open} onClose={handleClose} />
    </div>
  );
};

export default Home;
