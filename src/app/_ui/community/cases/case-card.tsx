'use client';

import CaseCategoryBadge from '@/app/_components/community/cases/category-badge';
import CaseDescription from '@/app/_components/community/cases/case-description';
import CaseTitle from '@/app/_components/community/cases/case-title';
import CasePatientMeta from '@/app/_components/community/cases/patient-meta';
import ContentCard, {
  type ContentCardMedia,
} from '@/app/_components/content-list/card';
import Link from 'next/link';
import { saveCasesListScroll } from '@/app/_lib/community/cases/list-state.client';
import {
  getInterviewThumbnail,
  isYouTubeVideoId,
} from '@/app/_lib/community/cases/youtube-thumbnail';
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
        <CaseCategoryBadge label={category?.label ?? '기타'} />
        <CaseTitle>{post.title}</CaseTitle>
        <CaseDescription>{post.description}</CaseDescription>
        <div className="mt-2 flex items-center justify-between gap-2 xl:mt-3">
          <CasePatientMeta
            patient={post.patient}
            views={post.views}
            age={post.age}
            sex={post.sex}
          />
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
