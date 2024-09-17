import { Box, Container, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookFormLayoutProps {
  title: string;
  children: ReactNode;
}

const BookPageLayout = ({ title, children }: BookFormLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <IconButton
        sx={{ position: 'absolute' }}
        onClick={() => navigate('/books')}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Paper
          sx={{
            padding: 4,
            mt: 2,
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0px 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default BookPageLayout;
