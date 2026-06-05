import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client
 * Uses service role key for admin operations
 */
export function getAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

/**
 * Check if user is authenticated admin
 * Returns user session or null
 */
export async function getAdminSession() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return null;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get session from auth cookie
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id, user_id, email, role")
      .eq("user_id", session.user.id)
      .single();

    if (!adminUser) {
      return null;
    }

    return {
      user: session.user,
      adminUser,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Verify admin authorization
 * Used in API routes
 */
export async function verifyAdminAuth(request: Request) {
  try {
    // Get session from request
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return null;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get auth header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);

    // Verify JWT token
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return null;
    }

    // Check admin_users table
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id, user_id, email, role")
      .eq("user_id", user.id)
      .single();

    if (!adminUser) {
      return null;
    }

    return {
      user,
      adminUser,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Initialize admin user in database
 * Call this once during setup
 */
export async function initializeAdminUser(email: string) {
  try {
    const supabase = getAdminSupabaseClient();

    // Get or create user via auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: generateSecurePassword(), // Should be changed on first login
      options: {
        data: {
          role: "owner",
        },
      },
    });

    if (signUpError) {
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error("Failed to create user");
    }

    // Add to admin_users table
    const { error: insertError } = await supabase
      .from("admin_users")
      .insert({
        user_id: signUpData.user.id,
        email,
        role: "owner",
      });

    if (insertError) {
      throw insertError;
    }

    return signUpData.user;
  } catch (error) {
    throw error;
  }
}

/**
 * Generate secure password for initial setup
 */
function generateSecurePassword(): string {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}
