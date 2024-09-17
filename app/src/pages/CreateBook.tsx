import BookForm, { BookFormValues } from '../components/BookForm';
import useSWRMutation from 'swr/mutation';
import { createResource } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import BookPageLayout from '../components/BookPageLayout';
import { BookRecord } from '../types/books';

const CreateBook = () => {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation(
    'http://localhost:3001/books',
    createResource,
    {
      onSuccess: () => navigate('/books'),
      populateCache: (newBook: BookRecord, existingBooks?: BookRecord[]) => {
        if (!existingBooks) {
          return [newBook];
        }
        return [newBook, ...existingBooks];
      },
      revalidate: false,
    }
  );

  const handleCreateBook = (data: BookFormValues) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.set(key, value ?? '');
    }
    void trigger(formData);
  };

  return (
    <BookPageLayout title="Create a New Book">
      <BookForm onSubmit={handleCreateBook} />
    </BookPageLayout>
  );
};

export default CreateBook;
