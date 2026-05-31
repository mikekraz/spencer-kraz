import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Activity, CalendarDays, Download, Dumbbell, RotateCcw, ShieldCheck, Target, Trash2 } from 'lucide-react';
import { AvailabilityBadge, Pill } from './components/Badge';
import { DashboardCards } from './components/DashboardCards';
import { DailyPlanTable } from './components/DailyPlanTable';
import { BullpenForm, GameForm, RecoveryForm } from './components/Forms';
import { Card, Section } from './components/Section';
import { athleteProfile, initialData, strengthWorkouts, tournaments } from './data/initialData';
import type { AppData, BullpenLog, DailyPlanEntry, Filters, GameAppearance, RecoveryLog } from './types';
import { exportAppDataToCsv } from './utils/csv';
import { TODAY, formatDisplayDate, weekday } from './utils/date';
import { clearAppData, loadAppData, saveAppData } from './utils/storage';
import { getAvailability, workloadRuleForPitches } from './utils/workload';

const navItems = [
  ['Dashboard', 'dashboard'], ['Daily Plan', 'daily-plan'], ['Tournaments', 'tournaments'], ['Recovery', 'recovery'], ['Bullpens', 'bullpens'], ['Games', 'games'], ['Strength', 'strength'],
];

export default function App() {
  const [data, setData] = useState<AppData>(() => loadAppData(initialData));
  const [filters, setFilters] = useState<Filters>({ phase: '', event: '', sessionType: '', availability: '' });

  useEffect(() => saveAppData(data), [data]);

  const todayPlan = useMemo(() => data.dailyPlans.find((plan) => plan.date === TODAY), [data.dailyPlans]);
  const updateDailyPlan = (entry: DailyPlanEntry) => setData((current) => ({ ...current, dailyPlans: current.dailyPlans.map((plan) => plan.id === entry.id ? entry : plan) }));
  const addDailyPlan = () => setData((current) => ({
    ...current,
    dailyPlans: [{ id: crypto.randomUUID(), date: TODAY, day: weekday(TODAY), phase: 'Custom', sessionType: 'Custom', objective: 'Add objective', throwCountTarget: '', maxDistanceTarget: '', intentTarget: '', bullpenPitchTarget: '', strengthWorkout: '', recoveryWork: '', tournamentEvent: '', adjustmentRule: 'Apply workload rules.', notes: '' }, ...current.dailyPlans],
  }));

  const addRecovery = (log: RecoveryLog) => setData((current) => ({ ...current, recoveryLogs: [log, ...current.recoveryLogs] }));
  const addBullpen = (log: BullpenLog) => setData((current) => ({ ...current, bullpenLogs: [log, ...current.bullpenLogs] }));
  const addGame = (game: GameAppearance) => setData((current) => ({ ...current, gameAppearances: [game, ...current.gameAppearances] }));
  const resetDemo = () => { clearAppData(); setData(initialData); };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">Canes National 16U</p>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">Tyler Pitching Development System</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map(([label, id]) => <a className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-emerald-500 hover:text-white" href={`#${id}`} key={id}>{label}</a>)}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-8">
        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 shadow-2xl md:p-8">
            <div className="flex items-center gap-3 text-emerald-300"><ShieldCheck /><span className="text-sm font-black uppercase tracking-widest">Health-first pitching roadmap</span></div>
            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Build availability first. Let velocity follow.</h2>
            <p className="mt-5 max-w-3xl text-lg text-slate-300">A complete interactive dashboard for Tyler Krasner’s summer workload, recovery, Biocore/school workouts, recruiting readiness, and October junior-event preparation.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => exportAppDataToCsv(data)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-600"><Download size={18} /> Export all CSV</button>
              <button onClick={resetDemo} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 hover:bg-slate-100"><RotateCcw size={18} /> Reset/demo data</button>
            </div>
          </div>
          <Card className="bg-white">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">Athlete Profile</p>
            <h3 className="mt-2 text-3xl font-black">{athleteProfile.name}</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                ['Position', athleteProfile.position], ['Height', athleteProfile.height], ['Weight', athleteProfile.weight], ['Avg FB', athleteProfile.avgFb], ['Peak FB', athleteProfile.peakFb], ['Summer Team', athleteProfile.summerTeam],
              ].map(([label, value]) => <div className="rounded-xl bg-slate-50 p-3" key={label}><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="font-black">{value}</p></div>)}
            </div>
            <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950">Goal: {athleteProfile.goal}</p>
          </Card>
        </section>

        <Section id="dashboard" title="Dashboard" subtitle="At-a-glance readiness, trends, pitch volume, and countdowns pinned to May 29, 2026.">
          <DashboardCards todayPlan={todayPlan} recoveryLogs={data.recoveryLogs} bullpenLogs={data.bullpenLogs} gameAppearances={data.gameAppearances} tournaments={tournaments} />
        </Section>

        <Section id="daily-plan" title="Daily Plan" subtitle="Edit any cell, add custom days, delete entries, and filter the complete calendar by phase, event, session type, or availability.">
          <DailyPlanTable plans={data.dailyPlans} recoveryLogs={data.recoveryLogs} filters={filters} setFilters={setFilters} onSave={updateDailyPlan} onDelete={(id) => setData((current) => ({ ...current, dailyPlans: current.dailyPlans.filter((plan) => plan.id !== id) }))} onAdd={addDailyPlan} />
        </Section>

        <Section id="tournaments" title="Tournament Schedule & Workload Rules" subtitle="Tournament days are treated as flexible and should be updated after Tyler’s actual usage.">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <h3 className="flex items-center gap-2 text-lg font-black"><CalendarDays /> Events</h3>
              <div className="mt-4 space-y-3">
                {tournaments.map((event) => <div key={event.id} className="rounded-2xl border border-slate-100 p-4"><p className="font-black">{event.name}</p><p className="text-sm text-slate-600">{formatDisplayDate(event.startDate)}{event.startDate !== event.endDate ? ` – ${formatDisplayDate(event.endDate)}` : ''} • {event.location}</p></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="flex items-center gap-2 text-lg font-black"><Activity /> Workload Rules</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {[18, 35, 52, 72].map((pitches) => <div className="rounded-2xl bg-slate-50 p-4" key={pitches}><Pill>{pitches === 18 ? '1-20' : pitches === 35 ? '21-40' : pitches === 52 ? '41-60' : '61+'} pitches</Pill><p className="mt-2 font-semibold">{workloadRuleForPitches(pitches)}</p></div>)}
              </div>
            </Card>
          </div>
        </Section>

        <Section id="recovery" title="Recovery Tracker" subtitle="Availability is automatic: Green for arm soreness 1-3, Yellow for 4-6, Red for 7+.">
          <RecoveryForm onAdd={addRecovery} />
          <Card>
            <LogTable<RecoveryLog> rows={data.recoveryLogs} columns={['date','sleepHours','weight','armSoreness','bodySoreness','energy','hydration','notes']} renderExtra={(row) => <AvailabilityBadge availability={getAvailability(row)} />} onDelete={(id) => setData((current) => ({ ...current, recoveryLogs: current.recoveryLogs.filter((row) => row.id !== id) }))} />
          </Card>
        </Section>

        <Section id="bullpens" title="Bullpen Log" subtitle="Estimated strikes and command score calculate automatically from total pitches, strike %, and first-pitch strike %.">
          <BullpenForm onAdd={addBullpen} />
          <Card><LogTable rows={data.bullpenLogs.map((log) => ({ ...log, estimatedStrikes: Math.round(log.totalPitches * (log.strikePct / 100)), commandScore: Math.round((log.strikePct * 0.7 + log.firstPitchStrikePct * 0.3) * 10) / 10 }))} columns={['date','totalPitches','fbCount','chCount','breakingBallCount','strikePct','firstPitchStrikePct','estimatedStrikes','commandScore','avgFb','peakFb','avgCh','avgBreakingBall','rpe','armSorenessAfter','notes']} onDelete={(id) => setData((current) => ({ ...current, bullpenLogs: current.bullpenLogs.filter((row) => row.id !== id) }))} /></Card>
        </Section>

        <Section id="games" title="Game Appearance Log" subtitle="Track role, pitch volume, innings, outcomes, velocity, and command in each tournament or live appearance.">
          <GameForm onAdd={addGame} />
          <Card><LogTable rows={data.gameAppearances} columns={['date','event','opponent','role','pitches','inningsPitched','k','bb','h','er','avgFb','peakFb','strikePct','firstPitchStrikePct','notes']} onDelete={(id) => setData((current) => ({ ...current, gameAppearances: current.gameAppearances.filter((row) => row.id !== id) }))} /></Card>
        </Section>

        <Section id="strength" title="Strength Workout Library" subtitle="Biocore, tournament maintenance, and school lift templates for workload-aware training.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {strengthWorkouts.map((workout) => <Card key={workout.id}><Dumbbell className="text-emerald-600" /><h3 className="mt-3 text-xl font-black">{workout.name}</h3><p className="mt-2 text-sm font-semibold text-slate-600">{workout.focus}</p><ul className="mt-4 space-y-2 text-sm text-slate-700">{workout.items.map((item) => <li className="flex gap-2" key={item}><Target size={16} className="mt-0.5 text-emerald-600" />{item}</li>)}</ul></Card>)}
          </div>
        </Section>
      </main>
    </div>
  );
}

function LogTable<T extends { id: string; date: string }>({ rows, columns, onDelete, renderExtra }: { rows: T[]; columns: string[]; onDelete: (id: string) => void; renderExtra?: (row: T) => ReactNode }) {
  return <div className="overflow-auto rounded-xl border border-slate-200"><table className="min-w-full text-left text-sm"><thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600"><tr>{renderExtra ? <th className="px-3 py-3">Status</th> : null}{columns.map((column) => <th className="px-3 py-3" key={column}>{column.replace(/([A-Z])/g, ' $1')}</th>)}<th className="px-3 py-3">Delete</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{rows.sort((a, b) => b.date.localeCompare(a.date)).map((row) => <tr key={row.id}>{renderExtra ? <td className="px-3 py-2">{renderExtra(row)}</td> : null}{columns.map((column) => <td className="max-w-xs px-3 py-2 align-top" key={column}>{String((row as Record<string, unknown>)[column] ?? '')}</td>)}<td className="px-3 py-2"><button onClick={() => onDelete(row.id)} className="rounded-lg bg-rose-50 p-2 text-rose-700 hover:bg-rose-100" aria-label="Delete row"><Trash2 size={16} /></button></td></tr>)}</tbody></table></div>;
}
