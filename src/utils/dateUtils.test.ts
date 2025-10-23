import dayjs from 'dayjs';
import { today, minDate, isValidDate } from './dateUtils';

describe('dateUtils', () => {
  it('defines today at start of day', () => {
    expect(today.hour()).toBe(0);
  });

  it('sets minDate to 90 days ago', () => {
    const expected = dayjs().startOf('day').subtract(90, 'day');
    expect(minDate.isSame(expected)).toBe(true);
  });

  it('validates date range', () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(today)).toBe(true);
    expect(isValidDate(minDate.subtract(1, 'day'))).toBe(false);
  });
});