'use client';

import type { Locale } from '@/i18n-config';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type FormEvent, useEffect, useRef, useState } from 'react';

const MAC_GPT_SEARCH_OPEN_EVENT = 'mac-gpt-search:open';

type MacGptSearchOpenDetail = {
  query?: string;
};

type MacGptSearchLayerProps = {
  lang: Locale;
};

const SEARCH_TEXT = {
  ko: {
    placeholder: '어떤 증상이 있으신가요?',
    noticePrefix: '맥GPT는 현재',
    noticeHighlight: '질환 정보 중심으로 응답',
    noticeSuffix: '이 가능해요.',
    searchLabel: '맥GPT 검색하기',
    closeLabel: '맥GPT 검색 화면 닫기',
    chips: [
      '#하지정맥류 수술 비용이 궁금해요',
      '#왼쪽 고환 열감',
      '#투석혈관 막힘',
      '#하지정맥류 치료 의료보험 적용될까',
      '#걸을 때 다리 통증, 발가락 저림',
      '#생리통이 심한데, 골반정맥류라고?',
    ],
  },
  en: {
    placeholder: 'What symptoms do you have?',
    noticePrefix: 'MacGPT currently answers mainly around',
    noticeHighlight: 'disease information',
    noticeSuffix: '.',
    searchLabel: 'Search with MacGPT',
    closeLabel: 'Close MacGPT search screen',
    chips: [
      '#Varicose vein surgery cost',
      '#Warm sensation in left testicle',
      '#Dialysis access blockage',
      '#Insurance for varicose vein treatment',
      '#Leg pain and toe numbness when walking',
      '#Severe menstrual pain and pelvic varicose veins?',
    ],
  },
  ja: {
    placeholder: 'どのような症状がありますか？',
    noticePrefix: 'MacGPTは現在',
    noticeHighlight: '疾患情報を中心に回答',
    noticeSuffix: 'できます。',
    searchLabel: 'MacGPTで検索',
    closeLabel: 'MacGPT検索画面を閉じる',
    chips: [
      '#下肢静脈瘤の手術費用が知りたい',
      '#左睾丸の熱感',
      '#透析血管の閉塞',
      '#下肢静脈瘤治療に保険は適用される？',
      '#歩くと脚が痛い、足指がしびれる',
      '#生理痛がひどいけど骨盤静脈瘤？',
    ],
  },
} as const;

export function openMacGptSearch(query = '') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<MacGptSearchOpenDetail>(MAC_GPT_SEARCH_OPEN_EVENT, {
      detail: { query },
    }),
  );
}

export default function MacGptSearchLayer({ lang }: MacGptSearchLayerProps) {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const text = SEARCH_TEXT[lang];

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<MacGptSearchOpenDetail>;
      const nextQuery = customEvent.detail?.query ?? '';

      setSearchValue(nextQuery);
      setIsOpen(true);

      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    };

    window.addEventListener(MAC_GPT_SEARCH_OPEN_EVENT, handleOpen);

    return () => {
      window.removeEventListener(MAC_GPT_SEARCH_OPEN_EVENT, handleOpen);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.section
          key="mac-gpt-search-layer"
          role="dialog"
          aria-modal="true"
          aria-label="MacGPT search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="fixed left-0 right-0 top-14 bottom-0 z-[60] overflow-hidden xl:top-20"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, rgba(255, 213, 123, 0.36) 0, rgba(255, 213, 123, 0) 34%), radial-gradient(circle at 60% 35%, rgba(255, 119, 64, 0.24) 0, rgba(255, 119, 64, 0) 38%), linear-gradient(120deg, #EEF8FC 0%, #FFF8EB 36%, #FFF2F0 72%, #F8F8FA 100%)',
          }}
        >
          <div className="flex h-full w-full items-center justify-center px-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[680px]"
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex h-14 w-full max-w-[560px] items-center rounded-[14px] border-2 border-[#FF7740] bg-white pl-5 pr-1.5 shadow-[0_0_20px_2px_rgba(255,119,64,0.34)] xl:h-[58px] xl:max-w-[500px]"
              >
                <input
                  ref={inputRef}
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder={text.placeholder}
                  className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[#333333] placeholder:text-[#C4C4C4] xl:text-base"
                />

                <button
                  type="submit"
                  aria-label={text.searchLabel}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#FF7740] text-white transition hover:brightness-95 xl:h-12 xl:w-12"
                >
                  <Search size={26} strokeWidth={2.2} />
                </button>
              </form>

              <p className="mt-4 flex items-center justify-center gap-1 text-center text-[13px] font-medium text-[#555555] xl:text-[14px]">
                <Info size={14} strokeWidth={2} />
                <span>{text.noticePrefix}</span>
                <span className="font-bold text-[#FF7740]">
                  {text.noticeHighlight}
                </span>
                <span>{text.noticeSuffix}</span>
              </p>

              <div className="mx-auto mt-5 flex max-w-[660px] flex-wrap items-center justify-center gap-2 xl:gap-x-2.5 xl:gap-y-2">
                {text.chips.map((chip, index) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearchValue(chip.replace(/^#/, ''))}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-bold leading-none text-white transition hover:-translate-y-0.5 xl:text-[14px] ${
                      index === 1
                        ? 'bg-[#FF7740]'
                        : 'bg-[#8B746E] hover:bg-[#7C655F]'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
