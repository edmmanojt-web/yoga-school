import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published") !== "false";
    const featured = searchParams.get("featured");

    const offerings = await db.offering.findMany({
      where: {
        published,
        ...(category && { category: category as any }),
        ...(featured === "true" && { featured: true }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        shortDescription: true,
        imageUrl: true,
        mode: true,
        level: true,
        durationMinutes: true,
        featured: true,
        sortOrder: true,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: offerings });
  } catch (error) {
    console.error("Get offerings error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
