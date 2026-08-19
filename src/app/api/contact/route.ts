import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/validations";
import { db } from "@/lib/db";
import { sendEmail, contactAcknowledgementEmail } from "@/lib/email";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = (session?.user as any)?.id ?? null;

    const data = parsed.data;

    await db.contactSubmission.create({
      data: {
        userId,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        interest: data.interest,
        preferredLanguage: data.preferredLanguage ?? null,
        message: data.message,
      },
    });

    // Acknowledge to user (non-blocking)
    sendEmail({
      to: data.email,
      ...contactAcknowledgementEmail(data.name),
    }).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Thank you. We'll be in touch soon." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
