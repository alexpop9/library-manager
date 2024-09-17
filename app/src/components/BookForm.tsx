import {
  Button,
  TextField,
  Box,
  Grid,
  InputLabel,
  Avatar,
  IconButton,
  styled,
  InputProps,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BookRecord } from '../types/books';

interface BookFormProps {
  initialValues?: BookRecord;
  onSubmit: (data: BookFormValues) => void;
}

const VisuallyHiddenInput = styled('input')<InputProps>({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  genre: Yup.string().required('Genre is required'),
  author: Yup.string().required('Author is required'),
  img: Yup.string().nullable(),
});

export type BookFormValues = Yup.InferType<typeof validationSchema>;

const BookForm = ({ initialValues, onSubmit }: BookFormProps) => {
  const formik = useFormik<BookFormValues>({
    initialValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      genre: initialValues?.genre ?? '',
      author: initialValues?.author ?? '',
      img: initialValues?.img ?? null,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="genre"
              name="genre"
              label="Genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
              error={formik.touched.genre && Boolean(formik.errors.genre)}
              helperText={formik.touched.genre && formik.errors.genre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <InputLabel htmlFor="img">Upload Book Cover</InputLabel>
              <Box>
                <Button
                  color="info"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                  <VisuallyHiddenInput
                    type="file"
                    id="img"
                    name="img"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.currentTarget.files) {
                        void formik.setFieldValue(
                          'img',
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                  />
                </Button>
                {formik.values.img && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: {
                        xs: '60px',
                        sm: '50%',
                      },
                      right: 8,
                      transform: 'translateY(-50%)',
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'text.primary',
                      },
                    }}
                    onClick={() => formik.setFieldValue('img', null)}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            {formik.values.img && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Avatar
                  alt="Book Cover"
                  src={
                    typeof formik.values.img === 'string'
                      ? `http://localhost:3001${formik.values.img}`
                      : URL.createObjectURL(formik.values.img as Blob)
                  }
                  variant="rounded"
                  sx={{ width: 150, height: 200, mx: 'auto', mt: 1 }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {initialValues ? 'Update Book' : 'Create Book'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default BookForm;
