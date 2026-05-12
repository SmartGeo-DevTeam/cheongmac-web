import 'server-only';

import type { Locale } from '@/i18n-config';
import { isLocale } from '@/i18n-config';

import ko from './dictionaries/ko.json';
import en from './dictionaries/en.json';
import ja from './dictionaries/ja.json';

export type Dictionary = typeof ko;

const dictionaries = {
  ko,
  en,
  ja,
} satisfies Record<Locale, Dictionary>;

export function hasLocale(locale: string): locale is Locale {
  return isLocale(locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
