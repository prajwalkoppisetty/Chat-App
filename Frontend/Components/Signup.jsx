// src/components/Signup.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar, IconButton, InputAdornment, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../Assets/Logo.png';
import { Link as RouterLink } from 'react-router-dom';
import './Styles.css';

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
    button: {
      main: '#6200ea',
      hover: '#6400ae',
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

  const validatePassword = (password) => {
    const minLength = 5;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileName) newErrors.profileName = 'Profile Name is required';
    if (!username) newErrors.username = 'Username is required';
    if (!phone) newErrors.phone = 'Phone Number is required';
    if (!email) newErrors.email = 'Email Address is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 5 characters long and contain an uppercase letter, a lowercase letter, and a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      const userProfilePicture = profilePicture || '/images/guest.png';
      console.log('User signed up:', { profileName, username, phone, email, password, userProfilePicture });
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
            <img src={logo} alt="ChatMatrix Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <Typography component="h1" variant="h5" color="text.primary" sx={{ mb: 2 }}>
              Sign Up
            </Typography>
            <Avatar alt="Profile Picture" src={profilePicture || '/images/guest.png'} sx={{ width: 100, height: 100, mb: 1 }} />
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
                  backgroundColor: theme.palette.button.main,
                  '&:hover': {
                    backgroundColor: theme.palette.button.hover,
                  },
                  size: 'small',
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
                autoComplete="profile-name"
                autoFocus
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
                autoComplete="phone"
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" variant="body2" color="primary">
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
