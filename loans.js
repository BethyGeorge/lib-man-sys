const express = require('express');
const router = express.Router();

// Get all loans
router.get('/', async (req, res) => {
  // Retrieve loans from Supabase
  const { data, error } = await supabase
    .from('loans')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add a new loan
router.post('/', async (req, res) => {
  const { user_id, book_id, due_date } = req.body;

  const { data, error } = await supabase
    .from('loans')
    .insert([{ user_id, book_id, due_date }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Other routes for updating and returning loans can be added here

module.exports = router;
