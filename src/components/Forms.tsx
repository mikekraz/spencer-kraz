import type { BullpenLog, GameAppearance, RecoveryLog } from '../types';
import { Card } from './Section';

const input = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100';
const label = 'space-y-1 text-xs font-bold uppercase tracking-wider text-slate-500';

function num(value: FormDataEntryValue | null): number {
  return Number(value || 0);
}

export function RecoveryForm({ onAdd }: { onAdd: (log: RecoveryLog) => void }) {
  return (
    <Card>
      <h3 className="text-lg font-black">Add Recovery Log</h3>
      <form className="mt-4 grid gap-3 md:grid-cols-4" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onAdd({ id: crypto.randomUUID(), date: String(data.get('date')), sleepHours: num(data.get('sleepHours')), weight: num(data.get('weight')), armSoreness: num(data.get('armSoreness')), bodySoreness: num(data.get('bodySoreness')), energy: num(data.get('energy')), hydration: String(data.get('hydration')), notes: String(data.get('notes')) });
        event.currentTarget.reset();
      }}>
        <label className={label}>Date<input className={input} name="date" type="date" required defaultValue="2026-05-29" /></label>
        <label className={label}>Sleep Hours<input className={input} name="sleepHours" type="number" step="0.25" required /></label>
        <label className={label}>Weight<input className={input} name="weight" type="number" step="0.1" required /></label>
        <label className={label}>Arm Soreness 1-10<input className={input} name="armSoreness" type="number" min="1" max="10" required /></label>
        <label className={label}>Body Soreness 1-10<input className={input} name="bodySoreness" type="number" min="1" max="10" required /></label>
        <label className={label}>Energy 1-10<input className={input} name="energy" type="number" min="1" max="10" required /></label>
        <label className={label}>Hydration<select className={input} name="hydration"><option>Good</option><option>Average</option><option>Needs Work</option></select></label>
        <label className={`${label} md:col-span-4`}>Notes<textarea className={input} name="notes" rows={2} /></label>
        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700">Add Recovery</button>
      </form>
    </Card>
  );
}

export function BullpenForm({ onAdd }: { onAdd: (log: BullpenLog) => void }) {
  return (
    <Card>
      <h3 className="text-lg font-black">Add Bullpen Log</h3>
      <form className="mt-4 grid gap-3 md:grid-cols-4" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onAdd({ id: crypto.randomUUID(), date: String(data.get('date')), totalPitches: num(data.get('totalPitches')), fbCount: num(data.get('fbCount')), chCount: num(data.get('chCount')), breakingBallCount: num(data.get('breakingBallCount')), strikePct: num(data.get('strikePct')), firstPitchStrikePct: num(data.get('firstPitchStrikePct')), avgFb: num(data.get('avgFb')), peakFb: num(data.get('peakFb')), avgCh: num(data.get('avgCh')), avgBreakingBall: num(data.get('avgBreakingBall')), rpe: num(data.get('rpe')), armSorenessAfter: num(data.get('armSorenessAfter')), notes: String(data.get('notes')) });
        event.currentTarget.reset();
      }}>
        {['date','totalPitches','fbCount','chCount','breakingBallCount','strikePct','firstPitchStrikePct','avgFb','peakFb','avgCh','avgBreakingBall','rpe','armSorenessAfter'].map((name) => (
          <label className={label} key={name}>{name.replace(/([A-Z])/g, ' $1')}<input className={input} name={name} type={name === 'date' ? 'date' : 'number'} required={name !== 'avgCh' && name !== 'avgBreakingBall'} defaultValue={name === 'date' ? '2026-05-29' : undefined} /></label>
        ))}
        <label className={`${label} md:col-span-4`}>Notes<textarea className={input} name="notes" rows={2} /></label>
        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700">Add Bullpen</button>
      </form>
    </Card>
  );
}

export function GameForm({ onAdd }: { onAdd: (game: GameAppearance) => void }) {
  return (
    <Card>
      <h3 className="text-lg font-black">Add Game Appearance</h3>
      <form className="mt-4 grid gap-3 md:grid-cols-4" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onAdd({ id: crypto.randomUUID(), date: String(data.get('date')), event: String(data.get('event')), opponent: String(data.get('opponent')), role: String(data.get('role')), pitches: num(data.get('pitches')), inningsPitched: String(data.get('inningsPitched')), k: num(data.get('k')), bb: num(data.get('bb')), h: num(data.get('h')), er: num(data.get('er')), avgFb: num(data.get('avgFb')), peakFb: num(data.get('peakFb')), strikePct: num(data.get('strikePct')), firstPitchStrikePct: num(data.get('firstPitchStrikePct')), notes: String(data.get('notes')) });
        event.currentTarget.reset();
      }}>
        <label className={label}>Date<input className={input} name="date" type="date" required defaultValue="2026-05-29" /></label>
        {['event','opponent','role','inningsPitched'].map((name) => <label className={label} key={name}>{name.replace(/([A-Z])/g, ' $1')}<input className={input} name={name} required /></label>)}
        {['pitches','k','bb','h','er','avgFb','peakFb','strikePct','firstPitchStrikePct'].map((name) => <label className={label} key={name}>{name.replace(/([A-Z])/g, ' $1')}<input className={input} name={name} type="number" required /></label>)}
        <label className={`${label} md:col-span-4`}>Notes<textarea className={input} name="notes" rows={2} /></label>
        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700">Add Appearance</button>
      </form>
    </Card>
  );
}
