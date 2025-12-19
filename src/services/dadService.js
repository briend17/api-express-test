const axios = require('axios');

const DAD_URL = 'https://icanhazdadjoke.com/';

const defaultClient = axios.create({
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'api-express-test'
  }
});

async function fetchDadJoke(httpClient = defaultClient) {
  const response = await httpClient.get(DAD_URL);
  const joke = response && response.data && response.data.joke;

  if (typeof joke !== 'string' || joke.trim() === '') {
    const error = new Error('Invalid response from Dad Joke API');
    error.isResponseError = true;
    throw error;
  }

  return joke.trim();
}

async function getDadJokes(count, httpClient = defaultClient) {
  console.log(`Requesting ${count} jokes from Dad Joke API`);
  const requests = Array.from({ length: count }, () => fetchDadJoke(httpClient));
  const jokes = await Promise.all(requests);
  console.log('Dad jokes received');

  return jokes;
}

module.exports = {
  getDadJokes
};
