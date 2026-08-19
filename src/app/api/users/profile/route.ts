import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profileUpdateSchema } from "@/validations";

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, bio, location, timezone, phone } = parsed.data;

    await db.$transaction([
      db.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(phone !== undefined && { phone }),
        },
      }),
      db.profile.upsert({
        where: { userId },
        update: {
          ...(bio !== undefined && { bio }),
          ...(location !== undefined && { location }),
          ...(timezone !== undefined && { timezone }),
        },
        create: {
          userId,
          bio: bio ?? null,
          location: location ?? null,
          timezone: timezone ?? "Asia/Kolkata",
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
