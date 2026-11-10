import Inner from '@/app/_components/common/inner';
import ContentDetailHeader from '@/app/_components/content-detail/header';
import ContentDetailNavigation from '@/app/_components/content-detail/navigation';
import { Link2 } from 'lucide-react';
import Image from 'next/image';
import type {
  NoticeAttachment,
  NoticeItemType,
} from '@/app/_data/community/notice/notices';

type Neighbor = Pick<NoticeItemType, 'id' | 'title'> | null;

const CATEGORY_LABEL: Record<NoticeItemType['category'], string> = {
  notice: '공지',
  holiday: '휴진',
};

function NoticeAttachments({
  attachments,
}: {
  attachments: NoticeAttachment[];
}) {
  if (!attachments.length) return null;

  return (
    <section
      aria-label="첨부파일"
      className="mt-16 flex min-h-16 overflow-hidden rounded-md border border-default text-[12px]
      xl:mt-20 xl:text-[15px]"
    >
      <div
        className="flex w-10 shrink-0 items-center justify-center bg-subtle font-semibold
        xl:w-28"
      >
        <span className="sr-only xl:not-sr-only">첨부파일</span>
      </div>
      <ul className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3 xl:px-5">
        {attachments.map((attachment, index) => (
          <li key={`${attachment.name}-${index}`} className="min-w-0">
            {attachment.href ? (
              <a
                href={attachment.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-2 hover:text-brand hover:underline"
              >
                <Link2 className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{attachment.name}</span>
              </a>
            ) : (
              <span
                className="inline-flex max-w-full items-center gap-2 text-secondary"
                title="예시 데이터: 첨부파일 URL이 등록되지 않았습니다."
              >
                <Link2 className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{attachment.name}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NoticeDetail({
  item,
  previous,
  next,
  returnTo,
}: {
  item: NoticeItemType;
  previous: Neighbor;
  next: Neighbor;
  returnTo: string;
}) {
  const detail = item.detail;

  return (
    <section id="community-notice-detail">
      <Inner>
        <ContentDetailHeader
          headingLevel="h2"
          badgeVariant="neutral"
          category={CATEGORY_LABEL[item.category]}
          title={item.title}
          date={item.date}
          shareLabel="공지사항 공유하기"
        />

        <div
          className="mt-2
          xl:mt-10 xl:px-50"
        >
          {/* S -- 추후 에디터로 변경 예정인 내용 */}
          {detail?.image && (
            <div className={`relative`}>
              <Image
                src={detail.image}
                alt={detail.imageAlt ?? item.title}
                className="h-auto w-full"
              />
            </div>
          )}

          {detail?.statement && (
            <p
              className="mx-auto mt-5 max-w-xl text-center font-bold text-[16px] leading-[150%] whitespace-pre-line break-keep text-primary
              xl:mt-6 xl:text-[20px]"
            >
              <span className="bg-[linear-gradient(transparent_72%,#FFF1A0_72%)]">
                {detail.statement}
              </span>
            </p>
          )}

          <div
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-6 text-center text-[14px] leading-[160%] break-keep text-primary
            xl:mt-14 xl:gap-9 xl:text-[18px]"
          >
            {detail?.paragraphs?.length ? (
              detail.paragraphs.map((paragraph, index) => (
                <p
                  key={`${item.id}-paragraph-${index}`}
                  className="whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-secondary">상세 내용이 등록되지 않았습니다.</p>
            )}
          </div>

          {!!detail?.facts?.length && (
            <div
              className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-1 text-center text-[12px] leading-[160%] break-keep text-primary
              xl:mt-18 xl:text-[16px]"
            >
              {detail.facts.map((fact) => (
                <p key={`${fact.label}-${fact.value}`}>
                  <strong className="font-semibold">{fact.label}: </strong>
                  {fact.value}
                </p>
              ))}
            </div>
          )}
        </div>

        {detail?.attachments && (
          <NoticeAttachments attachments={detail.attachments} />
        )}

        {/* E -- 추후 에디터로 변경 예정인 내용 */}

        <div className={detail?.attachments?.length ? 'mt-5' : 'mt-16'}>
          <ContentDetailNavigation
            ariaLabel="이전 및 다음 공지사항"
            basePath="/community/notice"
            listHref={returnTo}
            returnTo={returnTo}
            previous={previous}
            next={next}
          />
        </div>
      </Inner>
    </section>
  );
}
