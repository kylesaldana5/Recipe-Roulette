# Task Completion Workflow

## What to Do When a Task is Completed

### 1. Code Quality Checks
Run these commands to ensure code meets project standards:

```bash
# Linting and formatting
pnpm lint                 # Check ESLint rules
pnpm format              # Apply Prettier formatting  
pnpm type-check          # Verify TypeScript compilation

# Fix any issues before proceeding
pnpm lint --fix          # Auto-fix linting issues
```

### 2. Testing Requirements
Execute comprehensive test suite:

```bash
# Unit and integration tests
pnpm test                # Run all tests
pnpm test:web           # Frontend tests specifically
pnpm test:api           # Backend tests specifically

# End-to-end testing (for major features)
pnpm test:e2e           # Playwright E2E tests
```

### 3. Build Verification
Ensure production build succeeds:

```bash
pnpm build              # Build for production
```

### 4. Database Changes (If Applicable)
For tasks involving database schema changes:

```bash
pnpm db:generate        # Regenerate Prisma client
pnpm db:push           # Push schema changes to dev DB
# OR
pnpm db:migrate        # Create and run migration (for production)
```

### 5. Documentation Updates
- Update relevant documentation if APIs or features changed
- Update CLAUDE.md if new project conventions were established
- Ensure README reflects any new setup requirements

### 6. Commit Standards
Follow conventional commit format:
```bash
git add .
git commit -m "feat: add ingredient input component with validation"
# OR
git commit -m "fix: resolve recipe suggestion filtering bug"
# OR  
git commit -m "docs: update API documentation for recipe endpoints"
```

### 7. Pre-PR Checklist
Before creating pull request:
- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] TypeScript compiles without errors
- [ ] Build succeeds
- [ ] Documentation updated if needed
- [ ] No console.log statements left in code
- [ ] Environment variables properly configured
- [ ] Database migrations tested (if applicable)

### 8. Code Review Process
When using the bootstrap workflow:
```bash
/review                 # Use automated review command
```

For manual reviews:
- Create detailed PR description
- Link to relevant issues/requirements
- Include screenshots for UI changes
- Request review from team members

### 9. Deployment Verification
After merge to main:
- Verify Vercel deployment succeeds
- Check production/staging environment works
- Monitor for any immediate errors or performance issues

## Project-Specific Completion Steps

### For Recipe Roulette Features
Additional checks for this cooking game project:

1. **Recipe Data Validation**: Ensure recipe data is properly formatted and complete
2. **Ingredient Matching Logic**: Test edge cases in ingredient-to-recipe matching
3. **User Experience Flow**: Verify gamification elements work end-to-end
4. **Performance**: Check recipe suggestion response times meet targets (<200ms)
5. **Database Seeding**: Ensure any new features work with seeded test data

### Current Project Status
**Note**: This is a bootstrap template project. Many of these commands won't work until the actual Next.js application is scaffolded. Focus on using the bootstrap workflow commands first:

```bash
/bootstrap              # Convert PRD to GitHub issues
/work                   # Implement features systematically  
/review                # Review pull requests
```