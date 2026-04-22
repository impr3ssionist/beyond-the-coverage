# 🛡️ Admin Portal Guide

## Overview

The Admin Portal allows authorized administrators to:
- View all contact form submissions
- Manage submission status (pending → reviewed → contacted)
- Add internal notes
- Export data to CSV
- Track response history

---

## Accessing the Admin Portal

### Step 1: Navigate to Login

```
https://beyondthecoverage.com/admin/login
```

Or from the website, check the email from a contact submission:
> "You can respond directly to this email or **log in to your admin portal** to view all submissions."

### Step 2: Log In

**Credentials**:
- **Email**: `sammy@beyondthecoverage.com` (or your admin email)
- **Password**: (your password set during setup)

**First Login**:
1. Use temporary password provided during setup
2. You'll be redirected to dashboard
3. (Optional) Change password in Supabase dashboard

### Step 3: Review Dashboard

After login, you'll see:

```
┌─────────────────────────────────────────┐
│         CONTACT SUBMISSIONS             │
│                                         │
│ [Logout] [Refresh] [Export CSV]        │
│                                         │
│ Stats:                                 │
│ ┌──────┬──────────┬───────────┐       │
│ │Total │ Pending  │ Contacted │       │
│ │ 42   │   8      │    34     │       │
│ └──────┴──────────┴───────────┘       │
│                                         │
│ Submissions:                           │
│ ┌────────────────────────────────────┐ │
│ │ Date | Name | Email | Status      │ │
│ │ ──────────────────────────────────│ │
│ │ 4/22 | John | john@... | pending  │ │
│ │ 4/21 | Jane | jane@... | contacted│ │
│ └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Managing Submissions

### View Submission Details

1. Click on a submission row to expand
2. See full message and contact info
3. Options appear:
   - **Update Status**
   - **Add Notes**
   - **View Contact Info** (with direct links)

### Update Status

**Status Options**:
- 🔴 **pending** - Not yet reviewed
- 🟡 **reviewed** - Reviewed but no action yet
- 🟢 **contacted** - Follow-up sent

**To Update**:
1. Click submission row
2. Click **Update Status**
3. Select new status
4. Click **Save**

**Workflow Example**:
```
1. New submission arrives (pending)
   ↓
2. You review the message (reviewed)
   ↓
3. You respond via email (contacted)
```

### Add Internal Notes

**Notes** are internal reminders/information (not seen by user):
- Follow-up required by [date]
- Customer feedback summary
- Callback number
- Special requests
- etc.

**To Add Notes**:
1. Click submission row
2. Click **Add Notes**
3. Type your notes
4. Click **Save**

**Notes Examples**:
```
"Follow up on Monday - asked for quote on business insurance"
"Customer interested in life insurance - send comparison"
"VIP client - priority response needed"
```

### Respond to Submissions

**Via Email** (Recommended):
1. Click submission row
2. Click the email link (auto-opens your email client)
3. Compose response
4. Send
5. Update status to "contacted" in portal

**Via Portal**:
1. Click submission row
2. Note their email and phone
3. Reach out directly
4. Update status when responded

---

## Export Data

### Export to CSV

**To Export**:
1. Click **[Export CSV]** button
2. File downloads automatically: `contact-submissions-YYYY-MM-DD.csv`

**CSV Contents**:
```
Full Name,Email,Phone,Message,Date,Status
John Doe,john@example.com,555-0123,..."Request quote for...",2026-04-22,pending
Jane Smith,jane@example.com,555-0456,..."Looking for...",2026-04-21,contacted
```

**Uses**:
- Backup/archive submissions
- Import to CRM
- Analyze trends
- Reporting

### CSV Format

Opens in:
- Excel
- Google Sheets
- Numbers
- Any spreadsheet app

---

## Dashboard Features

### Stats Cards

**Total Submissions**: All-time submissions count

**Pending Submissions**: Submissions not yet reviewed or contacted

**Contacted Submissions**: Follow-ups completed

### Submission List

**Columns**:
| Column | Content |
|--------|---------|
| Date | Submission date & time |
| Name | Full name from form |
| Email | Email address (clickable) |
| Phone | Phone if provided |
| Message | First 100 chars of message |
| Status | Current status badge |
| Actions | View/Edit buttons |

### Filters

Use status badges to filter (coming soon):
- All submissions
- Pending only
- Reviewed only
- Contacted only

### Search

Search by name or email (coming soon)

---

## Security & Access

### Authentication

✅ **Secure Login**:
- Password hashed with bcrypt
- JWT tokens with expiration
- Automatic logout on inactivity

⚠️ **Token Expiration**:
- Tokens valid for 1 hour
- Auto-logout if expired
- Just log in again to continue

### Access Control

- **Only you can access** your submissions
- Other admins can't see your activity
- Owner can manage admin users
- Data encrypted in transit (HTTPS)

### Logout

**To Logout**:
1. Click **[Logout]** button
2. Redirected to login page
3. Session cleared
4. Must log in again to access

⚠️ **Always logout** on shared computers

---

## Keyboard Shortcuts (Coming Soon)

```
j - Jump to next submission
k - Jump to previous submission
e - Export CSV
? - Show help
```

---

## Troubleshooting

### Can't Log In

**Problem**: "Invalid credentials" error

**Solutions**:
1. Verify email is correct
2. Check caps lock on password
3. Verify password with Sammy
4. Try resetting password in Supabase dashboard

### Dashboard Won't Load

**Problem**: Blank page or "Loading..." stuck

**Solutions**:
1. Refresh page (F5)
2. Clear browser cache
3. Try different browser
4. Check internet connection
5. Check if you're logged in (URL should be /admin/dashboard)

### Data Not Updating

**Problem**: Changes don't save or show old data

**Solutions**:
1. Click **[Refresh]** button
2. Hard refresh browser (Ctrl+F5)
3. Clear cache and cookies
4. Try again in incognito/private mode

### Submission Not Appearing

**Problem**: New form submission not in list

**Solutions**:
1. Click **[Refresh]** button
2. Check email - confirmation was sent if form succeeded
3. Check website's contact form status message
4. Check spam folder for admin email
5. Check Supabase dashboard if tables exist

### Performance Issues

**Problem**: Dashboard loads slowly

**Solutions**:
1. Check internet connection
2. Try with fewer browser tabs open
3. Close browser extensions
4. Clear cache
5. Try different browser

---

## Best Practices

### 1. Regular Check-Ins

- Check portal daily for new submissions
- Respond within 24-48 hours
- Keep status updated

### 2. Organize Notes

- Add note immediately when reviewing
- Include follow-up dates
- Reference quote numbers if applicable
- Note special requests

### 3. Backup Data

- Export CSV weekly
- Store in Google Drive or backup service
- Keep local copies of important submissions

### 4. Response Tracking

**Update status immediately after responding**:
```
Submission arrives → Mark "pending" (auto)
   ↓
You review message → Mark "reviewed"
   ↓
You respond → Mark "contacted"
```

This helps track response rate.

### 5. Security

- Logout when done
- Never share login credentials
- Don't use same password elsewhere
- Change password quarterly
- Report suspicious activity

---

## Tips & Tricks

### Speed Up Workflow

1. **Use keyboard shortcuts** (when available)
2. **Click email link** to auto-compose reply
3. **Update status immediately** after action
4. **Batch update** similar submissions
5. **Bookmark dashboard** in browser

### Analyze Trends

Export to CSV and analyze:
- Most common insurance types requested
- Geographic patterns (from emails)
- Response time effectiveness
- Conversion rate (submitted vs. contracted)

### Automate Follow-Up

(Future feature):
- Set automatic reminders for pending submissions
- Template responses
- Bulk status updates
- Email integration

---

## Advanced: Admin User Management

### Add New Admin

Only "owner" can add admin users.

**Process**:
1. Owner creates new user in Supabase Auth
2. Owner inserts into `admin_users` table with role='admin'
3. New admin logs in with password
4. Can now view and manage submissions

**Roles**:
- **admin**: View and update submissions
- **owner**: Manage submissions + manage other admins

### Remove Admin

1. Owner goes to Supabase dashboard
2. Deletes user from `admin_users` table
3. (Optional) Deletes user from auth.users table
4. Access revoked immediately

---

## Support

### Getting Help

- Check this guide first
- Email: support@beyondthecoverage.com
- Check IMPLEMENTATION_GUIDE.md for technical details

### Report Issues

Include:
- What you were trying to do
- Error message (if any)
- Browser and OS
- Screenshot if helpful

---

## FAQ

**Q: What if I forget my password?**  
A: Contact Sammy to reset via Supabase dashboard.

**Q: Can I delete submissions?**  
A: Not from portal (security feature). Contact owner if needed.

**Q: How long is data kept?**  
A: Indefinitely in Supabase. Export for backup if concerned.

**Q: Is my data secure?**  
A: Yes - HTTPS, encrypted, row-level security, and JWT auth.

**Q: Can I access from mobile?**  
A: Yes, responsive design works on all devices.

**Q: What if I don't respond within 48 hours?**  
A: Portal has no automatic reminders (yet), but submissions stay in "pending".

---

**Last Updated**: 2026-04-22  
**Version**: 1.0
