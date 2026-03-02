/**
 * Student Management API Routes
 *
 * Implements role-based access control:
 * - GET: ADMIN sees all students, USER sees only their own
 * - POST: Authenticated users can create students (associated with their account)
 * - PUT: Requires ownership or ADMIN role
 * - DELETE: Requires ownership or ADMIN role
 *
 * Authentication: All routes require valid session
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { requireAuth } from "../../../lib/auth-middleware";

/**
 * GET /api/students
 *
 * Retrieve students based on role:
 * - ADMIN: Returns all students in the system
 * - USER: Returns only students associated with their account
 *
 * Query parameters:
 * - userId: (ADMIN only) Filter by specific user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const filterUserId = searchParams.get("userId");

    // ADMIN can view all students or filter by userId
    if (user.role === "ADMIN") {
      const where = filterUserId ? { userId: filterUserId } : undefined;
      const students = await prisma.student.findMany({ where });
      return NextResponse.json(students);
    }

    // USER can only view their own students
    const students = await prisma.student.findMany({
      where: { userId: user.id },
    });
    return NextResponse.json(students);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("GET students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/students
 *
 * Create new student
 * - Associates created student with authenticated user's account
 * - ADMIN can optionally specify userId to create student for another user
 *
 * Request body:
 * - name: string (required)
 * - email: string (required)
 * - enrolled: ISO date string (optional)
 * - userId: string (ADMIN only - override default user)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { name, email, enrolled, userId } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Determine which user the student belongs to
    let studentUserId = user.id;
    if (userId && user.role === "ADMIN") {
      // ADMIN can create students for other users
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!targetUser) {
        return NextResponse.json(
          { error: "Target user not found" },
          { status: 404 }
        );
      }
      studentUserId = userId;
    }

    const student = await prisma.student.create({
      data: {
        name,
        email,
        enrolled: enrolled ? new Date(enrolled) : undefined,
        userId: studentUserId,
      },
      include: { user: true },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("POST student error:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/students
 *
 * Update existing student
 * - USER can only update their own students
 * - ADMIN can update any student
 *
 * Request body:
 * - id: number (required)
 * - name: string
 * - email: string
 * - enrolled: ISO date string
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { id, name, email, enrolled } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Check ownership for non-admin users
    if (user.role !== "ADMIN") {
      const student = await prisma.student.findUnique({ where: { id } });
      if (!student || student.userId !== user.id) {
        return NextResponse.json(
          { error: "Not authorized to update this student" },
          { status: 403 }
        );
      }
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(enrolled && { enrolled: new Date(enrolled) }),
      },
      include: { user: true },
    });

    return NextResponse.json(student);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("PUT student error:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/students
 *
 * Delete existing student
 * - USER can only delete their own students
 * - ADMIN can delete any student
 *
 * Query parameters:
 * - id: number (required)
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Valid student ID is required" },
        { status: 400 }
      );
    }

    // Check ownership for non-admin users
    if (user.role !== "ADMIN") {
      const student = await prisma.student.findUnique({ where: { id } });
      if (!student || student.userId !== user.id) {
        return NextResponse.json(
          { error: "Not authorized to delete this student" },
          { status: 403 }
        );
      }
    }

    const student = await prisma.student.delete({ where: { id } });
    return NextResponse.json(student);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("DELETE student error:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
