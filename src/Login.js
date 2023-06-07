import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false); // State to control snackbar visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setEmailError(true);
      return;
    }

    // Password validation
    const passwordPattern = /^[a-zA-Z0-9]{8,16}$/;
    if (!password || !passwordPattern.test(password)) {
      setPasswordError(true);
      return;
    }

    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await fetch('https://movieapp-1-a9282068.deta.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token; // Assuming the response contains the JWT token
        localStorage.setItem('token', token); // Save the token in localStorage
        setToken(token); // Call the setToken function to update the token in App.js
        navigate('/search'); // Navigate to the /search page
      } else {
        setErrorMessage('Invalid credentials');
        setShowSnackbar(true); // Show the snackbar notification
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred');
      setShowSnackbar(true); // Show the snackbar notification
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // Close the snackbar notification
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? 'Please enter a valid email' : ''}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={
            passwordError ? 'Password should be 8-16 characters alphanumeric' : ''
          }
        />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={errorMessage}
      />
    </div>
  );
};

export default Login;