# Nobitos App - Gudang Pusat (Phase 1 MVP)

This is the Central Warehouse Management System for Nobitos.

## Features
- User Authentication (Register, Login, Logout)
- Role-based access (Office Staff, Warehouse Staff)
- Dashboard with quick stats
- Purchase Order Management
- Stock Management (Current Stock, History)

## Tech Stack
- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Axios
- React Hook Form + Zod

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Copy `.env.example` to `.env.local` and update the `VITE_API_URL` if necessary.
   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port Vite provides).
