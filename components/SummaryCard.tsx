'use client';

import { useEffect, useState } from 'react';
import type { StockQuote } from '@/lib/stockApi';

type SummaryResponse = {
  companyOverview: string;
  investorInterest: string;
  risks: string;
  conclusion: string;
};

const emptySummary: SummaryResponse = {
  companyOverview: '',
  investorInterest: '',
  risks: '',
  conclusion: ''
};

export function SummaryCard({ stock }: { stock: StockQuote }) {
  const [summary, setSummary] = useState<SummaryResponse>(emptySummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ stock })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? 'Unable to load AI summary.');
        }

        if (!cancelled) {
          setSummary(payload.summary as SummaryResponse);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong while loading the summary.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [stock]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300">AI Summary</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Simple explanation for beginners</h3>
        </div>
        {isLoading && (
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300">
            <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
            Generating...
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['What the company does', summary.companyOverview],
            ['Why investors notice it', summary.investorInterest],
            ['Key risks to understand', summary.risks],
            ['Simple conclusion', summary.conclusion]
          ].map(([title, value]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <h4 className="text-base font-semibold text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {isLoading ? 'Loading AI summary...' : value}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
