# Future Codex Instructions

- Keep this app focused on Tyler Krasner's pitching development system and health-first workload decisions.
- Use React + Vite + TypeScript + Tailwind CSS patterns already present in `src/`.
- Preserve localStorage persistence unless explicitly asked to replace it with a backend.
- Do not remove the May 29, 2026 through October 31, 2026 daily plan range without user approval.
- Tournament days should remain editable `Tournament Flex Day` entries because actual usage can change availability.
- Keep workload and availability rules easy to audit in `src/utils/workload.ts`.
- When adding new metrics, update CSV export behavior if the metric should be portable.
- Before finishing changes, run `npm run build`; run `npm run lint` too when TypeScript types are modified.
