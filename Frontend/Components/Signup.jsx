import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar, IconButton, InputAdornment, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../Assets/Logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios
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
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleSignup = async () => {
    if (validateForm()) {
      const userProfilePicture = profilePicture || '/images/guest.png';

      // Send data to backend
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          profileName,
          username,
          phone,
          email,
          password,
          profilePicture: userProfilePicture,
        });

        if (response.status === 201) {
          // Successful signup
          console.log('User  signed up:', response.data);
          // Redirect to login page
          navigate('/login');
        } else {
          // Handle errors or unsuccessful signup
          console.error('Signup failed:', response.data);
          setErrors({ ...errors, server: response.data.message });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setErrors({ ...errors, server: 'An error occurred. Please try again.' });
      }
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
            <Avatar alt=" User " src={profilePicture} sx={{ width: 56, height: 56, mb: 2 }} />
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: 'none' }} id="profile-picture-upload" />
            <label htmlFor="profile-picture-upload">
              <IconButton component="span" color="primary">
                <Visibility />
              </IconButton>
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Profile Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              error={!!errors.profileName}
              helperText={errors.profileName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.server && <Typography color="error">{errors.server}</Typography>}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;