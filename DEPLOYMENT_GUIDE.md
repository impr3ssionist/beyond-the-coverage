# 🚀 Deployment & Setup Guide

## Quick Start (5 minutes)

### 1. Set Up Environment Variables

```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Edit .env.local with your values:
# - NEXT_PUBLIC_SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - RESEND_API_KEY
# - ADMIN_EMAIL
```

### 2. Create Database Tables

In Supabase Dashboard, go to **SQL Editor** and run:

```sql
-- Contact requests table
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

-- Indexes for performance
CREATE INDEX idx_contact_requests_created_at DESC ON public.contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);

-- Admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'owner')),
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can submit" ON public.contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins view" ON public.contact_requests FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.admin_users WHERE role IN ('admin', 'owner'))
);
CREATE POLICY "Only admins update" ON public.contact_requests FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.admin_users WHERE role IN ('admin', 'owner'))
);
```

### 3. Create Admin User

1. Go to Supabase **Authentication** → **Users**
2. Click **Add user**
3. Enter: `sam.haas@beyondthecoverage.com` and strong password
4. Copy the **User ID** (UUID)
5. Run in SQL Editor:

```sql
INSERT INTO public.admin_users (id, email, role)
VALUES ('[USER_ID]', 'sam.haas@beyondthecoverage.com', 'owner');
```

### 4. Test Locally

```bash
npm install
npm run dev

# Visit http://localhost:3000
# Test contact form
# Visit http://localhost:3000/admin/login
# Log in with your credentials
```

---

## GitHub Actions Setup (10 minutes)

### Add Repository Secrets

Go to **Settings** → **Secrets and variables** → **Repository secrets**

#### Vercel Deployment
```
VERCEL_TOKEN = <your-vercel-api-token>
VERCEL_ORG_ID = <your-org-id>
VERCEL_PROJECT_ID = <production-project-id>
VERCEL_PROJECT_ID_STAGING = <staging-project-id>
```

#### Development Environment
```
DEV_SUPABASE_URL = https://dev-xxx.supabase.co
DEV_SUPABASE_SERVICE_KEY = eyJhbGc...
```

#### Staging Environment
```
STAGING_SUPABASE_URL = https://staging-xxx.supabase.co
STAGING_SUPABASE_SERVICE_KEY = eyJhbGc...
```

#### Production Environment
```
PRODUCTION_SUPABASE_URL = https://prod-xxx.supabase.co
PRODUCTION_SUPABASE_SERVICE_KEY = eyJhbGc...
```

#### Email Service
```
RESEND_API_KEY = re_xxxx...
```

### Create GitHub Environments

1. Go to **Settings** → **Environments**
2. Create 3 environments:
   - `development`
   - `staging`
   - `production`

3. For **production** environment:
   - Add **Required reviewers**: Your GitHub username
   - This ensures production deployments need approval

---

## Deployment Workflows

### Development Deployment

**Trigger**: Push to `develop` branch

```bash
# Create and push to develop
git checkout -b develop
git push origin develop

# GitHub Actions automatically:
# 1. Lints and builds code
# 2. Deploys to dev environment
# 3. Runs smoke tests
# 4. Comments on PR with status
```

**Status**: Check **Actions** tab

### Staging Deployment

**Trigger**: PR to `main` branch

```bash
# Create PR to main
git checkout main
git pull
git checkout -b feature/my-feature
# Make changes
git push origin feature/my-feature

# Go to GitHub → Create Pull Request
# GitHub Actions automatically:
# 1. Runs full test suite
# 2. Generates coverage report
# 3. Builds application
# 4. Deploys to staging
# 5. Runs integration tests
# 6. Comments with results
```

**Status**: Check PR comments and **Checks** tab

### Production Deployment

**Trigger**: Manual approval

```bash
# After PR is merged to main
# Go to GitHub → Actions

# Click "Deploy to Production" workflow
# Click "Run workflow"
# Select "production"
# Click "Run workflow"

# GitHub Actions will:
# 1. Build production bundle
# 2. Run security scan
# 3. Wait for approval (you must approve)
# 4. Deploy to production
# 5. Run health checks
```

**Approval**: 
- GitHub will notify you to review deployment
- Click **Review deployments**
- Approve or reject

---

## Testing Checklist

### Local Testing

- [ ] Contact form submits successfully
- [ ] Admin email received with details
- [ ] User confirmation email received
- [ ] Admin can log in with correct credentials
- [ ] Dashboard shows submitted forms
- [ ] Can update status and notes
- [ ] CSV export works
- [ ] Rate limiting works (5 submissions/hour)

### Development Environment

- [ ] Accessible at dev.beyondthecoverage.com
- [ ] Contact form works on dev
- [ ] Admin portal works on dev
- [ ] Emails send from dev environment

### Staging Environment

- [ ] Accessible at staging.beyondthecoverage.com
- [ ] Full integration tests pass
- [ ] Database queries work correctly
- [ ] Email service configured
- [ ] Admin portal accessible

### Production Environment

- [ ] All tests pass before deployment
- [ ] Security scan passes
- [ ] Health checks pass after deploy
- [ ] Accessible at beyondthecoverage.com
- [ ] Contact form works
- [ ] Admin portal works

---

## Troubleshooting

### Build Fails

```bash
# Check for errors
npm run build

# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Email Not Sending

1. Check RESEND_API_KEY in GitHub Secrets
2. Verify API key in Resend dashboard
3. Check SPF/DKIM records for your domain
4. Check sender email is verified in Resend

### Admin Login Fails

1. Verify user exists in Supabase Auth
2. Check admin_users table has the user
3. Verify SUPABASE_SERVICE_KEY is correct
4. Check user role is 'admin' or 'owner'

### Deployment Fails

1. Check GitHub Actions logs
2. Verify all secrets are set
3. Check Node version compatibility (20.x)
4. Ensure database tables exist
5. Verify environment variables are correct

### Rate Limiting Issues

Contact form submissions are limited to 5 per hour per IP.

To test:
```bash
# Create a test script
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test","email":"test@test.com","message":"Test message"}'
```

---

## Monitoring & Maintenance

### Post-Deployment

1. **Monitor Errors**
   - Check Vercel dashboard for errors
   - Monitor Supabase logs
   - Set up error notifications

2. **Track Submissions**
   - Visit admin dashboard
   - Review submissions regularly
   - Update statuses as you respond

3. **Backup Data**
   - Supabase automated backups (daily)
   - Export contacts regularly as CSV
   - Monitor database usage

### Security

1. **Rotate Credentials**
   - Change admin password monthly
   - Rotate API keys quarterly
   - Review admin access logs

2. **Update Dependencies**
   - Run `npm outdated` to check
   - Update regularly with `npm update`
   - Test after updates

3. **Monitor Access**
   - Check admin login attempts
   - Review contact submissions for spam
   - Adjust rate limits if needed

---

## Rollback Procedures

### If Production Deploy Fails

1. **Immediate**: Click **Reject** during approval
2. **After Deploy**: Vercel allows instant rollback
   - Go to Vercel dashboard
   - Click recent deployment
   - Click **Rollback**

### If Database Schema Breaks

1. Go to Supabase dashboard
2. Check recent queries in history
3. Restore from backup if needed
4. Contact Supabase support

---

## Performance Optimization

### Caching

- Contact form responses cached (1 hour)
- Submissions list cached (5 minutes)
- Admin dashboard loads efficiently

### Database Optimization

- Indexes on frequently queried columns
- Row Level Security optimized
- Queries use prepared statements

### CI/CD Optimization

- Parallel test execution
- Build caching with npm
- Artifact retention (3 days prod, 1 day dev)

---

## Costs & Scaling

### Estimated Monthly Costs

| Service | Usage | Cost |
|---------|-------|------|
| **Vercel** | 3 environments | $20-100 |
| **Supabase** | ~100 submissions/month | $25 (hobby) |
| **Resend** | ~100 emails/month | Free (1000/month free) |
| **GitHub Actions** | CI/CD | Free (2000 min/month) |
| **Total** | | **$45-125/month** |

### Scaling Tips

- Use Supabase Pro for higher volume
- Implement caching for repeated queries
- Optimize email sending with batch operations
- Consider multi-region deployment for global users

---

## Support & Next Steps

1. ✅ Set up environment variables
2. ✅ Create database tables
3. ✅ Create admin user
4. ✅ Test locally
5. ✅ Configure GitHub secrets
6. ✅ Push to develop (test dev deployment)
7. ✅ Create PR to main (test staging)
8. ✅ Merge and approve production deploy
9. ✅ Verify production is live
10. ✅ Start using admin portal

---

**Status**: Ready for deployment  
**Version**: 1.0  
**Last Updated**: 2026-04-22
