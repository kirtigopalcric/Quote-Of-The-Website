const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const quotesPath = path.join(__dirname, '../data/quotes.json');

router.get('/random', (req, res) => {
  try {
    const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/search', (req, res) => {
  const { author } = req.query;

  if (!author) {
    return res.status(400).json({ message: 'Author parameter is required for search.' });
  }

  try {
    const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    const matchingQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    res.json(matchingQuotes);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
