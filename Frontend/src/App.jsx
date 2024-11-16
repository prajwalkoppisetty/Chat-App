// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import './index.css';
import Signup from './../Components/Signup';
import Login from './../Components/Login';
import HomePage from '../Components/HomePage';
import BottomNav from '../Components/Bottomnav';
import { IconButton, Avatar, Box, Menu, MenuItem } from '@mui/material';

function App() {
  const location = useLocation();  // Get the current location (path)

  // Check if the current path is either '/login' or '/signup'
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup';

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Profile Icon at Top Right - Render only if not on /login or /signup */}
      {!isLoginOrSignup && (
        <Box sx={{ position: 'fixed', top: 10, right: 10 }}>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 40, height: 40 }}>G</Avatar> {/* Default Guest Avatar */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Signup</Link>
            </MenuItem>
          </Menu>
        </Box>
      )}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      {/* Render BottomNav only if not on login or signup page */}
      {!isLoginOrSignup && <BottomNav />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
