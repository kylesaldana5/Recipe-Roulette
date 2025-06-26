# Tech Stack

## Primary Stack (T3 Stack based)
- **Frontend Framework**: Next.js 14.1.0 with TypeScript 5.3.3
- **UI Framework**: React with Tailwind CSS 3.x
- **Backend**: Next.js API Routes with tRPC for type-safe APIs
- **Database**: PostgreSQL 16.1 with Prisma ORM
- **Authentication**: Supabase Auth
- **Hosting**: Vercel for both frontend and serverless functions
- **Database Hosting**: Supabase

## Development Tools
- **State Management**: React Context API / Zustand
- **Testing**: Jest, React Testing Library, Playwright for E2E
- **Linting**: ESLint with Prettier
- **Package Manager**: pnpm (preferred for monorepo)

## Architecture Pattern
- **Monorepo structure** with apps/web, apps/api, packages/shared, packages/db
- **Type-safe full-stack** with shared types between frontend/backend
- **Serverless deployment** on Vercel

## Key Dependencies (Planned)
- `@trpc/client` and `@trpc/server` for API communication
- `@prisma/client` for database access
- `@supabase/supabase-js` for auth and database
- `zod` for validation schemas
- `tailwindcss` for styling

## Current Implementation Status
**Not yet implemented** - Only documentation and project structure exist. The actual Next.js application needs to be scaffolded.