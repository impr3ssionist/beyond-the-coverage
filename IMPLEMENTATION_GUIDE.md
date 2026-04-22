# Implementation Guide: Contact Form Emails, Admin Portal & CI/CD Pipeline

> **Last Updated**: April 22, 2026  
> **Status**: Implementation in Progress

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Part 1: Database Setup](#part-1-database-setup)
3. [Part 2: Contact Form Email Integration](#part-2-contact-form-email-integration)
4. [Part 3: Admin Portal Implementation](#part-3-admin-portal-implementation)
5. [Part 4: CI/CD Pipeline](#part-4-cicd-pipeline)
6. [Security Best Practices](#security-best-practices)
7. [Deployment Guide](#deployment-guide)

---

## Architecture Overview

### System Flow

```
User submits contact form
        ↓
Form validation (client-side & server)
        ↓
Rate limiting check (5 requests/hour per IP)
        ↓
Save to Supabase (contact_requests table)
        ↓
Send emails (Admin notification + User confirmation)
        ↓
Return success response
        ↓
Admin receives email with portal link
        ↓
Admin logs into /admin/login
        ↓
Authenticated, views dashboard with submissions
        ↓
Can update status, add notes, export CSV
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16 + React 19 | UI & Form |
| **Backend** | Next.js API Routes | Server logic |
| **Database** | Supabase (PostgreSQL) | Data storage |
| **Authentication** | Supabase Auth + JWT | Admin access |
| **Email** | Resend API | Email delivery |
| **Styling** | Tailwind CSS | UI Design |
| **CI/CD** | GitHub Actions | Build & Deploy |
| **Hosting** | Vercel (recommended) | Production |

---

## Part 1: Database Setup

### Step 1.1: Create Contact Requests Table

**In Supabase SQL Editor**, run:

```sql
-- Create contact_requests table
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted')),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_contact_requests_created_at DESC ON public.contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);

-- Add comment
COMMENT ON TABLE public.contact_requests IS 'Stores contact form submissions from website';
```

### Step 1.2: Create Admin Users Table

```sql
-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'owner')),
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Add comment
COMMENT ON TABLE public.admin_users IS 'Admin user accounts for portal access';
```

### Step 1.3: Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Contact requests policies
-- Public can INSERT (but not SELECT/UPDATE/DELETE)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can SELECT
CREATE POLICY "Only admins can view submissions"
  ON public.contact_requests
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.admin_users WHERE role IN ('admin', 'owner')
    )
  );

-- Only admins can UPDATE their own submissions
CREATE POLICY "Only admins can update submissions"
  ON public.contact_requests
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.admin_users WHERE role IN ('admin', 'owner')
    )
  );

-- Admin users policies
-- Only owner can view admin_users
CREATE POLICY "Only owner can view admins"
  ON public.admin_users
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.admin_users WHERE role = 'owner'
    )
  );

-- Only owner can manage admin_users
CREATE POLICY "Only owner can manage admins"
  ON public.admin_users
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.admin_users WHERE role = 'owner'
    )
  );
```

### Step 1.4: Create Initial Admin User

```sql
-- First, create the user in auth.users (via Supabase dashboard or API)
-- Then insert into admin_users:
INSERT INTO public.admin_users (id, email, role)
VALUES (
  '[USER_ID_FROM_AUTH]',
  'sammy@beyondthecoverage.com',
  'owner'
);
```

> **Note**: Replace `[USER_ID_FROM_AUTH]` with the actual UUID from Supabase Auth. You can get this from the Supabase dashboard under Authentication → Users.

---

## Part 2: Contact Form Email Integration

### Step 2.1: Email Service Configuration

#### Option A: Using Resend (Recommended)

1. **Sign up** at [https://resend.com](https://resend.com)
2. **Create API Key** in dashboard → Integrations
3. **Add to `.env.local`**:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@beyondthecoverage.com
ADMIN_EMAIL=sammy@beyondthecoverage.com
NEXT_PUBLIC_APP_URL=https://beyondthecoverage.com
```

#### Option B: Using SendGrid

1. **Sign up** at [https://sendgrid.com](https://sendgrid.com)
2. **Create API Key** in Settings → API Keys
3. **Add to `.env.local`**:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@beyondthecoverage.com
ADMIN_EMAIL=sammy@beyondthecoverage.com
NEXT_PUBLIC_APP_URL=https://beyondthecoverage.com
```

### Step 2.2: Email Templates

The email templates are already implemented in `app/lib/email.ts`:

- **Admin Notification Email**
  - Styled with purple gradient header
  - Shows all submission fields
  - Includes link to admin portal
  - Professional formatting

- **User Confirmation Email**
  - Thanks the user
  - Sets expectations for response
  - Shows contact info
  - Branded with company colors

### Step 2.3: Test Email Sending

1. **Fill out contact form** on website
2. **Check email inbox** (both admin and user emails should arrive)
3. **Verify template rendering** (check for broken styles, missing links)
4. **Check admin portal link** (should navigate to `/admin/login`)

### Step 2.4: Email Error Handling

The system gracefully handles email failures:
- Submission is always saved to database (even if email fails)
- Email errors are logged to console
- API doesn't fail if email fails (data integrity priority)
- Admin can manually resend emails if needed

---

## Part 3: Admin Portal Implementation

### Step 3.1: Admin Portal Structure

```
/admin
├── /login               # Login page
├── /dashboard           # Submissions list & management
└── layout.tsx          # Admin layout with protection (NEW)
```

### Step 3.2: Create Admin Layout with Middleware

**File**: `app/admin/layout.tsx` (NEW)

This protects all `/admin/*` routes and ensures authentication.

### Step 3.3: Admin Authentication Flow

1. **User visits** `/admin/login`
2. **Enters credentials** (email & password)
3. **POST** to `/api/admin/auth/login`
4. **Server verifies**:
   - Email exists in Supabase auth
   - Password is correct
   - User exists in `admin_users` table
   - User has `admin` or `owner` role
5. **Returns JWT token** in response
6. **Client stores** in `localStorage` with key `adminToken`
7. **Redirects** to `/admin/dashboard`
8. **Dashboard requests** include `Authorization: Bearer ${token}` header
9. **Server validates** token on each request

### Step 3.4: Dashboard Features

**Implemented Features**:
✅ View all contact submissions (sorted by newest first)  
✅ Search/filter by status (pending/reviewed/contacted)  
✅ View submission details in modal  
✅ Update submission status  
✅ Add admin notes  
✅ Export data to CSV  
✅ Logout functionality  
✅ Auto-redirect on token expiration (401)  

**Stats Cards**:
- Total submissions (all time)
- Pending submissions (not yet reviewed)
- Contacted submissions (follow-up completed)

### Step 3.5: Admin User Management

#### Create Admin User (One-time Setup)

Use the Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter: `sammy@beyondthecoverage.com`
4. Set strong password
5. Copy the user ID (UUID)
6. Run SQL from Step 1.4 with the UUID

#### Additional Admin Users

Repeat the process for each admin, then insert into `admin_users` table.

---

## Part 4: CI/CD Pipeline

### Step 4.1: Current Setup

You have two workflows:
- `ci.yml` - Basic linting & building on main
- `ci-cd.yml` - Tests + build on main & develop

### Step 4.2: Enhanced Multi-Stage Pipeline

We'll create three separate workflows:

#### Workflow 1: Development Environment (Dev)
- **Trigger**: PR to `develop` branch OR push to `develop`
- **Actions**:
  1. Lint & build
  2. Deploy to dev environment
  3. Run smoke tests
  4. Post status in PR comments

#### Workflow 2: Test Environment (Staging)
- **Trigger**: Push to `main` branch
- **Actions**:
  1. Run full test suite
  2. Generate coverage report
  3. Deploy to staging
  4. Run integration tests
  5. Post results to PR

#### Workflow 3: Production Environment
- **Trigger**: Manual workflow dispatch OR tag creation
- **Actions**:
  1. Build production bundle
  2. Require manual approval (GitHub environment)
  3. Deploy to production
  4. Run health checks
  5. Post deployment status

### Step 4.3: Required GitHub Secrets

Add these in **Settings** → **Secrets and variables** → **Repository secrets**:

```
# Deployment
VERCEL_TOKEN=...           # Or your hosting platform token
VERCEL_ORG_ID=...          # Or your org ID
VERCEL_PROJECT_ID=...      # Or your project ID

# Database & Services
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...
RESEND_API_KEY=...

# Environment URLs
DEV_APP_URL=https://dev.beyondthecoverage.com
STAGING_APP_URL=https://staging.beyondthecoverage.com
PRODUCTION_APP_URL=https://beyondthecoverage.com
```

### Step 4.4: Deployment Flow Diagram

```
Developer pushes to develop
    ↓
[DEV WORKFLOW]
- Build & lint
- Deploy to dev.beyondthecoverage.com
- Run smoke tests
- ✓ Auto-deployed

Developer opens PR to main
    ↓
PR triggers test workflow
    ↓
[TEST WORKFLOW]
- Run full test suite
- Generate coverage report
- Deploy to staging
- Run integration tests
- Post results to PR
- ✓ Auto-deployed if all pass

Developer merges PR to main
    ↓
[PRODUCTION WORKFLOW]
- Build production bundle
- Require manual approval from GitHub
- Show reviewer details & risks
- ✓ Approved → Deploy to production
- ✗ Denied → Stop deployment
- Run health checks
- Post status to Slack/email

```

### Step 4.5: Environment Configuration

#### Development (.env.development)
```env
NEXT_PUBLIC_APP_URL=https://dev.beyondthecoverage.com
SUPABASE_URL=https://dev-db.supabase.co
```

#### Staging (.env.staging)
```env
NEXT_PUBLIC_APP_URL=https://staging.beyondthecoverage.com
SUPABASE_URL=https://staging-db.supabase.co
```

#### Production (.env.production)
```env
NEXT_PUBLIC_APP_URL=https://beyondthecoverage.com
SUPABASE_URL=https://prod-db.supabase.co
```

---

## Security Best Practices

### 1. Authentication Security

✅ **Implement**:
- JWT tokens with expiration (1 hour recommended)
- Refresh token rotation
- Secure HTTP-only cookies (preferred over localStorage)
- CSRF protection on state-changing requests
- Rate limiting on login attempts (5 attempts per 15 minutes)

⚠️ **Current**: Uses localStorage (vulnerable to XSS)  
🔧 **Improve**: Switch to HTTP-only cookies with middleware

### 2. Email Security

✅ **Implement**:
- SPF/DKIM/DMARC records for domain
- Reply-to address validation
- Email template XSS protection (use `escapeHtml()`)
- Don't expose sensitive data in email subjects

⚠️ **Current**: Already uses `escapeHtml()` function  
✅ **Good**: Doesn't expose PII in subject line

### 3. Database Security

✅ **Implement**:
- Row Level Security (RLS) policies (✅ Done)
- Parameterized queries (✅ Supabase handles)
- Audit logging for admin actions
- Soft deletes for data retention
- Encryption for sensitive fields

✅ **Current**: RLS policies implemented, no hardcoded SQL

### 4. API Security

✅ **Implement**:
- Rate limiting per IP (✅ Already done on `/api/contact`)
- API key validation for admin endpoints (✅ Token verification)
- CORS configuration
- Input validation & sanitization (✅ Zod schemas)
- HTTPS only (enforce in production)

### 5. Deployment Security

✅ **Implement**:
- Secrets management (GitHub Secrets)
- Environment variable isolation
- Security scanning in CI/CD
- Dependabot for vulnerability updates
- Limited deployment approvers (only Sammy)

---

## Deployment Guide

### Step-by-Step Deployment

#### 1. Local Development Setup

```bash
# Clone repo
git clone [repo-url]
cd beyond-the-coverage

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations (one-time)
npm run migrate

# Run locally
npm run dev

# Test contact form and admin portal
# Visit http://localhost:3000
```

#### 2. Push to GitHub

```bash
git add .
git commit -m "feat: add contact form, admin portal, CI/CD"
git push origin develop
```

#### 3. Verify Dev Deployment

- GitHub Actions runs automatically
- Check Actions tab for workflow status
- Verify dev environment deployed

#### 4. Open Pull Request

```bash
# Create PR to main
# GitHub shows workflow status in PR
```

#### 5. Merge to Main (After Approval)

```bash
# Merge PR to main
# This triggers test environment workflow
# Tests run automatically
# Staging environment deploys if tests pass
```

#### 6. Production Deployment (Manual)

```bash
# In GitHub Actions
# Go to "Production" environment
# Click "Review deployments"
# Approve deployment
# Production builds and deploys

# OR use GitHub CLI
gh workflow run deploy-production.yml
```

---

## Testing Checklist

### Contact Form Testing

- [ ] Submit form with all fields → Email received
- [ ] Submit form without phone → Email sent correctly
- [ ] Rate limit: Submit 6 times in 1 hour → Get rate limit error on 6th
- [ ] Submit form with special characters → Email renders correctly
- [ ] Submit from different IPs → Each gets own rate limit

### Admin Portal Testing

- [ ] Login with correct credentials → Access dashboard
- [ ] Login with wrong password → Error message
- [ ] Visit `/admin/dashboard` without login → Redirect to login
- [ ] Token expires → Auto-redirect to login on next action
- [ ] View submission list → Shows all submissions
- [ ] Click submission → Detail modal opens
- [ ] Update status → Changes in list
- [ ] Add notes → Saved and displayed
- [ ] Export CSV → Downloads file with all data
- [ ] Logout → Returns to login page

### CI/CD Testing

- [ ] Push to develop → Dev deployment starts
- [ ] PR to main → Test workflow runs
- [ ] Merge to main → Staging deployment
- [ ] Approve production → Production deployment starts
- [ ] Check secrets → Not logged in workflow output

---

## Troubleshooting

### Email Not Sending

**Problem**: Submissions save but no emails arrive  
**Solution**:
1. Check `.env.local` has `RESEND_API_KEY`
2. Verify API key is valid in Resend dashboard
3. Check email address is verified in Resend
4. Look at server logs for email errors
5. Check spam folder

### Admin Login Fails

**Problem**: Email/password rejected even though correct  
**Solution**:
1. Verify user exists in Supabase Auth
2. Check user is in `admin_users` table
3. Verify role is `admin` or `owner`
4. Check `SUPABASE_SERVICE_KEY` in `.env.local`

### CI/CD Workflow Fails

**Problem**: GitHub Actions shows red X  
**Solution**:
1. Click workflow for details
2. Check test output for errors
3. Verify all secrets are set
4. Check Node version compatibility
5. See GitHub Actions log for specific error

---

## Next Steps

1. **Complete database setup** (Section 1)
2. **Configure email service** (Section 2)
3. **Set up admin user** (Section 3)
4. **Test contact form flow** (Testing Checklist)
5. **Test admin portal** (Testing Checklist)
6. **Deploy to dev/staging** (Deployment Guide)
7. **Configure production deployment** (Deployment Guide)
8. **Monitor in production** (Post-deployment)

---

## Support & Reference

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Resend**: https://resend.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions

---

**Status**: Ready for implementation  
**Version**: 1.0  
**Last Updated**: 2026-04-22
