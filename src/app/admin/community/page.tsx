import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function AdminCommunityPage() {
  const [posts, comments] = await Promise.all([
    db.communityPost.findMany({
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.communityComment.findMany({
      include: {
        user: { select: { name: true } },
        post: { select: { title: true, id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  const publicPosts = posts.filter((p) => p.visibility === "PUBLIC" || p.visibility === "COMMUNITY");
  const privatePosts = posts.filter((p) => p.visibility === "PRIVATE");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-charcoal-700 text-2xl">Community</h1>
        <div className="flex items-center gap-4 text-sm text-charcoal-500">
          <span><strong className="text-charcoal-700">{posts.length}</strong> posts</span>
          <span><strong className="text-charcoal-700">{comments.length}</strong> recent comments</span>
        </div>
      </div>

      {/* Posts */}
      <section aria-labelledby="community-posts">
        <h2 id="community-posts" className="font-heading text-lg text-charcoal-700 mb-4">
          Recent posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground bg-white rounded-2xl border border-border">
            No community posts yet.
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {post.title && (
                      <h3 className="font-medium text-charcoal-700 mb-1">{post.title}</h3>
                    )}
                    <p className="text-sm text-charcoal-500 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{post.user.name ?? post.user.email}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                      <span>{post._count.comments} comment{post._count.comments !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={
                        post.visibility === "PUBLIC"
                          ? "forest"
                          : post.visibility === "COMMUNITY"
                          ? "sage"
                          : "default"
                      }
                    >
                      {post.visibility}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent comments */}
      {comments.length > 0 && (
        <section aria-labelledby="recent-comments">
          <h2 id="recent-comments" className="font-heading text-lg text-charcoal-700 mb-4">
            Recent comments
          </h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm" aria-label="Recent comments">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-charcoal-600">Author</th>
                  <th className="text-left px-4 py-3 font-medium text-charcoal-600">Comment</th>
                  <th className="text-left px-4 py-3 font-medium text-charcoal-600">On post</th>
                  <th className="text-left px-4 py-3 font-medium text-charcoal-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-charcoal-700 font-medium">
                      {comment.user.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-charcoal-500 max-w-xs">
                      <p className="line-clamp-1">{comment.content}</p>
                    </td>
                    <td className="px-4 py-3 text-charcoal-500 text-xs">
                      {comment.post.title ?? "Untitled"}
                    </td>
                    <td className="px-4 py-3 text-charcoal-500 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
