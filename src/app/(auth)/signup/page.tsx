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
import { siteConfig } from "@/config/site";
import { NagaInfinityMark } from "@/components/ui/logo";
import { CheckCircle } from "lucide-react";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  function handleGoogleSignIn() {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: redirect });
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-3xl border border-border p-8 shadow-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-4" aria-label="Home">
            <NagaInfinityMark size={36} />
            <span className="font-heading italic tracking-[0.1em] text-xl" style={{ color: "#6B4A2A" }}>{siteConfig.name}</span>
          </Link>
          <h1 className="font-heading text-2xl" style={{ color: "#231E1A" }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "#7B6B5B" }}>
            Free to join. Start the 7-Day Journey or book a class.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#F6EFE6] disabled:opacity-60"
          style={{ borderColor: "#E4D8C8", color: "#3E3530", background: "#FEFCF9" }}
          aria-label="Sign up with Google"
        >
          <GoogleIcon />
          {googleLoading ? "Redirecting…" : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "#E4D8C8" }} />
          <span className="text-xs" style={{ color: "#B0A090" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "#E4D8C8" }} />
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

          <p className="text-xs text-center" style={{ color: "#7B6B5B" }}>
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#7B6B5B" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-medium hover:underline" style={{ color: "#6B4A2A" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
