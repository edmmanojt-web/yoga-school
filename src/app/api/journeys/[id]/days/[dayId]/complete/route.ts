import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// Complete a journey day
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; dayId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const { id: journeyId, dayId } = await params;

    // Verify enrollment
    const enrollment = await db.journeyEnrollment.findUnique({
      where: { userId_journeyId: { userId, journeyId } },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled in this journey" }, { status: 403 });
    }

    // Verify day belongs to journey
    const day = await db.journeyDay.findFirst({
      where: { id: dayId, journeyId },
    });

    if (!day) {
      return NextResponse.json({ error: "Day not found" }, { status: 404 });
    }

    // Mark day as complete
    const progress = await db.journeyDayProgress.upsert({
      where: { userId_dayId: { userId, dayId } },
      update: { completedAt: new Date() },
      create: { userId, dayId },
    });

    // Check if all days are complete — mark journey as completed
    const journey = await db.journey.findUnique({
      where: { id: journeyId },
      include: { days: { select: { id: true } } },
    });

    if (journey) {
      const completedDayIds = await db.journeyDayProgress.findMany({
        where: {
          userId,
          dayId: { in: journey.days.map((d) => d.id) },
        },
        select: { dayId: true },
      });

      if (completedDayIds.length >= journey.totalDays) {
        await db.journeyEnrollment.update({
          where: { userId_journeyId: { userId, journeyId } },
          data: { status: "COMPLETED", completedAt: new Date() },
        });
      }
    }

    return NextResponse.json({ success: true, data: progress }, { status: 201 });
  } catch (error) {
    console.error("Complete day error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
