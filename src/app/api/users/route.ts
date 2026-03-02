/**
 * User Management API Routes (Admin Only)
 *
 * Provides endpoints for administrators to manage users and roles
 * All endpoints require ADMIN role
 *
 * Endpoints:
 * - GET /api/users - List all users
 * - POST /api/users - Create new user
 * - PUT /api/users - Update user role or details
 * - DELETE /api/users - Delete user account
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth-middleware";
import { hashPassword, isValidEmail, validatePassword } from "../../../lib/auth";

/**
 * GET /api/users
 *
 * List all users in the system
 * Returns user data without passwords
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { students: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("GET users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 *
 * Create new user account
 * Password must meet validation requirements
 *
 * Request body:
 * - email: string (required, must be valid email)
 * - password: string (required, must pass validation)
 * - name: string (optional)
 * - role: 'USER' | 'ADMIN' (optional, defaults to USER)
 */
export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    const body = await request.json();
    const { email, password, name, role = "USER" } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: `Password invalid: ${passwordValidation.error}` },
        { status: 400 }
      );
    }

    // Validate role
    if (role !== "USER" && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Role must be USER or ADMIN" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("POST user error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users
 *
 * Update user details or role
 *
 * Request body:
 * - id: string (required)
 * - name: string (optional)
 * - role: 'USER' | 'ADMIN' (optional)
 * - password: string (optional - if provided, must pass validation)
 */
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request);

    const body = await request.json();
    const { id, name, role, password } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (name !== undefined) {
      updateData.name = name || null;
    }

    if (role !== undefined) {
      if (role !== "USER" && role !== "ADMIN") {
        return NextResponse.json(
          { error: "Role must be USER or ADMIN" },
          { status: 400 }
        );
      }
      updateData.role = role;
    }

    if (password !== undefined) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return NextResponse.json(
          { error: `Password invalid: ${passwordValidation.error}` },
          { status: 400 }
        );
      }
      updateData.password = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("PUT user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users
 *
 * Delete user account and all associated students
 *
 * Query parameters:
 * - id: string (required)
 */
export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin(request);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete user (cascade deletes students due to schema)
    const user = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("DELETE user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
