import type { StockQuote } from '@/lib/stockApi';

export const SYSTEM_PROMPT =
  'You are a beginner-friendly Indian stock assistant. Explain in simple language. Do not give buy/sell advice.';

export function buildSummaryPrompt(stock: StockQuote) {
  return `Use the stock data below to create a short beginner-friendly summary for an Indian investor.

Stock Data:
${JSON.stringify(stock, null, 2)}

Return JSON with exactly these string keys:
- companyOverview
- investorInterest
- risks
- conclusion

Keep every value concise, plain-English, and easy for a beginner to understand.`;
}

export function buildAskPrompt(stock: StockQuote, question: string) {
  return `Answer the user's question using the stock data below. If the data is not enough, clearly say what is missing. Never give direct buy/sell advice.

Stock Data:
${JSON.stringify(stock, null, 2)}

Question:
${question}`;
}
