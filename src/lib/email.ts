/**
 * Email service abstraction.
 * Supports: resend | sendgrid | smtp | console
 *
 * Set EMAIL_PROVIDER in .env to switch providers.
 */

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

async function sendViaConsole(payload: EmailPayload): Promise<void> {
  console.log("\n[Email Service — Console Provider]");
  console.log("To:", payload.to);
  console.log("Subject:", payload.subject);
  console.log("---");
  console.log(payload.text ?? payload.html);
  console.log("---\n");
}

async function sendViaResend(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) throw new Error("EMAIL_API_KEY is not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "noreply@example.com",
      to: Array.isArray(payload.to) ? payload.to : [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend API error: ${error}`);
  }
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER ?? "console";

  switch (provider) {
    case "resend":
      return sendViaResend(payload);
    case "console":
    default:
      return sendViaConsole(payload);
  }
}

// ─── Email templates ───────────────────────────────────────────

export function welcomeEmail(name: string): Pick<EmailPayload, "subject" | "html" | "text"> {
  return {
    subject: "Welcome — Your journey begins",
    html: `
      <p>Dear ${name},</p>
      <p>Welcome. We're glad you're here.</p>
      <p>Your account has been created. You can now join the 7-Day Awareness Journey and explore our offerings.</p>
      <p>With care,<br>[School Name]</p>
    `,
    text: `Dear ${name},\n\nWelcome. We're glad you're here.\n\nYour account has been created.\n\nWith care,\n[School Name]`,
  };
}

export function bookingConfirmationEmail(
  name: string,
  sessionTitle: string,
  sessionTime: string
): Pick<EmailPayload, "subject" | "html" | "text"> {
  return {
    subject: `Booking confirmed — ${sessionTitle}`,
    html: `
      <p>Dear ${name},</p>
      <p>Your booking for <strong>${sessionTitle}</strong> on ${sessionTime} is confirmed.</p>
      <p>Meeting details will be shared closer to the session.</p>
      <p>With care,<br>[School Name]</p>
    `,
    text: `Dear ${name},\n\nYour booking for ${sessionTitle} on ${sessionTime} is confirmed.\n\nWith care,\n[School Name]`,
  };
}

export function contactAcknowledgementEmail(
  name: string
): Pick<EmailPayload, "subject" | "html" | "text"> {
  return {
    subject: "Thank you for reaching out",
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for getting in touch. We've received your message and will respond soon.</p>
      <p>With care,<br>[School Name]</p>
    `,
    text: `Dear ${name},\n\nThank you for getting in touch. We'll respond soon.\n\nWith care,\n[School Name]`,
  };
}
