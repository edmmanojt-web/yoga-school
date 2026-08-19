import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createPostSchema } from "@/validations";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);
    const skip = (page - 1) * limit;

    // Public and community posts are visible to authenticated users;
    // only public posts are visible to unauthenticated visitors
    const visibilityFilter = session?.user
      ? { visibility: { in: ["PUBLIC", "COMMUNITY"] as ("PUBLIC" | "COMMUNITY")[] } }
      : { visibility: "PUBLIC" as const };

    const [posts, total] = await Promise.all([
      db.communityPost.findMany({
        where: visibilityFilter,
        include: {
          user: { select: { name: true, id: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.communityPost.count({ where: visibilityFilter }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id as string;
    const { title, content, visibility, tags } = parsed.data;

    const post = await db.communityPost.create({
      data: {
        userId,
        title: title ?? null,
        content,
        visibility,
        tags,
      },
      include: {
        user: { select: { name: true, id: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
