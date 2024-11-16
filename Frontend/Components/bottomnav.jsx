import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Man2Icon from '@mui/icons-material/Man2';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px', // Adds space from the bottom of the screen
        left: '50%',
        transform: 'translateX(-50%)', // Center horizontally
        zIndex: 100,
        width: '100%', // Ensure full width for positioning
        display: 'flex', // Use flexbox for centering
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels={false} // Disable text labels
        sx={{
          backgroundColor: 'white',
          borderRadius: '30px', // Round the edges
          width: '300px', // Fixed width to control the size
          display: 'flex',
          justifyContent: 'space-around', // Evenly distribute icons
          alignItems: 'center', // Center icons vertically
          padding: '5px', // Add space inside the BottomNav
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        <BottomNavigationAction
          icon={<Man2Icon sx={{ fontSize: 30 }} />} // Icon size for larger screens
          sx={{
            minWidth: 'auto',
            borderRadius: '20px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#f0f8ff',
            },
          }}
        />
        <BottomNavigationAction
          icon={<ChatIcon sx={{ fontSize: 30 }} />} // Icon size for larger screens
          sx={{
            minWidth: 'auto',
            borderRadius: '20px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#f0f8ff',
            },
          }}
        />
        <BottomNavigationAction
          icon={<AddBoxIcon sx={{ fontSize: 30 }} />} // Icon size for larger screens
          sx={{
            minWidth: 'auto',
            borderRadius: '20px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#f0f8ff',
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
