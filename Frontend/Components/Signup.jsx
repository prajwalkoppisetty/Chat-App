import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../Assets/Logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#6400ae',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
});

const Signup = () => {
  const [profileName, setProfileName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  const validateUsername = (username) => /^[a-zA-Z0-9_-]+$/.test(username);

  const validatePassword = (password) =>
    password.length >= 5 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  const validateForm = () => {
    const newErrors = {};
    if (!profileName) newErrors.profileName = 'Profile Name is required';
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(username)) {
      newErrors.username =
        'Username can only contain letters, numbers, underscores (_), and hyphens (-)';
    }
    if (!phone) newErrors.phone = 'Phone Number is required';
    if (!email) newErrors.email = 'Email Address is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Password must be at least 5 characters long and include uppercase, lowercase, and a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    
    if (validateForm()) {
      console.log('Validation passed'); // Debugging Log
  
      const userProfilePicture = profilePicture || '/images/guest.png';
      const userData = {
        profileName,
        username,
        phone,
        email,
        password,
        userProfilePicture,
      };
  
      console.log('User signed up:', JSON.stringify(userData, null, 2));
    } else {
      console.log('Validation failed'); // Debugging Log
      }
      
  };
  

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.default' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src={logo}
              alt="ChatMatrix Logo"
              style={{ width: '100px', marginBottom: '20px' }}
            />
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Sign Up
            </Typography>
            <Avatar
              alt="Profile Picture"
              src={profilePicture || '/images/guest.png'}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture"
              type="file"
              onChange={handleProfilePictureChange}
            />
            <label htmlFor="profile-picture">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.secondary.main },
                }}
              >
                Upload Picture
              </Button>
            </label>
            <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="profileName"
                label="Profile Name"
                name="profileName"
                autoComplete="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                error={!!errors.profileName}
                helperText={errors.profileName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.secondary.main },
                }}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Typography align="center">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" color="primary">
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
