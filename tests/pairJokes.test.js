const { pairJokes } = require('../src/utils/pairJokes');

describe('pairJokes', () => {
  it('pairs jokes 1 to 1 and builds combinado', () => {
    const chuck = ['Chuck Norris counted to infinity.'];
    const dad = ['Why did the math book look sad? Because it had too many problems.'];

    const result = pairJokes(chuck, dad);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      chuck: 'Chuck Norris counted to infinity.',
      dad: 'Why did the math book look sad? Because it had too many problems.',
      combinado: 'Chuck Norris counted to infinity. Also, Why did the math book look sad? Because it had too many problems.'
    });
  });

  it('uses the minimum length when arrays differ', () => {
    const chuck = ['a', 'b'];
    const dad = ['c'];

    const result = pairJokes(chuck, dad);

    expect(result).toHaveLength(1);
    expect(result[0].chuck).toBe('a');
    expect(result[0].dad).toBe('c');
  });

  it('throws for invalid input', () => {
    expect(() => pairJokes('nope', [])).toThrow('Jokes must be arrays');
    expect(() => pairJokes([''], ['ok'])).toThrow('Invalid chuck joke');
  });
});
