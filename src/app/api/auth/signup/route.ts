/**
 * User Registration Endpoint
 *
 * Allows new users to create accounts with email and password
 * Public endpoint (no authentication required)
 *
 * POST /api/auth/signup
 * - Create new user account
 * - Validate email and password
 * - Return user data on success
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import {
  hashPassword,
  isValidEmail,
  validatePassword,
} from "../../../../lib/auth";

/**
 * POST /api/auth/signup
 *
 * Register new user account
 *
 * Request body:
 * - email: string (required, must be valid and unique)
 * - password: string (required, must pass validation)
 * - name: string (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

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

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with USER role by default
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
