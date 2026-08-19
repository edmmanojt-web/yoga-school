import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createBookingSchema } from "@/validations";
import { sendEmail, bookingConfirmationEmail } from "@/lib/email";
import { formatDate, formatTime } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const body = await request.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { sessionId, notes } = parsed.data;

    // Verify session exists and is schedulable
    const yogaSession = await db.session.findUnique({
      where: { id: sessionId },
      include: {
        offering: { select: { title: true } },
        teacher: { select: { name: true } },
      },
    });

    if (!yogaSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (yogaSession.status !== "SCHEDULED") {
      return NextResponse.json({ error: "This session is not available for booking" }, { status: 400 });
    }

    if (yogaSession.enrolled >= yogaSession.capacity) {
      return NextResponse.json({ error: "This session is fully booked" }, { status: 409 });
    }

    // Check for duplicate booking
    const existing = await db.booking.findUnique({
      where: { userId_sessionId: { userId, sessionId } },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already booked this session" }, { status: 409 });
    }

    // Create booking + increment enrolled count in a transaction
    const booking = await db.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId,
          sessionId,
          status: "CONFIRMED",
          confirmedAt: new Date(),
          notes: notes ?? null,
        },
      });

      await tx.session.update({
        where: { id: sessionId },
        data: { enrolled: { increment: 1 } },
      });

      return newBooking;
    });

    // Send confirmation email (non-blocking)
    sendEmail({
      to: session.user.email!,
      ...bookingConfirmationEmail(
        session.user.name ?? "",
        yogaSession.offering.title,
        `${formatDate(yogaSession.startTime)} at ${formatTime(yogaSession.startTime)}`
      ),
    }).catch(() => {});

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
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

    const bookings = await db.booking.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            offering: { select: { title: true, category: true } },
            teacher: { select: { name: true } },
          },
        },
      },
      orderBy: { bookedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
