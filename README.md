# Coaching

A small full-stack coaching platform: browse coaches and request coaching
sessions. Built as a monorepo with npm workspaces.

- **client/** — React + Vite + TypeScript single-page app.
- **server/** — Express + TypeScript JSON API with a lightweight file-backed
  store (no native dependencies).

## Prerequisites

- Node.js >= 20 (developed on Node 22)
- npm >= 10

## Getting started

```bash
npm install       # installs both workspaces
npm run dev       # runs the API (:3001) and the web app (:5173) together
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` to the
API on port 3001.

## Common commands

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Run API + client together (via `concurrently`).       |
| `npm run dev:server`| Run only the API in watch mode.                       |
| `npm run dev:client`| Run only the Vite dev server.                         |
| `npm run build`     | Type-check and build the client for production.       |
| `npm run typecheck` | Type-check both workspaces.                           |
| `npm run lint`      | Lint both workspaces with ESLint.                     |
| `npm test`          | Run the server API tests (Vitest + supertest).        |

## API

| Method | Path                | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/health`       | Health check.                   |
| GET    | `/api/coaches`      | List available coaches.         |
| GET    | `/api/sessions`     | List requested sessions.        |
| GET    | `/api/sessions/:id` | Fetch one session.              |
| POST   | `/api/sessions`     | Request a new coaching session. |

Data persists to `server/data/db.json` (git-ignored). Override the location
with the `DATA_FILE` env var and the API port with `PORT`.
