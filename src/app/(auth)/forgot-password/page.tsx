"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema, type LoginInput } from "@/validations";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

type ForgotInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotInput) {
    // In a real implementation, call an API endpoint to send reset email
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-md text-center">
          <CheckCircle size={40} className="text-sage-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="font-heading text-charcoal-700 text-2xl mb-2">Check your email</h1>
          <p className="text-muted-foreground text-sm">
            If an account exists with that email address, you'll receive a
            password reset link shortly.
          </p>
          <Link href="/login" className="block mt-6">
            <Button variant="outline" className="w-full">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-3xl border border-border p-8 shadow-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl mb-4" aria-label="Home">
            🌿
          </Link>
          <h1 className="font-heading text-charcoal-700 text-2xl">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your email address and we'll send a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            Send reset link
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/login" className="text-forest hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
