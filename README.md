# App Monitor

A marketing competition monitoring system for Android apps. Track Google Play Store listings and capture periodic screenshots to monitor competitor changes.

## Project Structure

```
├── backend/     # Node.js Express API
└── frontend/    # React + Vite + Shadcn
```

## Setup

### Prerequisites
- Node.js 18+
- NeonDB account (for Postgres)

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Add your NeonDB connection string
npm run db:push       # Push schema to database
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Backend (`.env`):
- `DATABASE_URL` - NeonDB Postgres connection string
- `PORT` - Server port (default: 3001)
- `SCREENSHOT_INTERVAL_HOURS` - How often to capture screenshots (default: 6)
