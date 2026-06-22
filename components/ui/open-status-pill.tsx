"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Live "Open Today / Closed" pill based on Africa/Johannesburg time.
 * Renders the server-time assumption first, then reconciles on mount.
 */
export function OpenStatusPill({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean>(() => isOpenNow());

  useEffect(() => {
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-medium",
        open
          ? "bg-leaf-500/15 text-leaf-600"
          : "bg-white/15 text-white/90",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-500 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            open ? "bg-leaf-500" : "bg-white/70"
          )}
        />
      </span>
      {open ? "Open Today" : "Currently Closed"}
    </span>
  );
}
