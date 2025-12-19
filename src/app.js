const express = require('express');
const chistesRouter = require('./routes/chistes');

const app = express();

app.use(express.json());
app.use('/chistes', chistesRouter);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
