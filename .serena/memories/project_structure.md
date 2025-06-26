# Project Structure

## Current Structure (Bootstrap Template)
```
Recipe-Roulette/
├── .serena/                    # Serena IDE configuration
│   ├── project.yml            # Project configuration
│   └── memories/              # AI agent memory files
├── .claude/                   # Claude Code configuration
│   ├── commands/              # Automated workflow commands
│   │   ├── bootstrap.md       # PRD → GitHub issues
│   │   ├── work.md           # Feature implementation
│   │   ├── review.md         # Code review
│   │   └── issues.md         # Issue creation
│   ├── CLAUDE.md             # Project context
│   └── settings.local.json    # Local Claude settings
├── .github/                   # GitHub templates and workflows
│   └── ISSUE_TEMPLATE/        # Bug and feature templates
├── docs/                      # Project documentation
│   ├── PRD.md                # Product Requirements Document
│   ├── TechnicalArchitecture.md # Technical design
│   └── front-end-spec.md     # Frontend specifications
├── templates/                 # Template files
│   └── CLAUDE.md.template    # Claude context template
├── .mcp.json                 # Model Context Protocol config
├── .gitignore               # Git ignore rules
├── kickstart                # Project initialization script
└── README.md                # Project overview
```

## Planned Structure (From Technical Architecture)
Once the project is implemented, it will follow this monorepo structure:

```
Recipe-Roulette/
├── apps/                      # Applications
│   ├── web/                  # Next.js Frontend Application
│   │   ├── public/           # Static assets
│   │   ├── src/
│   │   │   ├── app/          # Next.js 13+ App Router
│   │   │   ├── components/   # React components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── styles/       # Global styles
│   │   │   └── trpc/         # tRPC client setup
│   │   ├── .env.local        # Frontend environment variables
│   │   ├── next.config.js    # Next.js configuration
│   │   ├── package.json      # Frontend dependencies
│   │   └── tsconfig.json     # Frontend TypeScript config
│   └── api/                  # tRPC Backend API
│       ├── src/
│       │   ├── routers/      # tRPC router definitions
│       │   ├── context.ts    # tRPC context creation
│       │   └── trpc.ts       # tRPC server setup
│       ├── .env              # Backend environment variables
│       ├── package.json      # Backend dependencies
│       └── tsconfig.json     # Backend TypeScript config
├── packages/                 # Shared packages
│   ├── db/                   # Database related code
│   │   ├── prisma/           # Prisma schema definitions
│   │   ├── src/              # Database client setup
│   │   ├── package.json      # DB package dependencies
│   │   └── tsconfig.json     # DB TypeScript config
│   └── shared/               # Shared types and utilities
│       ├── src/
│       │   ├── types/        # Shared TypeScript interfaces
│       │   ├── utils/        # Common utility functions
│       │   ├── constants/    # Global constants
│       │   └── validation/   # Zod schemas
│       ├── package.json      # Shared package dependencies
│       └── tsconfig.json     # Shared TypeScript config
├── .github/                  # CI/CD workflows
│   └── workflows/
│       ├── ci.yml           # Continuous Integration
│       └── deploy.yml       # Deployment to Vercel
├── docs/                     # Project documentation
├── .env.example              # Root environment template
├── .gitignore               # Global git ignore
├── package.json             # Root package.json (workspaces)
├── pnpm-workspace.yaml      # pnpm workspaces config
└── README.md                # Project README
```

## Key Structure Principles

### Monorepo Benefits
- **Type Sharing**: End-to-end type safety with shared packages
- **Code Reuse**: Common utilities and types across apps
- **Unified Dependencies**: Simplified dependency management
- **Atomic Changes**: Single PR can update frontend, backend, and shared code

### Package Organization
- **`apps/web`**: Next.js frontend application
- **`apps/api`**: tRPC backend procedures (deployed as Vercel functions)
- **`packages/db`**: Prisma schema and database client
- **`packages/shared`**: TypeScript interfaces, utilities, validation schemas

### Component Organization (Frontend)
Components will be organized by feature/domain:
```
src/components/
├── ui/                       # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── user/                     # User-related components
│   ├── UserProfile.tsx
│   └── LoginForm.tsx
├── recipes/                  # Recipe-related components
│   ├── RecipeCard.tsx
│   ├── IngredientInput.tsx
│   └── RecipeDetail.tsx
└── challenges/               # Challenge-related components
    ├── DailyChallenge.tsx
    └── CulinaryPassport.tsx
```

## Current Implementation Status
**Bootstrap Phase**: Only documentation and project structure exist. The actual Next.js monorepo needs to be scaffolded using the bootstrap workflow commands.