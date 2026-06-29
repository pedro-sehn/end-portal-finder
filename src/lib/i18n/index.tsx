"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  LOCALES,
  translations,
  type Locale,
} from "./translations";

const STORAGE_KEY = "end-portal-locale";

type I18nState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translation dictionary for the active locale. */
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nState | undefined>(undefined);

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Best-effort match of a BCP-47 browser tag to one of our locales. */
function matchBrowserLocale(tag: string): Locale | null {
  const normalized = tag.toLowerCase();
  if (normalized === "pt-br" || normalized.startsWith("pt")) return "pt-br";
  if (normalized.startsWith("es")) return "es";
  if (normalized.startsWith("en")) return "en";
  return null;
}

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;

  for (const tag of navigator.languages ?? [navigator.language]) {
    const match = matchBrowserLocale(tag);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale];
  }, [locale]);

  const setLocale = (next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined)
    throw new Error("useI18n must be used within an I18nProvider");
  return context;
}

export { LOCALES, LOCALE_NAMES, type Locale } from "./translations";
