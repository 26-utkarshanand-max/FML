'use client';

import { FormEvent, useState } from 'react';
import type { StockQuote } from '@/lib/stockApi';

export function AskAIBox({ stock }: { stock: StockQuote }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setAnswer('');

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock, question })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to get an answer right now.');
      }

      setAnswer(payload.answer as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while asking the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-card backdrop-blur">
      <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Ask AI</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Ask a follow-up question</h3>
      <p className="mt-2 text-sm text-slate-400">
        Try questions like: “Why do investors track this stock?” or “What does the P/E ratio tell me?”
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={`Ask about ${stock.companyName}...`}
          rows={4}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-base text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      {answer && (
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h4 className="text-base font-semibold text-white">AI Answer</h4>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">{answer}</p>
        </div>
      )}
    </section>
  );
}
