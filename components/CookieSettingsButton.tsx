"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({
  className = "",
  children = "Cookie Settings",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
