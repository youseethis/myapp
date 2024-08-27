import React, { useState, useEffect } from 'react';
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

const EditUserModal = ({ open, onClose, user, onEditUser, loading }) => {
  const [editedUser, setEditedUser] = useState({
    Fname: user.Fname,
    Lname: user.Lname,
    gender: user.gender,
    Phone: user.Phone,
    email: user.email,
    address: user.address,
    credentials: {
      email: user.credentials.email,
      password: ''
    }
  });

  useEffect(() => {
    setEditedUser({
      Fname: user.Fname,
      Lname: user.Lname,
      gender: user.gender,
      Phone: user.Phone,
      email: user.email,
      address: user.address,
      credentials: {
        email: user.credentials.email,
        password: ''
      }
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'credentialsEmail' || name === 'credentialsPassword') {
      setEditedUser({ ...editedUser, credentials: { ...editedUser.credentials, [name.replace('credentials', '').toLowerCase()]: value } });
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleGenderChange = (e) => {
    setEditedUser({ ...editedUser, gender: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await onEditUser(editedUser);
      onClose(); // Close modal after successful edit
    } catch (error) {
      console.error('Error editing user:', error);
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
        Edit User
      </DialogTitle>
      <DialogContent>
        <TextField label="First Name" name="Fname" value={editedUser.Fname} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Last Name" name="Lname" value={editedUser.Lname} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        
        {/* Gender Selection */}
        <FormControl component="fieldset" fullWidth margin="dense">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender" value={editedUser.gender} onChange={handleGenderChange} row>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        <TextField label="Phone" name="Phone" value={editedUser.Phone} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Email" name="email" value={editedUser.email} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Address" name="address" value={editedUser.address} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Credentials Email" name="credentialsEmail" value={editedUser.credentials.email} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
        <TextField label="Password" name="credentialsPassword" type="password" value={editedUser.credentials.password} onChange={handleChange} fullWidth margin="dense" style={{ marginBottom: '10px' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
