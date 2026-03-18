# AI Stock Research App for Indian Beginners

A full-stack stock research app built with Next.js App Router, TypeScript, Tailwind CSS, Yahoo Finance, and the OpenAI Responses API.

## Features

- Search Indian stocks like `TCS`, `INFY`, or `HDFCBANK`
- Fetch beginner-friendly stock overview data from Yahoo Finance
- Generate an AI summary in simple language
- Ask follow-up questions about the stock
- Mobile-friendly UI with loading and error states

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- OpenAI Responses API (`gpt-4.1-mini`)
- `yahoo-finance2`

## Environment Variables

Copy the example file and fill in your own key:

```bash
cp .env.example .env.local
```

Then update `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Example Flow

1. Open the home page
2. Search for `TCS`
3. Review the stock overview card
4. Read the AI summary
5. Ask a follow-up question in the Ask AI box

## API Routes

- `GET /api/stock?symbol=TCS`
- `POST /api/summary`
- `POST /api/ask`

## Notes

- This app appends `.NS` automatically for Indian NSE symbols unless the symbol already includes an exchange suffix.
- The AI is instructed to explain in simple language and not provide buy/sell advice.
