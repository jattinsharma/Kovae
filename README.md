# KOVAE

**Become, every day.**

AI-powered fitness & personal improvement platform.

## Architecture

| Layer | Technology |
|-------|-----------|
| Mobile | React Native + Expo SDK 55 + TypeScript |
| Backend | Python + FastAPI (modular monolith) |
| Database | PostgreSQL 16 (Docker local / Supabase cloud) |
| Admin | Next.js + TypeScript |
| Cache | Redis 7 |
| AI | Provider-agnostic AI Gateway |

## Monorepo Structure

```
apps/mobile/     → Consumer mobile app (Expo)
apps/admin/      → Internal admin dashboard (Next.js)
backend/         → FastAPI API + workers + AI gateway
ml/              → Machine learning / computer vision
packages/        → Shared types, config, UI
database/        → SQL migrations + seed data
infrastructure/  → Docker, deployment, CI/CD
tests/           → Cross-cutting test suites
docs/            → Architecture, API, product docs
```

## Quick Start

### Mobile App

```bash
cd apps/mobile
npm install
npx expo start
```

### Backend API

```bash
cd backend
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.main:app --reload
```

### Local Database (Docker)

```bash
cd infrastructure/docker
docker-compose up -d
```

### Apply Migrations

```bash
psql postgresql://kovae:kovae_dev@localhost:5432/kovae -f database/migrations/001_initial_schema.sql
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values. See the file for security annotations.

## Development Phases

1. ✅ Foundation (Auth, Onboarding, Home, Navigation)
2. Planner Engine
3. Workout System
4. Arc & Habits
5. Social & Challenges
6. AI Coach
7. Machine Scan
8. Recovery
9. Analytics
10. Advanced (Form Analysis, Voice, Health)
