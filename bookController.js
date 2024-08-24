const supabase = require('../config/supabase');

const getBooks = async (req, res) => {
  const { data: books, error } = await supabase.from('books').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(books);
};

const createBook = async (req, res) => {
  const { title, author, isbn, available } = req.body;
  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, isbn, available }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Book created successfully', data });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, available } = req.body;

  const { data, error } = await supabase
    .from('books')
    .update({ title, author, isbn, available })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Book updated successfully', data });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('books').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Book deleted', data });
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
