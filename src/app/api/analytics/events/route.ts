import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyticsEventSchema } from "@/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = analyticsEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { event, properties, page } = parsed.data;

    // Non-blocking analytics write
    db.analyticsEvent
      .create({
        data: {
          event,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          properties: (properties ?? undefined) as any,
          page: page ?? null,
          userAgent: request.headers.get("user-agent") ?? null,
        },
      })
      .catch(() => {}); // Never fail a request for analytics

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ success: true }, { status: 201 }); // Always succeed
  }
}
