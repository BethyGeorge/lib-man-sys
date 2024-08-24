const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
// Get all books
router.get('/', async (req, res) => {
  // Retrieve books from Supabase
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, genre, isbn } = req.body;

  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, genre, isbn }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Other routes for updating and deleting books can be added here

module.exports = router;
