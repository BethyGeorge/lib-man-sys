const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Set up email transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Import routes
const booksRouter = require('./routes/books');
const loansRouter = require('./routes/loans');
const usersRouter = require('./routes/users');

// Use routes
app.use('/api/books', booksRouter);
app.use('/api/loans', loansRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Library Management System API');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
