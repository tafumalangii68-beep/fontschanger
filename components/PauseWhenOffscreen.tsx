"use client";

import { useEffect } from "react";

/**
 * Pauses CSS animations inside an element while it is scrolled out of view,
 * so a decorative background does not keep the GPU busy and drain battery.
 */
export default function PauseWhenOffscreen({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("fc-type-paused", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);
  return null;
}
