import Link from 'next/link';
import { AskAIBox } from '@/components/AskAIBox';
import { StockOverviewCard } from '@/components/StockOverviewCard';
import { SummaryCard } from '@/components/SummaryCard';
import { fetchStockQuote } from '@/lib/stockApi';

export default async function StockDetailsPage({ params }: { params: { symbol: string } }) {
  const rawSymbol = decodeURIComponent(params.symbol);

  try {
    const stock = await fetchStockQuote(rawSymbol);

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
              ← Back to search
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{stock.displaySymbol} Research Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Beginner-friendly stock research with live Yahoo Finance data and AI explanations.
            </p>
          </div>
        </div>

        <StockOverviewCard stock={stock} />
        <SummaryCard stock={stock} />
        <AskAIBox stock={stock} />
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
        <Link href="/" className="text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
          ← Back to search
        </Link>
        <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 shadow-card">
          <h1 className="text-2xl font-semibold text-white">We could not load this stock.</h1>
          <p className="mt-3 text-sm leading-6 text-rose-100">
            {error instanceof Error ? error.message : 'Please try another symbol like TCS, INFY, or HDFCBANK.'}
          </p>
        </div>
      </main>
    );
  }
}
