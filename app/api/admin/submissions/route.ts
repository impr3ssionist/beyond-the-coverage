import { NextResponse } from "next/server";
import { getAdminSupabaseClient, verifyAdminAuth } from "../../../lib/auth";

/**
 * Get all contact submissions
 * GET /api/admin/submissions
 * Requires admin authentication
 */
export async function GET(req: Request) {
  try {
    // Verify admin auth
    const auth = await verifyAdminAuth(req);
    
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = getAdminSupabaseClient();

    // Fetch all submissions ordered by most recent
    const { data: submissions, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch submissions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissions: submissions || [],
      count: submissions?.length || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Update submission status or notes
 * PATCH /api/admin/submissions
 * Requires admin authentication
 */
export async function PATCH(req: Request) {
  try {
    // Verify admin auth
    const auth = await verifyAdminAuth(req);
    
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, status, admin_notes } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabaseClient();

    // Update submission
    const updateData: any = {};
    if (status) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

    const { data, error } = await supabase
      .from("contact_requests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to update submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submission: data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
