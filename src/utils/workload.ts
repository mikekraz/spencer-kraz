import type { Availability, RecoveryLog } from '../types';

export function getAvailabilityFromSoreness(armSoreness: number): Availability {
  if (armSoreness >= 7) return 'Red';
  if (armSoreness >= 4) return 'Yellow';
  return 'Green';
}

export function getAvailability(log?: RecoveryLog): Availability {
  return getAvailabilityFromSoreness(log?.armSoreness ?? 2);
}

export function workloadRuleForPitches(pitches: number): string {
  if (pitches <= 0) return 'No game workload: follow planned throwing and readiness check.';
  if (pitches <= 20) return '1-20 pitches: next day recovery catch 60-90 ft, 30-40 throws.';
  if (pitches <= 40) return '21-40 pitches: next day recovery catch; Day 2 catch play; Day 3 available if soreness is low.';
  if (pitches <= 60) return '41-60 pitches: next day recovery; Day 2 recovery catch; Day 3 catch play; Day 4 available or light bullpen.';
  return '61+ pitches: starter recovery protocol; no bullpen for 4-5 days.';
}

export function availabilityClasses(availability: Availability): string {
  if (availability === 'Green') return 'bg-emerald-100 text-emerald-800 ring-emerald-200';
  if (availability === 'Yellow') return 'bg-amber-100 text-amber-800 ring-amber-200';
  return 'bg-rose-100 text-rose-800 ring-rose-200';
}
