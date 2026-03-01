import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, enrolled } = body;
  const student = await prisma.student.create({
    data: {
      name,
      email,
      enrolled: enrolled ? new Date(enrolled) : undefined,
    },
  });
  return NextResponse.json(student);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, name, email, enrolled } = body;
  const student = await prisma.student.update({
    where: { id },
    data: {
      name,
      email,
      enrolled: enrolled ? new Date(enrolled) : undefined,
    },
  });
  return NextResponse.json(student);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const student = await prisma.student.delete({ where: { id } });
  return NextResponse.json(student);
}
