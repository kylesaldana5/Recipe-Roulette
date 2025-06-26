# Code Style and Conventions

## Core Standards (From Technical Architecture)

### Languages & Runtimes
- **Primary Language**: TypeScript 5.3.3 for both frontend and backend
- **Runtime**: Node.js 20.11.0
- **Style Enforcement**: ESLint + Prettier with pre-commit hooks (Husky)

### Naming Conventions

| Element | Format | Example |
|---------|--------|---------|
| React Components | `PascalCase` | `UserProfile.tsx` |
| Custom Hooks | `camelCase` with 'use' prefix | `useAuth.ts` |
| tRPC Routers | `camelCase` with 'Router' suffix | `recipeRouter.ts` |
| Database Tables | `PascalCase` | `User`, `RecipeIngredient` |
| API Procedures | `camelCase` | `getRandomRecipeByIngredients` |
| Types/Interfaces | `PascalCase` | `interface User`, `type RecipeInput` |
| General Files | `kebab-case` | `user-profile.tsx`, `get-recipes.ts` |

### Critical Architecture Rules

#### Type Sharing
- All shared TypeScript interfaces must be in `packages/shared/src/types`
- Import from shared package, never duplicate types

#### API Communication
- **NEVER** use direct `fetch` or `axios` calls to backend
- **ALWAYS** use tRPC client: `api.recipe.getRandomRecipeByIngredients.query()`

#### Environment Variables
- Access through centralized config object, not direct `process.env`
- Frontend variables must have `NEXT_PUBLIC_` prefix

#### Database Access
- Backend must use Prisma Client exclusively
- No direct SQL queries without approval

#### Error Handling
- Backend: Use `TRPCError` for type-safe error propagation
- Frontend: Handle with `try...catch` or react-query error handling

#### State Management
- Never mutate React state directly
- Use state setter functions or state management actions

#### Supabase Integration
- Encapsulate Supabase calls in dedicated service/hook files
- Don't scatter `supabase.auth` calls throughout components

### Testing Conventions
- Test files alongside code with `.test.ts(x)` suffix
- Follow Arrange-Act-Assert (AAA) pattern
- Mock external dependencies for unit tests
- Target 80% code coverage for critical business logic

### File Organization (Planned Monorepo Structure)
```
apps/
├── web/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js 13+ App Router
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── trpc/          # tRPC client setup
└── api/                   # tRPC Backend
    └── src/
        ├── routers/       # tRPC route definitions
        ├── context.ts     # tRPC context
        └── trpc.ts        # tRPC server setup

packages/
├── db/                    # Prisma schema & client
└── shared/                # Shared types & utilities
    ├── types/             # TypeScript interfaces
    ├── utils/             # Common functions
    └── validation/        # Zod schemas
```

### Code Quality Requirements
- All code must pass ESLint rules
- Prettier formatting enforced on commit
- TypeScript strict mode enabled
- No `any` types without explicit justification
- Prefer explicit over implicit typing for public APIs