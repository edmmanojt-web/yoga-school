"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profileUpdateSchema, type ProfileUpdateInput } from "@/validations";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

type ProfileInput = z.infer<typeof profileUpdateSchema>;

interface ProfileFormProps {
  user: {
    name?: string | null;
    email: string;
    phone?: string | null;
    profile?: {
      bio?: string | null;
      location?: string | null;
      timezone?: string | null;
    } | null;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name ?? "",
      bio: user.profile?.bio ?? "",
      location: user.profile?.location ?? "",
      timezone: user.profile?.timezone ?? "Asia/Kolkata",
      phone: user.phone ?? "",
    },
  });

  async function onSubmit(data: ProfileInput) {
    setServerError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Something went wrong.");
        return;
      }

      setSaved(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg" noValidate>
      <Input
        label="Full name"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

      <div>
        <label className="block text-sm font-medium text-charcoal-600 mb-1.5">
          Email address
        </label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground cursor-not-allowed"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="text-xs text-muted-foreground mt-1">
          Email cannot be changed yet.
        </p>
      </div>

      <Input
        label="Phone / WhatsApp"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Textarea
        label="Bio"
        placeholder="A short note about yourself (optional)"
        hint="Shown on your community profile if you choose to participate."
        rows={3}
        error={errors.bio?.message}
        {...register("bio")}
      />

      <Input
        label="Location"
        placeholder="City, Country"
        error={errors.location?.message}
        {...register("location")}
      />

      {serverError && (
        <p className="text-sm text-red-600" role="alert">{serverError}</p>
      )}

      {saved && (
        <div
          className="flex items-center gap-2 text-sage-600 text-sm"
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={15} aria-hidden="true" />
          Profile saved.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={!isDirty}
      >
        Save changes
      </Button>
    </form>
  );
}
