"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { NagaInfinityMark } from "@/components/ui/logo";
import { CheckCircle } from "lucide-react";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetInput = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
  });

  if (!token || !email) {
    return (
      <Card variant="elevated" className="w-full max-w-sm">
        <CardContent className="p-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-4" aria-label={siteConfig.name}>
            <NagaInfinityMark size={36} />
            <span className="font-heading italic tracking-[0.1em] text-xl" style={{ color: "#6B4A2A" }}>{siteConfig.name}</span>
          </Link>
          <p className="text-charcoal-600 mb-4">This reset link is invalid or has expired.</p>
          <Link href="/forgot-password">
            <Button variant="outline" size="sm">Request a new link</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (done) {
    return (
      <Card variant="elevated" className="w-full max-w-sm">
        <CardContent className="p-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-4" aria-label={siteConfig.name}>
            <NagaInfinityMark size={36} />
            <span className="font-heading italic tracking-[0.1em] text-xl" style={{ color: "#6B4A2A" }}>{siteConfig.name}</span>
          </Link>
          <CheckCircle size={32} className="text-sage-500 mx-auto mb-3" aria-hidden="true" />
          <h1 className="font-heading text-charcoal-700 text-xl mb-2">Password updated</h1>
          <p className="text-sm text-charcoal-500 mb-6">
            Your password has been reset. You can now sign in.
          </p>
          <Link href="/login">
            <Button variant="primary" className="w-full">Sign in</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  async function onSubmit(data: ResetInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password: data.password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <Card variant="elevated" className="w-full max-w-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2" aria-label={siteConfig.name}>
            <NagaInfinityMark size={36} />
            <span className="font-heading italic tracking-[0.1em] text-xl" style={{ color: "#6B4A2A" }}>{siteConfig.name}</span>
          </Link>
          <h1 className="font-heading text-charcoal-700 text-2xl mt-4 mb-2">
            Reset password
          </h1>
          <p className="text-sm text-charcoal-500">Choose a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {serverError && (
            <div role="alert" className="bg-terracotta/10 text-terracotta text-sm px-4 py-3 rounded-xl border border-terracotta/20">
              {serverError}
            </div>
          )}
          <Input
            label="New password"
            type="password"
            required
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirm new password"
            type="password"
            required
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Resetting…" : "Reset password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
