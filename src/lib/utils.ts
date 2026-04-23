import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: Date) {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000); 

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const intervals: { limit: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { limit: 60, unit: 'second' },
    { limit: 3600, unit: 'minute' },
    { limit: 86400, unit: 'hour' },
    { limit: 2592000, unit: 'day' },
    { limit: 31536000, unit: 'month' },
    { limit: Infinity, unit: 'year' }
  ];

  for (const interval of intervals) {
    if (Math.abs(diffInSeconds) < interval.limit) {
      const val = Math.round(diffInSeconds / (interval.limit === 60 ? 1 : intervals[intervals.indexOf(interval) - 1].limit));
      return rtf.format(val, interval.unit);
    }
  }
}