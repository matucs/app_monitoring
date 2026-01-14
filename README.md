# App Monitor

A marketing competition monitoring system for Android apps. Track Google Play Store listings and capture periodic screenshots to monitor competitor changes over time.

## Features

- **App Tracking** - Add apps by Play Store URL, system extracts package ID
- **Periodic Screenshots** - Automatic capture every 6 hours (configurable)
- **Manual Capture** - Take screenshots on-demand
- **Timeline View** - Browse screenshots chronologically (newest first)
- **Mobile Viewport** - Screenshots are captured in mobile view (390x844)

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Drizzle ORM, Puppeteer
- **Frontend**: React, Vite, TypeScript, Shadcn/UI, Tailwind CSS
- **Database**: PostgreSQL (NeonDB)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── db/           # Drizzle schema and connection
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Screenshot service
│   │   └── scheduler.ts  # Cron job for periodic captures
│   └── screenshots/      # Stored screenshot files
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components (Shadcn + custom)
│   │   ├── pages/        # AppList, AppMonitor
│   │   └── lib/          # API client, utilities
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+
- NeonDB account (free tier works)

### Backend

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your NeonDB connection string

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and proxies API requests to the backend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/apps | List all tracked apps |
| POST | /api/apps | Add new app |
| PUT | /api/apps/:id | Update app name |
| DELETE | /api/apps/:id | Delete app |
| GET | /api/apps/:id/screenshots | Get screenshots for app |
| POST | /api/apps/:id/screenshots | Capture screenshot now |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | NeonDB Postgres connection string | required |
| PORT | Backend server port | 3001 |
| SCREENSHOT_INTERVAL_HOURS | Hours between automatic captures | 6 |

## Usage

1. Start both backend and frontend
2. Open http://localhost:5173
3. Click "Add App" and paste a Google Play Store URL
4. View the app's monitoring page to see screenshots
5. Click "Capture Now" for immediate screenshots or wait for the scheduler
