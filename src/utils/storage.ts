import type { AppData } from '../types';

const STORAGE_KEY = 'tyler-pitching-development-system-v1';

export function loadAppData(fallback: AppData): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearAppData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
