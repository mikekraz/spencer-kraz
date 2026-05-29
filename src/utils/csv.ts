import type { AppData } from '../types';

function escapeCsv(value: unknown): string {
  const stringValue = String(value ?? '');
  if (/[,"\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function sectionToCsv<T extends Record<string, unknown>>(title: string, rows: T[]): string {
  if (!rows.length) return `${title}\n`;
  const headers = Object.keys(rows[0]);
  return [title, headers.join(','), ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','))].join('\n');
}

export function exportAppDataToCsv(data: AppData): void {
  const content = [
    sectionToCsv('Daily Plan', data.dailyPlans as unknown as Record<string, unknown>[]),
    sectionToCsv('Recovery Logs', data.recoveryLogs as unknown as Record<string, unknown>[]),
    sectionToCsv('Bullpen Logs', data.bullpenLogs as unknown as Record<string, unknown>[]),
    sectionToCsv('Game Appearances', data.gameAppearances as unknown as Record<string, unknown>[]),
  ].join('\n\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tyler-pitching-development-system.csv';
  link.click();
  URL.revokeObjectURL(url);
}
