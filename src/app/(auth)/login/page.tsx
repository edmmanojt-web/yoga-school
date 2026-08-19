"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginInput } from "@/validations";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Incorrect email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-3xl border border-border p-8 shadow-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl mb-4" aria-label="Home">
            🌿
          </Link>
          <h1 className="font-heading text-charcoal-700 text-2xl">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
          aria-label="Sign in form"
        >
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-sage-600 hover:text-forest transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {serverError && (
            <p className="text-sm text-red-600 text-center" role="alert">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-forest font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
