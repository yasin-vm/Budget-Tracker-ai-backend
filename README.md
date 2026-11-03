# Budget Tracker Backend

REST API backend for a MERN budget tracker with MongoDB, authentication, and Google Gemini AI.

This repository contains the Express API only. The frontend is maintained separately and sends requests to this service's `/api` endpoints.

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

Set `MONGO_URI` in `.env` to the intended MongoDB database. Set `GEMINI_API_KEY` to enable Gemini; without it, AI endpoints use the built-in fallback. Configure `FRONTEND_ORIGINS` as a comma-separated list of exact frontend origins, for example:

```env
FRONTEND_ORIGINS=http://localhost:5500,https://your-frontend.example
```

The API listens on `PORT` (3000 by default). Check `GET /api/health` to verify it is responding.

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

Configure the frontend's API base URL to this service's origin and add the frontend's exact origin to `FRONTEND_ORIGINS`. The frontend repository's README documents this setup.

## Repository description

REST API backend for a MERN budget tracker with MongoDB, authentication, and Google Gemini AI.
