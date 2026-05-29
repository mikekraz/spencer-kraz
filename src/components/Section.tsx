import type { HTMLAttributes, ReactNode } from 'react';
export function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">Tyler PDS</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-3xl text-sm text-slate-300">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode; className?: string }) {
  return <div {...props} className={`rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl shadow-slate-950/10 ${className}`}>{children}</div>;
}
