# Tyler Pitching Development System

A React + Vite + TypeScript + Tailwind CSS dashboard for tracking Tyler Krasner's pitching development plan from **May 29, 2026 through October 31, 2026**.

## Features

- Athlete profile for Tyler Krasner, RHP pitcher only.
- Complete editable daily plan/calendar with phase, workload, recovery, tournament, and notes fields.
- Tournament flex-day schedule for summer events, August 1 recruiting, and October junior-event prep.
- Workload rules for 1-20, 21-40, 41-60, and 61+ pitch appearances.
- Recovery tracker with automatic Green/Yellow/Red availability status.
- Bullpen log with estimated strikes and command score calculations.
- Game appearance log for tournament and live outings.
- Strength workout library for Biocore, maintenance, and school lifts.
- Dashboard cards for today's plan, availability, trends, pitch volume, next tournament, and countdowns.
- Filters by phase, event, session type, and availability.
- Local browser persistence using `localStorage`.
- CSV export and reset/demo data actions.

## Install and Run

```bash
npm install
npm run dev
```

Open the Vite local URL shown in the terminal.

## Build

```bash
npm run build
```

## Type Check

```bash
npm run lint
```

## Project Structure

```text
src/
  App.tsx                 Main app shell and state management
  components/             Reusable dashboard, table, form, badge, and section components
  data/initialData.ts     Athlete profile, tournaments, workouts, and generated daily plan
  types.ts                Shared TypeScript interfaces
  utils/                  Date, CSV, localStorage, and workload helpers
```

## Data Notes

The calendar is generated from `src/data/initialData.ts`. Tournament dates are marked as `Tournament Flex Day` so the plan can be edited after actual pitching usage. All user edits save automatically in the browser. Use **Reset/demo data** to restore the built-in baseline dataset.
