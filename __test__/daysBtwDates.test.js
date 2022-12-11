import { getDays } from '../src/client/js/daysBtwDates';

test('Test the type of return value from the getDays() function', () => {
  expect(typeof getDays('2022-12-17')).toBe('number');
});
