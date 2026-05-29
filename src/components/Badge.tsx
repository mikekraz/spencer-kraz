import type { ReactNode } from 'react';
import type { Availability } from '../types';
import { availabilityClasses } from '../utils/workload';

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${availabilityClasses(availability)}`}>{availability}</span>;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{children}</span>;
}
