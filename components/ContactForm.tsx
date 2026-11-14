"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, MessageSquare, Send, Tag, User, type LucideIcon } from "lucide-react";

type Errors = Partial<Record<"email" | "subject" | "message", string>>;

const inputBase =
  "block w-full rounded-xl border bg-paper py-3 pl-11 pr-3.5 text-ink placeholder:text-muted/80 transition-colors focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

function Field({
  id,
  label,
  icon: Icon,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 size-[1.1rem] text-muted" aria-hidden="true" />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Prepares an email in the visitor's own email app (mailto:).
 * Nothing is sent by this website, so we never show a "message sent" state.
 * Without a configured address the form is shown but disabled.
 */
export default function ContactForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const enabled = Boolean(email);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (from && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) next.email = "Please enter a valid email address.";
    if (!subject) next.subject = "Please add a subject.";
    if (message.length < 10) next.message = "Please write a message of at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`c-${first}`)?.focus();
      return;
    }

    const signature = [name && `Name: ${name}`, from && `Reply to: ${from}`].filter(Boolean).join("\n");
    const body = signature ? `${message}\n\n${signature}` : message;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const cls = (key?: keyof Errors) =>
    `${inputBase} ${key && errors[key] ? "border-rose-400 focus:border-rose-500" : "border-line focus:border-accent"}`;
  const describedBy = (key: keyof Errors) => (errors[key] ? `c-${key}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="c-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="c-name" label="Your name" icon={User} optional>
          <input id="c-name" name="name" autoComplete="name" placeholder="Your name" disabled={!enabled} className={cls()} />
        </Field>
        <Field id="c-email" label="Your email" icon={Mail} optional error={errors.email}>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={!enabled}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cls("email")}
          />
        </Field>
      </div>
      <Field id="c-subject" label="Subject" icon={Tag} error={errors.subject}>
        <input
          id="c-subject"
          name="subject"
          required
          placeholder="What is it about?"
          disabled={!enabled}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={cls("subject")}
        />
      </Field>
      <Field id="c-message" label="Message" icon={MessageSquare} error={errors.message}>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          placeholder="Your message…"
          disabled={!enabled}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${cls("message")} resize-y`}
        />
      </Field>
      <button
        type="submit"
        disabled={!enabled}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-bold text-white shadow-[0_10px_24px_-12px_rgb(100_37_232/0.8)] transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#8455f5]"
      >
        Send Message
        <Send className="size-4" aria-hidden="true" />
      </button>
      <p id="c-note" className="text-sm text-muted" aria-live="polite">
        {!enabled
          ? "The contact form is not active yet because the site owner has not published a contact address. Please check back soon."
          : opened
            ? "Your email app should now be open with this message. It is only sent when you press send there."
            : "Pressing Send Message opens a ready-made email in your own email app. This website does not send or store your message."}
      </p>
    </form>
  );
}
