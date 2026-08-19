"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, type CreatePostInput } from "@/validations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const visibilityOptions = [
  { value: "COMMUNITY", label: "Share with community" },
  { value: "PRIVATE", label: "Keep private (just for me)" },
];

interface NewPostFormProps {
  onCreated: (post: any) => void;
}

export function NewPostForm({ onCreated }: NewPostFormProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostInput>({
    defaultValues: { visibility: "COMMUNITY", tags: [] },
  });

  async function onSubmit(data: CreatePostInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(json.error ?? "Failed to post.");
        return;
      }
      reset();
      setOpen(false);
      onCreated(json);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-white rounded-2xl border border-border p-4 text-sm text-charcoal-500 hover:border-sage-300 hover:text-charcoal-700 transition-colors"
        aria-label="Write a post"
      >
        Share an observation or reflection…
      </button>
    );
  }

  return (
    <Card variant="elevated">
      <CardContent className="p-5">
        <h3 className="font-heading text-charcoal-700 mb-4">New post</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {serverError && (
            <p role="alert" className="text-sm text-terracotta">{serverError}</p>
          )}
          <Input
            label="Title (optional)"
            placeholder="Give your post a title…"
            error={errors.title?.message}
            {...register("title")}
          />
          <Textarea
            label="Content"
            required
            rows={4}
            placeholder="What did you notice? What came up?"
            error={errors.content?.message}
            {...register("content")}
          />
          <Select
            label="Visibility"
            options={visibilityOptions}
            error={errors.visibility?.message}
            {...register("visibility")}
          />
          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Posting…" : "Post"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => { reset(); setOpen(false); }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
