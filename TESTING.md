# Testing Guide

## Overview

This project uses **Jest** and **React Testing Library** for comprehensive unit and integration testing. Tests are automatically run in the CI/CD pipeline on every push and pull request.

## Setup

### Install Dependencies

```bash
npm install
```

This will install all test dependencies including:
- `jest` - Test runner
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers

### Configuration Files

- **jest.config.ts** - Jest configuration with Next.js integration
- **jest.setup.js** - Jest setup file that imports testing utilities

## Running Tests

### Watch Mode (Development)

```bash
npm test
```

Runs tests in watch mode. Tests will re-run when you modify test files or source files.

### CI Mode (CI/CD Pipeline)

```bash
npm run test:ci
```

Runs tests once with coverage reporting. Used in GitHub Actions workflow.

## Test Structure

Tests are co-located with their components:

```
app/
├── components/
│   ├── Header.tsx
│   ├── Header.test.tsx        # Tests for Header
│   ├── Footer.tsx
│   ├── Footer.test.tsx        # Tests for Footer
│   └── ...
├── page.tsx
└── page.test.tsx              # Tests for HomePage
```

## Test Files

### 1. **Header.test.tsx**
Tests the Header component including:
- Logo rendering and navigation
- All navigation links present and correctly linked
- Mobile hamburger menu functionality
- Responsive layout

**Key tests:**
- Logo renders with correct alt text
- All navigation links are present
- Links have correct href attributes
- Logo is clickable and links to home

### 2. **Footer.test.tsx**
Tests the Footer component including:
- Logo and company info
- All footer navigation links
- Legal links (Privacy, Terms, Disclaimer)
- Social media icons
- Copyright notice with current year

**Key tests:**
- Footer logo displays
- Copyright year is current
- All navigation links present
- Social media icons render with labels
- Legal links have correct hrefs

### 3. **page.test.tsx**
Tests the HomePage component including:
- All major sections render
- Section IDs are correct for smooth scrolling
- Service cards render
- Testimonials display
- Contact form renders

**Key tests:**
- Header, Hero, and Footer render
- Services, About, Trust, Contact sections present
- All service cards display
- Testimonials in Trust section
- Contact form renders

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Testing Links

```typescript
it('navigation links have correct href attributes', () => {
  render(<Header />)
  const link = screen.getByText('Services').closest('a')
  expect(link).toHaveAttribute('href', '#services')
})
```

### Testing Images (with next/image mock)

```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

it('renders image with correct alt text', () => {
  render(<MyComponent />)
  expect(screen.getByAltText('Image Alt Text')).toBeInTheDocument()
})
```

## Coverage Reports

After running `npm run test:ci`, coverage reports are generated in the `coverage/` directory:

```
coverage/
├── coverage-final.json
├── index.html              # Coverage report (open in browser)
├── lcov-report/
└── lcov.info               # LCOV format for CI integration
```

View coverage in browser:
```bash
open coverage/index.html
```

## CI/CD Integration

Tests run automatically via GitHub Actions on:
- **Push** to `main` or `develop` branches
- **Pull requests** to `main` or `develop` branches

### Workflow Steps

1. **Checkout code** - Clone repository
2. **Setup Node.js** - Install Node.js 18.x and 20.x
3. **Install dependencies** - `npm ci`
4. **Run linter** - `npm run lint` (continues on error)
5. **Run tests** - `npm run test:ci` (with coverage)
6. **Upload coverage** - Reports to Codecov
7. **Build application** - `npm run build` (only if tests pass)

### Badge & Reporting

Coverage reports are uploaded to **Codecov** for:
- Coverage tracking over time
- PR diff coverage analysis
- Automated coverage reports

## Best Practices

### ✅ Do's

- Write tests for components that are user-facing
- Test user interactions and behavior
- Use descriptive test names
- Keep tests focused and isolated
- Mock external dependencies (images, API calls)
- Test accessibility (alt text, ARIA labels)

### ❌ Don'ts

- Don't test implementation details
- Don't create overly complex tests
- Don't skip testing critical user paths
- Don't leave failing tests in commits
- Don't ignore test failures in CI/CD

## Debugging Tests

### Run Specific Test File

```bash
npm test -- Header.test.tsx
```

### Run Specific Test Suite

```bash
npm test -- --testNamePattern="renders the logo"
```

### Debug with Node Inspector

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

## Troubleshooting

### Issue: "Cannot find module" in tests

**Solution:** Check that mock paths match your project structure. Update `moduleNameMapper` in `jest.config.ts`.

### Issue: Image import errors

**Solution:** Ensure `next/image` is mocked in test files:

```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))
```

### Issue: Tests timeout

**Solution:** Increase timeout in test file:

```typescript
jest.setTimeout(10000) // 10 seconds
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
