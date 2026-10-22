export type HistorySectionStylesType = {
  section: string;
  background: string;
  backgroundAspect: string;
  content: string;
  contentColor: string;
  period: string;
  title: string;
  titleMargin: string;
  desc: string;
};

const COMMON_HISTORY_STYLES: HistorySectionStylesType = {
  section: `relative first-of-type:mt-5
            xl:first-of-type:mt-25`,
  background: `sticky -top-10 w-full
               xl:top-0`,
  backgroundAspect: ``,
  content: `relative px-8 pt-21.5
            xl:pl-80 xl:pt-55`,
  contentColor: ``,
  period: `text-mo-body-2
           xl:text-pc-body-2`,
  title: `text-mo-title-1
          xl:text-pc-title-1`,
  titleMargin: `mt-2`,
  desc: `mt-10 text-mo-body-1
         xl:text-pc-body-1 xl:whitespace-pre-line`,
};

const HISTORY_SECTION_STYLES: Record<
  string,
  Partial<HistorySectionStylesType>
> = {
  'introduction-history-2018-2026': {
    backgroundAspect: `aspect-375/420
                       xl:aspect-auto xl:w-screen xl:h-screen`,
    contentColor: `text-inverse`,
  },
  'introduction-history-2010-2017': {
    backgroundAspect: `aspect-375/550
                       xl:aspect-auto xl:w-screen xl:h-screen`,
  },
};

export function getHistorySectionStyles(id: string): HistorySectionStylesType {
  return {
    ...COMMON_HISTORY_STYLES,
    ...HISTORY_SECTION_STYLES[id],
  };
}
