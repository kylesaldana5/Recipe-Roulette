## Tech Stack

### Cloud Infrastructure

* [cite_start]**Provider:** Vercel + Supabase 
* [cite_start]**Key Services:** Next.js (Frontend), Supabase (PostgreSQL Database, Authentication), Vercel (Hosting, Serverless Functions) 
* **Deployment Regions:** Global CDN for Vercel, and a selected region for Supabase (e.g., US-East).

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :----------------- | :----------------- | :---------- | :---------- | :------------- |
| **Frontend Language** | TypeScript | 5.3.3 | Type-safe frontend development | [cite_start]Strong typing, excellent tooling  |
| **Frontend Framework** | Next.js | 14.1.0 | React framework with SSR/SSG | [cite_start]SEO, performance, Vercel integration  |
| **UI Component Library** | Tailwind CSS | 3.x | Utility-first CSS framework | Rapid and consistent UI development |
| **State Management** | React Context API / Zustand (or similar light-weight state library compatible with T3) | Latest | Local and global state management | Lightweight, flexible, integrates well with React hooks |
| **Backend Language** | TypeScript | 5.3.3 | Type-safe backend development | [cite_start]Code sharing with frontend, aligns with T3 Stack  |
| **Backend Framework** | Next.js API Routes / tRPC | - | Backend API and business logic | [cite_start]Type-safe API communication, simplifies full-stack development  |
| **API Style** | tRPC | - | Type-safe API communication | [cite_start]End-to-end type safety between frontend and backend  |
| **Database** | PostgreSQL | 16.1 | Primary data store | [cite_start]ACID compliance, JSON support, integrates with Supabase/Prisma  |
| **Cache** | Redis (or similar in-memory cache if needed) | Latest | Session caching, frequently accessed data | Improves performance for high-read operations |
| **File Storage** | Supabase Storage / Vercel Blob (for user-uploaded content) | - | User-generated image/file storage | Scalable cloud storage for user assets |
| **Authentication** | Supabase Auth | 2.39.0 | User authentication | [cite_start]Built-in auth flows, social providers, integrates with PostgreSQL  |
| **Frontend Testing** | Jest / React Testing Library | Latest | Frontend unit and component testing | Standard for React, strong community support |
| **Backend Testing** | Jest / Supertest | Latest | Backend unit and API integration testing | Standard for Node.js, facilitates API testing |
| **E2E Testing** | Playwright | Latest | End-to-end testing of user flows | Cross-browser support, robust for UI interactions |
| **Build Tool** | Next.js / Webpack (managed by Next.js) | - | Compiles and bundles frontend and backend code | [cite_start]Integrated with Next.js for optimized builds  |
| **Bundler** | Webpack / Turbopack (managed by Next.js) | - | Bundles JavaScript, CSS, and other assets | [cite_start]Optimized for performance within Next.js  |
| **IaC Tool** | N/A (Vercel/Supabase manage most infra) | - | Infrastructure as Code | Managed by platform; custom IaC (e.g., Terraform) can be added for complex needs |
| **CI/CD** | Vercel (for deployments) / GitHub Actions | - | Continuous Integration/Deployment | Automated builds and deployments upon code changes |
| **Monitoring** | Vercel Analytics / Supabase Logs / Sentry (or similar APM) | - | Application monitoring and error tracking | Provides insights into performance and errors |
| **Logging** | Console logging / dedicated logging library (e.g., Winston, Pino) | - | Application logging | Structured logging for debugging and auditing |
| **CSS Framework** | Tailwind CSS | 3.x | Utility-first CSS framework | [cite_start]Rapid and consistent UI development  |

# Data Models

## User

**Purpose:** Represents authenticated users in the system, managing their profiles and culinary progress.

**Key Attributes:**
- `id`: `string` - Unique identifier for the user.
- `email`: `string` - User's email address (for authentication and communication).
- `name`: `string` - Display name for the user.
- `role`: `enum` - User permission level (e.g., "user", "admin").
- `createdAt`: `Date` - Timestamp of user creation.
- `updatedAt`: `Date` - Timestamp of last user update.

**TypeScript Interface:**

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin"; // Example roles
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Has many UserIngredient (1:n)
- Has many RecipeCompletion (1:n)
- Has many CulinaryPassportEntry (1:n)

## Ingredient

**Purpose:** Represents a single food ingredient available for recipe matching.

**Key Attributes:**
- `id`: `string` - Unique identifier for the ingredient.
- `name`: `string` - Common name of the ingredient (e.g., "chicken breast", "tomato").
- `category`: `string` - Categorization (e.g., "protein", "vegetable", "dairy").
- `unit`: `string` (optional) - Common units of measurement (e.g., "g", "ml", "cup").

**TypeScript Interface:**

```typescript
interface Ingredient {
  id: string;
  name: string;
  category?: string;
  unit?: string;
}
```

**Relationships:**
- Has many RecipeIngredient (1:n) - defining ingredients required by recipes.

## UserIngredient

**Purpose:** Links a user to the ingredients they currently possess.

**Key Attributes:**
- `id`: `string` - Unique identifier.
- `userId`: `string` - ID of the associated user.
- `ingredientId`: `string` - ID of the possessed ingredient.
- `quantity`: `number` (optional) - Amount of the ingredient (e.g., 2, 500).
- `unit`: `string` (optional) - Unit for the quantity (e.g., "pieces", "grams").

**TypeScript Interface:**

```typescript
interface UserIngredient {
  id: string;
  userId: string;
  ingredientId: string;
  quantity?: number;
  unit?: string;
}
```

**Relationships:**
- Belongs to User (n:1)
- Belongs to Ingredient (n:1)

## Recipe

**Purpose:** Represents a single recipe with its details, difficulty, and cook time.

**Key Attributes:**
- `id`: `string` - Unique identifier for the recipe.
- `name`: `string` - Name of the recipe.
- `description`: `string` - Brief description of the dish.
- `instructions`: `string[]` - Array of strings, each representing a step in the recipe.
- `cuisineType`: `string` - Category of cuisine (e.g., "Italian", "Mexican", "Asian").
- `difficultyRating`: `string` - Difficulty level (e.g., "Easy", "Medium", "Hard").
- `estimatedCookTime`: `number` - Estimated time in minutes.
- `imageUrl`: `string` (optional) - URL for a representative image of the dish.
- `sourceUrl`: `string` (optional) - Original source of the recipe if applicable.

**TypeScript Interface:**

```typescript
interface Recipe {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  cuisineType: string;
  difficultyRating: "Easy" | "Medium" | "Hard";
  estimatedCookTime: number; // in minutes
  imageUrl?: string;
  sourceUrl?: string;
}
```

**Relationships:**
- Has many RecipeIngredient (1:n) - defining ingredients required by this recipe.
- Has many RecipeCompletion (1:n)

## RecipeIngredient

**Purpose:** Defines a specific ingredient required for a recipe and its quantity.

**Key Attributes:**
- `id`: `string` - Unique identifier.
- `recipeId`: `string` - ID of the associated recipe.
- `ingredientId`: `string` - ID of the required ingredient.
- `quantity`: `number` - Amount of the ingredient needed.
- `unit`: `string` - Unit for the quantity (e.g., "g", "ml", "cup").
- `isOptional`: `boolean` - Indicates if the ingredient is optional for the recipe.

**TypeScript Interface:**

```typescript
interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  isOptional: boolean;
}
```

**Relationships:**
- Belongs to Recipe (n:1)
- Belongs to Ingredient (n:1)

## MysteryBasketChallenge

**Purpose:** Represents a daily/weekly mystery basket challenge.

**Key Attributes:**
- `id`: `string` - Unique identifier.
- `date`: `Date` - Date of the challenge.
- `ingredientIds`: `string[]` - Array of IDs for the ingredients in the basket.
- `isCompleted`: `boolean` - Whether the user has completed this challenge.

**TypeScript Interface:**

```typescript
interface MysteryBasketChallenge {
  id: string;
  date: Date;
  ingredientIds: string[]; // References Ingredient.id
  isCompleted?: boolean;
}
```

**Relationships:**
- Has many ChallengeIngredient (1:n)
- Associated with User (n:1) via UserChallengeCompletion (future)

## RecipeCompletion

**Purpose:** Tracks a user's successful completion of a specific recipe.

**Key Attributes:**
- `id`: `string` - Unique identifier.
- `userId`: `string` - ID of the user who completed the recipe.
- `recipeId`: `string` - ID of the recipe that was completed.
- `completionDate`: `Date` - Date and time of completion.

**TypeScript Interface:**

```typescript
interface RecipeCompletion {
  id: string;
  userId: string;
  recipeId: string;
  completionDate: Date;
}
```

**Relationships:**
- Belongs to User (n:1)
- Belongs to Recipe (n:1)

## CulinaryPassportEntry

**Purpose:** Represents an unlocked entry (stamp/badge) in a user's culinary passport for a specific cuisine.

**Key Attributes:**
- `id`: `string` - Unique identifier.
- `userId`: `string` - ID of the user.
- `cuisineType`: `string` - The type of cuisine (e.g., "Italian", "Mexican").
- `unlockedDate`: `Date` - Date when the passport entry was unlocked.

**TypeScript Interface:**

```typescript
interface CulinaryPassportEntry {
  id: string;
  userId: string;
  cuisineType: string; // References Recipe.cuisineType
  unlockedDate: Date;
}
```

**Relationships:**
- Belongs to User (n:1)


## Components

This section identifies the major logical components that will make up the Cooking Game application, spanning both frontend and backend responsibilities. These components are designed with clear boundaries and interfaces to promote modularity and facilitate development.

### User Management Component

**Responsibility:** Handles all user-related operations, including registration, login, profile management, and session management. Integrates with the chosen authentication provider.
**Key Interfaces:**
* User registration/login endpoints.
* Profile update functions.
* Session validation.
**Dependencies:**
* Supabase Auth (for authentication).
* User Data Model.
**Technology Stack:** Next.js (frontend for UI), tRPC (API procedures), Supabase (backend authentication, user data storage).

### Ingredient Management Component

**Responsibility:** Manages the catalog of all available ingredients and allows users to input and store their personal ingredient lists.
**Key Interfaces:**
* Ingredient search/lookup.
* Add/remove ingredients from user's inventory.
* Retrieve user's current ingredients.
**Dependencies:**
* Ingredient Data Model.
* UserIngredient Data Model.
**Technology Stack:** Next.js (frontend for UI), tRPC (API procedures), PostgreSQL (via Prisma/Supabase for data storage).

### Recipe Engine Component

**Responsibility:** The core intelligence for generating random recipe suggestions based on user-provided ingredients, applying difficulty and cook time logic. It also manages the retrieval and display of detailed recipe instructions.
**Key Interfaces:**
* Generate random recipe by ingredients.
* Retrieve full recipe details by ID.
* Apply difficulty and cook time estimation.
**Dependencies:**
* Recipe Data Model.
* RecipeIngredient Data Model.
* Ingredient Data Model.
**Technology Stack:** Next.js (frontend for UI), tRPC (API procedures), PostgreSQL (via Prisma/Supabase for recipe data), potentially an external API for initial recipe data sourcing (future consideration).

### Challenge & Progression Component

**Responsibility:** Manages the logic and state for the Daily Mystery Basket Challenges, tracks their completion, and oversees the progression within the Culinary Passport.
**Key Interfaces:**
* Get daily mystery basket.
* Mark challenge as completed.
* Retrieve user's Culinary Passport progress.
* Award stamps/badges.
**Dependencies:**
* MysteryBasketChallenge Data Model.
* CulinaryPassportEntry Data Model.
* RecipeCompletion Data Model.
* Ingredient Data Model.
**Technology Stack:** Next.js (frontend for UI), tRPC (API procedures), PostgreSQL (via Prisma/Supabase for challenge/passport data).

### User Interface (UI) Component Library

**Responsibility:** Provides a consistent set of reusable React components (buttons, forms, cards, etc.) styled with Tailwind CSS, ensuring a unified and performant user experience across the application.
**Key Interfaces:**
* Component props and events.
* Styling conventions.
**Dependencies:**
* React.
* Tailwind CSS.
**Technology Stack:** Next.js (React), Tailwind CSS.

### Shared Utilities & Types

**Responsibility:** A central package within the monorepo for common utilities, helper functions, and shared TypeScript interfaces/types (e.g., for data models, API responses) used by both frontend and backend. This is critical for end-to-end type safety.
**Key Interfaces:**
* Exported types and functions.
**Dependencies:** Minimal, mostly core JavaScript/TypeScript.
**Technology Stack:** TypeScript.

## External APIs

For the Minimum Viable Product (MVP) of the Cooking Game, there is no immediate requirement to integrate with external recipe or ingredient APIs. The initial recipe database will be sourced internally as discussed in the PRD's technical assumptions.

### Future Considerations for External APIs

While not in scope for MVP, future enhancements may involve integrating with external APIs for:

* **Expanded Recipe Database:** To rapidly increase the variety and volume of available recipes.
* **Ingredient Data Enrichment:** To fetch more detailed nutritional information or ingredient images.
* **Specialized Content:** For premium or niche recipe collections.

If such integrations are pursued, the following will be documented:

* Purpose and documentation URLs.
* Base URL(s).
* Authentication methods.
* Rate limits and key endpoints used.
* Integration-specific error handling strategies.

## Core Workflows

This section outlines the primary user and system workflows, illustrating key interactions between components as defined in the PRD. These workflows highlight the data flow and architectural decisions made.

### 1. User Registration/Login Workflow

This workflow describes how a new user signs up or an existing user logs into the application.

* **User Goal:** Gain access to the "Cooking Game" platform.
* **Key Steps:**
    1.  User accesses the application.
    2.  User provides credentials (email/password) or uses a social login option.
    3.  Application sends credentials to Supabase Auth.
    4.  Supabase Auth authenticates the user and returns a session token.
    5.  Frontend stores the session token and updates UI state.
    6.  User is redirected to the main application dashboard.

* **Interaction Focus:** This flow primarily involves the User Management Component interacting with Supabase Auth, and the Next.js frontend managing UI state and routing.

### 2. Ingredient Input & Recipe Suggestion Workflow

This is the core recipe discovery loop, where a user provides ingredients and receives a recipe suggestion.

* **User Goal:** Discover a new recipe based on ingredients they have.
* **Key Steps:**
    1.  User navigates to the ingredient input interface.
    2.  User inputs or selects available ingredients.
    3.  Frontend sends the list of ingredients to the tRPC backend (Recipe Engine Component).
    4.  Recipe Engine Component queries the database for recipes matching the ingredients.
    5.  Recipe Engine Component applies randomness and selects a single recipe.
    6.  Recipe Engine Component calculates/retrieves difficulty and estimated cook time.
    7.  Backend sends the selected recipe details, difficulty, and cook time to the frontend.
    8.  Frontend displays the recipe suggestion.
    9.  User can opt to "Suggest Another" which repeats steps 3-8.

* **Interaction Focus:** This heavily involves the Ingredient Management Component, Recipe Engine Component, and their interaction with the PostgreSQL database via Prisma/Supabase.

### 3. Daily Mystery Basket Challenge Completion Workflow

This workflow details how a user participates in and completes a daily challenge.

* **User Goal:** Complete a daily cooking challenge and earn a reward.
* **Key Steps:**
    1.  User accesses the "Daily Challenge" section.
    2.  Frontend requests the day's Mystery Basket ingredients from the tRPC backend (Challenge & Progression Component).
    3.  Challenge & Progression Component retrieves the predefined ingredients for the day.
    4.  Frontend displays the Mystery Basket ingredients.
    5.  User prepares the dish (offline, in the real world).
    6.  User clicks "Mark as Complete" button in the UI.
    7.  Frontend sends a completion request to the tRPC backend (Challenge & Progression Component).
    8.  Challenge & Progression Component records the completion for the user.
    9.  Challenge & Progression Component checks if a Culinary Passport stamp needs to be unlocked based on the recipe's cuisine type (if linked).
    10. Backend sends success confirmation and reward (e.g., "Daily Challenge Completed" badge ID) to frontend.
    11. Frontend updates the UI, displaying the new badge/status.

* **Interaction Focus:** This involves the Challenge & Progression Component, Recipe Data Model (for cuisine type), Culinary Passport Entry Data Model, and User Management Component (for user ID).

# Database Schema

Based on the defined Data Models and the choice of PostgreSQL with Prisma (as part of the T3 Stack), here is the conceptual database schema. Prisma will then be used to generate the actual schema and migrations.

## Schema Design Principles

- **Normalization:** Aim for a normalized schema to reduce data redundancy and improve data integrity.
- **Foreign Keys:** Define explicit foreign key constraints to enforce relationships between tables.
- **Indexing:** Key fields used in `WHERE` clauses or `JOIN` operations will be indexed for performance.
- **UUIDs:** Use UUIDs for primary keys where applicable, aligning with modern database practices.

## Proposed PostgreSQL Schema (Conceptual)

```sql
-- User Table
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Ingredient Table
CREATE TABLE "Ingredient" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    unit TEXT
);

-- UserIngredient Table (Links users to ingredients they possess)
CREATE TABLE "UserIngredient" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "ingredientId" UUID NOT NULL REFERENCES "Ingredient"(id) ON DELETE CASCADE,
    quantity DECIMAL,
    unit TEXT,
    UNIQUE ("userId", "ingredientId") -- Ensures a user doesn't list the same ingredient twice
);

-- Recipe Table
CREATE TABLE "Recipe" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    instructions TEXT[] NOT NULL, -- Array of text for steps
    "cuisineType" TEXT NOT NULL,
    "difficultyRating" TEXT NOT NULL, -- e.g., 'Easy', 'Medium', 'Hard'
    "estimatedCookTime" INTEGER NOT NULL, -- Time in minutes
    "imageUrl" TEXT,
    "sourceUrl" TEXT
);

-- RecipeIngredient Table (Links recipes to required ingredients)
CREATE TABLE "RecipeIngredient" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "recipeId" UUID NOT NULL REFERENCES "Recipe"(id) ON DELETE CASCADE,
    "ingredientId" UUID NOT NULL REFERENCES "Ingredient"(id) ON DELETE CASCADE,
    quantity DECIMAL NOT NULL,
    unit TEXT NOT NULL,
    "isOptional" BOOLEAN DEFAULT FALSE NOT NULL,
    UNIQUE ("recipeId", "ingredientId") -- Ensures no duplicate ingredient requirements per recipe
);

-- MysteryBasketChallenge Table
CREATE TABLE "MysteryBasketChallenge" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE UNIQUE NOT NULL, -- Daily challenge, unique by date
    "ingredientIds" UUID[] NOT NULL -- Array of Ingredient UUIDs
);

-- RecipeCompletion Table (Tracks user completion of recipes)
CREATE TABLE "RecipeCompletion" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "recipeId" UUID NOT NULL REFERENCES "Recipe"(id) ON DELETE CASCADE,
    "completionDate" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE ("userId", "recipeId") -- Ensures a user can only complete a specific recipe once (for this context)
);

-- CulinaryPassportEntry Table (Tracks unlocked cuisine types for users)
CREATE TABLE "CulinaryPassportEntry" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "cuisineType" TEXT NOT NULL,
    "unlockedDate" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE ("userId", "cuisineType") -- Ensures a user only has one entry per cuisine type
);
```

## Data Access Layer (Prisma)

Our Tech Stack includes Prisma, which will serve as our Object-Relational Mapper (ORM). Prisma will allow us to define our schema in a human-readable format (schema.prisma) and then generate type-safe database clients. This abstracts the raw SQL, ensuring type safety from the database to the frontend via tRPC.

### Migration Strategy

Prisma Migrate will be used to manage database schema changes. Each change will be a new migration file, allowing for version control and safe evolution of the database schema.

## Frontend Architecture

This section details the architectural design specific to the client-side application, built using Next.js and React. The focus is on creating a modular, maintainable, and high-performance user interface that integrates seamlessly with the backend.

### Component Architecture

The frontend will adopt a component-driven architecture, organizing UI elements into reusable and hierarchical components.

* **Component Organization:** Components will be structured logically, likely by feature or domain (e.g., `components/user`, `components/recipes`, `components/challenges`), with shared, reusable components placed in a common `components/ui` or `components/shared` directory.
* **Component Template:** Each component will follow a consistent structure, typically a `.tsx` file for the React component, a `.ts` file for types/interfaces, and potentially a dedicated CSS module or Tailwind directive for styles if not using inline Tailwind.

### State Management Architecture

Given the T3 Stack, a lightweight and flexible state management approach is preferred.

* **State Structure:** State will be managed primarily using React's Context API for global state and `useState`/`useReducer` hooks for local component state. For more complex global state needs, a small, unopinionated library like Zustand, which integrates well with React hooks, can be introduced.
* **State Management Patterns:** Emphasis will be on clear state transitions, avoiding direct state mutation, and utilizing hooks for reactive updates.

### Routing Architecture

Next.js's file-system based routing will be the foundation for navigation.

* **Route Configuration:** Pages will be defined by files within the `app` (recommended for Next.js 13+) or `pages` directory. This simplifies route definition and ensures consistency.
* **Protected Route Pattern:** Middleware or higher-order components (HOCs) will be used to protect routes, ensuring only authenticated users can access certain sections (e.g., `/dashboard`, `/profile`). This integrates with Supabase Auth.

### API Integration

Frontend-backend communication will be handled primarily via tRPC, ensuring end-to-end type safety.

* **API Client Setup:** The tRPC client will be configured to interact with the backend tRPC procedures, handling data fetching, mutations, and error handling with type inference.
* **Service Example:** API calls will be made using the generated tRPC client, abstracting the underlying HTTP requests and ensuring type safety for both request inputs and response outputs. For example, `api.recipe.getRandomRecipeByIngredients.query(...)`.

### Styling Guidelines

Tailwind CSS will be the primary method for styling, promoting rapid UI development and a consistent design.

* **Styling Approach:** Utility-first CSS using Tailwind classes directly in JSX. For complex, reusable components or situations requiring custom CSS, CSS Modules or `@apply` directives within Tailwind will be utilized.
* **Global Theme Variables:** Tailwinds configuration file will be extended to define global design tokens (colors, spacing, typography, etc.) ensuring consistency and easy theming.

### Testing Requirements

A robust testing strategy will be implemented for the frontend to ensure component functionality and user flow integrity.

* **Component Test Template:** Unit and integration tests for React components will use Jest and React Testing Library, focusing on rendering, user interaction, and component logic in isolation.
* **Testing Best Practices:**
    1.  **Unit Tests:** Test individual components or utility functions in isolation.
    2.  **Integration Tests:** Verify interactions between connected components or integration with API services.
    3.  **E2E Tests:** Use Playwright to test critical user flows across the entire application, simulating real user behavior.
    4.  **Coverage Goals:** Aim for a reasonable code coverage percentage (e.g., 80%) for new code.
    5.  **Test Structure:** Follow the Arrange-Act-Assert (AAA) pattern for clarity in tests.
    6.  **Mock External Dependencies:** API calls and other external services will be mocked during unit and integration tests to ensure deterministic results.

## Backend Architecture

This section describes the architectural design for the server-side components of the application, implemented using Node.js and tRPC, and deployed as Vercel Serverless Functions.

### Service Architecture

Given the choice of Vercel Serverless Functions and tRPC, the backend logic will be organized as a collection of modular, single-purpose functions.

* **Function Organization:** Backend logic will reside within Next.js API Routes, which are deployed as serverless functions by Vercel. These functions will be organized into tRPC routers (e.g., `src/server/api/routers/recipe.ts`, `src/server/api/routers/user.ts`), promoting clear separation of concerns.
* **Function Template:** Each tRPC procedure within these routers will represent a specific API operation, designed to be stateless and highly performant.
* **API Gateway:** Vercels platform implicitly acts as an API Gateway, managing routing, load balancing, and potentially some edge caching for our serverless functions.

### Database Architecture

Our database architecture is centered around PostgreSQL, accessed via Prisma as the ORM, managed by Supabase.

* **Schema Design:** The PostgreSQL schema, as previously defined in the Data Models section, will be managed through Prisma migrations, ensuring version-controlled and type-safe database changes.
* **Data Access Layer:** Prisma Client will be the primary method for all database interactions within our tRPC procedures. This provides a type-safe and efficient way to query and manipulate data, abstracting raw SQL queries. We will utilize the Repository Pattern for complex data operations, where specific data access logic is encapsulated.

### Authentication and Authorization

Authentication will be handled by Supabase Auth, deeply integrated into our backend.

* **Auth Flow:** User authentication (sign-up, login, password reset) will leverage Supabase Auth. Upon successful authentication, Supabase issues a JWT (JSON Web Token) that the frontend will use to authorize requests to our backend.
* **Middleware/Guards:** tRPC procedures will use `protectedProcedure` (as seen in `src/server/api/trpc.ts` in the T3 Stack) to ensure that only authenticated users can access specific API endpoints. Authorization logic (e.g., role-based access control, resource ownership checks) will be implemented within these protected procedures, leveraging user information from the authenticated session context (`ctx.session.user.id` for example).

### Error Handling Strategy

A consistent error handling approach is crucial for maintainability and debugging.

* **Error Flow:** Errors originating from database operations, external API calls (future), or business logic will be caught and transformed into standardized `TRPCError` instances within tRPC procedures.
* **Error Response Format:** These `TRPCError` instances propagate back to the frontend with specific codes and messages, allowing for type-safe and predictable error handling in the UI.
* **Backend Error Handling:** Centralized error handling will be implemented at the tRPC router level to catch unhandled exceptions and ensure consistent logging and response formats. This minimizes boilerplate in individual procedures.

# Unified Project Structure

This section outlines the recommended monorepo directory structure for the "Cooking Game," designed to house both the Next.js frontend (`web`), the tRPC/serverless backend (`api`), and shared code (`shared`, `db`). This structure facilitates end-to-end type safety, simplifies dependency management, and streamlines continuous integration and deployment.

```plaintext
cooking-game/                     # Project Root
├── .github/                      # CI/CD workflows (e.g., GitHub Actions for Vercel deployment)
│   └── workflows/
│       ├── ci.yml                # Continuous Integration (tests, linting)
│       └── deploy.yml            # Continuous Deployment to Vercel
├── apps/                         # Contains independent applications
│   ├── web/                      # Next.js Frontend Application
│   │   ├── public/               # Static assets
│   │   ├── src/                  # Frontend source code
│   │   │   ├── app/              # Next.js 13+ App Router (pages, layouts, API routes)
│   │   │   │   └── api/          # Next.js API Routes (can be used for edge functions or specific needs)
│   │   │   ├── components/       # Reusable UI components (styled with Tailwind)
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── styles/           # Global styles or Tailwind base styles
│   │   │   └── trpc/             # Frontend tRPC client setup
│   │   ├── .env.local.example    # Frontend environment variables template
│   │   ├── next.config.js        # Next.js configuration
│   │   ├── package.json          # Frontend dependencies
│   │   └── tsconfig.json         # Frontend TypeScript configuration
│   └── api/                      # Backend tRPC API Definitions (deployed as Vercel Serverless Functions)
│       ├── src/                  # Backend source code
│       │   ├── routers/          # tRPC router definitions (e.g., recipe.ts, user.ts)
│       │   ├── context.ts        # tRPC context creation (auth, db access)
│       │   └── trpc.ts           # tRPC server setup (procedure definitions)
│       ├── .env.example          # Backend environment variables template
│       ├── package.json          # Backend dependencies
│       └── tsconfig.json         # Backend TypeScript configuration
├── packages/                     # Shared code packages
│   ├── db/                       # Database related code (Prisma schema, client)
│   │   ├── prisma/               # Prisma schema definitions (.prisma files)
│   │   └── src/                  # Database client setup (e.g., initialized Prisma client)
│   │   ├── package.json          # DB package dependencies (e.g., Prisma)
│   │   └── tsconfig.json         # DB package TypeScript configuration
│   └── shared/                   # Shared types, utilities, constants
│       ├── src/
│       │   ├── types/            # Shared TypeScript interfaces for data models
│       │   ├── utils/            # Common utility functions
│       │   └── constants/        # Global constants
│       │   └── validation/       # Zod schemas for shared validation
│       ├── package.json          # Shared package dependencies (e.g., Zod)
│       └── tsconfig.json         # Shared package TypeScript configuration
├── docs/                         # Project documentation (e.g., PRD, Architecture)
│   ├── prd.md
│   └── fullstack-architecture.md
├── .env.example                  # Root environment variables template
├── .gitignore                    # Global git ignore rules
├── package.json                  # Root package.json (with workspaces configuration)
├── pnpm-workspace.yaml           # pnpm workspaces configuration (if using pnpm)
└── README.md                     # Project README
```

## Integration Guidelines & Rationale

**Monorepo (pnpm-workspace.yaml / package.json workspaces):** This structure allows `apps/web`, `apps/api`, `packages/db`, and `packages/shared` to be developed, built, and tested independently while easily sharing code. pnpm (or npm/yarn workspaces) is recommended for efficient dependency management within a monorepo.

**Type Sharing:** All common data model interfaces and validation schemas (e.g., using Zod) will be defined in `packages/shared/src/types` and imported by both frontend and backend for end-to-end type safety, which is a core benefit of the T3 Stack.

**Database Client:** The Prisma client will be initialized and exposed via `packages/db`, ensuring a single, consistent way to interact with the database across backend services.

**API Routes (apps/web/src/app/api):** While `apps/api` houses the primary tRPC backend, Next.js also allows `app/api` routes within the web app. These can be used for specific needs like webhooks or small, non-tRPC endpoints if required for external integrations, though the bulk of the logic will be in the tRPC `apps/api`.

## Development Workflow

This section describes the necessary steps and commands to set up and maintain a local development environment for the "Cooking Game" full-stack application within the monorepo.

### Local Development Setup

**Prerequisites:**

* **Node.js & npm/pnpm:** Ensure you have Node.js (v20.x LTS recommended) and a package manager (pnpm is often preferred with monorepos like T3, or npm/yarn workspaces).
* **Git:** For version control.
* **Docker (Optional but Recommended for Local DB):** For running a local PostgreSQL database instance if not directly connecting to Supabase development database.
* **Modern Web Browser:** For frontend development and testing.

**Initial Setup:**

1.  **Clone the Repository:**
    ```bash
    git clone [your-repository-url]
    cd cooking-game
    ```
2.  **Install Dependencies:** Navigate to the root of the monorepo and install all project dependencies. If using `pnpm`:
    ```bash
    pnpm install
    ```
    If using `npm` workspaces (assuming `package.json` is configured):
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:** Copy the example environment files and populate them.
    ```bash
    cp .env.example .env
    cp apps/web/.env.local.example apps/web/.env.local
    cp apps/api/.env.example apps/api/.env
    # Populate .env files with your Supabase connection string, API keys, etc.
    ```
4.  **Database Setup (Local, if not using Supabase dev DB):** If running a local PostgreSQL instance via Docker:
    ```bash
    docker-compose up -d postgres # Assuming a docker-compose.yml for postgres
    pnpm db:push # Or `npx prisma db push` from `packages/db` directory
    ```
    (Note: Exact database setup commands may vary based on Prisma/Supabase configuration, but `pnpm db:push` is common in T3 setups to sync Prisma schema).

**Development Commands:**

These commands are typically run from the monorepo root.

* **Start all services (Frontend & Backend API):**
    ```bash
    pnpm dev
    ```
    (This usually starts the Next.js development server, which also handles the tRPC API routes.)

* **Start frontend only (if needed for isolated work):**
    ```bash
    pnpm dev:web # or `pnpm --filter web dev` depending on monorepo config
    ```

* **Run backend only (for API testing, if not via Next.js dev server):**
    ```bash
    pnpm dev:api # or `pnpm --filter api dev`
    ```
    (Typically, in T3, the `pnpm dev` in the root starts both seamlessly).

* **Run tests:**
    ```bash
    pnpm test         # Runs all tests
    pnpm test:web     # Runs frontend tests
    pnpm test:api     # Runs backend tests
    ```

* **Run Linters/Formatters:**
    ```bash
    pnpm lint
    pnpm format
    ```

### Environment Configuration

Required environment variables should be clearly defined and managed.

* **Frontend (`apps/web/.env.local`):**
    ```bash
    NEXT_PUBLIC_SUPABASE_URL="[Your Supabase Project URL]"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[Your Supabase Project Anon Key]"
    NEXT_PUBLIC_TRPC_API_URL="[Your API URL, e.g., http://localhost:3000/api/trpc]"
    ```
* **Backend (`apps/api/.env` or `.env` in root for shared by T3):**
    ```bash
    DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?schema=public"
    NEXTAUTH_SECRET="[A long, random string]" # If using NextAuth.js
    SUPABASE_SERVICE_ROLE_KEY="[Your Supabase Service Role Key]" # For backend privileged access
    ```
* **Shared (`.env` in root for common config):**
    Common variables shared across both frontend and backend should be placed here, managed by the monorepo's tooling.


# Deployment Architecture

This section details the strategy for deploying the "Cooking Game" application, leveraging Vercel for the Next.js frontend and serverless functions, and Supabase for the database and authentication services.

## Deployment Strategy

The deployment strategy is optimized for rapid iteration, performance, and scalability, aligning with the Jamstack principles.

### Frontend Deployment

- **Platform:** Vercel.
- **Build Command:** `pnpm build` (or `next build` within `apps/web`). Vercel automatically detects Next.js projects and handles the build process.
- **Output Directory:** Vercel automatically manages the output directory for Next.js builds.
- **CDN/Edge:** Vercel's global Edge Network will serve static assets and SSR/ISR pages, ensuring low latency for users worldwide.

### Backend Deployment

- **Platform:** Vercel (via Next.js API Routes / tRPC procedures) and Supabase (for PostgreSQL and Auth services).
- **Build Command:** Backend logic within Next.js API Routes is built as part of the Next.js build process. Supabase services are managed and scaled by Supabase itself.
- **Deployment Method:** Serverless functions are deployed automatically by Vercel upon pushes to the main branch. Supabase services are managed through the Supabase dashboard.

## CI/CD Pipeline

The Continuous Integration/Continuous Deployment (CI/CD) pipeline will be primarily handled by Vercel's built-in integrations and supplemented by GitHub Actions for more custom workflows (e.g., database migrations, specific testing).

```yaml
# .github/workflows/main.yml (Example for GitHub Actions with Vercel)
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build project
        run: pnpm build # Assumes root build command

      - name: Deploy to Vercel
        run: pnpm deploy-vercel # Custom script or Vercel CLI command
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          # Pass environment variables needed by Next.js at build time
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
          # ... other env variables
```

**Pipeline Configuration:** The main.yml file (or similar) will define automated tests, linting, building, and deployment triggers.

**Vercel Integration:** Vercel's native GitHub integration will automatically deploy preview environments for pull requests and production deployments from the main branch.

## Environments

A clear environment strategy will ensure proper separation of development, testing, and production.

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|-------------|-------------|---------|
| Development | localhost:3000 | localhost:3000/api/trpc | Local development and testing |
| Staging | [project-name]-git-[branch-name]-vercel.app | Same as Frontend URL (Vercel) | Preview deployments for feature branches/PRs |
| Production | [project-name].vercel.app | Same as Frontend URL (Vercel) | Live environment for end-users |

## Environment Promotion Flow

The promotion flow will follow a standard Git-based workflow:

1. **Feature Branches:** Developers work on feature branches.
2. **Pull Request (PR):** A PR is opened to merge into main. Vercel automatically deploys a Staging (Preview) environment for this PR, allowing for testing and review.
3. **Code Review & Tests:** Automated tests run (CI), and code is reviewed.
4. **Merge to Main:** Once approved, the PR is merged into main.
5. **Production Deployment:** Vercel automatically triggers a production deployment from the main branch.

## Rollback Strategy

Given Vercel's capabilities, rollback is straightforward.

**Primary Method:** Vercel allows instant rollbacks to any previous deployment with a single click in their dashboard. This creates a new deployment based on a past successful build.

**Trigger Conditions:** Rollback would be triggered by critical bugs discovered post-deployment or severe performance degradation.

**Recovery Time Objective:** RTO is typically very low (minutes) due to Vercel's instant rollback feature.

## Security and Performance

This section outlines the essential security measures and performance optimization strategies for the "Cooking Game" full-stack application, ensuring a robust and responsive user experience.

### Security Requirements

Security is a paramount concern, and measures will be integrated across both frontend and backend to protect user data and ensure system integrity.

**Frontend Security:**

* [cite_start]**CSP Headers:** Implement Content Security Policy (CSP) headers to mitigate Cross-Site Scripting (XSS) and other content injection attacks by specifying allowed sources of content.
* [cite_start]**XSS Prevention:** All user-generated content rendered on the UI will be properly sanitized and escaped to prevent XSS vulnerabilities. React's JSX automatically escapes rendered values, but additional sanitization might be needed for dynamic HTML.
* [cite_start]**Secure Storage:** Sensitive user data (e.g., authentication tokens) will be stored securely using HttpOnly cookies or browser's Web Cryptography API where appropriate, avoiding localStorage for tokens.

**Backend Security:**

* [cite_start]**Input Validation:** All incoming data from the frontend and external sources will undergo strict server-side input validation using Zod schemas to prevent injection attacks and ensure data integrity.
* [cite_start]**Rate Limiting:** Implement API rate limiting on critical endpoints (e.g., login, recipe suggestions) to prevent abuse and brute-force attacks. Vercel and Supabase might offer built-in rate limiting capabilities.
* [cite_start]**CORS Policy:** A strict Cross-Origin Resource Sharing (CORS) policy will be configured to allow requests only from trusted origins (your frontend domain).

**Authentication Security:**

* [cite_start]**Token Storage:** JWTs (JSON Web Tokens) from Supabase Auth will be handled securely, typically through HttpOnly cookies for session management to prevent client-side JavaScript access.
* **Session Management:** Leverage Supabase's robust session management to handle user sessions securely.
* [cite_start]**Password Policy:** Enforce strong password policies (minimum length, complexity requirements) during user registration and password changes.

### Performance Optimization

Optimizing performance is critical for a smooth "game-like" experience, especially with future plans for "insane graphics."

**Frontend Performance:**

* [cite_start]**Bundle Size Target:** Aim for minimal JavaScript bundle sizes using code splitting and tree-shaking to ensure fast initial page loads.
* [cite_start]**Loading Strategy:** Implement lazy loading for routes and components that are not immediately visible on initial page load.
* [cite_start]**Caching Strategy:** Utilize browser caching for static assets (images, CSS, JS bundles) and implement efficient data fetching strategies with client-side caching (e.g., React Query/TanStack Query) to minimize API calls.
* [cite_start]**Image Optimization:** Leverage Next.js's `Image` component for automatic image optimization (lazy loading, responsive sizing, modern formats like WebP).

**Backend Performance:**

* [cite_start]**Response Time Target:** Aim for sub-200ms API response times for critical read operations and sub-500ms for mutations.
* [cite_start]**Database Optimization:** Optimize PostgreSQL queries with proper indexing, avoid N+1 problems (e.g., using Prisma's includes/selects efficiently), and analyze slow queries.
* [cite_start]**Caching Strategy:** Implement server-side caching (e.g., Redis for frequently accessed static data or user sessions) to reduce database load and improve response times for read-heavy operations.

## Testing Strategy

A comprehensive testing strategy will be implemented across the full stack to ensure the reliability, functionality, and performance of the "Cooking Game" application. This strategy emphasizes automated testing throughout the development lifecycle.

### Testing Philosophy

* **Approach:** A hybrid approach combining Test-Driven Development (TDD) for critical new features and test-after development for less complex components.
* **Coverage Goals:** Aim for high code coverage for critical business logic (e.g., 80% for unit and integration tests), and ensure all critical user flows are covered by end-to-end tests.
* **Test Pyramid:** We will adhere to the testing pyramid principle, emphasizing a large base of fast, isolated unit tests, a smaller layer of integration tests, and a minimal set of end-to-end tests for critical user journeys.

### Test Types and Organization

Tests will be organized logically alongside the code they test or in a dedicated `tests/` directory within each `app/` and `package/`.

#### Unit Tests

* **Framework:** Jest (for both frontend and backend) and React Testing Library (for frontend components).
* **File Convention:** Test files will typically reside next to the tested code, named `[component/module].test.ts(x)`.
* **Location:** `apps/web/src/**/*.test.tsx`, `apps/api/src/**/*.test.ts`, `packages/shared/src/**/*.test.ts`, `packages/db/src/**/*.test.ts`.
* **Mocking Library:** Jest's built-in mocking capabilities.
* **Coverage Requirement:** Target 80% line and branch coverage for new unit-tested code.

**AI Agent Requirements:**

* Generate tests for all public functions, methods, and components.
* Cover edge cases and error conditions.
* Follow the Arrange, Act, Assert (AAA) pattern.
* Mock all external dependencies (e.g., API calls, database interactions) to ensure isolated unit tests.

#### Integration Tests

* **Scope:** Verify interactions between different units or modules (e.g., a frontend component interacting with a tRPC procedure, or a backend service interacting with the database).
* **Location:** `apps/api/tests/integration/**/*.test.ts`, `apps/web/tests/integration/**/*.test.tsx`.
* **Test Infrastructure:**
    * **Database:** Use Testcontainers (for Node.js) to spin up a transient PostgreSQL instance for backend integration tests, or connect to a dedicated development/staging database for more realistic scenarios.
    * **Message Queue:** Not applicable for MVP, but if introduced, embedded solutions or test doubles would be used.
    * **External APIs:** Use mocking libraries (e.g., `msw` for frontend, Nock/Jest mocks for backend) or a tool like WireMock to stub external API responses.

#### End-to-End Tests

* **Framework:** Playwright.
* **Scope:** Test critical user flows that span the entire application, from frontend interaction through backend processing and database updates.
* **Environment:** Run against deployed staging environments or a dedicated test environment.
* **Test Data:** Automated test data seeding and cleanup mechanisms will be implemented to ensure consistent test execution.

### Test Data Management

* **Strategy:** Automated generation of test data where possible, utilizing factories (e.g., Faker.js) for realistic but reproducible data.
* **Fixtures:** Static test data stored as JSON or TypeScript objects for consistent use across tests.
* **Cleanup:** Database transactions or explicit cleanup scripts after integration and E2E tests to ensure test isolation.

### Continuous Testing

* **CI Integration:** Tests will be integrated into the CI/CD pipeline (GitHub Actions). Unit tests will run on every push, while integration and E2E tests will run on PRs to `main` and on merges to `main` (for staging/production validation).
* **Performance Tests:** Basic Lighthouse CI checks for frontend performance metrics can be integrated into the CI pipeline. More advanced load testing can be planned for future phases.
* **Security Tests:** Static Application Security Testing (SAST) tools can be integrated into the CI pipeline (e.g., Snyk, SonarQube).

## Coding Standards

These coding standards are **MANDATORY** for all development on the "Cooking Game" project, including contributions from AI agents. The focus is on establishing clear, consistent patterns and preventing common mistakes specific to our chosen tech stack and project structure.

### Core Standards

* **Languages & Runtimes:** All new code must be written in TypeScript (v5.3.3) for both frontend and backend. Node.js (v20.11.0) is the designated runtime.
* **Style & Linting:** ESLint and Prettier will be configured at the monorepo root. All code must pass linting rules and be automatically formatted by Prettier upon commit. Pre-commit hooks (e.g., Husky) will enforce this.
* **Test Organization:** Test files must be placed directly alongside the code they test, using the `.test.ts(x)` naming convention (e.g., `MyComponent.test.tsx`, `recipeService.test.ts`).

### Naming Conventions

Consistency in naming improves readability and predictability.

| Element | Frontend | Backend | Example |
| :-------------- | :------------------- | :--------- | :------------------ |
| Components | `PascalCase` | - | `UserProfile.tsx` |
| Hooks | `camelCase` with 'use' prefix | - | `useAuth.ts` |
| tRPC Routers | - | `camelCase` with 'Router' suffix | `recipeRouter.ts` |
| Database Tables | - | `PascalCase` or `snake_case` (as per Prisma default) | `User`, `RecipeIngredient` |
| API Procedures | `camelCase` | `camelCase` | `getRandomRecipeByIngredients` |
| Types/Interfaces | `PascalCase` | `PascalCase` | `interface User`, `type RecipeInput` |
| Files (general) | `kebab-case` | `kebab-case` | `user-profile.tsx`, `get-recipes.ts` |

### Critical Rules

These are specific, non-negotiable rules designed to prevent common errors and ensure consistency given our architecture.

* **Type Sharing:** All shared TypeScript interfaces and types for data models (e.g., `User`, `Recipe`, `Ingredient`) must be defined exclusively in `packages/shared/src/types` and imported from there by both frontend and backend.
* **API Calls:** Frontend components and services must **never** make direct `fetch` or `axios` HTTP calls to backend API routes. All backend communication must go through the generated tRPC client (e.g., `api.recipe.getRandomRecipeByIngredients.query()`).
* **Environment Variables:** Environment variables must **always** be accessed through a centralized configuration object or utility, not directly via `process.env`. Frontend public environment variables must be prefixed with `NEXT_PUBLIC_`.
* **Database Access:** Backend services must interact with the database exclusively through the Prisma Client instance (or a Repository layer built on top of it). Direct SQL queries are forbidden unless explicitly approved for complex, optimized scenarios.
* **Error Handling:** All backend API procedures must return errors using `TRPCError` for consistent, type-safe error propagation to the frontend. Frontend should handle these errors gracefully using `try...catch` blocks or `react-query` error handling.
* **State Updates (Frontend):** Never mutate React state directly. Always use the provided state setter functions (e.g., `useState`'s `setCount(newCount)`) or state management library actions.
* **Supabase Interactions:** All direct Supabase client interactions (e.g., `supabase.auth.signIn()`, `supabase.from('table').select()`) should be encapsulated within dedicated service or hook files (e.g., `lib/supabase.ts` or `hooks/useAuth.ts`) and not scattered throughout components.