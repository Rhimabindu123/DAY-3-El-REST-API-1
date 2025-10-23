const express = require('express');
const app = express();
app.use(express.json());

// Start server on port 3000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Diverse initial books array
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },

];

// GET /books — Return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books — Add a new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(400).json({ message: 'ID, title, and author are required.' });
  }
  books.push({ id, title, author });
  res.status(201).json({ message: 'Book added', book: { id, title, author } });
});

// PUT /books/:id — Update a book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  let book = books.find(b => b.id == id);
  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    res.json({ message: 'Book updated', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE /books/:id — Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id == id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

