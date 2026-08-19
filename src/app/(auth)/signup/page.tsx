"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { signupSchema, type SignupInput } from "@/validations";
import { CheckCircle } from "lucide-react";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
];

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema) as Resolver<SignupInput>,
    defaultValues: { preferredLanguage: "en" },
  });

  async function onSubmit(data: SignupInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Auto sign-in after successful signup
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // Account created but sign-in failed — redirect to login
        router.push("/login");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-3xl border border-border p-8 shadow-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl mb-4" aria-label="Home">
            🌿
          </Link>
          <h1 className="font-heading text-charcoal-700 text-2xl">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Free to join. Start the 7-Day Journey or book a class.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
          aria-label="Sign up form"
        >
          <Input
            label="Your name"
            type="text"
            autoComplete="name"
            required
            placeholder="[Your name]"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            hint="At least 8 characters, one uppercase letter and one number"
            error={errors.password?.message}
            {...register("password")}
          />

          <Select
            label="Preferred language"
            options={languageOptions}
            error={errors.preferredLanguage?.message}
            {...register("preferredLanguage")}
          />

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
            Create account
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-forest font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
