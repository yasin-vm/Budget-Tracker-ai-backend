# Budget Tracker Backend

REST API backend for a MERN budget tracker with MongoDB, authentication, and Google Gemini AI.

The [frontend](https://github.com/yasin-vm/Budget-Tracker-mern-ai) is maintained separately. When its `public/` folder is alongside this backend repository, Express serves the dashboard and API from the same origin and port.

## Features

- Account signup/login, persisted bearer-token sessions, and profile/budget updates.
- Transaction create, list, update, and delete endpoints, scoped to the authenticated user.
- Gemini-powered transaction parsing, spending insights, and financial-advisor chat, with rule-based fallbacks.
- MongoDB persistence through Mongoose.
- CORS allowlist for a separately hosted frontend.

## Requirements

- Node.js 18 or later
- MongoDB local instance or Atlas connection string
- Optional Google Gemini API key

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm start
```

Set `MONGO_URI` in `.env` to the intended MongoDB database. Replace the blank `GEMINI_API_KEY` with a valid Google AI Studio API key to enable Gemini; a blank or placeholder key uses the built-in fallback. Startup logs whether a non-placeholder key was loaded. If you host a frontend on a separate origin, configure `FRONTEND_ORIGINS` as a comma-separated list of exact origins, for example:

```env
FRONTEND_ORIGINS=http://localhost:3000,https://your-frontend.example
```

The server listens on `PORT` (3000 by default), serves the dashboard at `/` when frontend files are available, and exposes the API at `/api`. Check `GET /api/health` to verify the service is responding.

On startup, a default administrator is created if no admin exists. For local development only, the credentials are `admin` / `Password123!`. Change or remove the seed credentials before deploying publicly; never expose a deployed default account.

## API overview

All application routes are mounted under `/api`.

| Method | Path | Purpose |
|---|---|---|
| POST | `/signup` | Create an account |
| POST | `/login` | Authenticate and issue a session token |
| GET | `/profile` | Read the authenticated user's profile |
| PUT | `/profile` | Update profile, budget, and salary |
| POST | `/logout` | Revoke the current session |
| GET | `/transaction/:userId` | List the authenticated user's transactions |
| POST | `/transaction` | Create a transaction |
| PUT | `/transaction/:id` | Update a transaction |
| DELETE | `/transaction/:id` | Delete a transaction |
| POST | `/ai/parse` | Parse natural-language transaction text |
| POST | `/ai/auto-log` | Parse and save a transaction |
| POST | `/ai/insights` | Generate spending insights |
| POST | `/ai/chat` | Ask the financial advisor |
| GET | `/health` | Health check |

Protected routes require `Authorization: Bearer <session-token>`.

## Frontend connection

The frontend defaults to `http://localhost:3000` for API requests. When served by this Express server, open `http://localhost:3000`; no separate frontend server is needed.

## Repository description

REST API backend for a MERN budget tracker with MongoDB, authentication, and Google Gemini AI.
