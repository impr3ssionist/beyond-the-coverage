import { NextResponse } from "next/server";
import { getAdminSupabaseClient } from "../../../../lib/auth";

/**
 * Admin login endpoint
 * POST /api/admin/auth/login
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabaseClient();

    // Sign in with Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!data.session) {
      return NextResponse.json(
        { error: "No session created" },
        { status: 401 }
      );
    }
    
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, user_id, email, role")
      .eq("user_id", data.user.id)
      .single();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { error: "Not authorized as admin" },
        { status: 403 }
      );
    }

    // Return session token
    return NextResponse.json({
      success: true,
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
