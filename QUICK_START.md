# ✅ Quick Start Checklist

Complete these steps in order to get your system up and running.

---

## Phase 1: Prerequisites (15 minutes)

- [ ] You have Node.js 20.x installed
- [ ] You have a Supabase account
- [ ] You have a Resend account
- [ ] You have a GitHub account
- [ ] You have access to Vercel (optional but recommended)

---

## Phase 2: Local Setup (30 minutes)

### 2.1: Repository & Dependencies
- [ ] Clone repository: `git clone [repo-url]`
- [ ] Navigate: `cd beyond-the-coverage`
- [ ] Install dependencies: `npm install`
- [ ] Run build: `npm run build` (should succeed)

### 2.2: Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Get Supabase URL from Supabase dashboard
- [ ] Get Supabase Service Key from Supabase dashboard
- [ ] Get Resend API key from Resend dashboard
- [ ] Add all values to `.env.local`
- [ ] Test: `npm run dev` (should start on http://localhost:3000)

### 2.3: Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Run SQL from [DEPLOYMENT_GUIDE.md#step-1-create-database-tables](DEPLOYMENT_GUIDE.md#create-database-tables)
- [ ] Verify tables exist: `contact_requests` and `admin_users`

### 2.4: Admin User Creation
- [ ] Create user in Supabase Auth → Users
- [ ] Copy User ID (UUID)
- [ ] Run SQL: `INSERT INTO admin_users ...` with your ID and email
- [ ] Test login at `http://localhost:3000/admin/login`

---

## Phase 3: Local Testing (20 minutes)

### 3.1: Contact Form
- [ ] Visit http://localhost:3000
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Check browser console (should show success)
- [ ] Check your email inbox for admin notification
- [ ] Check your email inbox for user confirmation

### 3.2: Admin Portal
- [ ] Visit http://localhost:3000/admin/login
- [ ] Log in with your credentials
- [ ] Verify you see the dashboard
- [ ] Verify the submission appears in the list
- [ ] Click submission to view details
- [ ] Update status to "reviewed"
- [ ] Add a test note
- [ ] Click export CSV
- [ ] Click logout
- [ ] Verify redirected to login
- [ ] Try accessing /admin/dashboard without login (should redirect to login)

### 3.3: Rate Limiting
- [ ] Submit contact form once
- [ ] Submit again 4 more times quickly (5 total)
- [ ] Submit 6th time - should get rate limit error
- [ ] Wait 1 hour (or restart server in dev to reset)

---

## Phase 4: GitHub Configuration (20 minutes)

### 4.1: Create GitHub Secrets
In **Settings** → **Secrets and variables** → **Repository secrets**, add:

**Vercel Deployment**:
- [ ] `VERCEL_TOKEN` = (get from Vercel settings)
- [ ] `VERCEL_ORG_ID` = (get from Vercel organization settings)
- [ ] `VERCEL_PROJECT_ID` = (get from Vercel project settings)
- [ ] `VERCEL_PROJECT_ID_STAGING` = (if using separate staging project)

**Development Environment**:
- [ ] `DEV_SUPABASE_URL` = (Supabase URL for dev)
- [ ] `DEV_SUPABASE_SERVICE_KEY` = (Service key for dev)

**Staging Environment**:
- [ ] `STAGING_SUPABASE_URL` = (Supabase URL for staging)
- [ ] `STAGING_SUPABASE_SERVICE_KEY` = (Service key for staging)

**Production Environment**:
- [ ] `PRODUCTION_SUPABASE_URL` = (Supabase URL for production)
- [ ] `PRODUCTION_SUPABASE_SERVICE_KEY` = (Service key for production)

**Email Service**:
- [ ] `RESEND_API_KEY` = (same as local, shared)

### 4.2: Create GitHub Environments
In **Settings** → **Environments**, create 3 environments:
- [ ] `development`
- [ ] `staging`
- [ ] `production`

For **production** environment:
- [ ] Add **Required reviewers**: Your GitHub username
- [ ] This prevents accidental deployments

---

## Phase 5: Deployment Testing (30 minutes)

### 5.1: Development Deployment
- [ ] Create branch: `git checkout -b develop`
- [ ] Make a small change
- [ ] Commit: `git add . && git commit -m "test: dev deployment"`
- [ ] Push: `git push origin develop`
- [ ] Go to **GitHub Actions**
- [ ] Watch `deploy-dev.yml` workflow run
- [ ] Verify it completes successfully ✅
- [ ] Visit https://dev.beyondthecoverage.com (or your dev URL)
- [ ] Test contact form on dev site

### 5.2: Staging Deployment
- [ ] Commit changes: `git add . && git commit -m "test: staging deployment"`
- [ ] Push to main: `git push origin main`
- [ ] Watch `deploy-staging.yml` workflow run
- [ ] Verify all tests pass ✅
- [ ] Verify build succeeds ✅
- [ ] Visit https://staging.beyondthecoverage.com (or your staging URL)
- [ ] Test contact form on staging site

### 5.3: Production Deployment
- [ ] Go to **GitHub** → **Actions**
- [ ] Find **Deploy to Production** workflow
- [ ] Click **Run workflow**
- [ ] Select **Run workflow**
- [ ] Wait for build to complete
- [ ] Look for "Review deployments" notification
- [ ] Click **Review deployments**
- [ ] Click **Approve**
- [ ] Wait for production deployment
- [ ] Check health checks pass ✅
- [ ] Visit https://beyondthecoverage.com
- [ ] Verify site is live

---

## Phase 6: Final Validation (15 minutes)

### 6.1: Production Verification
- [ ] Contact form works on production
- [ ] Admin portal accessible at /admin/login
- [ ] Can log in to admin portal
- [ ] Submission from contact form appears in admin portal
- [ ] Email received for production submission
- [ ] CSV export works
- [ ] Status updates work
- [ ] Notes save correctly

### 6.2: Monitor & Document
- [ ] Note production URLs
- [ ] Save admin credentials securely
- [ ] Set calendar reminder for:
  - Password change (30 days)
  - API key rotation (90 days)
  - Monthly backup review

### 6.3: Share Information
- [ ] Email team with admin URL
- [ ] Share admin login credentials securely
- [ ] Point them to [ADMIN_PORTAL_GUIDE.md](ADMIN_PORTAL_GUIDE.md)
- [ ] Show them contact form test

---

## 🎉 Success! You're Live

Once all items are checked, your system is:
- ✅ Contact form fully functional
- ✅ Emails sending to admin and users
- ✅ Admin portal working
- ✅ CI/CD pipeline deploying to all environments
- ✅ Production live and monitored

---

## Next Steps

### Daily
- Check admin portal for new submissions
- Respond to inquiries within 24-48 hours
- Update submission status

### Weekly
- Review submission trends
- Export and backup data
- Monitor performance

### Monthly
- Change password
- Review admin access logs
- Update dependencies: `npm outdated`

### Quarterly
- Rotate API keys
- Security audit
- Plan feature improvements

---

## Troubleshooting Quick Links

- **Build fails**: See [DEPLOYMENT_GUIDE.md#troubleshooting](DEPLOYMENT_GUIDE.md#troubleshooting)
- **Email issues**: See [ENV_SETUP.md#troubleshooting](ENV_SETUP.md#troubleshooting)
- **Admin portal issues**: See [ADMIN_PORTAL_GUIDE.md#troubleshooting](ADMIN_PORTAL_GUIDE.md#troubleshooting)
- **CI/CD issues**: See [DEPLOYMENT_GUIDE.md#troubleshooting](DEPLOYMENT_GUIDE.md#troubleshooting)

---

## Support

- **Full Guides**: See documentation links in main [README.md](README.md)
- **Technical Details**: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
- **Admin Help**: [ADMIN_PORTAL_GUIDE.md](ADMIN_PORTAL_GUIDE.md)
- **Environment Setup**: [ENV_SETUP.md](ENV_SETUP.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**Status**: Ready to Complete  
**Estimated Time**: 2-3 hours total  
**Last Updated**: 2026-04-22
