# Suggested Development Commands

## Project Management Commands
Since this is a ClaudeCode Bootstrap project, use these automated workflows:

### Bootstrap Command
```bash
/bootstrap
```
- Converts PRD and Technical Architecture into GitHub issues
- Creates comprehensive project backlog
- Maps requirements to implementation tasks

### Work Command
```bash
/work
```
- Systematic implementation of GitHub issues
- Automated Git workflow (branch → commit → PR)
- Consistent code quality and documentation

### Review Command
```bash
/review
```
- Comprehensive PR analysis
- Security and performance review
- Automated feedback and suggestions

### Issues Command
```bash
/issues
```
- Creates individual GitHub issues from feature descriptions

## Standard Development Commands (When Project is Implemented)
Based on the technical architecture, these commands will be available once the project is scaffolded:

### Development
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm dev:web          # Start frontend only
pnpm dev:api          # Start backend only
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm format           # Run Prettier
pnpm type-check       # Run TypeScript compiler
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:web         # Run frontend tests
pnpm test:api         # Run backend tests  
pnpm test:e2e         # Run E2E tests with Playwright
```

### Database
```bash
pnpm db:push          # Push Prisma schema to database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with initial data
```

### Build & Deploy
```bash
pnpm build            # Build for production
pnpm start            # Start production server
```

## System Commands (macOS)
```bash
# File operations
ls -la                # List files with details
find . -name "*.ts"   # Find TypeScript files
grep -r "pattern"     # Search for patterns in files

# Git operations  
git status            # Check repository status
git log --oneline     # View commit history
git branch            # List branches

# Process management
ps aux | grep node    # Find Node.js processes
kill -9 <pid>         # Kill process by ID
```

## Current Status
**Project needs to be scaffolded first** - Currently only documentation exists. The Next.js application structure needs to be created before most development commands will work.