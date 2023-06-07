import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [token, setToken] = React.useState('');

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toolbar>
          <div style={{ flexGrow: 1 }}>Home</div>
          <Button component={Link} to="/login" color="inherit">
          Login
          </Button>
        </Toolbar>
      </ThemeProvider>
    </Router>
  );
}

export default App;