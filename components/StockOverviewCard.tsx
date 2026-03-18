import { formatCompactNumber, formatCurrency, type StockQuote } from '@/lib/stockApi';

const stats = [
  { key: 'price', label: 'Current Price' },
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'trailingPE', label: 'P/E Ratio' },
  { key: 'fiftyTwoWeekHigh', label: '52W High' },
  { key: 'fiftyTwoWeekLow', label: '52W Low' }
] as const;

export function StockOverviewCard({ stock }: { stock: StockQuote }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-card backdrop-blur">
      <div className="flex flex-col gap-2 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Stock Overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{stock.companyName}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {stock.displaySymbol} • {stock.exchange ?? 'NSE'}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950/70 px-4 py-3 text-right">
          <p className="text-sm text-slate-400">Live Price</p>
          <p className="text-2xl font-semibold text-white">{formatCurrency(stock.price, stock.currency)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const value = stock[stat.key];
          const formattedValue =
            stat.key === 'marketCap'
              ? formatCompactNumber(value)
              : stat.key === 'trailingPE'
                ? value ?? 'N/A'
                : formatCurrency(value, stock.currency);

          return (
            <div key={stat.key} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{formattedValue}</p>
            </div>
          );
        })}
      </div>

      {(stock.sector || stock.longBusinessSummary) && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          {stock.sector && <p className="text-sm font-medium text-emerald-300">Sector: {stock.sector}</p>}
          {stock.longBusinessSummary && (
            <p className="mt-2 text-sm leading-6 text-slate-300">{stock.longBusinessSummary}</p>
          )}
        </div>
      )}
    </section>
  );
}
