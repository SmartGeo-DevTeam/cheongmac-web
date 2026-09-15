import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import {
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { getNoticeManagedContent } from '@/_lib/managed-pages';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function sortableNoticeDate(value: string) {
  const digits = value.replace(/[^\d]/g, '');
  if (digits.length < 8) return 0;

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return 0;
  }

  return year * 10000 + month * 100 + day;
}

function categoryLabel(kind: string) {
  return kind === 'holiday' ? '휴진안내' : '공지사항';
}

function noticeDescription(notice: {
  lead?: string[];
  paragraphs?: string[];
  emphasis?: string;
}) {
  const lead = notice.lead?.find((line) => line.trim());
  if (lead) return lead;

  const paragraph = notice.paragraphs?.find((line) => line.trim());
  if (paragraph) return paragraph;

  return notice.emphasis?.trim() ?? '';
}

export default async function HomeInfo({
  copy,
  persisted,
}: {
  copy: InlineContentData;
  persisted: boolean;
}) {
  const { notices: managedNotices } =
    await getNoticeManagedContent();

  const notices = [...managedNotices].sort((a, b) => {
    const dateDifference =
      sortableNoticeDate(b.date) - sortableNoticeDate(a.date);

    if (dateDifference !== 0) return dateDifference;

    if (Boolean(a.pinned) !== Boolean(b.pinned)) {
      return a.pinned ? -1 : 1;
    }

    return a.title.localeCompare(b.title, 'ko');
  });

  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 병원소식 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.info}
    >
      <FadeInUp>
        <section className="group/cms-collection relative mt-25 xl:mt-40">
          <CollectionAdminEditButton
            href="/admin/pages/notice"
            label="공지사항"
            className="right-14"
          />

          <MainSectionHeader
            usePaddingHorizontal
            eyebrow={copy.infoEyebrow}
            title={<span>{copy.infoTitle}</span>}
          />

          {notices.length ? (
            <div className="mt-5 overflow-x-auto overflow-y-hidden xl:mt-6">
              <ul className="flex w-max items-stretch gap-3 px-5 text-[#262C35] xl:gap-6 xl:pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] xl:pr-5">
                {notices.map((notice) => {
                  const description =
                    noticeDescription(notice);

                  return (
                    <li
                      key={notice.id}
                      className="relative flex shrink-0"
                    >
                      <ManagedItemEditButton
                        pageKey="notice"
                        itemKey={notice.id}
                        label={notice.title}
                      />

                      <Link
                        href={`/community/notice/${encodeURIComponent(
                          notice.id,
                        )}`}
                        className="flex w-[60vw] flex-col rounded-2xl bg-[#F3F3F3] px-5 pb-10 pt-7 xl:w-[16vw] xl:px-10 xl:pb-15 xl:pt-10"
                      >
                        <div className="flex items-center gap-1.75 text-xs font-medium xl:gap-3 xl:text-sm">
                          <span className="rounded-sm bg-white px-3 py-0.75 xl:px-5 xl:py-1.5">
                            {categoryLabel(notice.kind)}
                          </span>
                          <span>{notice.date}</span>
                        </div>

                        <TypographyH3
                          managed={false}
                          className="mt-3 break-keep text-lg font-extrabold xl:mt-6.5 xl:text-2xl"
                        >
                          {notice.title}
                        </TypographyH3>

                        {description ? (
                          <TypographyP
                            managed={false}
                            className="mt-3 break-keep text-sm leading-[1.65] xl:mt-5 xl:text-xl"
                          >
                            {description}
                          </TypographyP>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="mx-5 mt-6 rounded-xl border border-dashed border-[#D9D9DD] bg-[#FAFAFA] px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#52525B]">
                사용자 페이지에 노출 중인 공지사항이 없습니다.
              </p>
              <p className="mt-2 text-xs leading-5 text-[#8A8A91]">
                관리자 공지사항에서 노출할 항목을 활성화하면
                최신 날짜순으로 이 영역에 표시됩니다.
              </p>
            </div>
          )}

          <div className="mt-5 flex justify-center xl:mx-auto xl:mt-10 xl:w-full xl:max-w-7xl">
            <Link
              href="/community/notice"
              className="flex items-center gap-2 rounded-full bg-[#333333] px-10 py-2.5 text-white xl:text-xl"
            >
              <span>{copy.infoMoreLabel}</span>
              <ArrowRight size={18} color="#FFFFFF" />
            </Link>
          </div>
        </section>
      </FadeInUp>
    </EditablePageCopyRegion>
  );
}
