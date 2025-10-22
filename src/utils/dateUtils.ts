import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Today
export const today = dayjs().startOf('day');

// 90 days ago from today
export const minDate = today.subtract(90, 'day').startOf('day');

/**
 * Validates if a date is within [minDate, today]
 */
export function isValidDate(date: Dayjs | null): boolean {
  if (!date) return false;
  const d = date.startOf('day');
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  return d.isSameOrAfter(minDate) && d.isSameOrBefore(today);
}
