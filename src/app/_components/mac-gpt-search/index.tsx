'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Film,
  Info,
  Mic,
  Search,
  SendHorizontal,
  X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const MAC_GPT_SEARCH_OPEN_EVENT = 'mac-gpt-search:open';
const MAC_GPT_SEARCH_CLOSE_EVENT = 'mac-gpt-search:close';

type MacGptSearchOpenDetail = {
  query?: string;
};

type ResponseType = 'default' | 'care' | 'unsupported';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  query?: string;
  responseType?: ResponseType;
  status?: 'typing' | 'done';
};

const SEARCH_TEXT = {
  title: '맥GPT에게 물어보세요!',
  placeholder: '어떤 증상이 있으신가요?',
  chatPlaceholder: '추가로 궁금한 점을 입력하세요...',
  noticePrefix: '맥GPT는 현재',
  noticeHighlight: '질환 정보 중심으로 응답',
  noticeSuffix: '이 가능해요.',
  noticeDescription:
    '제공된 정보는 참고용이며, 정확한 진단과 치료는 의료진 상담이 필요할 수 있습니다.',
  searchLabel: '맥GPT 검색하기',
  closeLabel: '맥GPT 검색 화면 닫기',

  chips: [
    '#하지정맥류 수술 비용이 궁금해요',
    '#왼쪽 고환 열감',
    '#투석혈관 막힘',
    '#하지정맥류 치료 의료보험 적용될까',
    '#걸을 때 다리 통증, 발가락 저림',
    '#생리통이 심한데, 골반정맥류라고?',
    '다리가 붓는데 하지정맥류?',
  ],

  mobileChips: [
    '다리가 붓는데 하지정맥류?',
    '#투석혈관 막힘',
    '#하지정맥류 수술 비용',
    '#하지정맥류 치료 의료보험 적용',
    '#왼쪽 고환 열감',
    '#생리통이 심한데, 골반정맥류?',
  ],
} as const;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getMockResponseType(query: string): ResponseType {
  const normalized = query.replace(/\s/g, '');

  if (
    normalized.includes('뇌경색') ||
    normalized.includes('뇌MRI') ||
    normalized.includes('뇌혈관') ||
    normalized.includes('MRI비용')
  ) {
    return 'unsupported';
  }

  if (
    normalized.includes('집에서') ||
    normalized.includes('관리') ||
    normalized.includes('부종완화') ||
    normalized.includes('붓기관리')
  ) {
    return 'care';
  }

  return 'default';
}

export function openMacGptSearch(query = '') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<MacGptSearchOpenDetail>(MAC_GPT_SEARCH_OPEN_EVENT, {
      detail: { query },
    }),
  );
}

export function closeMacGptSearch() {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(MAC_GPT_SEARCH_CLOSE_EVENT));
}

function MacGptNotice({
  className = '',
  showDescription = true,
}: {
  className?: string;
  showDescription?: boolean;
}) {
  return (
    <div
      className={`text-center text-[12px] font-medium leading-[1.55] tracking-[-0.025em] text-[#555A5E] ${className}`}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-1">
        <span className="flex items-center gap-1">
          <Info size={13} strokeWidth={1.8} />
          <span>{SEARCH_TEXT.noticePrefix}</span>
        </span>

        <span className="font-bold text-[#FF7040]">
          {SEARCH_TEXT.noticeHighlight}
        </span>

        <span>{SEARCH_TEXT.noticeSuffix}</span>
      </p>

      {showDescription ? (
        <p className="mt-0.5">{SEARCH_TEXT.noticeDescription}</p>
      ) : null}
    </div>
  );
}

function AssistantLogo() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_7px_rgba(0,0,0,0.07)]">
      <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FF7040] text-[11px] font-bold text-white">
        맥
      </span>
    </div>
  );
}

function TypingMessage({ responseType }: { responseType?: ResponseType }) {
  const text =
    responseType === 'unsupported'
      ? '죄송합니다.'
      : responseType === 'care'
        ? '다리 부종 완화를 위해서는'
        : '하지정맥류에서는';

  return (
    <div className="flex items-start gap-2.5">
      <AssistantLogo />

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[10px] bg-white px-5 py-4 text-[15px] font-medium leading-[1.7] text-[#333333]"
      >
        {text}
      </motion.div>
    </div>
  );
}

function DefaultAnswer() {
  return (
    <div className="flex items-start gap-2.5">
      <AssistantLogo />

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[610px] rounded-[10px] bg-white px-5 py-5 text-[#30353A]"
      >
        <p className="text-[15px] leading-[1.75] tracking-[-0.025em]">
          하지정맥류에서는 다리 부종, 무거움, 야간 쥐가 흔한 증상입니다. 하지만
          단순 부종도 다양한 원인이 있으므로 정확한 진단이 필요합니다.
        </p>

        <p className="mt-5 text-[15px] leading-[1.75]">
          하지정맥류 진료를 잘 보는 의료진을 찾아드릴까요?
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#DEE1E4] bg-[#F6F7F8] px-4 py-2 text-[13px] font-medium text-[#3F454B]"
          >
            의료진 찾기
            <ExternalLink size={13} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#DEE1E4] bg-[#F6F7F8] px-4 py-2 text-[13px] font-medium text-[#3F454B]"
          >
            내게 맞는 의사는 누구?
            <ExternalLink size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CareAnswer() {
  const careItems = [
    '장시간 서있거나 앉아있는 시간 줄이기',
    '다리를 심장보다 높게 올리고 휴식하기',
    '의료용 압박 스타킹 착용',
    '염분 섭취 줄이기',
  ];

  return (
    <div className="flex items-start gap-2.5">
      <AssistantLogo />

      <div className="min-w-0 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[510px] rounded-[10px] bg-white px-5 py-5"
        >
          <p className="text-[15px] font-medium leading-[1.7] text-[#30353A]">
            다리 부종 완화를 위한 다음과 같은 관리를 권장합니다.
          </p>

          <ul className="mt-4 space-y-2.5">
            {careItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] leading-[1.5] text-[#747A81]"
              >
                <CheckCircle2
                  size={16}
                  className="mt-[1px] shrink-0 text-[#FF8B5D]"
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-3 w-full max-w-[610px] rounded-[10px] bg-white px-5 py-5"
        >
          <h3 className="text-[18px] font-bold tracking-[-0.035em] text-[#252A30]">
            [다리 부종] 관련 콘텐츠 추천
          </h3>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[14px] font-bold">
                <Film size={16} />
                영상으로 확인해보세요
              </p>

              <button
                type="button"
                className="text-[12px] font-medium text-[#FF7040]"
              >
                + 더보기
              </button>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              <div className="relative h-[100px] min-w-[165px] overflow-hidden rounded-[8px] bg-[#262626] px-3 py-3 text-white">
                <span className="text-[12px] font-bold">
                  완전 쉬운
                  <br />
                  구별법
                </span>

                <strong className="absolute bottom-3 left-3 text-[20px] font-black text-[#FF742E]">
                  다리 붓는 원인
                </strong>
              </div>

              <div className="relative h-[100px] min-w-[165px] overflow-hidden rounded-[8px] bg-[#333333] px-3 py-3 text-white">
                <span className="text-[12px]">뻐근하고 묵직한</span>

                <strong className="absolute bottom-3 left-3 text-[20px] font-black text-[#33D79D]">
                  통통한 하체
                </strong>
              </div>

              <div className="relative hidden h-[100px] min-w-[165px] overflow-hidden rounded-[8px] bg-[#292929] px-3 py-3 text-white md:block">
                <span className="text-[12px]">혈전</span>

                <strong className="absolute bottom-3 left-3 text-[18px] font-black text-[#FF5252]">
                  심부정맥혈전증
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[14px] font-bold">
                <BookOpen size={16} />
                질환백과사전
              </p>

              <button
                type="button"
                className="text-[12px] font-medium text-[#FF7040]"
              >
                + 더보기
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {['심부정맥혈전증', '하지정맥류', '림프 부종'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border border-[#E3E4E5] bg-white px-4 py-2 text-[12px] font-medium text-[#8A4F3C]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function UnsupportedAnswer() {
  return (
    <div className="flex items-start gap-2.5">
      <AssistantLogo />

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[610px] rounded-[10px] bg-white px-5 py-5"
      >
        <p className="text-[15px] font-bold text-[#30353A]">죄송합니다.</p>

        <p className="mt-1 text-[14px] leading-[1.75] text-[#41464B]">
          맥GPT는 현재 청맥병원의 진료 분야 및 본원 이용 정보(의료진, 서류 발급,
          진료 시간)에 대해서 안내가 가능하며, 이외의 자세한 문의사항은
          전화/네이버톡톡을 이용해 주시기 바랍니다.
        </p>

        <p className="mt-5 text-[14px] leading-[1.7] text-[#41464B]">
          궁금하신 내용을 다시 말씀해 주시겠어요?
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#DEE1E4] bg-[#F6F7F8] px-4 py-2 text-[13px] font-medium text-[#3F454B]"
          >
            네이버톡톡 1:1 문의
            <ExternalLink size={13} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#DEE1E4] bg-[#F6F7F8] px-4 py-2 text-[13px] font-medium text-[#3F454B]"
          >
            전화걸기
            <ExternalLink size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  if (message.status === 'typing') {
    return <TypingMessage responseType={message.responseType} />;
  }

  if (message.responseType === 'unsupported') {
    return <UnsupportedAnswer />;
  }

  if (message.responseType === 'care') {
    return <CareAnswer />;
  }

  return <DefaultAnswer />;
}

export default function MacGptSearchLayer() {
  const pathname = usePathname();

  const desktopSearchRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [searchValue, setSearchValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const clearMockTimers = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });

    timeoutRefs.current = [];
  }, []);

  const focusLandingInput = useCallback(() => {
    if (typeof window === 'undefined') return;

    const isDesktop = window.matchMedia('(min-width: 1280px)').matches;

    window.requestAnimationFrame(() => {
      if (isDesktop) {
        desktopSearchRef.current?.focus();
      } else {
        mobileSearchRef.current?.focus();
      }
    });
  }, []);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<MacGptSearchOpenDetail>;
      const nextQuery = customEvent.detail?.query ?? '';

      clearMockTimers();
      setMessages([]);
      setMode('search');
      setSearchValue(nextQuery);
      setIsOpen(true);

      window.requestAnimationFrame(() => {
        if (nextQuery) {
          focusLandingInput();
        }
      });
    };

    const handleClose = () => {
      clearMockTimers();
      setIsOpen(false);
    };

    window.addEventListener(MAC_GPT_SEARCH_OPEN_EVENT, handleOpen);
    window.addEventListener(MAC_GPT_SEARCH_CLOSE_EVENT, handleClose);

    return () => {
      clearMockTimers();
      window.removeEventListener(MAC_GPT_SEARCH_OPEN_EVENT, handleOpen);
      window.removeEventListener(MAC_GPT_SEARCH_CLOSE_EVENT, handleClose);
    };
  }, [clearMockTimers, focusLandingInput]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      clearMockTimers();
      setIsOpen(false);
      setMessages([]);
      setMode('search');
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, clearMockTimers]);

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

  useEffect(() => {
    if (mode !== 'chat') return;

    window.requestAnimationFrame(() => {
      const target = chatScrollRef.current;

      if (!target) return;

      target.scrollTo({
        top: target.scrollHeight,
        behavior: 'smooth',
      });
    });
  }, [messages, mode]);

  const submitMockQuestion = (rawQuery: string) => {
    const query = rawQuery.trim();

    if (!query) return;

    const responseType = getMockResponseType(query);

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      query,
    };

    const assistantId = createId();

    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      responseType,
      status: 'typing',
    };

    setMode('chat');
    setSearchValue('');

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    const timeoutId = window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                status: 'done',
              }
            : message,
        ),
      );
    }, 850);

    timeoutRefs.current.push(timeoutId);
  };

  const handleLandingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMockQuestion(searchValue);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMockQuestion(searchValue);
  };

  const handleDesktopChipClick = (chip: string) => {
    const query = chip.replace(/^#/, '');

    setSearchValue(query);

    window.requestAnimationFrame(() => {
      desktopSearchRef.current?.focus();
    });
  };

  const handleMobileChipClick = (chip: string) => {
    const query = chip.replace(/^#/, '');

    // 모바일 추천 질문은 input에 넣지 않고 즉시 질문 처리
    submitMockQuestion(query);
  };

  const handleClose = () => {
    clearMockTimers();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.section
          id="mac-gpt-search-layer"
          key="mac-gpt-search-layer"
          role="dialog"
          aria-modal="true"
          aria-label="MacGPT search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="
    pointer-events-none
    fixed
    inset-0
    z-[60]
    flex
    flex-col
    overflow-hidden
    xl:bottom-0
    xl:left-0
    xl:right-0
    xl:top-[148px]
  "
        >
          {/* MOBILE HEADER OVERLAY */}
          <div
            className="
    relative
    z-30
    h-14
    w-full
    shrink-0
    xl:hidden
  "
          >
            {/* 기존 Header의 햄버거 영역만 가림 */}
            <div
              className="
      absolute
      bottom-0
      right-0
      top-0
      w-[72px]
      bg-white
    "
            />

            {/* MacGPT 닫기 버튼 */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={SEARCH_TEXT.closeLabel}
              className="
    pointer-events-auto
    absolute
    right-3
    top-1/2
    z-10
    flex
    h-11
    w-11
    -translate-y-1/2
    items-center
    justify-center
    bg-white
    text-[#252A2E]
  "
            >
              <X size={27} strokeWidth={1.8} />
            </button>
          </div>

          {/*
           * HEADER 아래의 실제 맥GPT 화면에만 배경을 적용합니다.
           * 모바일에서는 기존 Header가 그대로 보이면서 그 위에 X만 덮입니다.
           */}
          <div
            id="mac-gpt-search-content"
            className="pointer-events-auto relative mt-[60px] min-h-0 flex-1 overflow-hidden xl:mt-0"
            style={{
              background:
                'radial-gradient(at 43% 38%, rgba(255, 218, 143, 0.34) 0%, rgba(255, 218, 143, 0) 35%), radial-gradient(at 63% 39%, rgba(255, 133, 93, 0.22) 0%, rgba(255, 133, 93, 0) 39%), linear-gradient(120deg, rgb(238, 246, 250) 0%, rgb(255, 248, 234) 39%, rgb(255, 242, 239) 72%, rgb(245, 248, 250) 100%)',
            }}
          >
            {mode === 'search' ? (
              <>
                {/* DESKTOP SEARCH */}
                <div className="hidden h-full xl:block">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-full flex-col justify-center items-center"
                  >
                    <button
                      type="button"
                      aria-label={SEARCH_TEXT.closeLabel}
                      onClick={handleClose}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#252A2E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:scale-[1.03] hover:bg-[#FAFAFA]"
                    >
                      <X size={34} strokeWidth={1.7} />
                    </button>

                    <h2 className="mt-4 text-center text-[40px] font-bold leading-[1.25] tracking-[-0.04em] text-[#242A2F]">
                      {SEARCH_TEXT.title}
                    </h2>

                    <form
                      onSubmit={handleLandingSubmit}
                      className="mt-[48px] flex h-[56px] w-[486px] items-center rounded-[13px] border-2 border-[#FF7642] bg-white pl-[18px] pr-[4px] shadow-[0_0_14px_rgba(255,118,66,0.32)]"
                    >
                      <input
                        id="mac-gpt-desktop-search"
                        name="macGptQuery"
                        ref={desktopSearchRef}
                        type="search"
                        autoComplete="off"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder={SEARCH_TEXT.placeholder}
                        className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium tracking-[-0.02em] text-[#333333] outline-none placeholder:font-normal placeholder:text-[#C9C9C9] [&::-webkit-search-cancel-button]:hidden"
                      />

                      <button
                        type="submit"
                        aria-label={SEARCH_TEXT.searchLabel}
                        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[11px] bg-[#FF7040] text-white transition hover:brightness-95"
                      >
                        <Search size={27} strokeWidth={2} />
                      </button>
                    </form>

                    <MacGptNotice
                      className="mt-[17px]"
                      showDescription={false}
                    />

                    <div className="mt-[18px] flex max-w-7xl flex-wrap items-center justify-center gap-x-[7px] gap-y-[7px]">
                      {SEARCH_TEXT.chips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleDesktopChipClick(chip)}
                          className="rounded-full bg-[#99827A] px-[11px] py-[6px] text-[13px] font-bold leading-none tracking-[-0.025em] text-white transition hover:-translate-y-px hover:bg-[#8C756E]"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* MOBILE SEARCH */}
                <div className="relative flex h-full min-h-0 flex-col xl:hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      left-1/2
                      top-[43%]
                      flex
                      w-[350px]
                      max-w-[calc(100%-28px)]
                      -translate-x-1/2
                      -translate-y-1/2
                      flex-wrap
                      items-center
                      justify-center
                      gap-x-[6px]
                      gap-y-[7px]
                    "
                  >
                    {SEARCH_TEXT.mobileChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleMobileChipClick(chip)}
                        className="rounded-full bg-[#A88E84] px-[12px] py-[7px] text-[13px] font-medium leading-none tracking-[-0.035em] text-white transition active:scale-[0.97]"
                      >
                        {chip}
                      </button>
                    ))}
                  </motion.div>

                  <div className="mt-auto w-full shrink-0 px-3 pb-5">
                    <MacGptNotice className="mx-auto mb-[19px] max-w-[315px]" />

                    <form
                      onSubmit={handleLandingSubmit}
                      className="flex h-[56px] w-full items-center rounded-full border border-[#DADDE0] bg-white pl-[19px] pr-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      <input
                        id="mac-gpt-mobile-search"
                        name="macGptQuery"
                        ref={mobileSearchRef}
                        type="search"
                        autoComplete="off"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder={SEARCH_TEXT.placeholder}
                        className="h-full min-w-0 flex-1 appearance-none bg-transparent pr-2 text-[15px] font-medium tracking-[-0.025em] text-[#333333] outline-none placeholder:font-normal placeholder:text-[#8F969E] [&::-webkit-search-cancel-button]:hidden"
                      />

                      <button
                        type="button"
                        aria-label="음성으로 질문하기"
                        className="mr-[13px] flex h-8 w-8 shrink-0 items-center justify-center text-[#FF7040]"
                      >
                        <Mic size={22} strokeWidth={2.2} />
                      </button>

                      <button
                        type="submit"
                        aria-label={SEARCH_TEXT.searchLabel}
                        className="flex h-8 w-8 shrink-0 items-center justify-center text-[#59606B] transition active:scale-95"
                      >
                        <SendHorizontal
                          size={24}
                          strokeWidth={2.3}
                          fill="currentColor"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              /* CHAT */
              <div className="relative flex h-full min-h-0 flex-col">
                {/* PC 닫기 버튼 */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={SEARCH_TEXT.closeLabel}
                  className="absolute right-[8%] top-9 z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-white text-[#252A2E] shadow-sm xl:flex"
                >
                  <X size={34} strokeWidth={1.7} />
                </button>

                {/*
                 * 메시지는 입력영역을 제외한 공간의 아래부터 쌓입니다.
                 * 대화가 길어지면 위로 밀리고 이후 스크롤됩니다.
                 */}
                <div
                  ref={chatScrollRef}
                  className="min-h-0 flex-1 overflow-y-auto px-4 pt-8 xl:pt-[90px]"
                >
                  <div className="mx-auto flex min-h-full w-full max-w-[790px] flex-col justify-end pb-7 xl:pb-8">
                    <div className="flex flex-col gap-5">
                      {messages.map((message) =>
                        message.role === 'user' ? (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-end"
                          >
                            <div className="max-w-[78%] rounded-[12px] bg-[#FF7040] px-5 py-4 text-[15px] font-medium leading-[1.6] text-white xl:max-w-[65%]">
                              {message.query}
                            </div>
                          </motion.div>
                        ) : (
                          <AssistantMessage
                            key={message.id}
                            message={message}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/*
                 * 입력창은 absolute가 아닌 실제 하단 레이아웃 영역입니다.
                 * 따라서 마지막 답변과 입력창이 겹치지 않습니다.
                 */}
                <div className="shrink-0 px-3 pb-5 xl:px-0 xl:pb-5">
                  <form
                    onSubmit={handleChatSubmit}
                    className="mx-auto flex h-[56px] w-full max-w-[790px] items-center rounded-full border border-[#DADDE0] bg-white pl-[19px] pr-[14px] xl:rounded-[12px]"
                  >
                    <input
                      id="mac-gpt-chat-input"
                      name="macGptChatQuery"
                      ref={chatInputRef}
                      type="search"
                      autoComplete="off"
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder={SEARCH_TEXT.chatPlaceholder}
                      className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium text-[#333333] outline-none placeholder:text-[#A7ACB1] [&::-webkit-search-cancel-button]:hidden"
                    />

                    <button
                      type="button"
                      aria-label="음성으로 질문하기"
                      className="mr-3 flex items-center justify-center text-[#FF7040] xl:hidden"
                    >
                      <Mic size={23} />
                    </button>

                    <button
                      type="submit"
                      aria-label={SEARCH_TEXT.searchLabel}
                      className="flex shrink-0 items-center justify-center text-[#59606B] xl:h-[44px] xl:w-[44px] xl:rounded-[10px] xl:bg-[#FF7040] xl:text-white"
                    >
                      <SendHorizontal
                        className="xl:hidden"
                        size={25}
                        fill="currentColor"
                      />

                      <Search className="hidden xl:block" size={24} />
                    </button>
                  </form>

                  <MacGptNotice className="mt-4 hidden xl:block" />
                </div>
              </div>
            )}
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
