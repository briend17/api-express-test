const axios = require('axios');

const CHUCK_URL = 'https://api.chucknorris.io/jokes/random';

const defaultClient = axios.create({
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300
});

async function fetchChuckJoke(httpClient = defaultClient) {
  const response = await httpClient.get(CHUCK_URL);
  const value = response && response.data && response.data.value;

  if (typeof value !== 'string' || value.trim() === '') {
    const error = new Error('Invalid response from Chuck Norris API');
    error.isResponseError = true;
    throw error;
  }

  return value.trim();
}

async function getChuckJokes(count, httpClient = defaultClient) {
  console.log(`Requesting ${count} jokes from Chuck Norris API`);
  const requests = Array.from({ length: count }, () => fetchChuckJoke(httpClient));
  const jokes = await Promise.all(requests);
  console.log('Chuck Norris jokes received');

  return jokes;
}

module.exports = {
  getChuckJokes
};
