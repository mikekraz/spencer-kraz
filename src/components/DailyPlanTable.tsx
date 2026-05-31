import type { DailyPlanEntry, Filters, RecoveryLog } from '../types';
import { formatDisplayDate } from '../utils/date';
import { getAvailability } from '../utils/workload';
import { AvailabilityBadge } from './Badge';
import { Card } from './Section';

const fields: Array<keyof DailyPlanEntry> = ['date','day','phase','sessionType','objective','throwCountTarget','maxDistanceTarget','intentTarget','bullpenPitchTarget','strengthWorkout','recoveryWork','tournamentEvent','adjustmentRule','notes'];
const editableFields: Array<keyof DailyPlanEntry> = fields.filter((field) => field !== 'id' && field !== 'day');

export function DailyPlanTable({
  plans,
  recoveryLogs,
  filters,
  setFilters,
  onSave,
  onDelete,
  onAdd,
}: {
  plans: DailyPlanEntry[];
  recoveryLogs: RecoveryLog[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onSave: (entry: DailyPlanEntry) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  const availabilityByDate = new Map(recoveryLogs.map((log) => [log.date, getAvailability(log)]));
  const unique = (key: keyof DailyPlanEntry) => [...new Set(plans.map((plan) => String(plan[key])).filter(Boolean))].sort();
  const filtered = plans.filter((plan) => {
    const availability = availabilityByDate.get(plan.date) ?? 'Green';
    return (!filters.phase || plan.phase === filters.phase) && (!filters.event || plan.tournamentEvent.includes(filters.event)) && (!filters.sessionType || plan.sessionType === filters.sessionType) && (!filters.availability || availability === filters.availability);
  });

  return (
    <Card>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-lg font-black">Daily Plan Calendar</h3>
          <p className="text-sm text-slate-600">May 29, 2026 through October 31, 2026. Tournament flex days are editable after actual usage.</p>
        </div>
        <button onClick={onAdd} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-slate-800">Add Day</button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={filters.phase} onChange={(e) => setFilters({ ...filters, phase: e.target.value })}><option value="">All phases</option>{unique('phase').map((value) => <option key={value}>{value}</option>)}</select>
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={filters.event} onChange={(e) => setFilters({ ...filters, event: e.target.value })}><option value="">All events</option>{unique('tournamentEvent').map((value) => <option key={value}>{value}</option>)}</select>
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={filters.sessionType} onChange={(e) => setFilters({ ...filters, sessionType: e.target.value })}><option value="">All session types</option>{unique('sessionType').map((value) => <option key={value}>{value}</option>)}</select>
        <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={filters.availability} onChange={(e) => setFilters({ ...filters, availability: e.target.value })}><option value="">All availability</option><option>Green</option><option>Yellow</option><option>Red</option></select>
      </div>
      <div className="mt-4 max-h-[650px] overflow-auto rounded-xl border border-slate-200">
        <table className="min-w-[1900px] text-left text-sm">
          <thead className="sticky top-0 bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
            <tr>{['Availability', ...fields, 'Actions'].map((head) => <th className="px-3 py-3" key={head}>{head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((plan) => (
              <tr key={plan.id} className={plan.sessionType === 'Tournament Flex Day' ? 'bg-emerald-50/60' : 'bg-white'}>
                <td className="px-3 py-2"><AvailabilityBadge availability={availabilityByDate.get(plan.date) ?? 'Green'} /></td>
                {fields.map((field) => (
                  <td className="px-3 py-2 align-top" key={field}>
                    {field === 'date' ? <span className="font-bold">{formatDisplayDate(plan.date)}</span> : editableFields.includes(field) ? (
                      <textarea className="min-h-10 w-full min-w-32 rounded-lg border border-slate-200 px-2 py-1 text-xs" value={String(plan[field])} onChange={(e) => onSave({ ...plan, [field]: e.target.value })} />
                    ) : <span>{String(plan[field])}</span>}
                  </td>
                ))}
                <td className="px-3 py-2"><button className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100" onClick={() => onDelete(plan.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
