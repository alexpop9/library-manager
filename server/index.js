const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add a new book with file upload
app.post("/books", upload.single("img"), (req, res) => {
  const book = {
    id: Date.now(),
    ...req.body,
    img: req.file ? `/uploads/${req.file.filename}` : null
  };
  books.push(book);
  res.status(201).json(book);
});

// Update a book
app.put("/books/:id", upload.single("img"), (req, res) => {
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };

    if (req.file) {
      books[index].img = `/uploads/${req.file.filename}`;
    }

    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
// Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
