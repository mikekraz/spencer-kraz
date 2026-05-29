import type { AppData, AthleteProfile, DailyPlanEntry, StrengthWorkout, Tournament } from '../types';
import { dateRange, weekday } from '../utils/date';

export const athleteProfile: AthleteProfile = {
  name: 'Tyler Krasner',
  position: 'RHP, pitcher only',
  height: "6'3\"",
  weight: '190 lbs',
  avgFb: '85 mph',
  peakFb: '89 mph',
  summerTeam: 'Canes National 16U',
  goal: 'Stay healthy, stay available, maintain 85-89 through summer, build toward 87-89 avg and 90-91+ peak by October.',
};

export const tournaments: Tournament[] = [
  { id: 't1', name: 'Dynamic Top Org Battle', location: 'Clemson, SC', startDate: '2026-06-11', endDate: '2026-06-15' },
  { id: 't2', name: 'Ultimate Baseball Championship', location: 'West Palm Beach, FL', startDate: '2026-06-14', endDate: '2026-06-18' },
  { id: 't3', name: '16U USA Baseball National Team Championships', location: 'Cary, NC', startDate: '2026-06-22', endDate: '2026-06-26' },
  { id: 't4', name: 'WWBA', location: 'East Cobb, GA', startDate: '2026-07-05', endDate: '2026-07-13' },
  { id: 't5', name: 'PG 16U World Series', location: 'Auburndale, FL', startDate: '2026-07-15', endDate: '2026-07-20' },
  { id: 't6', name: 'Recruiting Contact Window', location: 'Remote / phone', startDate: '2026-08-01', endDate: '2026-08-01' },
  { id: 't7', name: 'Junior Event Window', location: 'October showcase calendar', startDate: '2026-10-01', endDate: '2026-10-31' },
];

export const strengthWorkouts: StrengthWorkout[] = [
  {
    id: 'lower-core',
    name: 'Biocore Lower/Core',
    focus: 'Lower-half force production, trunk control, landing stability',
    items: ['Trap bar deadlift or split squat', 'Lateral lunge pattern', 'Med-ball scoop toss', 'Anti-rotation press', 'Hip mobility reset'],
  },
  {
    id: 'upper-scap',
    name: 'Biocore Upper/Scap',
    focus: 'Scapular strength, cuff capacity, upper-back posture',
    items: ['Chest-supported row', 'Landmine press', 'Band external rotation', 'Serratus wall slide', 'Forearm care circuit'],
  },
  {
    id: 'maintenance',
    name: 'Tournament Maintenance Lift',
    focus: 'Maintain strength without soreness during travel blocks',
    items: ['Goblet squat', 'Push-up variation', 'Band row', 'Core ISO holds', 'Mobility flush'],
  },
  {
    id: 'school',
    name: 'School Lift',
    focus: 'Structured team lift with workload adjusted around pitching',
    items: ['Coach-assigned lift', 'No max-effort upper body within 24h of pitching', 'Add arm care finisher', 'Hydration and nutrition check'],
  },
];

function eventForDate(date: string): string {
  return tournaments
    .filter((event) => date >= event.startDate && date <= event.endDate)
    .map((event) => `${event.name} — ${event.location}`)
    .join(' / ');
}

function phaseForDate(date: string): string {
  if (date <= '2026-06-10') return 'Foundation / Ramp';
  if (date <= '2026-07-20') return 'Summer Tournament Flex';
  if (date <= '2026-08-31') return 'Recruiting Readiness';
  if (date <= '2026-09-30') return 'Velocity & Command Build';
  return 'October Junior Event Prep';
}

function nonTournamentSession(index: number, date: string): Partial<DailyPlanEntry> {
  const day = index % 7;
  const phase = phaseForDate(date);
  if (day === 0) return { sessionType: 'Bullpen', objective: 'Command FB/CH, shape breaking ball, finish with competitive sequences.', throwCountTarget: '65-85 total', maxDistanceTarget: '120 ft', intentTarget: '85-90%', bullpenPitchTarget: phase.includes('October') ? '28-36' : '22-30', strengthWorkout: 'Biocore Upper/Scap', recoveryWork: 'Arm care, breathing, soft tissue' };
  if (day === 1) return { sessionType: 'Recovery Catch', objective: 'Restore arm speed and tissue quality after higher intent.', throwCountTarget: '30-45', maxDistanceTarget: '60-90 ft', intentTarget: 'Low', bullpenPitchTarget: '0', strengthWorkout: 'Mobility / optional school lift', recoveryWork: 'Flush run, cuff, scap, hydration' };
  if (day === 2) return { sessionType: 'Catch Play + Lower', objective: 'Build catch volume and lower-body strength while staying fresh.', throwCountTarget: '55-70', maxDistanceTarget: '120-150 ft', intentTarget: 'Moderate', bullpenPitchTarget: '0', strengthWorkout: 'Biocore Lower/Core', recoveryWork: 'Hip mobility and posterior shoulder care' };
  if (day === 3) return { sessionType: 'Command Catch', objective: 'Low-stress strike throwing, fastball lanes, changeup feel.', throwCountTarget: '45-60', maxDistanceTarget: '90-120 ft', intentTarget: 'Low-moderate', bullpenPitchTarget: '0-12 touch/feel', strengthWorkout: 'Biocore Upper/Scap', recoveryWork: 'Arm care circuit' };
  if (day === 4) return { sessionType: 'Hybrid Pen / Athletic Day', objective: 'Short mound touch or athletic catch based on readiness.', throwCountTarget: '55-75', maxDistanceTarget: '120 ft', intentTarget: '75-88%', bullpenPitchTarget: '12-22', strengthWorkout: 'School Lift', recoveryWork: 'Mobility, hydration, sleep target' };
  if (day === 5) return { sessionType: 'Pre-Event Prep', objective: 'Stay loose and available; sharpen rhythm without fatigue.', throwCountTarget: '35-50', maxDistanceTarget: '90 ft', intentTarget: 'Low', bullpenPitchTarget: '0', strengthWorkout: 'Movement prep only', recoveryWork: 'Band routine, early bedtime' };
  return { sessionType: 'Recovery / Off', objective: 'Full-body recovery and readiness audit.', throwCountTarget: '0-30 optional', maxDistanceTarget: '60 ft optional', intentTarget: 'Very low', bullpenPitchTarget: '0', strengthWorkout: 'Off or light mobility', recoveryWork: 'Walk, tissue work, hydration, nutrition' };
}

export function createInitialDailyPlans(): DailyPlanEntry[] {
  return dateRange('2026-05-29', '2026-10-31').map((date, index) => {
    const event = eventForDate(date);
    const isTournament = Boolean(event) && !event.includes('Recruiting Contact Window') && !event.includes('Junior Event Window');
    const base = isTournament
      ? {
          sessionType: 'Tournament Flex Day',
          objective: 'Pitch only if available; update after actual game usage.',
          throwCountTarget: 'Based on role / coach plan',
          maxDistanceTarget: '90-120 ft pregame or recovery 60-90 ft',
          intentTarget: 'Game intent if used; low if recovery',
          bullpenPitchTarget: 'Pregame only / no extra bullpen',
          strengthWorkout: 'Tournament Maintenance Lift',
          recoveryWork: 'Postgame arm care, flush, hydration, sleep',
        }
      : nonTournamentSession(index, date);

    return {
      id: `plan-${date}`,
      date,
      day: weekday(date),
      phase: phaseForDate(date),
      tournamentEvent: event,
      adjustmentRule: 'Apply workload rule after every outing; downgrade to recovery if soreness is Yellow/Red.',
      notes: isTournament ? 'Editable flex day: enter actual pitches, role, soreness, and next-day plan.' : 'Adjust volume based on sleep, soreness, and recent pitches.',
      ...base,
    } as DailyPlanEntry;
  });
}

export const initialData: AppData = {
  dailyPlans: createInitialDailyPlans(),
  recoveryLogs: [
    { id: 'rec-1', date: '2026-05-29', sleepHours: 8, weight: 190, armSoreness: 2, bodySoreness: 3, energy: 8, hydration: 'Good', notes: 'Baseline check-in; arm feels fresh.' },
    { id: 'rec-2', date: '2026-05-30', sleepHours: 7.5, weight: 190.5, armSoreness: 2, bodySoreness: 2, energy: 8, hydration: 'Good', notes: 'Good response to ramp work.' },
  ],
  bullpenLogs: [
    { id: 'pen-1', date: '2026-05-29', totalPitches: 26, fbCount: 14, chCount: 6, breakingBallCount: 6, strikePct: 68, firstPitchStrikePct: 70, avgFb: 85, peakFb: 89, avgCh: 77, avgBreakingBall: 73, rpe: 6, armSorenessAfter: 2, notes: 'Baseline pen; clean direction and good FB finish.' },
  ],
  gameAppearances: [
    { id: 'game-1', date: '2026-05-31', event: 'Controlled scrimmage', opponent: 'Live hitters', role: '1-inning tune-up', pitches: 18, inningsPitched: '1.0', k: 1, bb: 0, h: 1, er: 0, avgFb: 85, peakFb: 88, strikePct: 72, firstPitchStrikePct: 75, notes: 'Efficient low-stress appearance.' },
  ],
};
