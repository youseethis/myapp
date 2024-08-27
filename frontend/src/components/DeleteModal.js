import React from 'react';
import Draggable from 'react-draggable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';

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

const DeleteModal = ({ open, onClose, onDelete, children }) => (
  <Dialog
    open={open}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
    maxWidth="xs" // Set maxWidth to 'xs', 'sm', 'md', 'lg', or 'xl'
    disableEscapeKeyDown
    BackdropProps={{
      style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' }, // Reduce grey color of the backdrop
    }}
  >
    <DialogTitle className='draggable-dialog-title2' style={{ cursor: 'move' }} id="draggable-dialog-title">
      Delete User 
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
      <Button onClick={onDelete} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteModal;
