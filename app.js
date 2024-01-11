const express = require('express');
const cors = require('cors');
const quotesRouter = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use('/api/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
