import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createReflectionSchema, updateReflectionSchema } from "@/validations";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const body = await request.json();
    const parsed = createReflectionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { dayId, content, isPrivate } = parsed.data;

    const reflection = await db.reflection.create({
      data: {
        userId,
        dayId: dayId ?? null,
        content,
        isPrivate: isPrivate ?? true,
      },
    });

    return NextResponse.json({ success: true, data: reflection }, { status: 201 });
  } catch (error) {
    console.error("Create reflection error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const { searchParams } = new URL(request.url);
    const dayId = searchParams.get("dayId");

    const reflections = await db.reflection.findMany({
      where: {
        userId,
        ...(dayId && { dayId }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: reflections });
  } catch (error) {
    console.error("Get reflections error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
