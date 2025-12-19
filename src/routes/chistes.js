const express = require('express');
const { getChuckJokes } = require('../services/chuckService');
const { getDadJokes } = require('../services/dadService');
const { pairJokes } = require('../utils/pairJokes');

const router = express.Router();

router.get('/emparejados', async (req, res) => {
  const count = 5;

  try {
    console.log('Fetching jokes in parallel');
    const [chuckJokes, dadJokes] = await Promise.all([
      getChuckJokes(count),
      getDadJokes(count)
    ]);

    console.log('Pairing jokes');
    const paired = pairJokes(chuckJokes, dadJokes);
    res.json(paired);
  } catch (error) {
    console.error('Failed to fetch paired jokes:', error);

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Timeout fetching jokes' });
    }

    if (error.isResponseError) {
      return res.status(502).json({ error: error.message });
    }

    if (error.code && !error.response) {
      return res.status(502).json({ error: 'Network error fetching jokes' });
    }

    if (error.response) {
      return res.status(502).json({ error: 'Bad response from external API' });
    }

    return res.status(500).json({ error: 'Unexpected error' });
  }
});

module.exports = router;
