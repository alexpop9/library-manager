import BookForm, { BookFormValues } from '../components/BookForm';
import { useNavigate, useParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { updateResource } from '../utils/api';
import useSWR from 'swr';
import { BookRecord } from '../types/books';
import Loader from '../components/Loader';
import BookPageLayout from '../components/BookPageLayout';
import BookNotFound from '../components/BookNotFound';

const EditBook = () => {
  const { data, isLoading, mutate } = useSWR<BookRecord[], Error>(
    'http://localhost:3001/books'
  );
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { trigger } = useSWRMutation<BookRecord, Error, string, FormData>(
    `http://localhost:3001/books/${bookId ?? ''}`,
    updateResource,
    {
      onSuccess: () => navigate('/books'),
    }
  );
  const handleEditBook = async (data: BookFormValues) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.set(key, value ?? '');
    }

    try {
      const result = await trigger(formData);
      mutate((existingBooks) => {
        if (!existingBooks) {
          return [];
        }
        return [
          result,
          ...existingBooks.filter((book) => book.id !== result.id),
        ];
      }, false);
    } catch (e) {
      console.log(e);
    }
  };

  const book = data?.find((book) => String(book.id) === bookId);

  if (isLoading) {
    return <Loader />;
  }

  if (!book) {
    return <BookNotFound />;
  }

  return (
    <BookPageLayout title={`Edit book ${book.title}`}>
      <BookForm initialValues={book} onSubmit={handleEditBook} />
    </BookPageLayout>
  );
};

export default EditBook;
