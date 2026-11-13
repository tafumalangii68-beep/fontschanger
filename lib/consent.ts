/**
 * Cookie / storage consent helpers.
 *
 * This site currently loads NO analytics or marketing scripts. The optional
 * categories exist so the owner can add such a service later. Any optional
 * script must be loaded only after `hasConsent("analytics" | "marketing")`
 * returns true, and should listen for CONSENT_CHANGE_EVENT.
 */
export const CONSENT_KEY = "fc-cookie-consent";
export const CONSENT_VERSION = 1;
export const OPEN_SETTINGS_EVENT = "fc:open-cookie-settings";
export const CONSENT_CHANGE_EVENT = "fc:consent-change";

export type OptionalCategory = "analytics" | "marketing";

export type ConsentState = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Record<OptionalCategory, boolean>): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    /* Storage blocked: the choice applies to this page view only. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: state }));
  return state;
}

export function hasConsent(category: OptionalCategory): boolean {
  return readConsent()?.[category] === true;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
