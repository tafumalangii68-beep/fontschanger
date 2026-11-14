/**
 * Small browser-only stores for saved styles and theme, shared between the
 * header and the generator. Data stays in localStorage on the visitor's device.
 */
export const SAVED_KEY = "fc-saved-styles";
export const THEME_KEY = "fc-theme";
const SAVED_EVENT = "fc:saved-change";
/** Fired by the header heart button to show saved styles in the generator. */
export const SHOW_SAVED_EVENT = "fc:show-saved";

export type Theme = "light" | "dark";

let savedCache: string[] | null = null;
const EMPTY: string[] = [];

function readSaved(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function getSavedSnapshot(): string[] {
  if (savedCache === null) savedCache = readSaved();
  return savedCache;
}

export function getSavedServerSnapshot(): string[] {
  return EMPTY;
}

export function subscribeSaved(cb: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === SAVED_KEY) {
      savedCache = null;
      cb();
    }
  };
  window.addEventListener(SAVED_EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(SAVED_EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleSavedStyle(id: string): void {
  const current = getSavedSnapshot();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  savedCache = next;
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {
    /* Storage blocked: saved list lasts for this page view only. */
  }
  window.dispatchEvent(new Event(SAVED_EVENT));
}

/** Inline script for <head>: applies the theme before first paint to avoid a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}
