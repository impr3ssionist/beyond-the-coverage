import { ContactInput } from "./validation";
import { generateAdminEmailHTML, generateUserConfirmationHTML } from "./email";

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  process.env.RESEND_FROM_EMAIL_NEW ||
  "noreply@beyondthecoverage.com";

/**
 * Send email via Resend API
 * Sends both admin notification and user confirmation
 */
export async function sendContactEmails(
  submission: ContactInput,
  adminEmail: string | string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    // Prepare email content
    const adminEmailContent = generateAdminEmailHTML(submission);
    const recipients = Array.isArray(adminEmail)
      ? adminEmail
      : adminEmail
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean);

    if (recipients.length === 0) {
      console.error("ADMIN_EMAIL not configured");
      return {
        success: false,
        error: "Admin email not configured",
      };
    }

    // Send admin notification (using Resend - update this to match your choice)
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject: `New Contact Submission from ${submission.full_name}`,
        html: adminEmailContent,
        reply_to: submission.email,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.json();
      console.error("Failed to send admin email:", error);
      return {
        success: false,
        error: "Failed to send admin notification",
      };
    }

    // Send user confirmation
    // const userEmailResponse = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${resendApiKey}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: fromEmail,
    //     to: submission.email,
    //     subject: "Thank you for contacting Beyond the Coverage",
    //     html: userEmailContent,
    //     reply_to: adminEmail,
    //   }),
    // });

    // if (!userEmailResponse.ok) {
    //   const error = await userEmailResponse.json();
    //   console.error("Failed to send user confirmation email:", error);
    //   // Don't fail the whole request if user email fails
    //   // as the important admin email was sent
    // }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Alternative: SendGrid implementation
 * Uncomment if using SendGrid instead of Resend
 */
export async function sendContactEmailsViaSendGrid(
  submission: ContactInput,
  adminEmail: string | string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const sendGridApiKey = process.env.SENDGRID_API_KEY;

    if (!sendGridApiKey) {
      console.error("SENDGRID_API_KEY not configured");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    const adminEmailContent = generateAdminEmailHTML(submission);
    const userEmailContent = generateUserConfirmationHTML(
      submission.full_name
    );
    const recipients = Array.isArray(adminEmail)
      ? adminEmail
      : adminEmail
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean);

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: recipients.map((email) => ({ email })),
            subject: `New Contact Submission from ${submission.full_name}`,
          },
          {
            to: [{ email: submission.email }],
            subject: "Thank you for contacting Beyond the Coverage",
          },
        ],
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || "noreply@beyondthecoverage.com",
        },
        content: [
          {
            type: "text/html",
            value: adminEmailContent,
          },
          {
            type: "text/html",
            value: userEmailContent,
          },
        ],
        reply_to: {
          email: submission.email,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to send emails via SendGrid:", error);
      return {
        success: false,
        error: "Failed to send emails",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
