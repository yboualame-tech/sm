/**
 * Authentication & Authorization Middleware
 *
 * Provides reusable utilities for protecting API routes and enforcing role-based access control (RBAC)
 *
 * Usage in API routes:
 * ```typescript
 * import { requireAuth, requireRole } from '@/lib/auth-middleware';
 *
 * export async function GET(req: NextRequest) {
 *   const session = await requireAuth(req);
 *   // session is guaranteed to exist at this point
 *   // continue with protected logic
 * }
 * ```
 */

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";

export type UserRole = "USER" | "ADMIN";

/**
 * Extended JWT type with role information
 */
export interface AuthToken extends JWT {
  id: string;
  email: string;
  role: UserRole;
}

/**
 * Get current user from request session
 * Returns null if no valid session exists
 *
 * @param req - Next.js request object
 * @returns User object with id, email, role or null
 */
export async function getCurrentUser(req: NextRequest) {
  try {
    const token = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as AuthToken | null;

    if (!token) {
      return null;
    }

    return {
      id: token.id,
      email: token.email,
      role: token.role,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

/**
 * Require valid authentication for route
 * Throws 401 Unauthorized if no session exists
 *
 * @param req - Next.js request object
 * @returns User object with id, email, role
 * @throws NextResponse with 401 status if not authenticated
 */
export async function requireAuth(req: NextRequest) {
  const user = await getCurrentUser(req);

  if (!user) {
    throw NextResponse.json(
      { error: "Unauthorized: No valid session" },
      { status: 401 }
    );
  }

  return user;
}

/**
 * Require specific role for route access
 * Throws 403 Forbidden if user role doesn't match required role
 *
 * @param req - Next.js request object
 * @param requiredRole - Role needed to access route (e.g., 'ADMIN')
 * @returns User object with id, email, role
 * @throws NextResponse with 401 if not authenticated
 * @throws NextResponse with 403 if role doesn't match
 */
export async function requireRole(req: NextRequest, requiredRole: UserRole) {
  const user = await requireAuth(req);

  if (user.role !== requiredRole) {
    throw NextResponse.json(
      {
        error: `Forbidden: Requires ${requiredRole} role, user has ${user.role}`,
      },
      { status: 403 }
    );
  }

  return user;
}

/**
 * Check if user is admin
 * Convenience function for common ADMIN role check
 *
 * @param req - Next.js request object
 * @returns User object with id, email, role
 * @throws NextResponse with 401 if not authenticated
 * @throws NextResponse with 403 if not admin
 */
export async function requireAdmin(req: NextRequest) {
  return requireRole(req, "ADMIN");
}

/**
 * Middleware wrapper to safely catch authorization errors
 * Wraps route handler to catch and properly return error responses
 *
 * Usage:
 * ```typescript
 * const handler = withAuth(async (req, session) => {
 *   // session is guaranteed to exist
 *   return NextResponse.json({ data: ... });
 * });
 *
 * export { handler as GET, handler as POST };
 * ```
 *
 * @param fn - Route handler function that receives request and session
 * @returns Wrapped handler function
 */
export function withAuth(
  fn: (req: NextRequest, session: ReturnType<typeof getCurrentUser>) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const session = await requireAuth(req);
      return fn(req, Promise.resolve(session));
    } catch (error) {
      if (error instanceof NextResponse) {
        return error;
      }
      console.error("Auth middleware error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

/**
 * Middleware wrapper for role-based protection
 * Similar to withAuth but also enforces specific role
 *
 * Usage:
 * ```typescript
 * const handler = withRole('ADMIN', async (req, session) => {
 *   // session is guaranteed to exist and user has ADMIN role
 *   return NextResponse.json({ data: ... });
 * });
 *
 * export { handler as GET, handler as DELETE };
 * ```
 *
 * @param requiredRole - Role required to access route
 * @param fn - Route handler function
 * @returns Wrapped handler function
 */
export function withRole(
  requiredRole: UserRole,
  fn: (req: NextRequest, session: ReturnType<typeof getCurrentUser>) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const session = await requireRole(req, requiredRole);
      return fn(req, Promise.resolve(session));
    } catch (error) {
      if (error instanceof NextResponse) {
        return error;
      }
      console.error("Role middleware error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
