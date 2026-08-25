"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Loader2,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NagaInfinityMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { getGuideHomeActions, type GuideAction, type GuideCard, type GuideMessageInput } from "@/lib/guide/engine";

type GuideMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  cards?: GuideCard[];
  ctas?: GuideAction[];
  sourceNote?: string;
  followUpQuestion?: string;
};

const initialMessage: GuideMessage = {
  id: "welcome",
  role: "assistant",
  text:
    "Welcome. What would you like to explore? I can help with classes, the 7-day journey, workshops, retreats, and the school's approach using the site's current content.",
  ctas: getGuideHomeActions().map((item, index) => ({
    id: `home-${index}`,
    label: item.label,
    kind: index === 0 ? "primary" : "secondary",
    query: item.query,
  })),
  sourceNote: "Website-first guide",
};

export function YogaGuide() {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const messageIdRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<GuideMessage[]>([initialMessage]);
  const [lastCards, setLastCards] = useState<GuideCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const visibleMessages = useMemo(() => messages, [messages]);

  useEffect(() => {
    if (!open) return;

    const current = scrollerRef.current;
    if (!current) return;

    current.scrollTo({
      top: current.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [open, visibleMessages, prefersReducedMotion]);

  function logGuideEvent(event: string, properties?: Record<string, unknown>) {
    fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        page: pathname,
        properties,
      }),
    }).catch(() => {});
  }

  function openGuide() {
    setOpen(true);
    logGuideEvent("guide_opened", { path: pathname });
  }

  function closeGuide() {
    setOpen(false);
  }

  function nextMessageId(prefix: string) {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  }

  function submitMessage(nextMessage: string) {
    const trimmed = nextMessage.trim();
    if (!trimmed) return;

    const userMessage: GuideMessage = {
      id: nextMessageId("user"),
      role: "user",
      text: trimmed,
    };

    const priorMessages = messages;
    const nextMessages = [...priorMessages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    logGuideEvent("guide_message_sent", { prompt: trimmed.slice(0, 200) });

    startTransition(async () => {
      try {
        const history: GuideMessageInput[] = priorMessages
          .slice(-10)
          .map((item) => ({ role: item.role, text: item.text }));

        const response = await fetch("/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history,
            lastCards,
            currentPath: pathname,
          }),
        });

        const payload = await response.json();
        const data = payload?.data;

        if (!data?.answer) {
          throw new Error("Guide response missing");
        }

        const assistantMessage: GuideMessage = {
          id: nextMessageId("assistant"),
          role: "assistant",
          text: data.answer,
          cards: data.cards,
          ctas: data.ctas,
          sourceNote: data.sourceNote,
          followUpQuestion: data.followUpQuestion,
        };

        setMessages((current) => [...current, assistantMessage]);
        setLastCards(data.cards ?? []);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: nextMessageId("assistant-error"),
            role: "assistant",
            text:
              "I could not prepare a reliable answer right now. You can still view the schedule or contact the school directly.",
            ctas: [
              { id: "schedule", label: "View Schedule", href: "/schedule", kind: "primary" },
              { id: "contact", label: "Contact the School", href: "/contact", kind: "secondary" },
            ],
            sourceNote: "Guide fallback",
          },
        ]);
        setError("Guide unavailable");
      }
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  function handleAction(action: GuideAction) {
    logGuideEvent("guide_cta_clicked", { label: action.label, href: action.href ?? null, query: action.query ?? null });

    if (action.query) {
      submitMessage(action.query);
      return;
    }

    if (action.href) {
      router.push(action.href);
      return;
    }
  }

  function handleCard(card: GuideCard) {
    logGuideEvent("guide_card_clicked", { title: card.title, href: card.href ?? null, type: card.type });
    if (card.href) {
      router.push(card.href);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-40 bg-[rgba(35,30,26,0.28)] backdrop-blur-[2px]"
            onClick={closeGuide}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            className="fixed inset-x-3 bottom-3 top-20 z-50 md:inset-auto md:right-5 md:bottom-5 md:top-auto md:w-[430px] md:h-[680px]"
            aria-label="Yoga guide"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E4D8C8] bg-[#FEFCF9] shadow-[0_20px_70px_rgba(58,38,22,0.2)]">
              <div className="relative overflow-hidden border-b border-[#E4D8C8] bg-[linear-gradient(135deg,#FBF7F2_0%,#F2E8DA_100%)] px-5 pb-4 pt-5">
                <div
                  className="absolute right-0 top-0 h-32 w-32 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(200,145,58,0.12) 0%, transparent 72%)" }}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEFCF9] shadow-[0_8px_24px_rgba(107,74,42,0.08)]">
                      <NagaInfinityMark size={26} />
                    </div>
                    <div>
                      <p className="font-heading text-[1.25rem] italic text-[#231E1A] leading-none">Yoga Guide</p>
                      <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#B87D3B]">
                        Website-first concierge
                      </p>
                      <p className="mt-2 max-w-[270px] text-sm leading-relaxed text-[#7B6B5B]">
                        Ask about classes, retreats, programs, or how to begin.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeGuide}
                    className="rounded-full p-2 text-[#6B4A2A] transition-colors hover:bg-[#FEFCF9]"
                    aria-label="Close guide"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div ref={scrollerRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {visibleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn("max-w-[92%]", message.role === "assistant" ? "space-y-3" : "space-y-2")}>
                      <div
                        className={cn(
                          "rounded-[22px] px-4 py-3 text-sm leading-relaxed",
                          message.role === "user"
                            ? "bg-[#6B4A2A] text-[#FBF7F2]"
                            : "border border-[#E4D8C8] bg-[#FBF7F2] text-[#3E3530]"
                        )}
                      >
                        {message.text.split("\n").map((line, index) => (
                          <p key={`${message.id}-${index}`} className={index > 0 ? "mt-3" : undefined}>
                            {line}
                          </p>
                        ))}
                        {message.followUpQuestion && (
                          <p className="mt-3 text-[#6B4A2A]">{message.followUpQuestion}</p>
                        )}
                      </div>

                      {message.cards && message.cards.length > 0 && (
                        <div className="space-y-3">
                          {message.cards.map((card) => (
                            <Card
                              key={card.id}
                              variant="elevated"
                              className="cursor-pointer bg-[#FEFCF9]"
                              onClick={() => handleCard(card)}
                            >
                              <CardContent className="p-4">
                                {card.eyebrow && (
                                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#B87D3B]">
                                    {card.eyebrow}
                                  </p>
                                )}
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h3 className="font-heading text-[1.1rem] leading-snug text-[#231E1A]">
                                      {card.title}
                                    </h3>
                                    {card.description && (
                                      <p className="mt-1.5 text-sm leading-relaxed text-[#7B6B5B]">
                                        {card.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowUpRight size={15} className="mt-1 flex-shrink-0 text-[#C8913A]" />
                                </div>
                                {card.meta && card.meta.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {card.meta.map((item) => (
                                      <span
                                        key={item}
                                        className="rounded-full border border-[#E4D8C8] bg-[#FBF7F2] px-2.5 py-1 text-[0.68rem] text-[#6B4A2A]"
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {card.ctaLabel && (
                                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[#B87D3B]">
                                    <CalendarDays size={12} />
                                    {card.ctaLabel}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {message.ctas && message.ctas.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {message.ctas.map((cta) => (
                            <button
                              key={cta.id}
                              type="button"
                              onClick={() => handleAction(cta)}
                              className={cn(
                                "whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                                cta.kind === "primary"
                                  ? "border-[#6B4A2A] bg-[#6B4A2A] text-[#FBF7F2]"
                                  : "border-[#E4D8C8] bg-[#FBF7F2] text-[#6B4A2A] hover:bg-[#F6EFE6]"
                              )}
                            >
                              {cta.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {message.sourceNote && message.role === "assistant" && (
                        <p className="px-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#B0A090]">
                          {message.sourceNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {isPending && (
                  <div className="flex justify-start">
                    <div className="rounded-[22px] border border-[#E4D8C8] bg-[#FBF7F2] px-4 py-3 text-sm text-[#7B6B5B]">
                      <div className="flex items-center gap-2">
                        <Loader2 size={15} className="animate-spin text-[#C8913A]" />
                        Checking the site&apos;s current content...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-[#E4D8C8] bg-[#FEFCF9] px-4 pb-4 pt-3">
                {error && (
                  <p className="mb-2 text-xs text-[#B87D3B]">
                    {error}
                  </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label htmlFor="guide-input" className="sr-only">
                    Ask the yoga guide a question
                  </label>
                  <div className="flex items-end gap-2 rounded-[24px] border border-[#E4D8C8] bg-[#FBF7F2] p-2">
                    <textarea
                      id="guide-input"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask about classes, retreats, programs or your yoga journey..."
                      className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-[#3E3530] outline-none placeholder:text-[#B0A090]"
                      rows={1}
                    />
                    <Button type="submit" variant="accent" size="sm" disabled={isPending || !input.trim()}>
                      <Sparkles size={14} />
                      Ask
                    </Button>
                  </div>
                  <p className="px-1 text-[0.72rem] leading-relaxed text-[#B0A090]">
                    This guide answers from the site&apos;s current content and schedule. If something is missing, it will say so.
                  </p>
                </form>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!open && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={openGuide}
            className="group flex items-center gap-3 rounded-full border border-[#E4D8C8] bg-[#FEFCF9] px-4 py-3 shadow-[0_16px_40px_rgba(58,38,22,0.16)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(58,38,22,0.22)]"
            aria-label="Open yoga guide"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FBF7F2_0%,#F2E8DA_100%)]">
              <MessageCircle size={18} className="text-[#6B4A2A]" />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#B87D3B]">
                Yoga Guide
              </span>
              <span className="block text-sm text-[#3E3530]">Explore classes and programs</span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}