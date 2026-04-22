# 🏆 Beyond the Coverage

**Professional insurance consulting platform with contact form, admin portal, and automated CI/CD pipeline.**

---

## 📚 Documentation

### Quick Start Guides
- 🚀 **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete setup and deployment instructions
- 🛡️ **[Admin Portal Guide](ADMIN_PORTAL_GUIDE.md)** - How to use the admin dashboard
- 📧 **[Implementation Guide](IMPLEMENTATION_GUIDE.md)** - Full technical architecture
- ⚙️ **[Environment Setup](ENV_SETUP.md)** - Configure environment variables

### For Developers
- **[TESTING.md](TESTING.md)** - Testing procedures
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Project overview

---

## ✨ Features

### 📝 Contact Form
- Professional contact form with validation
- Rate limiting (5 submissions/hour per IP)
- Automatic email notifications
- Database storage
- Admin dashboard access

### 🛡️ Admin Portal
- Secure login with JWT authentication
- View all contact submissions
- Manage submission status (pending/reviewed/contacted)
- Add internal notes
- Export to CSV
- Responsive design (mobile-friendly)

### 📧 Email Integration
- Professional HTML email templates
- Admin notifications with submission details
- User confirmation emails
- XSS protection & security

### 🚀 CI/CD Pipeline
- **Development**: Auto-deploy on push to `develop`
- **Staging**: Auto-deploy on push to `main`
- **Production**: Manual approval required
- Automated testing & linting
- Security scanning
- Health checks

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js 16 + React 19 |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth + JWT |
| **Email** | Resend API |
| **Validation** | Zod |
| **Testing** | Jest + React Testing Library |
| **Deployment** | Vercel (recommended) |
| **CI/CD** | GitHub Actions |

---

## 📋 Getting Started

### Prerequisites
- Node.js 20.x
- npm or yarn
- Supabase account
- Resend account (for emails)
- GitHub account (for CI/CD)

### 1. Clone & Install

```bash
git clone [repo-url]
cd beyond-the-coverage
npm install
```

### 2. Configure Environment

```bash
# Copy template
cp .env.example .env.local

# Edit with your values
# See ENV_SETUP.md for detailed instructions
```

### 3. Set Up Database

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#deployment-workflows) for:
- Creating database tables
- Setting up admin user
- Configuring Row Level Security

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Test Features

**Contact Form**:
1. Visit `/`
2. Fill out contact form
3. Check email for admin notification
4. Check inbox for confirmation

**Admin Portal**:
1. Visit `/admin/login`
2. Log in with credentials
3. View submissions
4. Manage statuses and notes

---

## 📊 Project Structure

```
beyond-the-coverage/
├── app/
│   ├── api/
│   │   ├── contact/              # Contact form API
│   │   └── admin/
│   │       ├── auth/login/       # Admin login
│   │       └── submissions/      # View/update submissions
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout (protected)
│   │   ├── login/page.tsx        # Login page
│   │   └── dashboard/page.tsx    # Dashboard
│   ├── components/               # Shared components
│   ├── lib/                      # Utilities
│   │   ├── auth.ts              # Auth functions
│   │   ├── email.ts             # Email templates
│   │   ├── send-email.ts        # Email sending
│   │   ├── supabase.ts          # DB client
│   │   ├── validation.ts        # Zod schemas
│   │   └── rate-limit.ts        # Rate limiting
│   ├── globals.css              # Styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── .github/workflows/           # CI/CD pipelines
│   ├── deploy-dev.yml           # Dev deployment
│   ├── deploy-staging.yml       # Staging + tests
│   └── deploy-production.yml    # Production + approval
├── public/images/               # Static assets
├── package.json                 # Dependencies
└── [documentation files]        # Guides & plans
```

---

## 🚀 Deployment

### Development
```bash
git push origin develop
# Auto-deploys to dev.beyondthecoverage.com
```

### Staging
```bash
git checkout main
git merge develop
# Auto-deploys to staging.beyondthecoverage.com
# After tests pass
```

### Production
```bash
# In GitHub Actions
# Click "Deploy to Production"
# Approve deployment
# Deploys to beyondthecoverage.com
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🧪 Testing

### Run All Tests
```bash
npm run test:ci
```

### Run Tests in Watch Mode
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

See [TESTING.md](TESTING.md) for detailed test procedures.

---

## 📧 Email Templates

### Admin Notification
Sent when user submits contact form:
- Submission details
- All form fields
- Link to admin portal
- Professional styling

### User Confirmation
Sent to user:
- Thank you message
- Submission confirmation
- Expected response time
- Contact information

---

## 🔒 Security

### Authentication
- ✅ JWT tokens with expiration
- ✅ Supabase Auth integration
- ✅ Row Level Security (RLS) policies
- ✅ Secure password handling

### Data Protection
- ✅ HTTPS encryption
- ✅ XSS protection (HTML escaping)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting per IP

### Admin Portal
- ✅ Token verification on every request
- ✅ Admin user role validation
- ✅ Auto-logout on expiration
- ✅ Secure localStorage handling

---

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Email Not Sending
- Check `RESEND_API_KEY` in environment
- Verify API key in Resend dashboard
- Check email is verified in Resend
- Review server logs

### Admin Login Fails
- Verify admin user exists in Supabase Auth
- Check `admin_users` table has entry
- Verify `SUPABASE_SERVICE_KEY` is correct

See [DEPLOYMENT_GUIDE.md#troubleshooting](DEPLOYMENT_GUIDE.md#troubleshooting) for more solutions.

---

## 📞 Support

- **Docs**: Check the guides above
- **Issues**: Open a GitHub issue
- **Email**: support@beyondthecoverage.com

---

## 📈 Next Steps

- [ ] Complete [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [ ] Configure GitHub secrets
- [ ] Deploy to development
- [ ] Test contact form and admin portal
- [ ] Deploy to staging
- [ ] Final testing
- [ ] Deploy to production
- [ ] Monitor and maintain

---

## 📝 License

Private project - Beyond the Coverage

---

**Version**: 1.0  
**Last Updated**: 2026-04-22  
**Status**: ✅ Ready for Deployment
