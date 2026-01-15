# App Monitor

Track Android apps from Google Play Store and capture periodic screenshots to monitor changes.

## Quick Start

```bash
docker compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Commands

```bash
docker compose down          # Stop
docker compose logs -f      # Logs
docker compose down -v      # Reset database
```

## Local Development

1. Setup database (PostgreSQL or NeonDB)
2. Add `DATABASE_URL` to `backend/.env`
3. Run `npm run db:push` in backend
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm run dev`

## Tech

- Backend: Node.js, Express, TypeScript, Drizzle, Puppeteer
- Frontend: React, Vite, TypeScript, Tailwind
- Database: PostgreSQL
