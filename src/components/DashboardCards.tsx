import type { BullpenLog, DailyPlanEntry, GameAppearance, RecoveryLog, Tournament } from '../types';
import { TODAY, daysBetween, formatDisplayDate } from '../utils/date';
import { getAvailability } from '../utils/workload';
import { AvailabilityBadge } from './Badge';
import { Card } from './Section';

function lastByDate<T extends { date: string }>(rows: T[]): T | undefined {
  return [...rows].sort((a, b) => b.date.localeCompare(a.date))[0];
}

function trend(values: Array<number | undefined>): string {
  const clean = values.filter((value): value is number => typeof value === 'number' && !Number.isNaN(value));
  if (!clean.length) return 'No data';
  return clean.slice(-5).join(' → ');
}

export function DashboardCards({
  todayPlan,
  recoveryLogs,
  bullpenLogs,
  gameAppearances,
  tournaments,
}: {
  todayPlan?: DailyPlanEntry;
  recoveryLogs: RecoveryLog[];
  bullpenLogs: BullpenLog[];
  gameAppearances: GameAppearance[];
  tournaments: Tournament[];
}) {
  const lastRecovery = lastByDate(recoveryLogs);
  const lastBullpen = lastByDate(bullpenLogs);
  const lastGame = lastByDate(gameAppearances);
  const last7PitchTotal = gameAppearances
    .filter((game) => game.date >= '2026-05-23' && game.date <= TODAY)
    .reduce((sum, game) => sum + Number(game.pitches || 0), 0);
  const nextTournament = tournaments.find((event) => event.startDate >= TODAY && !event.name.includes('Recruiting') && !event.name.includes('Junior'));

  const cards = [
    { label: "Today's Plan", value: todayPlan?.sessionType ?? 'No plan', detail: todayPlan?.objective ?? 'Add a daily plan entry.' },
    { label: 'Last Bullpen', value: lastBullpen ? `${lastBullpen.totalPitches} pitches` : 'No bullpen', detail: lastBullpen ? `${formatDisplayDate(lastBullpen.date)} • ${lastBullpen.avgFb}/${lastBullpen.peakFb} FB` : 'Log first bullpen.' },
    { label: 'Last Game Appearance', value: lastGame ? `${lastGame.pitches} pitches` : 'No game', detail: lastGame ? `${formatDisplayDate(lastGame.date)} • ${lastGame.role}` : 'Log first appearance.' },
    { label: 'Total Pitches Last 7 Days', value: String(last7PitchTotal), detail: 'Game appearance workload window ending May 29, 2026.' },
    { label: 'Arm Soreness Trend', value: trend(recoveryLogs.map((log) => log.armSoreness)), detail: 'Last logged 1-10 arm scores.' },
    { label: 'Weight Trend', value: trend(recoveryLogs.map((log) => log.weight)), detail: 'Last logged body weights.' },
    { label: 'Avg FB Trend', value: trend([...bullpenLogs.map((log) => log.avgFb), ...gameAppearances.map((game) => game.avgFb)]), detail: 'Bullpen and game average fastball.' },
    { label: 'Peak FB Trend', value: trend([...bullpenLogs.map((log) => log.peakFb), ...gameAppearances.map((game) => game.peakFb)]), detail: 'Bullpen and game peak fastball.' },
    { label: 'Next Tournament', value: nextTournament?.name ?? 'None', detail: nextTournament ? `${formatDisplayDate(nextTournament.startDate)} • ${nextTournament.location}` : 'Tournament block complete.' },
    { label: 'Aug. 1 Recruiting Countdown', value: `${Math.max(0, daysBetween(TODAY, '2026-08-01'))} days`, detail: 'Recruiting contact window opens August 1, 2026.' },
    { label: 'October Junior Event Countdown', value: `${Math.max(0, daysBetween(TODAY, '2026-10-01'))} days`, detail: 'Junior event preparation window begins October 1, 2026.' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-gradient-to-br from-emerald-50 to-white">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Availability</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-3xl font-black">{getAvailability(lastRecovery)}</p>
          <AvailabilityBadge availability={getAvailability(lastRecovery)} />
        </div>
        <p className="mt-3 text-sm text-slate-600">Based on latest arm soreness log{lastRecovery ? ` (${formatDisplayDate(lastRecovery.date)})` : ''}.</p>
      </Card>
      {cards.map((card) => (
        <Card key={card.label}>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{card.label}</p>
          <p className="mt-3 text-2xl font-black text-slate-950">{card.value}</p>
          <p className="mt-2 text-sm text-slate-600">{card.detail}</p>
        </Card>
      ))}
    </div>
  );
}
