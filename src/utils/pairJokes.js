function ensureString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Invalid ${label} joke`);
  }

  return value.trim();
}

function combineJokes(chuck, dad) {
  const needsSeparator = /[.!?]$/.test(chuck);
  const separator = needsSeparator ? ' Also, ' : '. Also, ';

  return `${chuck}${separator}${dad}`;
}

function pairJokes(chuckJokes, dadJokes) {
  if (!Array.isArray(chuckJokes) || !Array.isArray(dadJokes)) {
    throw new Error('Jokes must be arrays');
  }

  const length = Math.min(chuckJokes.length, dadJokes.length);

  return Array.from({ length }, (_, index) => {
    const chuck = ensureString(chuckJokes[index], 'chuck');
    const dad = ensureString(dadJokes[index], 'dad');

    return {
      chuck,
      dad,
      combinado: combineJokes(chuck, dad)
    };
  });
}

module.exports = {
  pairJokes
};
