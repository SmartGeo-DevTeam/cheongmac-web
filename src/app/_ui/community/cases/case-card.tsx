'use client';

import MaskedName from '@/app/_components/common/masked-name';
import ContentCard, {
  type ContentCardMedia,
} from '@/app/_components/content-list/card';
import Link from 'next/link';
import { saveCasesListScroll } from '@/app/_lib/community/cases/list-state.client';
import { getInterviewThumbnail, isYouTubeVideoId } from '@/app/_lib/community/cases/youtube-thumbnail';
import { caseCategories, type CasePost } from '@/app/_data/community/cases/cases';

export default function CasesCard({ post }: { post: CasePost }) {
  const category = caseCategories.find((item) => item.id === post.category);

  const media: ContentCardMedia =
    post.kind === 'before-after'
      ? {
          type: 'compare',
          beforeSrc: post.image,
          beforeAlt: post.imageAlt,
          loginRequired: true,
        }
      : post.kind === 'interviews'
        ? isYouTubeVideoId(post.youtubeId)
          ? {
              type: 'video',
              src:
                getInterviewThumbnail(post) ??
                '/video-thumbnail-placeholder.svg',
              alt: `${post.title} 영상 썸네일`,
            }
          : {
              type: 'single',
              src: '/video-thumbnail-placeholder.svg',
              alt: `${post.title} 영상 등록 예정`,
            }
        : { type: 'single', src: post.image, alt: post.imageAlt };

  return (
    <Link
      href={`/community/cases/${post.id}`}
      aria-label={`${post.title} 상세 보기`}
      onClick={(event) => {
        // 새 탭 열기 등은 현재 목록의 스크롤 복원 대상으로 취급하지 않습니다.
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        saveCasesListScroll();
      }}
    >
      <ContentCard media={media} ratio="wide">
        <span className="inline-block rounded-lg bg-ai-subtle px-2.5 py-1.5 text-[14px] font-semibold text-brand xl:text-[18px]">
          {category?.label ?? '기타'}
        </span>

        <h3 className="mt-3 text-mo-heading-2 xl:text-pc-heading-2">
          {post.title}
        </h3>

        <p className="mt-2 text-secondary text-mo-body-2 xl:mt-3 xl:text-pc-body-1">
          {post.description}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2 xl:mt-3">
          <div
            className="flex min-w-0 flex-wrap items-center gap-1 text-tertiary text-mo-body-2
              [&>span+span]:inline-flex [&>span+span]:items-center
              [&>span+span]:before:mr-1 [&>span+span]:before:size-1
              [&>span+span]:before:shrink-0 [&>span+span]:before:rounded-full
              [&>span+span]:before:bg-default
              xl:gap-1.5 xl:text-[18px]
              xl:[&>span+span]:before:mr-1.5 xl:[&>span+span]:before:size-1.5"
          >
            {post.patient && <MaskedName name={post.patient} />}

            {post.views != null && <span>{post.views}회</span>}
            {post.age != null && <span>{post.age}세</span>}
            {post.sex && <span>{post.sex}</span>}
          </div>

          <time
            className="shrink-0 text-tertiary text-mo-label xl:text-[16px] xl:font-medium"
            dateTime={post.date}
          >
            {post.date}
          </time>
        </div>
      </ContentCard>
    </Link>
  );
}
