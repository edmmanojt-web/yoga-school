import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildGuideReply } from "@/lib/guide/engine";

const externalGuideUrl = process.env.GUIDE_AGENT_URL?.trim().replace(/\/$/, "") ?? "";

const guideRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().min(1).max(4000),
      })
    )
    .max(20)
    .optional(),
  lastCards: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(["session", "offering", "retreat", "program", "faq"]),
        title: z.string(),
        eyebrow: z.string().optional(),
        description: z.string().optional(),
        meta: z.array(z.string()).optional(),
        href: z.string().optional(),
        ctaLabel: z.string().optional(),
      })
    )
    .max(8)
    .optional(),
  currentPath: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = guideRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid guide request." }, { status: 400 });
    }

    const reply = externalGuideUrl
      ? await fetchExternalGuideReply(parsed.data)
      : await buildGuideReply(parsed.data);

    return NextResponse.json({ success: true, data: reply });
  } catch {
    return NextResponse.json(
      {
        success: true,
        data: {
          answer:
            "I could not prepare a reliable answer right now, so I would recommend checking the schedule or contacting the school directly.",
          intent: "fallback",
          cards: [],
          ctas: [
            { id: "schedule", label: "View Schedule", href: "/schedule", kind: "primary" },
            { id: "contact", label: "Contact the School", href: "/contact", kind: "secondary" },
          ],
          handoff: true,
          sourceNote: "The guide could not access its knowledge sources for this request.",
        },
      },
      { status: 200 }
    );
  }
}

async function fetchExternalGuideReply(payload: z.infer<typeof guideRequestSchema>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${externalGuideUrl}/api/guide`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("External guide request failed");
    }

    const data = await response.json();

    if (!data || typeof data !== "object" || !("answer" in data)) {
      throw new Error("External guide payload invalid");
    }

    return data;
  } catch {
    return buildGuideReply(payload);
  } finally {
    clearTimeout(timeout);
  }
}