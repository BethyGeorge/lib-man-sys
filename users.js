const express = require('express');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  // Retrieve users from Supabase
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Add a new user
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, role }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

// Other routes for updating and deleting users can be added here

module.exports = router;
