'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';
import {
  getLocalePath,
  getPrimaryNavigation,
  withLocale,
} from '@/_lib/navigation';
import Inner from '@/app/_components/inner';

type HeaderText = {
  banner: {
    close: string;
  };
  button: {
    signIn: string;
  };
  reservation: {
    title: string;
    desc_1: string;
    desc_2: string;
    button_1: string;
    button_2: string;
  };
};

type HeaderProps = {
  lang: Locale;
  headerText: HeaderText;
  isMobile: boolean;
};

export default function Header({ lang, headerText, isMobile }: HeaderProps) {
  const pathname = usePathname();

  const [hoveredPrimaryId, setHoveredPrimaryId] = useState<string | null>(null);

  const primaryNavigation = useMemo(() => getPrimaryNavigation(lang), [lang]);

  const hoveredPrimary = hoveredPrimaryId
    ? (primaryNavigation.find((item) => item.id === hoveredPrimaryId) ?? null)
    : null;

  const isCurrentPath = (href: string) => {
    const localizedHref = withLocale(lang, href);

    if (localizedHref === `/${lang}`) {
      return pathname === localizedHref;
    }

    return (
      pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
    );
  };

  const currentLangIcon = {
    ko: isMobile
      ? '/icons/common/header/gnb/lang-ko-black.svg'
      : '/icons/common/header/gnb/lang-ko-gray.svg',
    en: '/icons/common/header/gnb/lang-en.svg',
    ja: '/icons/common/header/gnb/lang-ja.svg',
  }[lang];

  const languageMenus = [
    {
      code: 'ko' as const,
      label: 'KOR',
      icon: isMobile
        ? '/icons/common/header/gnb/lang-ko-black.svg'
        : '/icons/common/header/gnb/lang-ko-gray.svg',
    },
    {
      code: 'en' as const,
      label: 'ENG',
      icon: '/icons/common/header/gnb/lang-en.svg',
    },
    {
      code: 'ja' as const,
      label: 'JPN',
      icon: '/icons/common/header/gnb/lang-ja.svg',
    },
  ];

  const hasThirdDepth = hoveredPrimary?.children?.some(
    (group) => group.children?.length,
  );

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [mobileOpenIds, setMobileOpenIds] = useState<string[]>(() =>
    primaryNavigation.slice(0, 2).map((item) => item.id),
  );

  return (
    <>
      <header
        className="fixed left-0 top-0 w-full border-b border-b-[#CCCCCC] bg-white z-40"
        onMouseLeave={() => setHoveredPrimaryId(null)}
      >
        {/* Desktop - Banner */}
        <section className="hidden xl:block xl:relative xl:h-20 xl:bg-cm-green xl:text-white">
          <Inner>
            <div className="h-20 flex justify-center items-center gap-4.5">
              <span className="px-3 py-0.5 rounded-full bg-white tracking-[-5%] font-medium text-xs text-cm-green">
                공지사항
              </span>
              <p className="tracking-[-3%] text-2xl">
                골반정맥류 1,000례 달성!
              </p>
            </div>
          </Inner>

          <div className="absolute right-15 top-1/2 flex items-center gap-1 -translate-y-1/2">
            <label
              htmlFor="hide-today"
              className="flex items-center gap-1 cursor-pointer"
            >
              <input id="hide-today" type="checkbox" className="w-3 h-3" />
              <span className="tracking-[-3%] text-[15px]">
                {headerText.banner.close}
              </span>
            </label>

            <button type="button">
              <Image
                src={`/icons/common/header/banner/close.svg`}
                alt="banner-close"
                width={18}
                height={18}
              />
            </button>
          </div>
        </section>

        {/* Common - GNB */}
        <section className="relative mx-auto max-w-440 px-5 w-full h-14 flex justify-between xl:h-20">
          <Link
            href={withLocale(lang, '/')}
            className="relative flex items-center"
          >
            <Image
              src={`/common/logo.svg`}
              alt="logo"
              style={{ objectFit: 'cover' }}
              width={isMobile ? 132 : 155}
              height={isMobile ? 34 : 40}
            />
          </Link>

          {/* Desktop - GNB */}
          <nav className="hidden xl:flex justify-center items-center">
            {primaryNavigation.map((item) => {
              const isHovered = hoveredPrimary?.id === item.id;
              const isActive = isHovered || isCurrentPath(item.href);

              return (
                <Link
                  key={item.id}
                  href={withLocale(lang, item.href)}
                  onMouseEnter={() => setHoveredPrimaryId(item.id)}
                  onFocus={() => setHoveredPrimaryId(item.id)}
                  className={`relative px-7 flex items-center tracking-[-4%] font-medium text-lg cursor-pointer transition ${
                    isActive
                      ? 'border-cm-orange text-cm-orange'
                      : 'border-transparent text-gray-700 hover:font-bold hover:text-cm-orange'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Common - Buttons */}
          <div
            className="relative right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 z-50
            xl:gap-4"
          >
            {/* Common - Language */}
            <div className="group relative flex justify-center">
              <button
                type="button"
                className="relative w-7.5 h-7.5 xl:w-5 xl:h-5"
              >
                <Image
                  src={currentLangIcon}
                  alt={`current-lang-${lang}`}
                  fill
                />
              </button>

              <div className="absolute left-1/2 top-full z-10 pt-1.5 -translate-x-1/2 opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto">
                <div className="w-max flex flex-col items-center gap-1.5">
                  <Image
                    src={`/icons/common/header/gnb/arrow-down.svg`}
                    alt="arrow-down"
                    width={14}
                    height={8}
                  />

                  <div className="flex flex-col rounded-lg bg-white border border-[#DDDDDD] divide-y divide-[#DDDDDD] tracking-[-4%] font-medium text-sm text-[#666666] overflow-hidden">
                    {languageMenus
                      .filter((locale) => locale.code !== lang)
                      .map((locale) => (
                        <Link
                          key={locale.code}
                          href={getLocalePath(pathname, locale.code)}
                          className="px-3 py-[14.5px] flex items-center gap-2 bg-white hover:bg-[#F8F8F8]"
                        >
                          <Image
                            src={locale.icon}
                            alt={`lang-${locale.code}`}
                            width={20}
                            height={20}
                          />
                          <span>{locale.label}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop - Login Button */}
            <Link
              href={withLocale(lang, '/signin')}
              className="hidden xl:block shrink-0 px-3.5 py-[3.5px] rounded-lg border border-[#E8E9EA] tracking-[-5%] text-[15px] text-[#555555]"
            >
              {headerText.button.signIn}
            </Link>

            {/* Mobile - Hamburger Toggle Button */}
            <button
              type="button"
              className="block relative w-7.5 h-7.5 xl:hidden"
              onClick={() => setIsHamburgerOpen(true)}
            >
              <Image
                src={`/icons/common/header/gnb/hamburger.svg`}
                alt="hamburger"
                fill
              />
            </button>
          </div>
        </section>

        {/* Desktop - LNB */}
        {hoveredPrimary?.children?.length ? (
          <section className="relative border-t border-t-[#CCCCCC] before:absolute before:left-0 before:top-0 before:w-1/2 before:h-full before:bg-[#EEEEEE]">
            <div className="relative mx-auto max-w-440 flex">
              {/* Reservation */}
              <section className="px-15 py-10 flex flex-col gap-5 bg-[#EEEEEE]">
                <h1 className="font-medium text-3xl text-cm-green tracking-[-5%]">
                  {headerText.reservation.title}
                </h1>
                <div className="tracking-[-6%]">
                  <p>{headerText.reservation.desc_1}</p>
                  <p>{headerText.reservation.desc_2}</p>
                </div>
                <form className="grid grid-cols-[1fr_auto] grid-rows-2 gap-2">
                  <input
                    type="text"
                    placeholder="성함"
                    className="row-start-1 p-3 tracking-[-5%] text-[15px] rounded-lg bg-white placeholder:text-[#CCCCCC]"
                  />
                  <input
                    type="text"
                    placeholder="휴대폰 번호"
                    className="row-start-2 p-3 tracking-[-5%] text-[15px] rounded-lg bg-white placeholder:text-[#CCCCCC]"
                  />
                  <button className="row-span-2 w-25 aspect-square rounded-lg bg-cm-green tracking-[-5%] text-white">
                    {headerText.reservation.button_1}
                    <br />
                    {headerText.reservation.button_2}
                  </button>
                </form>
              </section>

              {/* LNB */}
              {hasThirdDepth ? (
                <section className="min-w-1/2 flex bg-white divide-x divide-[#DDDDDD]">
                  {hoveredPrimary.children.map((group) => (
                    <div key={group.id} className="px-10 pt-12 pb-14">
                      <Link
                        href={withLocale(lang, group.href)}
                        className="tracking-[-6%] text-nowrap font-medium text-lg text-[#333333] hover:text-cm-orange"
                      >
                        {group.title}
                      </Link>

                      {group.children?.length ? (
                        <ul className="mt-3 flex flex-col gap-2 w-max">
                          {group.children.map((child) => (
                            <li key={child.id} className="flex">
                              <Link
                                href={withLocale(lang, child.href)}
                                className="tracking-[-6%] font-normal text-lg text-[#999999] hover:underline underline-offset-4 hover:text-cm-orange"
                              >
                                {`· ${child.title}`}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </section>
              ) : (
                <section className="min-w-1/2 px-10 pt-12 pb-14 flex flex-col items-start bg-white gap-5">
                  {hoveredPrimary.children.map((group) => (
                    <Link
                      key={group.id}
                      href={withLocale(lang, group.href)}
                      className="tracking-[-6%] font-medium text-lg text-[#333333] hover:text-cm-orange"
                    >
                      {group.title}
                    </Link>
                  ))}
                </section>
              )}
            </div>
          </section>
        ) : (
          <></>
        )}

        {/* Mobile - Hamburger */}
        {isHamburgerOpen ? (
          <div className="fixed left-0 top-0 w-full h-screen overflow-y-scroll z-50">
            {/* GNB */}
            <div className="fixed left-0 top-0 px-5 w-full h-51 flex flex-col border-b border-b-[#EEEEEE] bg-cm-orange z-10">
              {/* Header */}
              <section className="h-14 flex justify-between items-center">
                <Link href={withLocale(lang, '/')} className="relative">
                  <Image
                    src={`/common/logo-white.svg`}
                    alt="logo-white"
                    style={{ objectFit: 'cover' }}
                    width={132}
                    height={34}
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <button className="relative w-7.5 h-7.5">
                    <Image
                      src={`/icons/common/header/gnb/lang-ko-white.svg`}
                      alt={`lang-ko-white`}
                      fill
                    />
                  </button>
                  <button className="relative w-7.5 h-7.5">
                    <Image
                      src={`/icons/common/header/gnb/profile.svg`}
                      alt={`profile`}
                      fill
                    />
                  </button>
                  <button
                    type="button"
                    className="relative w-7.5 h-7.5"
                    onClick={() => setIsHamburgerOpen(false)}
                  >
                    <Image
                      src={`/icons/common/header/gnb/close.svg`}
                      alt="close"
                      fill
                    />
                  </button>
                </div>
              </section>

              {/* Search */}
              <section className="h-17.5 flex items-center">
                <form className="px-2.5 w-full h-11 flex items-center gap-2 rounded-md bg-white">
                  <input
                    id="hamburger-search"
                    placeholder="메뉴명을 검색하세요."
                    className="w-full font-medium text-sm placeholder:text-[#CCCCCC]"
                  />
                  <button type="submit" className="relative w-7.5 h-7.5">
                    <Image
                      src={`/icons/common/header/gnb/search.svg`}
                      alt={`search`}
                      fill
                    />
                  </button>
                </form>
              </section>

              {/* Quick Menus */}
              <section className="h-19.5 grid grid-cols-4 text-white tracking-[-4%] text-xs">
                <Link
                  href={`/`}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <Image
                    src={`/icons/common/header/gnb/reservation.svg`}
                    alt={`reservation`}
                    width={26}
                    height={26}
                  />
                  <span>간편예약</span>
                </Link>
                <Link
                  href={`/`}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <Image
                    src={`/icons/common/header/gnb/doctor.svg`}
                    alt={`doctor`}
                    width={26}
                    height={26}
                  />
                  <span>의료진</span>
                </Link>
                <Link
                  href={`/`}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <Image
                    src={`/icons/common/header/gnb/info.svg`}
                    alt={`info`}
                    width={26}
                    height={26}
                  />
                  <span>진료안내</span>
                </Link>
                <Link
                  href={`/`}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <Image
                    src={`/icons/common/header/gnb/location.svg`}
                    alt={`location`}
                    width={26}
                    height={26}
                  />
                  <span>오시는길</span>
                </Link>
              </section>
            </div>

            {/* Navs */}
            <section className="pt-51 pb-40 bg-white">
              {primaryNavigation.map((item) => {
                const isOpen = mobileOpenIds.includes(item.id);

                return (
                  <details
                    key={item.id}
                    open={isOpen}
                    className="group px-5"
                    onToggle={(e) => {
                      const nextOpen = e.currentTarget.open;

                      setMobileOpenIds((prev) =>
                        nextOpen
                          ? [...prev, item.id].filter(
                              (id, index, array) => array.indexOf(id) === index,
                            )
                          : prev.filter((id) => id !== item.id),
                      );
                    }}
                  >
                    <summary
                      className={`relative px-5 h-15 flex items-center gap-2 border-t border-t-[#EEEEEE] border-b border-b-[#EEEEEE]
                      ${isOpen ? 'bg-[#F7F7F7]' : ''}
                    `}
                    >
                      <Image
                        src={`/icons/common/header/gnb/${isOpen ? 'minus' : 'plus'}.svg`}
                        alt={isOpen ? 'minus' : 'plus'}
                        width={30}
                        height={30}
                      />
                      <span
                        className={`tracking-[-4%] font-medium text-xl text-cm-orange`}
                      >
                        {item.title}
                      </span>

                      <Image
                        src={`/icons/common/header/gnb/symbol.svg`}
                        alt="symbol"
                        width={74}
                        height={65}
                        className="absolute -right-3 top-2"
                      />
                    </summary>

                    {item.children?.length ? (
                      <div className="pl-13 py-2">
                        <ul className="flex flex-col gap-5">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={withLocale(lang, child.href)}
                                className="h-11 flex items-center tracking-[-4%] text-xl text-[#555555]"
                              >
                                {`· ${child.title}`}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </details>
                );
              })}
            </section>

            <section className="fixed left-0 bottom-5 px-5 w-full">
              <div className="relative w-full aspect-[3.98809524/1]">
                <Image src={`/images/temp/banner.png`} alt="banner" fill />
              </div>
            </section>
          </div>
        ) : null}
      </header>

      <div id="header-spacer" className="h-14 xl:h-40" />
    </>
  );
}
