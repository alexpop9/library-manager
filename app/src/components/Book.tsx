import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookRecord } from '../types/books';

interface BookProps {
  book: BookRecord;
  onDelete: () => void;
}

const Book = ({ book, onDelete }: BookProps) => {
  const { title, author, description, img, genre } = book;

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        },
        textAlign: 'center',
      }}
    >
      <IconButton
        aria-label="delete"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <CardMedia
        component="img"
        height="200"
        image={
          img
            ? `http://localhost:3001${img}`
            : 'https://placehold.co/150x150/white/white'
        }
        alt={title}
      />
      <CardContent
        sx={{
          borderRadius: '0 0 12px 12px',
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Author: {author}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Genre: {genre || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default Book;
