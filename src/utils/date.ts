export const TODAY = '2026-05-29';

export function parseDate(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

export function formatDisplayDate(date: string): string {
  return parseDate(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function weekday(date: string): string {
  return parseDate(date).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function daysBetween(start: string, end: string): number {
  const a = parseDate(start).getTime();
  const b = parseDate(end).getTime();
  return Math.ceil((b - a) / 86_400_000);
}

export function addDays(date: string, amount: number): string {
  const copy = parseDate(date);
  copy.setUTCDate(copy.getUTCDate() + amount);
  return isoDate(copy);
}

export function dateRange(start: string, end: string): string[] {
  const days: string[] = [];
  let current = start;
  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }
  return days;
}
