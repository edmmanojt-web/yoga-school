"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offeringSchema, type OfferingInput } from "@/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categoryOptions = [
  { value: "YOGA", label: "Yoga" },
  { value: "BREATHWORK", label: "Breathwork" },
  { value: "MINDFULNESS", label: "Mindfulness" },
  { value: "MEDITATION", label: "Meditation" },
  { value: "JOURNEY", label: "Journey" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "PROGRAM", label: "Program" },
  { value: "RETREAT", label: "Retreat" },
  { value: "COMMUNITY", label: "Community" },
];

const modeOptions = [
  { value: "ONLINE", label: "Online" },
  { value: "OFFLINE", label: "In-Person" },
  { value: "HYBRID", label: "Online & In-Person" },
];

interface OfferingFormProps {
  defaultValues?: Partial<OfferingInput>;
  offeringId?: string;
}

export function OfferingForm({ defaultValues, offeringId }: OfferingFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = !!offeringId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OfferingInput>({
    defaultValues: {
      mode: "HYBRID",
      featured: false,
      published: false,
      ...defaultValues,
    },
  });

  // Auto-generate slug from title
  const title = watch("title");
  function handleTitleBlur() {
    if (!isEditing && title && !watch("slug")) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setValue("slug", slug);
    }
  }

  async function onSubmit(data: OfferingInput) {
    setServerError(null);
    const url = isEditing ? `/api/admin/offerings/${offeringId}` : "/api/admin/offerings";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong.");
        return;
      }

      router.push("/admin/offerings");
      router.refresh();
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl" noValidate>
      {serverError && (
        <div
          role="alert"
          className="bg-terracotta/10 text-terracotta text-sm px-4 py-3 rounded-xl border border-terracotta/20"
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Title"
            required
            placeholder="e.g. Morning Yoga Flow"
            error={errors.title?.message}
            {...register("title", { onBlur: handleTitleBlur })}
          />
        </div>
        <Input
          label="Slug"
          required
          placeholder="e.g. morning-yoga-flow"
          hint="URL-friendly identifier. Auto-generated from title."
          error={errors.slug?.message}
          {...register("slug")}
        />
        <Select
          label="Category"
          required
          options={categoryOptions}
          error={errors.category?.message}
          {...register("category")}
        />
      </div>

      <Input
        label="Short description"
        required
        placeholder="One or two sentences for cards and previews (max 300 chars)"
        error={errors.shortDescription?.message}
        {...register("shortDescription")}
      />

      <Textarea
        label="Full description"
        required
        rows={6}
        placeholder="Detailed description shown on the offering page…"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Mode"
          required
          options={modeOptions}
          error={errors.mode?.message}
          {...register("mode")}
        />
        <Input
          label="Level"
          placeholder="e.g. All levels, Beginner, Intermediate"
          error={errors.level?.message}
          {...register("level")}
        />
        <Input
          label="Duration (minutes)"
          type="number"
          placeholder="e.g. 60"
          error={errors.durationMinutes?.message}
          {...register("durationMinutes", { valueAsNumber: true })}
        />
        <Input
          label="Image URL"
          type="url"
          placeholder="https://…"
          error={errors.imageUrl?.message}
          {...register("imageUrl")}
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border accent-forest"
            {...register("featured")}
          />
          <span className="text-sm text-charcoal-600">Featured offering</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border accent-forest"
            {...register("published")}
          />
          <span className="text-sm text-charcoal-600">Published (visible to users)</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create offering"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
