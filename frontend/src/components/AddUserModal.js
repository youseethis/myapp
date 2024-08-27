import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Paper, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/system';

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: 'none',
  width: '80%',
  maxWidth: '600px',
}));

const PaperComponent = (props) => (
  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
    <CustomPaper {...props} />
  </Draggable>
);

const AddUserModal = ({ open, onClose, onAddUser, loading }) => {
  const [user, setUser] = useState({
    Fname: '',
    Lname: '',
    gender: '', // Added gender state
    Phone: '',
    email: '',
    address: '',
    credentials: {
      password: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setUser({ ...user, credentials: { ...user.credentials, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const userToSubmit = { ...user, credentials: { ...user.credentials, email: user.email } }; // Set credentials.email to user.email
      await onAddUser(userToSubmit);
      setUser({
        Fname: '',
        Lname: '',
        gender: '', // Reset gender state
        Phone: '',
        email: '',
        address: '',
        credentials: {
          password: ''
        }
      });
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Dialog
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth="xs"
      disableEscapeKeyDown
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
      }}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Add New User
      </DialogTitle>
      <DialogContent>
        <TextField label="First Name" name="Fname" value={user.Fname} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Last Name" name="Lname" value={user.Lname} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        
        {/* Gender Selection */}
        <FormControl component="fieldset" fullWidth margin="dense">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender" value={user.gender} onChange={handleGenderChange} row>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        <TextField label="Phone" name="Phone" value={user.Phone} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Email" name="email" value={user.email} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Address" name="address" value={user.address} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Password" name="password" type="password" value={user.credentials.password} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
