'use client';

/* eslint-disable @next/next/no-img-element */

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import { useInlineEditMode } from '@/app/_providers/inline-edit-provider';
import {
  H2 as TypographyH2,
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { notoSerifKR } from '@/_lib/fonts';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AboutIntroductionContributionActivity,
  AboutIntroductionHistoryPeriod,
  AboutIntroductionHistoryYear,
  AboutIntroductionOverviewRow,
  AboutIntroductionPromise,
  AboutIntroductionQuickLink,
  AboutIntroductionSpecialtyCard,
  AboutIntroductionWhyPoint,
} from '../_data';

type AboutTab = 'intro' | 'history' | 'contribution';

type LatestNewsItem = {
  id: number;
  title: string;
  date: string;
  imageSrc: string;
};

const TAB_ITEMS: Array<{ value: AboutTab; key: string }> = [
  { value: 'intro', key: 'tabIntro' },
  { value: 'history', key: 'tabHistory' },
  { value: 'contribution', key: 'tabContribution' },
];

const HISTORY_PERIODS: Array<{
  value: AboutIntroductionHistoryPeriod;
  copyKey: string;
}> = [
  { value: 'growth', copyKey: 'historyGrowthLabel' },
  { value: 'root', copyKey: 'historyRootLabel' },
  { value: 'future', copyKey: 'historyFutureLabel' },
];

const INTRO_SPLASH_SECONDS = 2;
const INTRO_SPLASH_DURATION_MS =
  INTRO_SPLASH_SECONDS * 1000;
const INTRO_SPLASH_FADE_MS = 700;

type IntroSplashPhase =
  | 'visible'
  | 'fading'
  | 'hidden';

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <TypographyP managed={false} className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#1A8E7A] xl:text-sm">
      {children}
    </TypographyP>
  );
}


function IntroSplash({
  copy,
  phase,
}: {
  copy: InlineContentData;
  phase: IntroSplashPhase;
}) {
  if (phase === 'hidden') return null;

  return (
    <div
      data-about-intro-splash
      data-phase={phase}
      className={`fixed inset-0 z-[200] flex h-screen min-h-[100dvh] w-screen items-center justify-center bg-white px-5 text-center transition-opacity ease-out motion-reduce:transition-none ${
        phase === 'fading'
          ? 'pointer-events-none opacity-0'
          : 'opacity-100'
      }`}
      style={{
        transitionDuration: `${INTRO_SPLASH_FADE_MS}ms`,
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionEyebrow>{copy.introEyebrow}</SectionEyebrow>
        <TypographyH2
          managed={false}
          className="mt-4 break-keep text-[30px] font-bold leading-[1.45] tracking-[-0.05em] text-[#262C35] sm:text-[38px] xl:text-[48px]"
        >
          {copy.introTitle1}
          <br />
          {copy.introTitle2}
        </TypographyH2>
      </div>
    </div>
  );
}

function TopTabs({
  activeTab,
  setActiveTab,
  copy,
}: {
  activeTab: AboutTab;
  setActiveTab: (tab: AboutTab) => void;
  copy: InlineContentData;
}) {
  return (
    <nav
      aria-label="청맥병원 소개 페이지"
      className="mx-auto grid w-full max-w-[560px] grid-cols-3 border-b border-[#C8CDD2]"
    >
      {TAB_ITEMS.map((item) => {
        const active = item.value === activeTab;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setActiveTab(item.value)}
            className={`relative h-12 text-sm font-medium transition xl:h-14 xl:text-base ${
              active
                ? 'font-semibold text-[#FD7740]'
                : 'text-[#A1A6AC] hover:text-[#525860]'
            }`}
          >
            {copy[item.key]}
            {active ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#FD7740]" />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function IntroTab({
  copy,
  persisted,
  specialtyCards,
  whyPoints,
  promises,
  quickLinks,
  overviewRows,
}: {
  copy: InlineContentData;
  persisted: boolean;
  specialtyCards: AboutIntroductionSpecialtyCard[];
  whyPoints: AboutIntroductionWhyPoint[];
  promises: AboutIntroductionPromise[];
  quickLinks: AboutIntroductionQuickLink[];
  overviewRows: AboutIntroductionOverviewRow[];
}) {
  const leftWhy = whyPoints.filter((item) => item.side === 'left');
  const rightWhy = whyPoints.filter((item) => item.side === 'right');

  return (
    <>
      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="대한민국 혈관특별시 소개 문구"
        fieldKeys={[
          'introStatementLead',
          'introStatementAccent',
          'introStatementTail',
        ]}
        className="relative"
      >
        <section className="mx-auto max-w-5xl px-5 pb-16 pt-20 text-center xl:pb-28 xl:pt-28">
          <TypographyP managed={false} className="text-base font-semibold text-[#262C35] xl:text-xl">
            {copy.introStatementLead}
          </TypographyP>
          <TypographyP managed={false} className="mx-auto mt-2 w-fit bg-[#FD7740] px-3 py-1.5 text-xl font-bold tracking-[-0.04em] text-white xl:text-[34px]">
            {copy.introStatementAccent}
          </TypographyP>
          <TypographyP managed={false} className="mt-2 text-xl font-bold tracking-[-0.04em] text-[#262C35] xl:text-[34px]">
            {copy.introStatementTail}
          </TypographyP>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="청맥병원 소개 본문·건물 이미지"
        fieldKeys={[
          'buildingImage',
          'buildingAlt',
          'buildingDescriptionPrimary',
          'buildingDescriptionSecondary',
          'buildingDescriptionClosingLead',
          'buildingPhilosophyLead',
          'buildingPhilosophyAccent',
          'buildingPhilosophySuffix',
          'buildingDescriptionClosing',
        ]}
        className="relative"
      >
        <section
          data-about-building-feature
          className="mx-auto grid w-full max-w-[1280px] overflow-hidden bg-white pb-20 xl:grid-cols-[minmax(0,737px)_minmax(0,543px)] xl:items-stretch xl:pb-32"
        >
          <div className="bg-[#F4F6F7] xl:h-[868px]">
            <img
              src={copy.buildingImage}
              alt={copy.buildingAlt}
              className="block aspect-[737/868] h-auto w-full object-cover xl:h-[868px] xl:aspect-auto"
            />
          </div>

          <div
            data-about-building-story
            className="flex items-center px-5 py-12 sm:px-8 lg:px-10 xl:min-h-[868px] xl:px-[42px] xl:py-16"
          >
            <div className="mx-auto w-full max-w-[500px] text-[#27303B]">
              <TypographyP
                managed={false}
                className="whitespace-pre-line break-keep text-[15px] font-medium leading-[1.85] tracking-[-0.035em] sm:text-base xl:text-[18px] xl:leading-[1.85]"
              >
                {copy.buildingDescriptionPrimary}
              </TypographyP>

              <TypographyP
                managed={false}
                className="mt-8 whitespace-pre-line break-keep text-[15px] font-medium leading-[1.85] tracking-[-0.035em] sm:text-base xl:mt-10 xl:text-[18px] xl:leading-[1.85]"
              >
                {copy.buildingDescriptionSecondary}
              </TypographyP>

              <div className="mt-8 xl:mt-10">
                <TypographyP
                  managed={false}
                  className="break-keep text-[15px] font-medium leading-[1.85] tracking-[-0.035em] sm:text-base xl:text-[18px] xl:leading-[1.85]"
                >
                  {copy.buildingDescriptionClosingLead}
                </TypographyP>

                <TypographyP
                  managed={false}
                  className="mt-2 break-keep text-[15px] font-medium leading-[1.9] tracking-[-0.035em] sm:text-base xl:mt-3 xl:text-[18px]"
                >
                  {copy.buildingPhilosophyLead}{' '}
                  <span
                    data-about-philosophy-accent
                    className={`${notoSerifKR.className} inline-block align-[-0.06em] text-[22px] font-bold leading-none tracking-[-0.05em] text-[#007A67] sm:text-[24px] xl:text-[29px]`}
                  >
                    {copy.buildingPhilosophyAccent}
                  </span>
                  {copy.buildingPhilosophySuffix}
                </TypographyP>

                <TypographyP
                  managed={false}
                  className="mt-1 break-keep text-[15px] font-medium leading-[1.85] tracking-[-0.035em] sm:text-base xl:text-[18px] xl:leading-[1.85]"
                >
                  {copy.buildingDescriptionClosing}
                </TypographyP>
              </div>
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="혈관 전문진료 영역"
        fieldKeys={[
          'specialtiesEyebrow',
          'specialtiesTitle',
          'specialtiesDescription',
        ]}
        className="group/cms-collection relative"
      >
        <section className="relative overflow-hidden bg-[#002F31] py-16 xl:py-24">
          <CollectionAdminEditButton
            href="/admin/pages/about-introduction?type=specialty-card"
            label="혈관 전문진료 카드"
            className="right-5 top-5"
          />
          <div className="mx-auto max-w-7xl px-5 xl:px-0">
            <div className="text-center text-white">
              <TypographyP managed={false} className="text-xs font-semibold tracking-[0.18em] text-[#61C6B5] xl:text-sm">
                {copy.specialtiesEyebrow}
              </TypographyP>
              <TypographyH2
                managed={false}
                className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white xl:text-[34px]"
              >
                {copy.specialtiesTitle}
              </TypographyH2>
              <TypographyP
                managed={false}
                className="mx-auto mt-3 max-w-2xl whitespace-pre-line break-keep text-sm leading-7 text-white/70 xl:text-base"
              >
                {copy.specialtiesDescription}
              </TypographyP>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7 xl:gap-4">
              {specialtyCards.map((item) => (
                <article
                  key={item.itemKey}
                  className="relative overflow-hidden rounded-2xl bg-white text-[#262C35]"
                >
                  <div className="px-4 pb-2 pt-5">
                    <TypographyH3
                      managed={false}
                      className="text-base font-bold text-[#0B755F] xl:text-lg"
                    >
                      {item.title}
                    </TypographyH3>
                    <TypographyP
                      managed={false}
                      className="mt-2 line-clamp-3 text-xs leading-5 text-[#6C7279]"
                    >
                      {item.description}
                    </TypographyP>
                  </div>
                  <img
                    src={item.image}
                    alt=""
                    className="mt-1 aspect-[4/3] w-full object-cover"
                  />
                  <ManagedItemEditButton
                    pageKey="about-introduction"
                    itemKey={item.itemKey}
                    label={item.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="청맥 이야기 영역"
        fieldKeys={[
          'storiesEyebrow',
          'storiesTitle',
          'storiesImage',
          'storiesImageAlt',
        ]}
        className="relative"
      >
        <section className="bg-[linear-gradient(180deg,#F8FCFF_0%,#EAF6FE_100%)] py-16 xl:py-24">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <SectionEyebrow>{copy.storiesEyebrow}</SectionEyebrow>
            <TypographyH2
              managed={false}
              className="mt-3 whitespace-pre-line text-2xl font-bold leading-[1.45] tracking-[-0.04em] text-[#262C35] xl:text-[34px]"
            >
              {copy.storiesTitle}
            </TypographyH2>
            <img
              src={copy.storiesImage}
              alt={copy.storiesImageAlt}
              className="mx-auto mt-10 w-full max-w-[620px] object-contain xl:mt-14"
            />
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="WHY 청맥 영역"
        fieldKeys={[
          'whyEyebrow',
          'whyTitle',
          'whyDescription',
          'whyCenterImage',
          'whyCenterAlt',
        ]}
        className="group/cms-collection relative"
      >
        <section className="py-20 xl:py-32">
          <CollectionAdminEditButton
            href="/admin/pages/about-introduction?type=why-point"
            label="WHY 청맥 이유"
            className="right-5 top-5"
          />
          <div className="mx-auto max-w-6xl px-5 xl:px-0">
            <div className="text-center">
              <SectionEyebrow>{copy.whyEyebrow}</SectionEyebrow>
              <TypographyH2
                managed={false}
                className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#262C35] xl:text-[34px]"
              >
                {copy.whyTitle}
              </TypographyH2>
              <TypographyP
                managed={false}
                className="mx-auto mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-[#72777D] xl:text-base"
              >
                {copy.whyDescription}
              </TypographyP>
            </div>

            <div className="mt-12 grid items-center gap-8 xl:grid-cols-[1fr_300px_1fr] xl:gap-10">
              <div className="space-y-4">
                {leftWhy.map((item) => (
                  <article
                    key={item.itemKey}
                    className="relative rounded-full border border-[#E5E7E9] bg-white px-5 py-4 text-center shadow-[0_6px_22px_rgba(0,0,0,0.035)]"
                  >
                    <TypographyP managed={false} className="text-sm font-bold text-[#FD7740] xl:text-base">
                      {item.title}
                    </TypographyP>
                    <TypographyP managed={false} className="mt-1 text-xs leading-5 text-[#747A80]">
                      {item.description}
                    </TypographyP>
                    <ManagedItemEditButton
                      pageKey="about-introduction"
                      itemKey={item.itemKey}
                      label={item.title}
                    />
                  </article>
                ))}
              </div>

              <div className="mx-auto overflow-hidden rounded-full border-[10px] border-[#FFF1EB] p-2 shadow-[0_0_0_1px_#FD7740]">
                <img
                  src={copy.whyCenterImage}
                  alt={copy.whyCenterAlt}
                  className="aspect-square w-[220px] rounded-full object-cover xl:w-[260px]"
                />
              </div>

              <div className="space-y-4">
                {rightWhy.map((item) => (
                  <article
                    key={item.itemKey}
                    className="relative rounded-full border border-[#E5E7E9] bg-white px-5 py-4 text-center shadow-[0_6px_22px_rgba(0,0,0,0.035)]"
                  >
                    <TypographyP managed={false} className="text-sm font-bold text-[#FD7740] xl:text-base">
                      {item.title}
                    </TypographyP>
                    <TypographyP managed={false} className="mt-1 text-xs leading-5 text-[#747A80]">
                      {item.description}
                    </TypographyP>
                    <ManagedItemEditButton
                      pageKey="about-introduction"
                      itemKey={item.itemKey}
                      label={item.title}
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="청맥의 약속 영역"
        fieldKeys={[
          'promiseEyebrow',
          'promiseTitle',
          'promiseBackgroundImage',
        ]}
        className="group/cms-collection relative"
      >
        <section className="mx-auto w-full max-w-6xl px-5 pb-12 xl:px-0 xl:pb-16">
          <div
            className="relative overflow-hidden rounded-[24px] bg-[#28393D] px-5 py-14 xl:px-10 xl:py-20"
            style={{
              backgroundImage: `linear-gradient(rgba(25,42,45,.76),rgba(25,42,45,.76)),url('${copy.promiseBackgroundImage}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <CollectionAdminEditButton
              href="/admin/pages/about-introduction?type=promise"
              label="청맥의 약속"
              className="right-4 top-4"
            />
            <div className="text-center">
              <TypographyP managed={false} className="text-xs font-semibold tracking-[0.16em] text-[#9ED8CD]">
                {copy.promiseEyebrow}
              </TypographyP>
              <TypographyH2
                managed={false}
                className="mt-2 text-2xl font-bold text-white xl:text-[34px]"
              >
                {copy.promiseTitle}
              </TypographyH2>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-3">
              {promises.map((item) => (
                <article
                  key={item.itemKey}
                  className="relative rounded-2xl bg-white/95 p-5 backdrop-blur"
                >
                  <TypographyP managed={false} className="text-sm font-bold text-[#0D7A67]">
                    {item.numberLabel}
                  </TypographyP>
                  <TypographyH3
                    managed={false}
                    className="mt-2 text-lg font-bold leading-7 text-[#262C35]"
                  >
                    {item.title}
                  </TypographyH3>
                  <TypographyP
                    managed={false}
                    className="mt-2 text-sm leading-6 text-[#6C7279]"
                  >
                    {item.description}
                  </TypographyP>
                  <ManagedItemEditButton
                    pageKey="about-introduction"
                    itemKey={item.itemKey}
                    label={item.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="병원소개 관련 링크"
        fieldKeys={['quickLinksTitle']}
        className="group/cms-collection relative"
      >
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 xl:px-0 xl:pb-32">
          <CollectionAdminEditButton
            href="/admin/pages/about-introduction?type=quick-link"
            label="관련 링크"
            className="right-5 top-0"
          />
          <div className="grid overflow-hidden rounded-xl bg-[#F5F6F7] sm:grid-cols-[1fr_auto]">
            <TypographyP managed={false} className="px-5 py-4 text-sm font-semibold text-[#3F454B]">
              {copy.quickLinksTitle}
            </TypographyP>
            <div className="grid grid-cols-2">
              {quickLinks.map((item) => (
                <div key={item.itemKey} className="relative">
                  <Link
                    href={item.href}
                    className="flex h-full min-w-[140px] items-center justify-between gap-4 border-l border-white bg-white/70 px-4 py-4 text-sm font-semibold text-[#525860] hover:bg-white"
                  >
                    {item.label}
                    <ChevronRight className="size-4" />
                  </Link>
                  <ManagedItemEditButton
                    pageKey="about-introduction"
                    itemKey={item.itemKey}
                    label={item.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="청맥병원 개요"
        fieldKeys={[
          'overviewTitle',
          'overviewImage',
          'overviewImageAlt',
        ]}
        className="group/cms-collection relative"
      >
        <section className="mx-auto max-w-6xl px-5 pb-24 xl:px-0 xl:pb-36">
          <CollectionAdminEditButton
            href="/admin/pages/about-introduction?type=overview-row"
            label="청맥병원 개요"
            className="right-5 top-0"
          />
          <TypographyH2
            managed={false}
            className="text-center text-2xl font-bold tracking-[-0.04em] text-[#262C35] xl:text-[34px]"
          >
            {copy.overviewTitle}
          </TypographyH2>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_1fr] xl:items-start xl:gap-10">
            <img
              src={copy.overviewImage}
              alt={copy.overviewImageAlt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <dl className="divide-y divide-[#D7DADD] border-y border-[#BFC4C8]">
              {overviewRows.map((item) => (
                <div
                  key={item.itemKey}
                  className="relative grid grid-cols-[92px_1fr] gap-3 px-1 py-3.5 text-sm xl:grid-cols-[120px_1fr] xl:text-base"
                >
                  <dt className="font-semibold text-[#565C63]">{item.label}</dt>
                  <dd className="whitespace-pre-line break-keep text-[#262C35]">
                    {item.value}
                  </dd>
                  <ManagedItemEditButton
                    pageKey="about-introduction"
                    itemKey={item.itemKey}
                    label={item.label}
                  />
                </div>
              ))}
            </dl>
          </div>
        </section>
      </EditablePageCopyRegion>
    </>
  );
}

function HistoryTab({
  copy,
  persisted,
  historyYears,
}: {
  copy: InlineContentData;
  persisted: boolean;
  historyYears: AboutIntroductionHistoryYear[];
}) {
  const [period, setPeriod] =
    useState<AboutIntroductionHistoryPeriod>('growth');

  const years = useMemo(
    () =>
      historyYears
        .filter((item) => item.period === period)
        .sort((a, b) => b.year - a.year),
    [historyYears, period],
  );

  return (
    <EditablePageCopyRegion
      path="/about/introduction"
      copy={copy}
      persisted={persisted}
      label="청맥병원 연혁"
      fieldKeys={[
        'historyHeroImage',
        'historyHeroAlt',
        'historySectionTitle',
        'historyEmptyText',
        'historyGrowthLabel',
        'historyRootLabel',
        'historyFutureLabel',
      ]}
      className="group/cms-collection relative"
    >
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-24 pt-14 xl:grid-cols-[1.08fr_0.92fr] xl:gap-16 xl:px-0 xl:pb-36 xl:pt-24">
        <CollectionAdminEditButton
          href="/admin/pages/about-introduction?type=history-year"
          label="청맥병원 연혁"
          className="right-5 top-5"
        />

        <div className="xl:sticky xl:top-28 xl:self-start">
          <img
            src={copy.historyHeroImage}
            alt={copy.historyHeroAlt}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F5F5F5] p-2 xl:grid-cols-3">
            {HISTORY_PERIODS.map((item) => {
              const active = item.value === period;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setPeriod(item.value)}
                  className={`min-h-12 rounded-xl px-4 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#006656] text-white'
                      : 'text-[#8C9197] hover:bg-white'
                  }`}
                >
                  {active ? '• ' : ''}
                  {copy[item.copyKey]}
                </button>
              );
            })}
          </div>

          <TypographyP managed={false} className="mt-5 text-sm font-semibold text-[#262C35]">
            {copy.historySectionTitle}
          </TypographyP>

          {years.length ? (
            <div className="relative mt-6 border-l border-[#C9CDD1] pl-7">
              {years.map((item) => (
                <article
                  key={item.itemKey}
                  className="relative pb-12 last:pb-0"
                >
                  <span className="absolute -left-[34px] top-2 size-3 rounded-full border-[3px] border-[#FFD5C4] bg-[#FD7740]" />
                  <div className="relative">
                    <TypographyH2
                      managed={false}
                      className="text-3xl font-medium tracking-[-0.04em] text-[#262C35] xl:text-[38px]"
                    >
                      {item.year}
                    </TypographyH2>
                    {item.title ? (
                      <TypographyP managed={false} className="mt-2 text-base font-bold text-[#006656]">
                        {item.title}
                      </TypographyP>
                    ) : null}
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-[#454B52] xl:text-base">
                      {item.details.map((detail) => (
                        <li key={detail} className="relative pl-4">
                          <span className="absolute left-0 top-[0.7em] size-1 rounded-full bg-[#525860]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <ManagedItemEditButton
                      pageKey="about-introduction"
                      itemKey={item.itemKey}
                      label={`${item.year} 연혁`}
                    />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-[#F7F8F8] px-5 py-14 text-center text-sm text-[#8C9197]">
              {copy.historyEmptyText}
            </div>
          )}
        </div>
      </section>
    </EditablePageCopyRegion>
  );
}

function ContributionTab({
  copy,
  persisted,
  latestNews,
  contributionActivities,
}: {
  copy: InlineContentData;
  persisted: boolean;
  latestNews: LatestNewsItem[];
  contributionActivities: AboutIntroductionContributionActivity[];
}) {
  return (
    <>
      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="사회공헌 최근 소식"
        fieldKeys={[
          'contributionRecentTitle',
          'contributionMoreLabel',
        ]}
        className="relative"
      >
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 xl:px-0 xl:pb-24 xl:pt-24">
          <div className="mb-5 flex items-center justify-between">
            <TypographyH2
              managed={false}
              className="text-lg font-bold text-[#262C35] xl:text-xl"
            >
              {copy.contributionRecentTitle}
            </TypographyH2>
            <Link
              href="/community/news"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8C9197] hover:text-[#262C35]"
            >
              {copy.contributionMoreLabel}
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-5">
            {latestNews.map((item) => (
              <article
                key={item.id}
                className="relative overflow-hidden rounded-xl bg-[#F4F4F4]"
              >
                <Link href={`/community/news/${item.id}`} className="block">
                  <img
                    src={item.imageSrc}
                    alt=""
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="px-3 py-3">
                    <time className="text-[11px] text-[#A1A6AC]">
                      {item.date}
                    </time>
                    <TypographyP managed={false} className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#30363C]">
                      {item.title}
                    </TypographyP>
                  </div>
                </Link>
                <ManagedItemEditButton
                  pageKey="news"
                  itemKey={String(item.id)}
                  label={item.title}
                />
              </article>
            ))}
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="사회공헌 소개"
        fieldKeys={[
          'contributionEyebrow',
          'contributionTitle',
          'contributionHeroImage',
          'contributionHeroAlt',
        ]}
        className="relative"
      >
        <section className="mx-auto grid max-w-5xl gap-8 px-5 py-10 xl:grid-cols-[1fr_1fr] xl:items-center xl:gap-16 xl:py-20">
          <img
            src={copy.contributionHeroImage}
            alt={copy.contributionHeroAlt}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <div className="text-center xl:text-left">
            <TypographyP managed={false} className="text-xs font-semibold text-[#FD7740]">
              {copy.contributionEyebrow}
            </TypographyP>
            <TypographyH2
              managed={false}
              className="mt-3 whitespace-pre-line break-keep text-2xl font-bold leading-[1.5] tracking-[-0.04em] text-[#262C35] xl:text-[36px]"
            >
              {copy.contributionTitle}
            </TypographyH2>
          </div>
        </section>
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/about/introduction"
        copy={copy}
        persisted={persisted}
        label="사회공헌 활동"
        fieldKeys={[
          'contributionActivitiesTitle',
          'contributionActivitiesDescription',
        ]}
        className="group/cms-collection relative"
      >
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 xl:px-0 xl:pb-36 xl:pt-16">
          <CollectionAdminEditButton
            href="/admin/pages/about-introduction?type=contribution-activity"
            label="사회공헌 활동"
            className="right-5 top-5"
          />
          <div className="grid gap-8 xl:grid-cols-[260px_1fr] xl:gap-12">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#59BBAA]" />
                <TypographyH2
                  managed={false}
                  className="text-xl font-bold tracking-[-0.04em] text-[#262C35] xl:text-2xl"
                >
                  {copy.contributionActivitiesTitle}
                </TypographyH2>
              </div>
              <TypographyP
                managed={false}
                className="mt-3 whitespace-pre-line text-sm leading-6 text-[#7B8086]"
              >
                {copy.contributionActivitiesDescription}
              </TypographyP>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-7">
              {contributionActivities.map((item) => (
                <article key={item.itemKey} className="relative">
                  <img
                    src={item.image}
                    alt=""
                    className="aspect-[16/10] w-full rounded-xl object-cover"
                  />
                  <TypographyP managed={false} className="mt-2 break-keep text-sm font-medium leading-5 text-[#3D434A]">
                    {item.title}
                  </TypographyP>
                  {item.description ? (
                    <TypographyP managed={false} className="mt-1 text-xs leading-5 text-[#8A8F95]">
                      {item.description}
                    </TypographyP>
                  ) : null}
                  <ManagedItemEditButton
                    pageKey="about-introduction"
                    itemKey={item.itemKey}
                    label={item.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      </EditablePageCopyRegion>
    </>
  );
}

export default function AboutIntroductionContent({
  copy,
  copyPersisted,
  specialtyCards,
  whyPoints,
  promises,
  quickLinks,
  overviewRows,
  historyYears,
  contributionActivities,
  latestNews,
}: {
  copy: InlineContentData;
  copyPersisted: boolean;
  specialtyCards: AboutIntroductionSpecialtyCard[];
  whyPoints: AboutIntroductionWhyPoint[];
  promises: AboutIntroductionPromise[];
  quickLinks: AboutIntroductionQuickLink[];
  overviewRows: AboutIntroductionOverviewRow[];
  historyYears: AboutIntroductionHistoryYear[];
  contributionActivities: AboutIntroductionContributionActivity[];
  latestNews: LatestNewsItem[];
}) {
  const [activeTab, setActiveTab] = useState<AboutTab>('intro');
  const { canEdit, editMode } = useInlineEditMode();
  const [splashRun, setSplashRun] = useState(0);
  const [splashPhase, setSplashPhase] =
    useState<IntroSplashPhase>('visible');

  useEffect(() => {
    setSplashPhase('visible');

    const fadeTimer = window.setTimeout(() => {
      setSplashPhase('fading');
    }, INTRO_SPLASH_DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      setSplashPhase('hidden');
    }, INTRO_SPLASH_DURATION_MS + INTRO_SPLASH_FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [splashRun]);

  useEffect(() => {
    if (splashPhase === 'hidden') return;

    const htmlOverflow =
      document.documentElement.style.overflow;
    const bodyOverflow =
      document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow =
        htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [splashPhase]);

  return (
    <>
      <IntroSplash
        copy={copy}
        phase={splashPhase}
      />

      <div className="relative">
        {canEdit &&
        editMode &&
        splashPhase === 'hidden' ? (
          <EditablePageCopyRegion
            path="/about/introduction"
            copy={copy}
            persisted={copyPersisted}
            label="인트로 화면 문구"
            fieldKeys={[
              'introEyebrow',
              'introTitle1',
              'introTitle2',
            ]}
            className="mx-auto mt-5 w-full max-w-7xl px-5 xl:px-0"
          >
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-cm-orange/35 bg-[#FFF9F5] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <TypographyP
                  managed={false}
                  className="text-xs font-semibold text-cm-orange"
                >
                  인트로 화면 편집
                </TypographyP>
                <TypographyP
                  managed={false}
                  className="mt-1 break-keep text-sm font-semibold text-[#3F3F46]"
                >
                  {copy.introTitle1} {copy.introTitle2}
                </TypographyP>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSplashRun((current) => current + 1)
                }
                className="shrink-0 rounded-lg border border-cm-orange/25 bg-white px-3 py-2 text-xs font-semibold text-cm-orange hover:bg-[#FFF2E8]"
              >
                2초 인트로 다시 보기
              </button>
            </div>
          </EditablePageCopyRegion>
        ) : null}

        <EditablePageCopyRegion
          path="/about/introduction"
          copy={copy}
          persisted={copyPersisted}
          label="청맥병원 소개 탭"
        fieldKeys={['tabIntro', 'tabHistory', 'tabContribution']}
        className="relative"
      >
        <div className="mx-auto max-w-7xl px-5 pt-8 xl:px-0 xl:pt-14">
          <TopTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            copy={copy}
          />
        </div>
      </EditablePageCopyRegion>

      {activeTab === 'intro' ? (
        <IntroTab
          copy={copy}
          persisted={copyPersisted}
          specialtyCards={specialtyCards}
          whyPoints={whyPoints}
          promises={promises}
          quickLinks={quickLinks}
          overviewRows={overviewRows}
        />
      ) : null}

      {activeTab === 'history' ? (
        <HistoryTab
          copy={copy}
          persisted={copyPersisted}
          historyYears={historyYears}
        />
      ) : null}

      {activeTab === 'contribution' ? (
        <ContributionTab
          copy={copy}
          persisted={copyPersisted}
          latestNews={latestNews}
          contributionActivities={contributionActivities}
        />
      ) : null}
      </div>
    </>
  );
}
