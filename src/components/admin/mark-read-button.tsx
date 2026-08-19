"use client";

import { useState } from "react";

interface MarkReadButtonProps {
  id: string;
  initialRead: boolean;
}

export function MarkReadButton({ id, initialRead }: MarkReadButtonProps) {
  const [read, setRead] = useState(initialRead);
  const [loading, setLoading] = useState(false);

  if (read) return null;

  async function handleClick() {
    setLoading(true);
    try {
      await fetch(`/api/admin/contact/${id}`, { method: "PATCH" });
      setRead(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs text-forest hover:underline underline-offset-2 disabled:opacity-50"
    >
      {loading ? "Marking…" : "Mark as read"}
    </button>
  );
}
