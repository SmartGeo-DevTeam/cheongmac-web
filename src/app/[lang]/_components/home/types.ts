import type { Dictionary } from '@/app/[lang]/dictionaries';
import type { Locale } from '@/i18n-config';

export type HomeText = Dictionary['home'];

export type HomeSectionProps = {
  lang: Locale;
  home: HomeText;
};
