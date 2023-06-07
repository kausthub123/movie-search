import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent, CardMedia, Typography, Snackbar } from '@mui/material';

const Search = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    console.log('Token:', token); // Check if the token is being passed correctly
  }, [token]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://movieapp-1-a9282068.deta.app/api/search/?title=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data); // Update the searchResults state with the fetched data
      } else {
        setSearchResults([]); // Reset the searchResults state
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]); // Reset the searchResults state
    }

    // Show snack bar if no results are found
    if (searchResults.length === 0) {
      setShowSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <TextField
        label="Search TV Shows"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {searchResults.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result.show.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={result.show.image ? result.show.image.medium : "default_image_path"}
                alt={result.show.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {result.show.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div dangerouslySetInnerHTML={{ __html: result.show.summary }} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {result.show.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Language: {result.show.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genres: {result.show.genres.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {result.show.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule: {result.show.schedule.days.join(', ')} at {result.show.schedule.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="No results found."
      />
    </div>
  );
};

export default Search;