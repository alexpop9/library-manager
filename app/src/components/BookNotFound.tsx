import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      padding={3}
    >
      <Typography variant="h4" gutterBottom>
        Seems like this book does not exist
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/books')}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default BookNotFound;
