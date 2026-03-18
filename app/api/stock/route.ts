import { NextRequest, NextResponse } from 'next/server';
import { fetchStockQuote } from '@/lib/stockApi';

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Missing stock symbol.' }, { status: 400 });
  }

  try {
    const stock = await fetchStockQuote(symbol);
    return NextResponse.json({ stock });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to fetch stock data.'
      },
      { status: 500 }
    );
  }
}
