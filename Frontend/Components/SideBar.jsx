import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  PersonAdd as PersonAddIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo.png';
import textlogo from '../Assets/Textlogo.png'
import './Styles.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(/mnt/data/pexels-juanpphotoandvideo-1242348.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        fontFamily: 'Work Sans, sans-serif', // Applying font globally for Sidebar
      }}
    >
      {/* Floating Burger Menu Icon */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: '20px',
          left: isOpen ? '240px' : '30px', // Adjust position when sidebar is closed
          zIndex: 1300,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          width: '40px',  // Smaller icon size
          height: '40px', // Smaller icon size
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.6)' },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {isOpen ? (
          <Typography
            sx={{ fontSize: 20, color: '#5c5c5c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {'<'}
          </Typography>
        ) : (
          <MenuIcon sx={{ fontSize: 20, color: '#5c5c5c' }} />  // Smaller icon size
        )}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        transitionDuration={400}
        sx={{
          '& .MuiDrawer-paper': {
            width: 220,  // Smaller sidebar width
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: 'Work Sans, sans-serif', // Apply font here as well
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            color: '#333',
          }}
        >
          <img
            src={logo}
            alt="Brand Logo"
            style={{ width: '40px', marginRight: '10px' }}  // Adjust logo size
          />
          <img 
            src={textlogo}
            alt="Brand Text Logo"
            style={{ width: '130px' }}  // Adjust logo size
            sx={{ marginLeft: '10px' }}
          />
        </Box>
        <Divider />

        {/* Sidebar Navigation Links */}
        <List>
  <ListItem button component={Link} to="/" onClick={toggleDrawer}>
    <ListItemIcon>
      <HomeIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Home" sx={{ fontSize: '14px' }} />
  </ListItem>
  <ListItem button component={Link} to="/settings" onClick={toggleDrawer}>
    <ListItemIcon>
      <SettingsIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Settings" sx={{ fontSize: '14px' }} />
  </ListItem>
  <ListItem button component={Link} to="/notifications" onClick={toggleDrawer}>
    <ListItemIcon>
      <NotificationsIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Notifications" sx={{ fontSize: '14px' }} />
  </ListItem>
  <ListItem button component={Link} to="/help" onClick={toggleDrawer}>
    <ListItemIcon>
      <HelpIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Help/Support" sx={{ fontSize: '14px' }} />
  </ListItem>
  <ListItem button component={Link} to="/signup" onClick={toggleDrawer}>
    <ListItemIcon>
      <PersonAddIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Signup" sx={{ fontSize: '14px' }} />
  </ListItem>
  <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
    <ListItemIcon>
      <LoginIcon sx={{ color: '#7a7aff' }} />
    </ListItemIcon>
    <ListItemText primary="Login" sx={{ fontSize: '14px' }} />
  </ListItem>
</List>

      </Drawer>
    </Box>
  );
};

export default Sidebar;
