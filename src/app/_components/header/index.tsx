'use client';

import { getPrimaryNavigation } from '@/_lib/navigation';
import {
  closeMacGptSearch,
  openMacGptSearch,
} from '@/app/_components/mac-gpt-search';
import { useScrollDirection } from '@/app/_providers/scroll-direction-provider';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const HEADER_TEXT = {
  button: {
    signIn: '로그인',
  },
  reservation: {
    title: '간편예약',
    desc_1: '연락처를 남겨주시면',
    desc_2: '전문상담원이 예약을 도와드립니다.',
    button_1: '예약',
    button_2: '신청',
  },
} as const;

export default function Header() {
  const headerText = HEADER_TEXT;
  const pathname = usePathname();
  const { isVisible, scrollY } = useScrollDirection();

  const [hoveredPrimaryId, setHoveredPrimaryId] = useState<string | null>(
    'null',
  );

  const primaryNavigation = getPrimaryNavigation();

  const hoveredPrimary = hoveredPrimaryId
    ? (primaryNavigation.find((item) => item.id === hoveredPrimaryId) ?? null)
    : null;

  const shouldHideAiSearch = Boolean(hoveredPrimary?.children?.length);

  const isCurrentPath = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const aiSearchPlaceholder = '무엇이 궁금하신가요?';

  const handleAiSearchOpen = () => {
    openMacGptSearch();
  };

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [mobileOpenIds, setMobileOpenIds] = useState<string[]>(() =>
    primaryNavigation.slice(0, 3).map((item) => item.id),
  );

  const closeHamburgerMenu = () => {
    setIsHamburgerOpen(false);
  };

  const isHeaderVisible = isHamburgerOpen || scrollY <= 72 || isVisible;

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-40 w-full transition-transform duration-300 ease-out will-change-transform
          xl:border-b xl:border-b-[#CCCCCC]
          ${
            isHeaderVisible
              ? 'translate-y-0 pointer-events-auto'
              : '-translate-y-[calc(100%+72px)] pointer-events-none xl:-translate-y-[calc(100%+64px)]'
          }`}
        onMouseLeave={() => setHoveredPrimaryId(null)}
        onTransitionEnd={() => {
          if (!isHeaderVisible) {
            setHoveredPrimaryId(null);
          }
        }}
      >
        {/* Common - GNB */}
        <section className="relative z-50 bg-white">
          <div className="mx-auto max-w-7xl px-5 w-full h-14 flex justify-between items-center xl:h-20">
            <Link
              href={'/'}
              onClick={() => {
                closeMacGptSearch();
                setHoveredPrimaryId(null);
                setIsHamburgerOpen(false);
              }}
              className="relative w-33 aspect-logo flex items-center xl:w-38.75"
            >
              <Image
                src={`/assets/brand/logo.svg`}
                alt="logo"
                style={{ objectFit: 'cover' }}
                fill
              />
            </Link>

            {/* Desktop - GNB */}
            <nav className="hidden xl:flex justify-center items-center">
              {primaryNavigation.map((item) => {
                const isHovered = hoveredPrimary?.id === item.id;
                const hasActiveChild = item.children?.some((child) =>
                  isCurrentPath(child.href),
                );
                const isActive =
                  isHovered || isCurrentPath(item.href) || hasActiveChild;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
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
            <div className="relative right-0 flex items-center gap-3 z-50 xl:gap-4">
              {/* Desktop - Login Button */}
              <Link
                href={'/signin'}
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
                  src={`/assets/icons/header-hamburger.svg`}
                  alt="hamburger"
                  fill
                />
              </button>
            </div>
          </div>
        </section>

        {/* Common - AI Search */}
        <section
          className={`absolute left-0 top-16.5 w-full transition-all duration-200 ease-out z-30
            xl:top-22
            ${
              shouldHideAiSearch
                ? 'invisible -translate-y-2 opacity-0'
                : 'visible translate-y-0 opacity-100'
            }
            `}
        >
          <div className="relative px-4 mx-auto max-w-7xl w-full flex justify-end">
            <form
              className="px-3 py-1.75 w-full flex items-center gap-1 rounded-xl border border-black/5 bg-white shadow-[0_1px_0_0_rgb(55_55_55/0.2)]
              xl:px-4 xl:py-2.5 xl:w-auto xl:bg-[#333333]/50"
              onClick={handleAiSearchOpen}
              onFocusCapture={handleAiSearchOpen}
              onSubmit={(event) => {
                event.preventDefault();
                handleAiSearchOpen();
              }}
            >
              <Image
                src={'/assets/effects/sparkle.gif'}
                alt="sparkle"
                width={32}
                height={32}
              />
              <input
                type="search"
                placeholder={aiSearchPlaceholder}
                className="flex-1 ml-1 font-semibold text-sm text-[#656565]
                xl:min-w-80 xl:font-medium xl:text-white xl:text-base"
              />

              <button type="submit" className="relative shrink-0 w-6.5 h-6.5">
                <Image
                  src={`/assets/icons/header-search.svg`}
                  alt="search"
                  fill
                  className="xl:brightness-300"
                />
              </button>
            </form>
          </div>
        </section>

        {/* Desktop - LNB */}
        {hoveredPrimary?.children?.length ? (
          <section className="relative z-20 border-t border-t-[#CCCCCC]">
            <div className="relative w-full bg-white before:absolute before:left-0 before:top-0 before:w-1/2 before:h-full before:bg-[#EEEEEE]">
              <div className="relative mx-auto max-w-440 grid">
                {primaryNavigation.map((item) => {
                  if (!item.children?.length) return null;

                  const isActive = hoveredPrimary?.id === item.id;
                  const hasThirdDepth = item.children.some(
                    (group) => group.children?.length,
                  );

                  return (
                    <div
                      key={item.id}
                      className={`col-start-1 row-start-1 flex ${
                        isActive
                          ? 'visible opacity-100'
                          : 'invisible opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Reservation */}
                      <section className="px-15 py-10 flex flex-col gap-5 bg-[#EEEEEE]">
                        <h1 className="font-medium text-3xl text-cm-green tracking-[-5%]">
                          {headerText.reservation.title}
                        </h1>

                        <div className="tracking-[-6%]">
                          <p>{headerText.reservation.desc_1}</p>
                          <p>{headerText.reservation.desc_2}</p>
                        </div>

                        <form
                          className="grid grid-cols-[1fr_auto] grid-rows-2 gap-2"
                          onSubmit={(event) => event.preventDefault()}
                        >
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

                          <button
                            type="submit"
                            className="row-span-2 w-25 aspect-square rounded-lg bg-cm-green tracking-[-5%] text-white"
                          >
                            {headerText.reservation.button_1}
                            <br />
                            {headerText.reservation.button_2}
                          </button>
                        </form>
                      </section>

                      {/* LNB */}
                      {hasThirdDepth ? (
                        <section className="min-w-1/2 flex bg-white divide-x divide-[#DDDDDD]">
                          {item.children.map((group) => (
                            <div key={group.id} className="px-10 pt-12 pb-14">
                              <Link
                                href={group.href}
                                className="tracking-[-6%] text-nowrap font-medium text-lg text-[#333333] hover:text-cm-orange"
                              >
                                {group.title}
                              </Link>

                              {group.children?.length ? (
                                <ul className="mt-3 flex flex-col gap-2 w-max">
                                  {group.children.map((child) => (
                                    <li key={child.id} className="flex">
                                      <Link
                                        href={child.href}
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
                          {item.children.map((group) => (
                            <Link
                              key={group.id}
                              href={group.href}
                              className="tracking-[-6%] font-medium text-lg text-[#333333] hover:text-cm-orange"
                            >
                              {group.title}
                            </Link>
                          ))}
                        </section>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* Mobile - Hamburger */}
        {isHamburgerOpen ? (
          <div className="fixed inset-0 z-50 flex h-dvh w-screen max-w-none flex-col overflow-y-auto bg-white">
            {/* GNB */}
            <div className="fixed left-0 top-0 z-10 flex h-51 w-screen max-w-none flex-col border-b border-b-[#EEEEEE] bg-cm-orange px-5">
              {/* Header */}
              <section className="h-14 flex justify-between items-center">
                <Link href={'/'} className="relative">
                  <Image
                    src={`/assets/brand/logo-white.svg`}
                    alt="logo-white"
                    style={{ objectFit: 'cover' }}
                    width={132}
                    height={34}
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    href="/signin"
                    onClick={closeHamburgerMenu}
                    className="relative w-7.5 h-7.5"
                  >
                    <Image
                      src={`/assets/icons/header-profile.svg`}
                      alt="로그인"
                      fill
                    />
                  </Link>

                  <button
                    type="button"
                    className="relative w-7.5 h-7.5"
                    onClick={() => setIsHamburgerOpen(false)}
                  >
                    <Image
                      src={`/assets/icons/header-close.svg`}
                      alt="close"
                      fill
                    />
                  </button>
                </div>
              </section>

              {/* Search */}
              <section className="h-17.5 flex items-center">
                <form
                  className="px-2.5 w-full h-11 flex items-center gap-2 rounded-md bg-white"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <input
                    id="hamburger-search"
                    placeholder="메뉴명을 검색하세요."
                    className="w-full font-medium text-sm placeholder:text-[#CCCCCC]"
                  />

                  <button type="submit" className="relative w-7.5 h-7.5">
                    <Image
                      src={`/assets/icons/header-search.svg`}
                      alt={`search`}
                      fill
                    />
                  </button>
                </form>
              </section>

              {/* Quick Menus */}
              <section className="h-19.5 flex items-center justify-center text-white tracking-[-4%] text-xs">
                <Link
                  href="/about/doctors"
                  onClick={closeHamburgerMenu}
                  className="w-1/4 flex flex-col justify-center items-center gap-2"
                >
                  <Image
                    src={`/assets/icons/header-doctor.svg`}
                    alt="의료진"
                    width={26}
                    height={26}
                  />
                  <span>의료진</span>
                </Link>
              </section>
            </div>

            <div className="flex h-dvh w-full max-w-none flex-col pt-51">
              {/* Navs */}
              <section className="w-full max-w-none flex-1 overflow-y-auto overflow-x-hidden bg-white pb-28">
                {primaryNavigation.map((item) => {
                  if (!item.children?.length) {
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={closeHamburgerMenu}
                        className="relative flex h-15 w-full items-center border-t border-t-[#EEEEEE] border-b border-b-[#EEEEEE] px-10 bg-white"
                      >
                        <span className="tracking-[-4%] font-medium text-xl text-cm-orange">
                          {item.title}
                        </span>

                        <Image
                          src={`/assets/brand/symbol-white.svg`}
                          alt="symbol"
                          width={74}
                          height={65}
                          className="absolute -right-3 top-2"
                        />
                      </Link>
                    );
                  }

                  const isOpen = mobileOpenIds.includes(item.id);

                  return (
                    <details
                      key={item.id}
                      open={isOpen}
                      className="group w-full max-w-none px-0"
                      onToggle={(e) => {
                        const nextOpen = e.currentTarget.open;

                        setMobileOpenIds((prev) =>
                          nextOpen
                            ? [...prev, item.id].filter(
                                (id, index, array) =>
                                  array.indexOf(id) === index,
                              )
                            : prev.filter((id) => id !== item.id),
                        );
                      }}
                    >
                      <summary
                        className={`relative flex h-15 w-full list-none items-center gap-2 border-t border-t-[#EEEEEE] border-b border-b-[#EEEEEE] px-10 [&::-webkit-details-marker]:hidden ${
                          isOpen ? 'bg-[#F7F7F7]' : ''
                        }`}
                      >
                        <Image
                          src={`/assets/icons/header-${
                            isOpen ? 'minus' : 'plus'
                          }.svg`}
                          alt={isOpen ? 'minus' : 'plus'}
                          width={30}
                          height={30}
                        />

                        <span className="tracking-[-4%] font-medium text-xl text-cm-orange">
                          {item.title}
                        </span>

                        <Image
                          src={`/assets/brand/symbol-white.svg`}
                          alt="symbol"
                          width={74}
                          height={65}
                          className="absolute -right-3 top-2"
                        />
                      </summary>

                      <div className="w-full max-w-none py-2 pl-[72px]">
                        <ul className="flex flex-col">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                onClick={closeHamburgerMenu}
                                className="h-11 flex items-center tracking-[-4%] text-xl text-[#555555]"
                              >
                                {`· ${child.title}`}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  );
                })}
              </section>

              <section className="w-full max-w-none bg-white px-5 pb-2">
                <div className="relative w-full aspect-[3.98809524/1]">
                  <Image
                    src={`/assets/images/temp-banner.png`}
                    alt="banner"
                    fill
                  />
                </div>
                ``~
              </section>
            </div>
          </div>
        ) : null}
      </header>

      <div id="header-spacer" className="h-14 xl:h-20" />
    </>
  );
}
