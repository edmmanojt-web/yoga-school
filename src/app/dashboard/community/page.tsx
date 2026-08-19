import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NewPostForm } from "@/components/community/new-post-form";
import { CommunityFeed } from "@/components/community/community-feed";

export default async function DashboardCommunityPage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  // Fetch community and user's own private posts
  const posts = await db.communityPost.findMany({
    where: {
      OR: [
        { visibility: { in: ["PUBLIC", "COMMUNITY"] } },
        { userId },
      ],
    },
    include: {
      user: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const serialized = posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl">Community</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Share observations, ask questions, and learn from each other&apos;s practice.
        </p>
      </div>

      <CommunityFeed initialPosts={serialized} currentUserId={userId} />
    </div>
  );
}
