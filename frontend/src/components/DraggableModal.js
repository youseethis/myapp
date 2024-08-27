import React from 'react';
import Draggable from 'react-draggable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: 'none', // Remove box shadow
  width: '80%', // Set specific width
  maxWidth: '600px', // Set maximum width
}));

const PaperComponent = (props) => (
  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
    <CustomPaper {...props} />
  </Draggable>
);

const DraggableModal = ({ open, onClose, children, userId }) => (
  <Dialog
    open={open}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
    maxWidth="sm" // Set maxWidth to 'xs', 'sm', 'md', 'lg', or 'xl'
    disableEscapeKeyDown
    BackdropProps={{
      style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' }, // Reduce grey color of the backdrop
    }}
  >
    <DialogTitle className='draggable-dialog-title' style={{ cursor: 'move' }} id="draggable-dialog-title">
      User Details
    </DialogTitle>
    <DialogContent dividers>
      {children}
    </DialogContent>
    <DialogActions style={{ justifyContent: 'space-between' }}>
      <Button component={Link} to={`/UserProfile/${userId}`} color="primary" variant="outlined">
        View Profile
      </Button>
      <Button onClick={onClose} color="secondary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default DraggableModal;
