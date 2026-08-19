"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NewPostForm } from "./new-post-form";
import { MessageSquare, Lock, Globe, Users } from "lucide-react";

interface PostData {
  id: string;
  title: string | null;
  content: string;
  visibility: string;
  createdAt: string;
  user: { id: string; name: string | null };
  _count: { comments: number };
}

const visibilityIcon: Record<string, React.ReactNode> = {
  PRIVATE: <Lock size={11} aria-label="Private" />,
  COMMUNITY: <Users size={11} aria-label="Community" />,
  PUBLIC: <Globe size={11} aria-label="Public" />,
};

const visibilityBadge: Record<string, "default" | "sage" | "forest"> = {
  PRIVATE: "default",
  COMMUNITY: "sage",
  PUBLIC: "forest",
};

interface CommunityFeedProps {
  initialPosts: PostData[];
  currentUserId: string;
}

export function CommunityFeed({ initialPosts, currentUserId }: CommunityFeedProps) {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);

  function handleCreated(post: any) {
    const serialized = {
      ...post,
      createdAt: typeof post.createdAt === "string" ? post.createdAt : new Date(post.createdAt).toISOString(),
      updatedAt: typeof post.updatedAt === "string" ? post.updatedAt : new Date(post.updatedAt).toISOString(),
    };
    setPosts((prev) => [serialized, ...prev]);
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/community/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // silently fail
    }
  }

  return (
    <div className="space-y-4">
      <NewPostForm onCreated={handleCreated} />

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <MessageSquare size={32} className="text-muted-foreground mx-auto mb-4" aria-hidden="true" />
          <p className="text-charcoal-500 mb-1">No posts yet.</p>
          <p className="text-sm text-muted-foreground">
            Be the first to share an observation.
          </p>
        </div>
      ) : (
        <div
          className="space-y-4"
          role="feed"
          aria-label="Community posts"
          aria-busy="false"
        >
          {posts.map((post) => {
            const isOwn = post.user.id === currentUserId;
            const date = new Date(post.createdAt);
            const formattedDate = date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <Card key={post.id} variant="outlined">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-charcoal-700">
                        {isOwn ? "You" : (post.user.name ?? "Anonymous")}
                      </span>
                      <span className="text-xs text-muted-foreground">{formattedDate}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {visibilityIcon[post.visibility]}
                        <Badge variant={visibilityBadge[post.visibility] ?? "default"} className="text-xs py-0">
                          {post.visibility}
                        </Badge>
                      </span>
                    </div>
                    {isOwn && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-xs text-muted-foreground hover:text-terracotta transition-colors flex-shrink-0"
                        aria-label="Delete post"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {post.title && (
                    <h3 className="font-heading text-charcoal-700 mb-2">{post.title}</h3>
                  )}
                  <p className="text-sm text-charcoal-600 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {post._count.comments > 0 && (
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <MessageSquare size={11} aria-hidden="true" />
                      {post._count.comments} comment{post._count.comments !== 1 ? "s" : ""}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
