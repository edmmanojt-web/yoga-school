import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session?.user || role !== "ADMIN") return null;
  return session;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status: "CONFIRMED" | "CANCELLED" };

    if (!["CONFIRMED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { id },
      select: { id: true, status: true, sessionId: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // When confirming, ensure session isn't over capacity
    if (status === "CONFIRMED" && booking.status !== "CONFIRMED") {
      const session = await db.session.findUnique({
        where: { id: booking.sessionId },
        select: { capacity: true, enrolled: true },
      });
      if (session && session.enrolled >= session.capacity) {
        return NextResponse.json({ error: "Session is at capacity" }, { status: 409 });
      }
    }

    const updated = await db.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id },
        data: {
          status,
          confirmedAt: status === "CONFIRMED" ? new Date() : undefined,
          cancelledAt: status === "CANCELLED" ? new Date() : undefined,
        },
      });

      // Update enrolled count on session
      if (status === "CONFIRMED" && booking.status !== "CONFIRMED") {
        await tx.session.update({
          where: { id: booking.sessionId },
          data: { enrolled: { increment: 1 } },
        });
      } else if (status === "CANCELLED" && booking.status === "CONFIRMED") {
        await tx.session.update({
          where: { id: booking.sessionId },
          data: { enrolled: { decrement: 1 } },
        });
      }

      return updatedBooking;
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
