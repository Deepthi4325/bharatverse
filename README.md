# BharatVerse

BharatVerse is a React and TypeScript web app for exploring Indian states, heritage sites, crafts, food traditions, festivals, and stories. The interface combines locally bundled cultural data with optional Gemini-backed features for chat, quiz questions, and itinerary suggestions.

## Features

- Explore states and regions on an interactive India map
- Browse monuments, UNESCO sites, crafts, festivals, stories, and performing arts
- Save favorite items and remember the selected language in the browser
- Take the heritage quiz and try the itinerary planner
- Ask Cultural Sage questions when a Gemini API key is configured
- Use Express endpoints for AI-related requests

## Run locally

Prerequisites: Node.js and npm.

```bash
npm install
cp .env.example .env
```

To enable Gemini-backed responses, add your own key to `.env`:

```dotenv
GEMINI_API_KEY=your_key_here
```

Do not commit `.env` or share your key. Without a key, the API uses built-in demo responses; those fallback responses are not a substitute for researched historical content.

Start the app in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run lint   # TypeScript check
npm run build  # Build the client and server
npm start      # Run the built app after npm run build
npm run preview
```

## API endpoints

- `GET /api/health` — basic server health check
- `POST /api/ai/chat` — Cultural Sage chat
- `POST /api/ai/itinerary` — itinerary suggestions
- `POST /api/ai/quiz` — quiz question generation
- `POST /api/ai/story` — story generation endpoint

## Code layout

```text
src/
├── components/  # Feature views and dialogs
├── data/        # State, map, quiz, festival, and heritage content
├── utils/       # Translations, audio helpers, and itinerary logic
├── App.tsx
└── main.tsx
server.ts        # Express server and Gemini API endpoints
```

Most state and heritage content is bundled locally. Favorites and language choice are stored in browser local storage. There is no automated test suite in this repository yet. Check the sources and verify historical claims and third-party asset licenses before using the app as a public information resource.
