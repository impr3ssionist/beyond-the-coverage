import { ContactInput } from "./validation";

function escapeHtml(value: string | undefined | null) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function generateAdminEmailHTML(submission: ContactInput) {
  const fullName = escapeHtml(submission.full_name);
  const companyName = escapeHtml(submission.company_name || "Not provided");
  const email = escapeHtml(submission.email);
  const phone = escapeHtml(submission.phone || "Not provided");
  const employees = escapeHtml(submission.number_of_employees || "Not provided");
  const message = escapeHtml(submission.message);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; color: #111827;">
      <div style="background: #111827; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Submission</h1>
        <p style="margin: 8px 0 0; font-size: 15px;">Beyond the Coverage website inquiry</p>
      </div>

      <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; margin-top: 0;">A new lead submitted the contact form.</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 12px; font-weight: bold; background: #f9fafb; width: 180px;">Full name</td>
            <td style="padding: 12px;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; background: #f9fafb;">Company name</td>
            <td style="padding: 12px;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; background: #f9fafb;">Email</td>
            <td style="padding: 12px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; background: #f9fafb;">Phone</td>
            <td style="padding: 12px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; background: #f9fafb;">Amount of employees</td>
            <td style="padding: 12px;">${employees}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <h2 style="font-size: 18px; margin-bottom: 8px;">How we can help</h2>
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; line-height: 1.5; white-space: pre-wrap;">${message}</div>
        </div>

        <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
          Submitted from beyondthecoverage.com
        </p>
      </div>
    </div>
  `;
}

export function generateUserConfirmationHTML(fullName: string) {
  return `
    <p>Hi ${escapeHtml(fullName)},</p>
    <p>Thank you for contacting Beyond the Coverage. We received your message and will be in touch soon.</p>
  `;
}