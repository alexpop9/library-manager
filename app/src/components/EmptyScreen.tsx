import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        No books yet!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Start by creating your first book.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/books/new')}
        sx={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Add New Book
      </Button>
    </Box>
  );
};

export default EmptyScreen;
