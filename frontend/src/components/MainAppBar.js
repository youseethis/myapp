// File name: frontend/src/components/MainAppBar.js
// File: frontend/src/components/MainAppBar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as needed
import { useLogout } from '../hooks/useLogout'; // Adjust the path as needed

function MainAppBar() {
  const { user } = useContext(AuthContext); // Access user data from AuthContext
  const { logout } = useLogout(); // Access the logout function from useLogout hook

  const handleLogout = () => {
    logout(); // Call the logout function when the Logout button is clicked
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#ccc' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
        </Typography>
        {user ? <Typography variant="body1" style={{ marginRight: '1rem', color: 'black' }}>
            Logged in as: {user.email} {/* Display the user's email */}
          </Typography> : ""}
        { user && (<Button color="inherit" onClick={handleLogout}>Logout</Button>)}
         {/* Add onClick handler */}
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
