# Implementation Plan: Contact Form with Email & Admin Portal + Multi-Stage CI/CD

## Part 1: Contact Form & Email + Admin Portal

### Architecture Overview:
```
1. Contact Form Submission Flow:
   - User fills form in frontend
   - Validates with Zod
   - POST to /api/contact
   - API stores in Supabase & sends email
   - User gets confirmation

2. Admin Portal:
   - Login page (Supabase Auth)
   - Dashboard showing submissions
   - Export/view functionality
   - Admin-only routes
```

### Technologies:
- **Email Service**: Resend (easiest for Next.js)
- **Database**: Supabase (already configured)
- **Authentication**: Supabase Auth + middleware
- **UI**: Tailwind CSS

### Database Schema Required:
```sql
-- contact_requests table (create in Supabase)
- id: UUID (primary key)
- full_name: TEXT
- email: TEXT
- phone: TEXT
- message: TEXT
- created_at: TIMESTAMP
- admin_notes: TEXT (optional)
- status: TEXT (pending/reviewed/contacted)

-- admin_users table (create in Supabase)
- id: UUID (primary key)
- email: TEXT
- role: TEXT (admin/owner)
- created_at: TIMESTAMP
```

---

## Part 2: Multi-Stage CI/CD Pipeline

### Environments:
1. **Dev**: Triggered on push to `develop` branch
2. **Test**: Runs after merge to `main` with automated tests
3. **Prod**: Requires manual approval after test passes

### Deployment Flow:
```
develop branch push → Deploy to Dev
     ↓
PR to main → Test environment ready
     ↓
Merge to main → Run full test suite
     ↓
Tests pass → Wait for manual approval
     ↓
Manual approval → Deploy to Production
```

### GitHub Secrets Required:
- `SUPABASE_URL` - Prod database
- `SUPABASE_SERVICE_KEY` - For server-side operations
- `RESEND_API_KEY` - Email service
- `ADMIN_EMAIL` - Sammie's email for contacts
- Deployment secrets for each environment

---

## Files to Create/Modify:

### Backend:
1. Enhance `/app/api/contact/route.ts` - Add email sending
2. Create `/app/api/admin/submissions/route.ts` - Get submissions
3. Create `/app/middleware.ts` - Admin auth middleware
4. Create `/app/lib/email.ts` - Email templates
5. Create `/app/lib/auth.ts` - Auth utilities

### Frontend (Admin Portal):
6. Create `/app/admin/login/page.tsx` - Login page
7. Create `/app/admin/dashboard/page.tsx` - Submissions dashboard
8. Create `/app/admin/layout.tsx` - Admin layout with protection

### GitHub Actions:
9. Enhance `.github/workflows/ci-cd.yml` - Multi-stage pipeline
10. Create `.github/workflows/deploy-dev.yml` - Dev deployment
11. Create `.github/workflows/deploy-prod.yml` - Prod deployment

---

## Implementation Order:
1. Install dependencies (Resend)
2. Set up environment variables
3. Create email templates
4. Enhance contact API
5. Create admin authentication
6. Create admin dashboard
7. Update CI/CD workflows
8. Test everything end-to-end

---

## Security Checklist:
✓ Admin routes protected with middleware
✓ Email validation on both client & server
✓ Database access controlled
✓ Sensitive data in environment variables
✓ Rate limiting on contact form
✓ CORS properly configured
✓ Only Sammie's email receives admin access
