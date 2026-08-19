"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  sortOrder: number;
}

interface PollData {
  id: string;
  question: string;
  sortOrder: number;
  options: PollOption[];
  userResponse?: string | null;
}

interface PollSectionProps {
  polls: PollData[];
  journeyId: string;
  dayId: string;
  onAllAnswered?: () => void;
}

export function PollSection({ polls, journeyId, dayId, onAllAnswered }: PollSectionProps) {
  const [responses, setResponses] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    polls.forEach((p) => {
      if (p.userResponse) initial[p.id] = p.userResponse;
    });
    return initial;
  });
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Set<string>>(() => {
    const s = new Set<string>();
    polls.forEach((p) => { if (p.userResponse) s.add(p.id); });
    return s;
  });

  async function handleAnswer(pollId: string, optionId: string) {
    if (submitted.has(pollId)) return;
    setSubmitting(pollId);

    try {
      const res = await fetch("/api/polls/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId, optionId }),
      });

      if (res.ok) {
        setResponses((prev) => ({ ...prev, [pollId]: optionId }));
        const newSubmitted = new Set(submitted).add(pollId);
        setSubmitted(newSubmitted);

        if (newSubmitted.size === polls.length && onAllAnswered) {
          onAllAnswered();
        }
      }
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="space-y-6" aria-label="Reflection questions">
      {polls.map((poll, i) => (
        <Card key={poll.id} variant="outlined">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Question {i + 1} of {polls.length}
            </p>
            <p className="font-medium text-charcoal-700 mb-4">{poll.question}</p>
            <fieldset>
              <legend className="sr-only">{poll.question}</legend>
              <div className="space-y-2">
                {poll.options.map((option) => {
                  const isSelected = responses[poll.id] === option.id;
                  const isAnswered = submitted.has(poll.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleAnswer(poll.id, option.id)}
                      disabled={isAnswered || submitting === poll.id}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all duration-150 ${
                        isSelected
                          ? "bg-forest text-ivory border-forest"
                          : isAnswered
                          ? "bg-muted text-charcoal-400 border-border cursor-not-allowed"
                          : "bg-white text-charcoal-600 border-border hover:border-forest hover:bg-muted"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            {submitted.has(poll.id) && (
              <div
                className="flex items-center gap-2 mt-4 text-sage-600 text-sm"
                role="status"
                aria-live="polite"
              >
                <CheckCircle size={15} aria-hidden="true" />
                <span>Thank you for noticing.</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
