import 'server-only';
import type { Locale } from '@/i18n-config';
import { isLocale } from '@/i18n-config';

const dictionaries = {
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
};

export function hasLocale(locale: string): locale is Locale {
  return isLocale(locale);
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
