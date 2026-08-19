"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/validations";
import { contactInterests } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "lucide-react";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
];

const interestOptions = contactInterests.map((i) => ({ value: i, label: i }));

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      trackEvent("contact_submitted", { interest: data.interest });
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div
        className="text-center py-12"
        role="status"
        aria-live="polite"
        aria-label="Form submitted successfully"
      >
        <CheckCircle size={40} className="text-sage-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="font-heading text-charcoal-700 text-2xl mb-2">
          Thank you for reaching out.
        </h3>
        <p className="text-charcoal-500">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Your name"
          placeholder="[Your name]"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="[Your email]"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Input
        label="Phone / WhatsApp"
        type="tel"
        placeholder="[Phone number]"
        autoComplete="tel"
        error={errors.phone?.message}
        hint="Optional — WhatsApp preferred"
        {...register("phone")}
      />

      <Select
        label="I'm interested in"
        placeholder="Select an interest"
        options={interestOptions}
        required
        error={errors.interest?.message}
        {...register("interest")}
      />

      <Select
        label="Preferred language"
        placeholder="Select language"
        options={languageOptions}
        error={errors.preferredLanguage?.message}
        {...register("preferredLanguage")}
      />

      <Textarea
        label="Message"
        placeholder="Tell us a little about what you're looking for..."
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      {serverError && (
        <p className="text-sm text-red-600" role="alert">
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
        Send message
      </Button>
    </form>
  );
}
