import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const mode = searchParams.get("mode");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const upcoming = searchParams.get("upcoming");

    const where: Record<string, unknown> = {
      status: "SCHEDULED",
    };

    if (upcoming === "true") {
      where.startTime = { gte: new Date() };
    } else {
      if (from) {
        where.startTime = { ...(where.startTime as object ?? {}), gte: new Date(from) };
      }
      if (to) {
        where.startTime = { ...(where.startTime as object ?? {}), lte: new Date(to) };
      }
    }

    if (mode) {
      where.mode = mode;
    }

    const sessions = await db.session.findMany({
      where: category
        ? {
            ...where,
            offering: { category: category as any },
          }
        : where,
      include: {
        offering: {
          select: {
            id: true,
            title: true,
            category: true,
            slug: true,
            shortDescription: true,
          },
        },
        teacher: { select: { id: true, name: true, photoUrl: true } },
        _count: { select: { bookings: true } },
      },
      orderBy: { startTime: "asc" },
      take: 50,
    });

    // Add computed spotsLeft
    const result = sessions.map((s) => ({
      ...s,
      spotsLeft: Math.max(0, s.capacity - s.enrolled),
    }));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
