"use client";

import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";

/** Copies a value and remembers which item was copied for a short "Copied!" state. */
export function useCopy(duration = 1600) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy(id: string, label: string, value: string) {
    await copyText(value);
    setCopiedId(id);
    setStatus(`${label} copied to clipboard.`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), duration);
  }

  return { copiedId, status, setStatus, copy };
}
