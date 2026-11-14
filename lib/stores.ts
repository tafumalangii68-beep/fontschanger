"use client";

/**
 * Tiny stores shared by the homepage tools (generator, live preview, platform
 * preview, font of the day). Use with React's useSyncExternalStore.
 *
 * - `studio` lives in memory only: the text you type is never written to storage.
 * - `recent` and `view` are kept in localStorage on this device. `recent` holds
 *   style ids only, never the text you copied.
 */
import { useSyncExternalStore } from "react";
import { RECENT_KEY, VIEW_KEY } from "@/lib/browser-store";
import type { CollectionId } from "@/lib/collections";

type Listener = () => void;

export type Store<T> = {
  get: () => T;
  getServer: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (l: Listener) => () => void;
};

function createMemoryStore<T>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    getServer: () => initial,
    set(next) {
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      listeners.forEach((l) => l());
    },
    subscribe(l) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

function createLocalStore<T>(key: string, fallback: T, parse: (raw: unknown) => T | null): Store<T> {
  let cache: T | null = null;
  const listeners = new Set<Listener>();
  const read = (): T => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : (parse(JSON.parse(raw)) ?? fallback);
    } catch {
      return fallback;
    }
  };
  const notify = () => listeners.forEach((l) => l());
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      cache = null;
      notify();
    }
  };
  return {
    get: () => (cache ??= read()),
    getServer: () => fallback,
    set(next) {
      const value = typeof next === "function" ? (next as (p: T) => T)(cache ?? read()) : next;
      cache = value;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* Storage blocked: keep the value for this page view only. */
      }
      notify();
    },
    subscribe(l) {
      if (listeners.size === 0) window.addEventListener("storage", onStorage);
      listeners.add(l);
      return () => {
        listeners.delete(l);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export const DEFAULT_ACTIVE_STYLE = "bold-cursive";

export type Studio = {
  text: string;
  activeId: string;
  collection: CollectionId | "all";
};

export const studio = createMemoryStore<Studio>({ text: "", activeId: DEFAULT_ACTIVE_STYLE, collection: "all" });

const RECENT_MAX = 8;

const EMPTY: string[] = [];
export const recent = createLocalStore<string[]>(RECENT_KEY, EMPTY, (raw) =>
  Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string").slice(0, RECENT_MAX) : null,
);

export function recordRecent(styleId: string): void {
  recent.set((prev) => [styleId, ...prev.filter((x) => x !== styleId)].slice(0, RECENT_MAX));
}

export type View = "grid" | "list";
export const view = createLocalStore<View>(VIEW_KEY, "grid", (raw) => (raw === "grid" || raw === "list" ? raw : null));

/** Scrolls to the generator results and moves focus there. */
export function goToResults(): void {
  const el = document.getElementById("fc-results");
  el?.scrollIntoView({ block: "start", behavior: "smooth" });
  el?.focus({ preventScroll: true });
}

export function goToGenerator(): void {
  document.getElementById("fc-top")?.scrollIntoView({ block: "start", behavior: "smooth" });
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}
