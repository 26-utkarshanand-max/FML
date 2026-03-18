'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [symbol, setSymbol] = useState('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = symbol.trim().toUpperCase();

    if (!trimmed) {
      return;
    }

    router.push(`/stock/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        value={symbol}
        onChange={(event) => setSymbol(event.target.value)}
        placeholder="Search Indian stock, e.g. TCS"
        className="h-14 flex-1 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 text-base text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        aria-label="Search stock symbol"
      />
      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center rounded-2xl bg-emerald-400 px-6 font-semibold text-slate-950 transition hover:bg-emerald-300"
      >
        Research Stock
      </button>
    </form>
  );
}
