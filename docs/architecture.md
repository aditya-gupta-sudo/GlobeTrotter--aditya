# GlobeTrotter Architecture

## Project Overview

GlobeTrotter is a travel planning platform where users can create personalized multi-city trips, manage itineraries, estimate budgets, discover destinations and activities, and share travel plans.

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- Zod Validation

## Database

- PostgreSQL

---

# Architecture

Frontend

↓

REST API

↓

Express Backend

↓

Prisma ORM

↓

PostgreSQL

---

# Core Modules

Authentication

Trip Management

Itinerary Builder

City Search

Activity Search

Budget Estimator

Calendar Timeline

Community Trips

Profile

---

# Folder Structure

frontend/

app/

components/

hooks/

lib/

services/

types/

context/

backend/

src/

controllers/

routes/

middlewares/

services/

prisma/

validators/

config/

utils/

---

# Git Branches

main

frontend

backend

---

# Deployment

Frontend → Vercel

Backend → Render

Database → Neon PostgreSQL

---

# Coding Standards

- TypeScript only
- REST APIs
- Clean Architecture
- Reusable Components
- Responsive UI
- Dark Mode
- Mobile First