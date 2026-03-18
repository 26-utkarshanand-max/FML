import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai';
import { buildAskPrompt, SYSTEM_PROMPT } from '@/lib/prompts';
import type { StockQuote } from '@/lib/stockApi';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { stock?: StockQuote; question?: string };

    if (!body.stock || !body.question?.trim()) {
      return NextResponse.json({ error: 'Stock data and question are required.' }, { status: 400 });
    }

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: buildAskPrompt(body.stock, body.question)
        }
      ]
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      throw new Error('The AI did not return an answer.');
    }

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to answer the question.'
      },
      { status: 500 }
    );
  }
}
