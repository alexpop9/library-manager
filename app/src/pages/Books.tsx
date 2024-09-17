import { useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Book from '../components/Book';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { BookRecord } from '../types/books';
import EmptyScreen from '../components/EmptyScreen';
import { deleteResource } from '../utils/api';
import Loader from '../components/Loader';
import DeleteDialog from '../components/DeleteDialog';
import useSWRMutation from 'swr/mutation';

const BooksDashboard = () => {
  const [bookToDelete, setBookToDelete] = useState<null | string>(null);
  const navigate = useNavigate();
  const { data, isLoading, mutate } = useSWR<BookRecord[], Error>(
    'http://localhost:3001/books'
  );
  const { trigger } = useSWRMutation(
    `http://localhost:3001/books/${bookToDelete ?? ''}`,
    deleteResource
  );

  const onDelete = async (bookId: string) => {
    try {
      await trigger();

      await mutate((cachedBooks) => {
        if (!cachedBooks) {
          return [];
        }

        return cachedBooks.filter((book: BookRecord) => book.id !== bookId);
      }, false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Failed to delete the book:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.length) {
    return <EmptyScreen />;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: {
            xs: 'center',
            sm: 'space-between',
          },
          alignItems: 'center',
          my: 4,
          textAlign: {
            xs: 'center',
            sm: 'left',
          },
        }}
      >
        <Typography variant="h2" gutterBottom>
          My Book Collection
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/books/new')}
          sx={{
            mt: {
              xs: 2,
              sm: 0,
            },
          }}
        >
          Create New Book
        </Button>
      </Box>

      <Grid container spacing={4}>
        {data.map((book) => (
          <Grid
            onClick={() => navigate(`/books/${book.id}`)}
            item
            key={book.id}
            xs={12}
            sm={6}
            md={4}
          >
            <Book book={book} onDelete={() => setBookToDelete(book.id)} />
          </Grid>
        ))}
      </Grid>
      <DeleteDialog
        open={!!bookToDelete}
        handleClose={() => setBookToDelete(null)}
        onConfirm={() => {
          if (bookToDelete) {
            void onDelete(bookToDelete);
          }
        }}
      />
    </Container>
  );
};

export default BooksDashboard;
