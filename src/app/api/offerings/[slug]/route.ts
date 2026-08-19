import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const offering = await db.offering.findUnique({
      where: { slug, published: true },
    });

    if (!offering) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: offering });
  } catch (error) {
    console.error("Get offering by slug error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
