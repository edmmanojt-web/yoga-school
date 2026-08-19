"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Monitor, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";

interface SessionData {
  id: string;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  mode: string;
  capacity: number;
  enrolled: number;
  spotsLeft: number;
  location: string | null;
  offering: {
    title: string;
    category: string;
    slug: string;
  };
  teacher: { name: string; photoUrl: string | null } | null;
}

const categoryFilters = ["All", "YOGA", "BREATHWORK", "MINDFULNESS", "MEDITATION", "WORKSHOP", "PROGRAM"];
const categoryLabels: Record<string, string> = {
  All: "All",
  YOGA: "Yoga",
  BREATHWORK: "Breathwork",
  MINDFULNESS: "Mindfulness",
  MEDITATION: "Meditation",
  WORKSHOP: "Workshop",
  PROGRAM: "Program",
};
const modeFilters = ["All", "ONLINE", "OFFLINE", "HYBRID"];
const modeLabels: Record<string, string> = {
  All: "All",
  ONLINE: "Online",
  OFFLINE: "In-Person",
  HYBRID: "Online & In-Person",
};

const modeBadge: Record<string, { label: string; variant: "sage" | "terracotta" | "forest" }> = {
  ONLINE: { label: "Online", variant: "sage" },
  OFFLINE: { label: "In-Person", variant: "terracotta" },
  HYBRID: { label: "Online & In-Person", variant: "forest" },
};

export function ScheduleClient({ sessions }: { sessions: SessionData[] }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  const usedCategories = ["All", ...Array.from(new Set(sessions.map((s) => s.offering.category)))];
  const usedModes = ["All", ...Array.from(new Set(sessions.map((s) => s.mode)))];

  const filtered = sessions.filter((s) => {
    const catMatch = categoryFilter === "All" || s.offering.category === categoryFilter;
    const modeMatch = modeFilter === "All" || s.mode === modeFilter;
    return catMatch && modeMatch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="space-y-3 mb-8">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {usedCategories.map((f) => (
            <button
              key={f}
              onClick={() => setCategoryFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                categoryFilter === f
                  ? "bg-forest text-ivory border-forest"
                  : "border-border hover:bg-muted"
              }`}
              aria-pressed={categoryFilter === f}
            >
              {categoryLabels[f] ?? f}
            </button>
          ))}
        </div>
        {usedModes.length > 2 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by mode"
          >
            {usedModes.map((f) => (
              <button
                key={f}
                onClick={() => setModeFilter(f)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  modeFilter === f
                    ? "bg-sage-600 text-white border-sage-600"
                    : "border-border hover:bg-muted"
                }`}
                aria-pressed={modeFilter === f}
              >
                {modeLabels[f] ?? f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Session cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <p className="text-charcoal-500 mb-2">No sessions match your filters.</p>
          <button
            onClick={() => { setCategoryFilter("All"); setModeFilter("All"); }}
            className="text-sm text-forest underline underline-offset-2 mt-1"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-4" aria-live="polite" aria-atomic="false">
          {filtered.map((session) => {
            const badge = modeBadge[session.mode] ?? modeBadge.ONLINE;
            const almostFull = session.spotsLeft <= 3 && session.spotsLeft > 0;
            const isFull = session.spotsLeft <= 0;

            return (
              <Card key={session.id} variant="elevated">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-xs font-medium text-sage-600 uppercase tracking-wider">
                          {session.offering.category}
                        </span>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        {almostFull && (
                          <Badge variant="terracotta">
                            {session.spotsLeft} spot{session.spotsLeft !== 1 ? "s" : ""} left
                          </Badge>
                        )}
                        {isFull && <Badge variant="default">Full</Badge>}
                      </div>
                      <h3 className="font-heading text-charcoal-700 text-xl mb-2">
                        {session.title}
                      </h3>
                      {session.description && (
                        <p className="text-sm text-charcoal-500 mb-2 leading-relaxed">
                          {session.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} aria-hidden="true" />
                          {formatDate(session.startTime)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} aria-hidden="true" />
                          {formatTime(session.startTime)}
                        </span>
                        {session.mode === "ONLINE" ? (
                          <span className="flex items-center gap-1.5">
                            <Monitor size={13} aria-hidden="true" />
                            Online
                          </span>
                        ) : session.location ? (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} aria-hidden="true" />
                            {session.location}
                          </span>
                        ) : null}
                        {session.teacher && (
                          <span>with {session.teacher.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                      {!isFull ? (
                        <>
                          <p className="text-xs text-muted-foreground">
                            {session.spotsLeft} of {session.capacity} spots available
                          </p>
                          <Link href={`/login?callbackUrl=/dashboard/sessions`}>
                            <Button variant="primary" size="sm">
                              Book
                              <ArrowRight size={13} className="ml-1" aria-hidden="true" />
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Session full</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-12 py-10 border-t border-border">
        <p className="text-charcoal-500 mb-4">
          Don&apos;t see what you&apos;re looking for?
        </p>
        <Link href="/contact">
          <Button variant="outline">
            Get in touch
            <ArrowRight size={14} className="ml-1" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
