export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-5 text-center shadow-card backdrop-blur">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-300/60 border-t-transparent" />
        <p className="mt-4 text-sm font-medium text-slate-300">Loading the stock research experience...</p>
      </div>
    </main>
  );
}
