import yahooFinance from 'yahoo-finance2';

export type StockQuote = {
  symbol: string;
  displaySymbol: string;
  companyName: string;
  price: number | null;
  currency: string;
  marketCap: number | null;
  trailingPE: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  exchange: string | null;
  longBusinessSummary?: string | null;
  sector?: string | null;
  website?: string | null;
};

function normalizeIndianSymbol(symbol: string) {
  const cleaned = symbol.trim().toUpperCase();

  if (!cleaned) {
    throw new Error('Stock symbol is required.');
  }

  if (cleaned.includes('.')) {
    return cleaned;
  }

  return `${cleaned}.NS`;
}

export async function fetchStockQuote(symbol: string): Promise<StockQuote> {
  const normalizedSymbol = normalizeIndianSymbol(symbol);
  const quote = await yahooFinance.quote(normalizedSymbol);
  const summary = await yahooFinance.quoteSummary(normalizedSymbol, {
    modules: ['assetProfile', 'price', 'summaryDetail']
  });

  const price = quote.regularMarketPrice ?? summary.price?.regularMarketPrice ?? null;
  const companyName =
    quote.longName ?? quote.shortName ?? summary.price?.longName ?? summary.price?.shortName ?? normalizedSymbol;

  return {
    symbol: normalizedSymbol,
    displaySymbol: normalizedSymbol.replace(/\.NS$/, ''),
    companyName,
    price,
    currency: quote.currency ?? summary.price?.currency ?? 'INR',
    marketCap: quote.marketCap ?? summary.summaryDetail?.marketCap ?? null,
    trailingPE: quote.trailingPE ?? summary.summaryDetail?.trailingPE ?? null,
    fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? summary.summaryDetail?.fiftyTwoWeekHigh ?? null,
    fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? summary.summaryDetail?.fiftyTwoWeekLow ?? null,
    exchange: quote.fullExchangeName ?? summary.price?.exchangeName ?? null,
    longBusinessSummary: summary.assetProfile?.longBusinessSummary ?? null,
    sector: summary.assetProfile?.sector ?? null,
    website: summary.assetProfile?.website ?? null
  };
}

export function formatCurrency(value: number | null, currency = 'INR') {
  if (value === null || Number.isNaN(value)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: value >= 100 ? 0 : 2
  }).format(value);
}

export function formatCompactNumber(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value);
}
