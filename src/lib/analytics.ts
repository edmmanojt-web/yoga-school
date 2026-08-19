/**
 * Analytics abstraction layer.
 * Swap out the provider in .env without changing call sites.
 *
 * Supported providers: posthog | gtag | none
 */

export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_clicked"
  | "offering_viewed"
  | "journey_viewed"
  | "journey_started"
  | "language_selected"
  | "day_started"
  | "day_completed"
  | "poll_viewed"
  | "poll_answered"
  | "reflection_started"
  | "reflection_completed"
  | "community_viewed"
  | "community_join_clicked"
  | "session_viewed"
  | "booking_started"
  | "booking_completed"
  | "contact_submitted"
  | "journey_completed"
  | "final_cta_clicked";

type Properties = Record<string, string | number | boolean | null | undefined>;

function getProvider() {
  return process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";
}

export function trackEvent(name: AnalyticsEvent, properties?: Properties): void {
  if (typeof window === "undefined") return;

  const provider = getProvider();

  if (provider === "gtag" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, properties);
    return;
  }

  if (provider === "posthog" && typeof (window as any).posthog !== "undefined") {
    (window as any).posthog.capture(name, properties);
    return;
  }

  // Development fallback — log to console
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, properties);
  }
}

export function identifyUser(userId: string, traits?: Properties): void {
  if (typeof window === "undefined") return;

  const provider = getProvider();

  if (provider === "posthog" && typeof (window as any).posthog !== "undefined") {
    (window as any).posthog.identify(userId, traits);
  }
}
