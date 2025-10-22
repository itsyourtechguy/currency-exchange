import type { Dayjs } from 'dayjs';

export type RateData = {
  date: Dayjs;
  rates: Record<string, number | null>;
};