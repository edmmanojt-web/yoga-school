"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { sessionSchema, type SessionInput } from "@/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const modeOptions = [
  { value: "ONLINE", label: "Online" },
  { value: "OFFLINE", label: "In-Person" },
  { value: "HYBRID", label: "Online & In-Person" },
];

interface Offering {
  id: string;
  title: string;
  category: string;
}

interface Teacher {
  id: string;
  name: string;
}

interface SessionFormProps {
  offerings: Offering[];
  teachers: Teacher[];
  defaultValues?: Partial<SessionInput>;
  sessionId?: string;
}

export function SessionForm({ offerings, teachers, defaultValues, sessionId }: SessionFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditing = !!sessionId;

  const offeringOptions = offerings.map((o) => ({
    value: o.id,
    label: `${o.title} (${o.category})`,
  }));

  const teacherOptions = [
    { value: "", label: "No teacher assigned" },
    ...teachers.map((t) => ({ value: t.id, label: t.name })),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SessionInput>({
    defaultValues: {
      mode: "ONLINE",
      capacity: 20,
      ...defaultValues,
    },
  });

  async function onSubmit(data: SessionInput) {
    setServerError(null);
    const url = isEditing ? `/api/admin/sessions/${sessionId}` : "/api/admin/sessions";
    const method = isEditing ? "PATCH" : "POST";

    // Strip empty teacherId
    const payload = {
      ...data,
      teacherId: data.teacherId || undefined,
      location: data.location || undefined,
      meetingUrl: data.meetingUrl || undefined,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong.");
        return;
      }

      router.push("/admin/sessions");
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
          <Select
            label="Offering"
            required
            options={offeringOptions}
            placeholder="Select an offering"
            error={errors.offeringId?.message}
            {...register("offeringId")}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Session title"
            required
            placeholder="e.g. Wednesday Morning Yoga"
            error={errors.title?.message}
            {...register("title")}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Description"
            rows={3}
            placeholder="Optional session-specific description…"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Start time"
          type="datetime-local"
          required
          error={errors.startTime?.message}
          {...register("startTime")}
        />
        <Input
          label="End time"
          type="datetime-local"
          required
          error={errors.endTime?.message}
          {...register("endTime")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Mode"
          required
          options={modeOptions}
          error={errors.mode?.message}
          {...register("mode")}
        />
        <Input
          label="Capacity"
          type="number"
          required
          min={1}
          max={500}
          error={errors.capacity?.message}
          {...register("capacity", { valueAsNumber: true })}
        />
        <Select
          label="Teacher"
          options={teacherOptions}
          error={errors.teacherId?.message}
          {...register("teacherId")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="e.g. Pune Studio, Room 2"
          hint="For in-person or hybrid sessions"
          error={errors.location?.message}
          {...register("location")}
        />
        <Input
          label="Meeting URL"
          type="url"
          placeholder="https://zoom.us/j/…"
          hint="For online or hybrid sessions"
          error={errors.meetingUrl?.message}
          {...register("meetingUrl")}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Save changes" : "Create session"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
