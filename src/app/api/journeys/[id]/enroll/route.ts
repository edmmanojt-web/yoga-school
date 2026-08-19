import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// Enroll in a journey
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const { id: journeyId } = await params;

    const journey = await db.journey.findUnique({
      where: { id: journeyId, published: true },
    });

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    const enrollment = await db.journeyEnrollment.upsert({
      where: { userId_journeyId: { userId, journeyId } },
      update: {},
      create: {
        userId,
        journeyId,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ success: true, data: enrollment }, { status: 201 });
  } catch (error) {
    console.error("Journey enroll error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
