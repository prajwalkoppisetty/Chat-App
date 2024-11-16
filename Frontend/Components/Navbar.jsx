// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box, AppBar, Toolbar, Switch } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Person as PersonIcon, Info as InfoIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo.png';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            ChatMatrix
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <img src={logo} alt="Brand Logo" style={{ width: '100px' }} />
        </Box>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
