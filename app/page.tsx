import { SearchBar } from '@/components/SearchBar';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
          AI Stock Research App for Indian Beginners
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Understand Indian stocks in simple language.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Search a stock like TCS, get its key numbers from Yahoo Finance, read an AI summary, and ask follow-up questions without dealing with complex finance jargon.
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-card backdrop-blur sm:p-6">
        <SearchBar />
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-5xl gap-4 text-left md:grid-cols-3">
        {[
          ['1. Search a stock', 'Enter an NSE stock symbol such as TCS or INFY.'],
          ['2. Read the overview', 'See the company name, price, market cap, P/E, and 52-week range.'],
          ['3. Learn with AI', 'Get a simple summary and ask questions in plain English.']
        ].map(([title, description]) => (
          <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-card">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
