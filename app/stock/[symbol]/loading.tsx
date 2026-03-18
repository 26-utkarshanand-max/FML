export default function StockLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-24 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
      <div className="h-72 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
      <div className="h-80 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
      <div className="h-72 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
    </main>
  );
}
