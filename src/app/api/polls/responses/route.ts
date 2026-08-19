import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { pollResponseSchema } from "@/validations";

// Submit a poll response
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const body = await request.json();
    const parsed = pollResponseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { pollId, optionId } = parsed.data;

    // Verify poll and option exist
    const poll = await db.poll.findUnique({
      where: { id: pollId },
      include: { options: { select: { id: true } } },
    });

    if (!poll || !poll.published) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const validOption = poll.options.some((o) => o.id === optionId);
    if (!validOption) {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    // Upsert — allow changing response
    const response = await db.pollResponse.upsert({
      where: { userId_pollId: { userId, pollId } },
      update: { optionId, respondedAt: new Date() },
      create: { userId, pollId, optionId },
    });

    return NextResponse.json({ success: true, data: response }, { status: 201 });
  } catch (error) {
    console.error("Poll response error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
