"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BookingStatusButtonsProps {
  bookingId: string;
  currentStatus: string;
}

export function BookingStatusButtons({ bookingId, currentStatus }: BookingStatusButtonsProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function update(newStatus: "CONFIRMED" | "CANCELLED") {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Failed");
        return;
      }
      setStatus(newStatus);
    } finally {
      setLoading(false);
    }
  }

  if (status === "CANCELLED") {
    return <span className="text-xs text-muted-foreground">Cancelled</span>;
  }
  if (status === "COMPLETED") {
    return <span className="text-xs text-muted-foreground">Completed</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      {status === "PENDING" && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => update("CONFIRMED")}
          disabled={loading}
          className="text-xs py-1 px-2 h-auto"
        >
          Confirm
        </Button>
      )}
      {(status === "PENDING" || status === "CONFIRMED") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => update("CANCELLED")}
          disabled={loading}
          className="text-xs py-1 px-2 h-auto text-terracotta hover:text-terracotta hover:bg-terracotta/10"
        >
          Cancel
        </Button>
      )}
      {error && <span className="text-xs text-terracotta">{error}</span>}
    </div>
  );
}
