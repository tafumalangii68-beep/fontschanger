"use client";

import { useState, type FormEvent } from "react";

const field =
  "mt-1.5 block w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

/**
 * Prepares an email in the visitor's own email app (mailto:).
 * Nothing is sent by this website, so we never show a "message sent" state.
 */
export default function ContactForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!subject || !message) {
      setError("Please add a subject and a message.");
      return;
    }
    setError("");
    const body = name ? `${message}\n\n— ${name}` : message;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
      <div>
        <label htmlFor="c-name" className="text-sm font-medium">
          Your name <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="c-name" name="name" autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="c-subject" className="text-sm font-medium">
          Subject
        </label>
        <input id="c-subject" name="subject" required className={field} />
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="c-message" name="message" rows={6} required className={field} />
      </div>
      {error && (
        <p role="alert" className="text-sm text-[#9b2c2c]">
          {error}
        </p>
      )}
      <button type="submit" className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-strong dark:hover:bg-[#8455f5]">
        Open in my email app
      </button>
      <p className="text-sm text-muted" aria-live="polite">
        {opened
          ? "Your email app should now be open with this message. It is only sent when you press send there. If nothing opened, email us directly at the address above."
          : "This form does not send anything by itself. It opens a draft email in your default email app."}
      </p>
    </form>
  );
}
