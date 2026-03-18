import { NextRequest, NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { getOpenAIClient } from '@/lib/openai';
import { buildSummaryPrompt, SYSTEM_PROMPT } from '@/lib/prompts';
import type { StockQuote } from '@/lib/stockApi';

const summarySchema = z.object({
  companyOverview: z.string(),
  investorInterest: z.string(),
  risks: z.string(),
  conclusion: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { stock?: StockQuote };

    if (!body.stock) {
      return NextResponse.json({ error: 'Missing stock data.' }, { status: 400 });
    }

    const client = getOpenAIClient();
    const response = await client.responses.parse({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: buildSummaryPrompt(body.stock)
        }
      ],
      text: {
        format: zodResponseFormat(summarySchema, 'stock_summary')
      }
    });

    return NextResponse.json({ summary: response.output_parsed });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to generate summary.'
      },
      { status: 500 }
    );
  }
}
