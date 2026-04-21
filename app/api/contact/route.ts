import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";
import { contactSchema } from "../../lib/validation";
import { sendContactEmails } from "../../lib/send-email";
import { RateLimiter } from "../../lib/rate-limit";

// Initialize rate limiter (5 submissions per hour per IP)
const rateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
});

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-client-ip") ||
      "unknown";

    // Check rate limit
    const isRateLimited = await rateLimiter.isLimited(ip);
    if (isRateLimited) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form submission", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Store in database
    const { error: dbError, data: insertedData } = await supabase
      .from("contact_requests")
      .insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
        status: "pending",
      })
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Send emails asynchronously
    const adminEmail = process.env.ADMIN_EMAIL || "sammy@beyondthecoverage.com";
    const emailResult = await sendContactEmails(parsed.data, adminEmail);

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
      // Note: We don't fail the API response here because the submission is saved
      // The email can be retried manually or a background job can handle it
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your submission. We'll be in touch shortly.",
      submissionId: insertedData?.[0]?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}