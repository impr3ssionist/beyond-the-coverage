import { ContactInput } from "./validation";

/**
 * Professional email template for admin notification
 * Sends when a user submits a contact form
 */
export function generateAdminEmailHTML(submission: ContactInput): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
      }
      .header {
        background: linear-gradient(135deg, #915EA6 0%, #C08BCC 100%);
        color: white;
        padding: 30px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        background: white;
        padding: 30px;
        border-radius: 0 0 8px 8px;
      }
      .field {
        margin-bottom: 20px;
      }
      .field-label {
        font-weight: 600;
        color: #915EA6;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 5px;
      }
      .field-value {
        color: #333;
        font-size: 15px;
      }
      .message-box {
        background: #f0f4ff;
        border-left: 4px solid #915EA6;
        padding: 15px;
        border-radius: 4px;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        color: #666;
        font-size: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
      .action-button {
        display: inline-block;
        background: #915EA6;
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        margin-top: 20px;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📬 New Contact Submission</h1>
        <p>A new inquiry has been received from your website</p>
      </div>
      
      <div class="content">
        <p>Hello Sammy,</p>
        <p>You have received a new contact form submission. Here are the details:</p>
        
        <div class="field">
          <div class="field-label">Full Name</div>
          <div class="field-value">${escapeHtml(submission.full_name)}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Email Address</div>
          <div class="field-value">
            <a href="mailto:${escapeHtml(submission.email)}" style="color: #915EA6; text-decoration: none;">
              ${escapeHtml(submission.email)}
            </a>
          </div>
        </div>
        
        ${submission.phone ? `
        <div class="field">
          <div class="field-label">Phone Number</div>
          <div class="field-value">
            <a href="tel:${escapeHtml(submission.phone)}" style="color: #915EA6; text-decoration: none;">
              ${escapeHtml(submission.phone)}
            </a>
          </div>
        </div>
        ` : ''}
        
        <div class="message-box">
          <div class="field-label">Message</div>
          <div class="field-value" style="white-space: pre-wrap;">
            ${escapeHtml(submission.message)}
          </div>
        </div>
        
        <p style="margin-top: 30px; margin-bottom: 10px;">
          You can respond directly to this email or log in to your admin portal to view all submissions.
        </p>
        
        <center>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" class="action-button">
            View in Admin Portal
          </a>
        </center>
        
        <div class="footer">
          <p>This is an automated message from Beyond the Coverage contact system.</p>
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}

/**
 * Professional confirmation email for the user
 */
export function generateUserConfirmationHTML(
  userName: string,
  userEmail: string
): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
      }
      .header {
        background: linear-gradient(135deg, #5E903D 0%, #915EA6 100%);
        color: white;
        padding: 30px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        background: white;
        padding: 30px;
        border-radius: 0 0 8px 8px;
      }
      .check-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }
      .footer {
        text-align: center;
        color: #666;
        font-size: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
      .highlight {
        background: #f0f4ff;
        border-left: 4px solid #5E903D;
        padding: 15px;
        border-radius: 4px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="check-icon">✓</div>
        <h1>Thank You!</h1>
        <p>Your submission has been received</p>
      </div>
      
      <div class="content">
        <p>Hello ${escapeHtml(userName)},</p>
        
        <p>Thank you for reaching out to Beyond the Coverage. We've received your contact form submission and appreciate your interest in our insurance consulting services.</p>
        
        <div class="highlight">
          <strong>What happens next?</strong>
          <p style="margin: 10px 0 0 0;">Our team will review your message and get back to you shortly. We typically respond within 24-48 business hours.</p>
        </div>
        
        <p>If you have any urgent matters or haven't heard from us within 2 business days, feel free to call us directly.</p>
        
        <div class="highlight">
          <strong>Your submission details:</strong>
          <p style="margin: 10px 0 0 0; font-size: 14px;">
            <strong>Email:</strong> ${escapeHtml(userEmail)}<br>
            <strong>Submitted:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
        
        <p>Best regards,<br><strong>Beyond the Coverage Team</strong></p>
        
        <div class="footer">
          <p>This is an automated confirmation email. Please do not reply to this message.</p>
          <p>© ${new Date().getFullYear()} Beyond the Coverage. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
