"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createReflectionSchema, type CreateReflectionInput } from "@/validations";
import { Lock, Globe, CheckCircle } from "lucide-react";

interface ReflectionFormProps {
  dayId: string;
  existingReflection?: { id: string; content: string; isPrivate: boolean } | null;
  onSaved?: () => void;
}

export function ReflectionForm({ dayId, existingReflection, onSaved }: ReflectionFormProps) {
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(
    existingReflection?.isPrivate ?? true
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReflectionInput>({
    resolver: zodResolver(createReflectionSchema) as Resolver<CreateReflectionInput>,
    defaultValues: {
      dayId,
      content: existingReflection?.content ?? "",
      isPrivate: true,
    },
  });

  async function onSubmit(data: CreateReflectionInput) {
    setServerError(null);
    const url = existingReflection
      ? `/api/reflections/${existingReflection.id}`
      : "/api/reflections";
    const method = existingReflection ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, isPrivate }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Something went wrong.");
        return;
      }

      setSaved(true);
      if (onSaved) onSaved();
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (saved) {
    return (
      <Card variant="outlined">
        <CardContent className="p-6 text-center" role="status" aria-live="polite">
          <CheckCircle size={24} className="text-sage-500 mx-auto mb-2" aria-hidden="true" />
          <p className="text-sm text-charcoal-600">Reflection saved.</p>
          {isPrivate && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Lock size={11} aria-hidden="true" />
              Private — only visible to you
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent className="p-6">
        <h3 className="font-heading text-charcoal-700 text-lg mb-1">
          Write a reflection
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          Optional. What did you notice? Write as much or as little as you want.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Textarea
            placeholder="What came up for you today?"
            rows={5}
            error={errors.content?.message}
            aria-label="Your reflection"
            {...register("content")}
          />

          {/* Privacy toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPrivate(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                isPrivate
                  ? "bg-forest text-ivory border-forest"
                  : "bg-white text-charcoal-500 border-border hover:bg-muted"
              }`}
              aria-pressed={isPrivate}
            >
              <Lock size={11} aria-hidden="true" />
              Private
            </button>
            <button
              type="button"
              onClick={() => setIsPrivate(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                !isPrivate
                  ? "bg-sage-500 text-ivory border-sage-500"
                  : "bg-white text-charcoal-500 border-border hover:bg-muted"
              }`}
              aria-pressed={!isPrivate}
            >
              <Globe size={11} aria-hidden="true" />
              Share with community
            </button>
          </div>

          {isPrivate && (
            <p className="text-xs text-muted-foreground">
              Private reflections are only visible to you — never to other participants.
            </p>
          )}

          {serverError && (
            <p className="text-sm text-red-600" role="alert">{serverError}</p>
          )}

          <Button type="submit" variant="primary" loading={isSubmitting}>
            Save reflection
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
