// frontend/src/components/MainSideBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Toolbar,
  CssBaseline,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useSeasonContext } from '../context/SeasonContext'; // Import the SeasonContext hook

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const drawerWidth = 240;
  const [seasons, setSeasons] = useState([]);
  const { currentSeason, setCurrentSeason } = useSeasonContext(); // Use the SeasonContext

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Fetch all seasons on component mount
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/seasons');
        const data = await response.json();
        setSeasons(data);

        if (!currentSeason) {
          const storedSeason = JSON.parse(localStorage.getItem('currentSeason'));
          if (storedSeason) {
            setCurrentSeason(storedSeason);
          } else if (data.length > 0) {
            setCurrentSeason(data[0]); // Default to the first season if no current season is set
          }
        }
      } catch (error) {
        console.error('Failed to fetch seasons:', error);
      }
    };

    fetchSeasons();
  }, []); // Run only on initial render

  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    if (currentSeason) {
      setSelectedSeason(currentSeason._id);
    }
  }, [currentSeason]);

  const handleSeasonChange = (event) => {
    const selectedSeason = seasons.find((season) => season._id === event.target.value);
    setSelectedSeason(event.target.value);
    setCurrentSeason(selectedSeason); // Update the SeasonContext with the selected season
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          transition: 'width 0.3s',
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 64,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#333',
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Select
            value={selectedSeason}
            onChange={handleSeasonChange}
            displayEmpty
            sx={{
              flexGrow: 1,
              marginRight: 2,
              fontSize: '1rem',
              color: '#333',
            }}
          >
            {seasons.map((season) => (
              <MenuItem key={season._id} value={season._id}>
                {season.seasonname}
              </MenuItem>
            ))}
          </Select>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            component={Link}
            to="/"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/users"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/users' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="User List" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/users/details"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/users/details' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Details" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/AddUser"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/AddUser' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add User" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/users/edit"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/users/edit' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit User" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/users/delete"
            sx={{
              height: 60, // Increased height
              borderBottom: '1px solid #ddd',
              '&:hover': { backgroundColor: '#e0e0e0' },
              ...(location.pathname === '/users/delete' && {
                backgroundColor: '#e0e0e0',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: 'blue',
                },
              }),
            }}
          >
            <ListItemIcon
              sx={{ color: 'inherit', minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
            >
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete User" sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default Sidebar;
