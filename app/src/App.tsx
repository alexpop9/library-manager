import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Books from './pages/Books';
import EditBook from './pages/EditBook';
import CreateBook from './pages/CreateBook';
import { Box, Button, Typography } from '@mui/material';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={'/books'} element={<Books />} />
      <Route path={'/books/:bookId'} element={<EditBook />} />
      <Route path={'/books/new'} element={<CreateBook />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: 'text.primary',
          marginBottom: 2,
        }}
      >
        Welcome to the Library Manager
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          marginBottom: 4,
        }}
      >
        Manage your books efficiently and easily. Click the button below to
        proceed to the dashboard.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          paddingX: 4,
          paddingY: 1.5,
        }}
        onClick={() => navigate('/books')}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default App;
