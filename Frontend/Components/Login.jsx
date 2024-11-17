// src/components/Login.jsx
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
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; // Import Axios for API calls
import logo from '../Assets/Logo.png';
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username,
          password,
        });

        // If login is successful
        if (response.status === 200) {
          console.log('User logged in:', response.data);
          // Redirect to home route after successful login
          navigate('/');
        }
      } catch (error) {
        // Handle server errors
        if (error.response && error.response.data) {
          setServerError(error.response.data.message);
        } else {
          setServerError('An error occurred. Please try again.');
        }
      }
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
              Login
            </Typography>
            {serverError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {serverError}
              </Typography>
            )}
            <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
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
                onClick={handleLogin}
              >
                Login
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/signup" variant="body2" color="primary">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
