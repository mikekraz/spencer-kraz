export type Availability = 'Green' | 'Yellow' | 'Red';

export interface AthleteProfile {
  name: string;
  position: string;
  height: string;
  weight: string;
  avgFb: string;
  peakFb: string;
  summerTeam: string;
  goal: string;
}

export interface Tournament {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface DailyPlanEntry {
  id: string;
  date: string;
  day: string;
  phase: string;
  sessionType: string;
  objective: string;
  throwCountTarget: string;
  maxDistanceTarget: string;
  intentTarget: string;
  bullpenPitchTarget: string;
  strengthWorkout: string;
  recoveryWork: string;
  tournamentEvent: string;
  adjustmentRule: string;
  notes: string;
}

export interface RecoveryLog {
  id: string;
  date: string;
  sleepHours: number;
  weight: number;
  armSoreness: number;
  bodySoreness: number;
  energy: number;
  hydration: string;
  notes: string;
}

export interface BullpenLog {
  id: string;
  date: string;
  totalPitches: number;
  fbCount: number;
  chCount: number;
  breakingBallCount: number;
  strikePct: number;
  firstPitchStrikePct: number;
  avgFb: number;
  peakFb: number;
  avgCh: number;
  avgBreakingBall: number;
  rpe: number;
  armSorenessAfter: number;
  notes: string;
}

export interface GameAppearance {
  id: string;
  date: string;
  event: string;
  opponent: string;
  role: string;
  pitches: number;
  inningsPitched: string;
  k: number;
  bb: number;
  h: number;
  er: number;
  avgFb: number;
  peakFb: number;
  strikePct: number;
  firstPitchStrikePct: number;
  notes: string;
}

export interface StrengthWorkout {
  id: string;
  name: string;
  focus: string;
  items: string[];
}

export interface AppData {
  dailyPlans: DailyPlanEntry[];
  recoveryLogs: RecoveryLog[];
  bullpenLogs: BullpenLog[];
  gameAppearances: GameAppearance[];
}

export interface Filters {
  phase: string;
  event: string;
  sessionType: string;
  availability: string;
}
