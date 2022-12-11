const { getBaseUrl } = require('../src/server/app');

test('Test the type of the url if it is string', () => {
  expect(typeof getBaseUrl(5)).toBe('string');
});

test('should return the current weather url', () => {
  expect(getBaseUrl(5)).toEqual('https://api.weatherbit.io/v2.0/current?key');
});

test('should return the forcast weather url', () => {
  expect(getBaseUrl(10)).toEqual(
    'https://api.weatherbit.io/v2.0/forecast/daily?key'
  );
});
