# Environment Variables Configuration Guide

## Development Environment (.env.local)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@beyondthecoverage.com

# Admin Configuration
ADMIN_EMAIL=sammy@beyondthecoverage.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Staging Environment (.env.staging)

```env
# Supabase Configuration (Staging DB)
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@beyondthecoverage.com

# Admin Configuration
ADMIN_EMAIL=sammy@beyondthecoverage.com
NEXT_PUBLIC_APP_URL=https://staging.beyondthecoverage.com
```

## Production Environment (.env.production)

```env
# Supabase Configuration (Production DB)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@beyondthecoverage.com

# Admin Configuration
ADMIN_EMAIL=sammy@beyondthecoverage.com
NEXT_PUBLIC_APP_URL=https://beyondthecoverage.com
```

---

## GitHub Actions Secrets Configuration

Add these in **GitHub Repository** → **Settings** → **Secrets and variables** → **Repository secrets**:

### Vercel Deployment Secrets
```
VERCEL_TOKEN              - Your Vercel API token
VERCEL_ORG_ID             - Your Vercel organization ID
VERCEL_PROJECT_ID         - Production project ID
VERCEL_PROJECT_ID_STAGING - Staging project ID
```

### Development Environment
```
DEV_SUPABASE_URL          - https://dev-project.supabase.co
DEV_SUPABASE_SERVICE_KEY  - Service key for dev database
```

### Staging Environment
```
STAGING_SUPABASE_URL          - https://staging-project.supabase.co
STAGING_SUPABASE_SERVICE_KEY  - Service key for staging database
```

### Production Environment
```
PRODUCTION_SUPABASE_URL          - https://prod-project.supabase.co
PRODUCTION_SUPABASE_SERVICE_KEY  - Service key for production database
```

### Email Service
```
RESEND_API_KEY  - Resend API key (shared across all environments)
```

---

## Getting Your Secrets

### 1. Supabase URL & Service Key

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Project service role API key** → `SUPABASE_SERVICE_KEY`

### 2. Resend API Key

1. Go to [Resend Dashboard](https://resend.com/dashboard)
2. Go to **Integrations** → **API Keys**
3. Create new API key or copy existing
4. Copy → `RESEND_API_KEY`

### 3. Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Tokens**
3. Create new token
4. Go to **Organization** → **Settings** → find **Organization ID**
5. Go to **Projects** → select your project
6. Copy **Project ID** from project settings

---

## Securing Your Secrets

✅ **DO**:
- Store secrets in GitHub Secrets, not in code
- Use environment-specific secrets
- Rotate API keys regularly
- Use separate databases for dev/staging/prod
- Limit secret access to necessary workflows

❌ **DON'T**:
- Commit `.env` files to GitHub
- Log or print secret values
- Share secrets via email or chat
- Reuse production keys in development
- Commit API keys in code comments

---

## Testing Your Configuration

### 1. Test Local Development

```bash
# Copy template to local env
cp .env.example .env.local

# Add your dev secrets
# Then test:
npm run dev

# Visit http://localhost:3000
# Fill out contact form
# Check email inbox
```

### 2. Test CI/CD Secrets

GitHub Actions will automatically use repository secrets. To debug:

```yaml
- name: Debug secrets
  run: |
    echo "Checking if secrets are available..."
    if [ -z "${{ secrets.VERCEL_TOKEN }}" ]; then
      echo "❌ VERCEL_TOKEN not set"
    else
      echo "✅ VERCEL_TOKEN is set"
    fi
```

### 3. Verify Email Configuration

1. Submit contact form on dev site
2. Check admin email inbox
3. Check user confirmation email
4. Click admin portal link in email
5. Log in and verify submission appears

---

## Troubleshooting

### "Missing Supabase credentials"
- Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL`
- Check `SUPABASE_SERVICE_KEY` is set
- Verify they match your Supabase project

### "Email not sending"
- Check `RESEND_API_KEY` is valid
- Verify `RESEND_FROM_EMAIL` is authorized in Resend
- Check sender email domain has SPF/DKIM records

### "Admin login fails"
- Verify admin user exists in Supabase Auth
- Check user exists in `admin_users` table
- Verify `SUPABASE_SERVICE_KEY` is correct

### "GitHub Actions deployment fails"
- Check all secrets are set in GitHub
- Verify secret names match workflow file exactly
- Check secret values don't have extra whitespace

---

## Next Steps

1. Set up Supabase project (or use existing)
2. Get API keys from Supabase and Resend
3. Add to `.env.local` for local development
4. Add GitHub Secrets for CI/CD
5. Run local tests
6. Push to develop to trigger dev deployment
7. Create PR to test staging deployment
8. Merge to main to deploy to staging
9. Use workflow dispatch to deploy to production

---

**Last Updated**: 2026-04-22
