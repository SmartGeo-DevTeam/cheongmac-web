import Inner from '@/app/_components/common/inner';
import ContentDetailHeader from '@/app/_components/content-detail/header';
import ContentDetailNavigation from '@/app/_components/content-detail/navigation';
import { ChevronRight, LockKeyhole } from 'lucide-react';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { CaseDetailPublic } from '@/app/_lib/community/cases/public-detail';
import type { ProtectedCaseDetail } from '@/app/_lib/community/cases/protected-detail.server';
import { isYouTubeVideoId } from '@/app/_lib/community/cases/youtube-thumbnail';
import type { CasePost } from '@/app/_data/community/cases/cases';
import { caseCategories } from '@/app/_data/community/cases/cases';

type Neighbor = Pick<CasePost, 'id' | 'title'> | null;

type Props = {
  post: CasePost;
  detail: CaseDetailPublic;
  protectedDetail: ProtectedCaseDetail | null;
  previous: Neighbor;
  next: Neighbor;
};

const signInHref = (id: string) =>
  `/signin?callbackURL=${encodeURIComponent(`/community/cases/${id}`)}`;

function LockedAfter({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`
        px-5 flex flex-col items-center justify-center text-center leading-[120%]
        ${
          compact
            ? 'absolute inset-0 z-10 gap-2 bg-black/20 px-2 text-white'
            : 'gap-3 rounded-xl bg-[#329A86] px-5 py-8 text-white xl:min-h-40'
        }`}
    >
      <LockKeyhole
        className="size-6 text-accent-ai
      xl:size-9"
      />
      <p
        className="font-medium text-[14px]
        xl:mt-2 xl:text-[20px]"
      >
        로그인 후 자세한 내용을 확인하세요
      </p>
      {!compact && (
        <Link
          href={signInHref(id)}
          className="mt-2 px-5 py-2 rounded-full bg-white font-semibold text-gray-900 text-[13px]
          xl:mt-5 xl:text-[16px]"
        >
          로그인하기
        </Link>
      )}
    </div>
  );
}

function ComparisonImage({
  id,
  beforeSrc,
  beforeAlt,
  afterUrl,
  locked,
  caption = false,
}: {
  id: string;
  beforeSrc: ImageProps['src'];
  beforeAlt: string;
  afterUrl?: string;
  locked: boolean;
  caption?: boolean;
}) {
  // 검사 이미지 전용 레이아웃
  if (caption) {
    return (
      <div
        className="grid grid-cols-2 gap-3
        xl:gap-5"
      >
        {/* Before */}
        <div className="min-w-0">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover"
              sizes="(min-width:1280px) 260px, 50vw"
            />
          </div>

          <div className="mt-3 text-center">
            <h3
              className="font-bold text-[#693847] text-[16px]
              xl:text-[20px]"
            >
              Before
            </h3>
            <p
              className="mt-2 text-gray-500 text-[11px] leading-[150%]
              xl:text-[13px]"
            >
              치료 전 영상 검사
            </p>
          </div>
        </div>

        {/* After */}
        <div className="relative min-w-0 overflow-hidden rounded-lg">
          {locked ? (
            <>
              {/* 공개 이미지만 사용한 블러 미리보기 */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none blur-[10px]"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={beforeSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 260px, 50vw"
                  />
                </div>

                <div className="mt-3 text-center">
                  <h3
                    className="font-bold text-[#693847] text-[16px]
                    xl:text-[20px]"
                  >
                    After
                  </h3>
                  <p
                    className="mt-2 text-gray-500 text-[11px] leading-[150%]
                    xl:text-[13px]"
                  >
                    치료 후 영상 검사
                  </p>
                </div>
              </div>

              {/* 로그인 안내 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 bg-white/15 text-center z-10">
                <LockKeyhole className="size-6 text-accent-ai" />
                <p
                  className="font-medium text-gray-900 text-[12px] leading-[150%]
                  xl:text-[14px]"
                >
                  로그인 후 자세한 내용을 확인하세요
                </p>
              </div>

              <Link
                href={signInHref(id)}
                aria-label="로그인하고 치료 후 검사 이미지 보기"
                className="absolute inset-0 z-20"
              />
            </>
          ) : (
            <>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-100">
                {afterUrl ? (
                  <Image
                    src={afterUrl}
                    alt="치료 후 영상 검사"
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 260px, 50vw"
                  />
                ) : (
                  <p className="absolute inset-0 flex items-center justify-center px-3 text-center text-[13px] text-gray-500">
                    치료 후 검사 이미지 준비 중
                  </p>
                )}
              </div>

              <div className="mt-3 text-center">
                <h3
                  className="font-bold text-[#693847] text-[16px]
                  xl:text-[20px]"
                >
                  After
                </h3>
                <p
                  className="mt-2 text-gray-500 text-[11px] leading-[150%]
                  xl:text-[13px]"
                >
                  치료 후 영상 검사
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 기존 치료 전후 이미지 레이아웃 유지
  return (
    <div className="grid grid-cols-2 gap-px">
      {/* 이 아래에는 기존 코드를 변경하지 않고 유지 */}
      <div className="rounded-t-xl overflow-clip">
        <div
          className="relative py-2 text-center bg-gray-500 text-inverse text-mo-label z-1
          xl:py-3 xl:font-bold xl:text-[18px]"
        >
          {caption ? 'Before' : '치료 전'}
        </div>
        <div className="relative aspect-166/252">
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="rounded-t-xl overflow-clip">
        <div
          className="relative py-2 text-center bg-accent-ai-strong text-inverse text-mo-label z-1
          xl:py-3 xl:font-bold xl:text-[18px]"
        >
          {caption ? 'After' : '치료 후'}
        </div>
        <div className="relative aspect-166/252">
          {afterUrl && !locked ? (
            <Image
              src={afterUrl}
              alt="치료 후 비교 자료"
              fill
              className="object-cover"
            />
          ) : locked ? (
            <>
              {/* 보호 대상 원본 URL은 비로그인 클라이언트에 전달하지 않습니다. */}
              <Image
                src={beforeSrc}
                alt=""
                fill
                className="scale-110 object-cover blur-[10px]"
                sizes="(min-width:1280px) 260px, 50vw"
              />
              <LockedAfter id={id} compact />
              <Link
                href={signInHref(id)}
                aria-label="로그인하고 치료 후 이미지 보기"
                className="absolute inset-0 z-20"
              />
            </>
          ) : (
            <p className="absolute inset-0 flex items-center justify-center px-3 text-center text-[13px] text-gray-600">
              치료 후 이미지 준비 중
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** 실제 영상 ID가 등록된 경우에만 YouTube 임베드합니다. */
function InterviewMedia({
  post,
}: {
  post: Extract<CasePost, { kind: 'interviews' }>;
}) {
  const videoId = post.youtubeId?.trim();
  const validId = isYouTubeVideoId(videoId);

  if (!validId) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
        <Image
          src="/video-thumbnail-placeholder.svg"
          alt="영상 인터뷰 등록 예정"
          fill
          className="object-cover"
          sizes="(min-width:1280px) 700px, 100vw"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-black">
      <iframe
        title={`${post.title} 영상 인터뷰`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function InfoRows({
  rows,
  children,
  overlay,
}: {
  rows: { label: string; content?: string }[];
  children?: ReactNode;
  overlay?: ReactNode;
}) {
  const availableRows = rows.filter(
    (row): row is { label: string; content: string } =>
      Boolean(row.content?.trim()),
  );

  if (availableRows.length === 0 && !children) return null;

  return (
    <div
      className="relative mt-5
      xl:mt-10"
    >
      <ul className="space-y-4">
        {availableRows.map(({ label, content }) => (
          <li
            key={label}
            className="grid grid-cols-[68px_minmax(0,1fr)] items-start gap-x-3
            xl:grid-cols-[86px_minmax(0,1fr)] xl:gap-x-6"
          >
            <span
              className="px-2.5 py-1 rounded-lg bg-subtle text-center font-semibold text-gray-900 text-[14px]
              xl:px-3 xl:py-1 xl:text-[18px]"
            >
              {label}
            </span>
            <p
              className="pt-1 text-mo-body-2
              xl:pt-1.5 xl:text-pc-body-2"
            >
              {content}
            </p>
          </li>
        ))}

        {children}
      </ul>

      {overlay && (
        <div className="absolute inset-x-0 bottom-0 z-10">{overlay}</div>
      )}
    </div>
  );
}

function RichBody({ children }: { children: string }) {
  return (
    <div className="mt-5 space-y-3">
      {children
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph, i) => (
          <p
            key={i}
            className="whitespace-pre-line text-mo-body-2 break-keep
            xl:text-pc-body-2"
          >
            {paragraph.trim()}
          </p>
        ))}
    </div>
  );
}

export default function CasesDetail({
  post,
  detail,
  protectedDetail,
  previous,
  next,
}: Props) {
  const categoryName =
    caseCategories.find((item) => item.id === post.category)?.label ?? '기타';
  const isComparison = post.kind === 'before-after';
  const isLocked = isComparison && !protectedDetail;
  const commonRows = [
    { label: '환자정보', content: detail.patientInfo },
    { label: '진단명', content: detail.diagnosis },
    { label: '치료정보', content: detail.treatmentInfo },
  ];

  return (
    <Inner>
      <ContentDetailHeader
        category={categoryName}
        title={post.title}
        date={post.date}
        shareLabel="치료 사례 공유하기"
      />

      <div
        className="mt-2
        xl:mt-10 xl:px-50"
      >
        {post.kind === 'before-after' &&
          detail.beforeImage &&
          detail.beforeImageAlt && (
            <>
              <ComparisonImage
                id={post.id}
                beforeSrc={detail.beforeImage}
                beforeAlt={detail.beforeImageAlt}
                afterUrl={protectedDetail?.afterImageUrl}
                locked={Boolean(isLocked)}
              />
              {detail.diagnosticBeforeImage && (
                <div
                  className="mt-5 p-3 rounded-xl border border-default bg-white shadow-sm
                  xl:mt-10"
                >
                  <ComparisonImage
                    id={post.id}
                    beforeSrc={detail.diagnosticBeforeImage}
                    beforeAlt="치료 전 영상 검사 이미지 시안 예시"
                    caption
                    locked={Boolean(isLocked)}
                  />
                </div>
              )}
              <InfoRows
                rows={[
                  ...commonRows,
                  { label: '치료 전', content: detail.beforeTreatment },
                ]}
              >
                <li
                  className="grid grid-cols-[68px_minmax(0,1fr)] items-start gap-x-3
                  xl:grid-cols-[86px_minmax(0,1fr)] xl:gap-x-6"
                >
                  <span
                    className="px-2.5 py-1 rounded-lg bg-subtle text-center font-semibold text-gray-900 text-[14px]
                    xl:px-3 xl:py-1 xl:text-[18px]"
                  >
                    치료 후
                  </span>

                  {isLocked ? (
                    <div className="relative">
                      <LockedAfter id={post.id} />
                    </div>
                  ) : (
                    <p className="pt-1 whitespace-pre-line break-keep text-mo-body-2">
                      {protectedDetail?.afterTreatment ??
                        '치료 후 내용이 아직 등록되지 않았습니다.'}
                    </p>
                  )}
                </li>
              </InfoRows>
            </>
          )}

        {post.kind === 'reviews' && (
          <>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <InfoRows rows={commonRows} />
            <RichBody>{post.reviewBody}</RichBody>
          </>
        )}

        {post.kind === 'interviews' && (
          <>
            <InterviewMedia post={post} />
            <InfoRows rows={commonRows} />
            {post.interviewBody && <RichBody>{post.interviewBody}</RichBody>}
          </>
        )}

        {isComparison && (
          <div
            className="relative mt-10 px-9 pt-16 aspect-335/238 rounded-xl bg-[url('/cases/cases-mobile.png')] bg-cover bg-center bg-no-repeat
            xl:mt-20 xl:pt-0 xl:flex xl:flex-col xl:justify-center xl:items-start xl:aspect-846/220 xl:bg-[url('/cases/cases-desktop.png')]"
          >
            <span
              className="text-[#4A6FBF] text-[14px]
              xl:text-[18px]"
            >
              혈관외과 전문의
            </span>
            <h4
              className="mt-1 leading-[120%] text-[22px] text-base
              xl:text-pc-heading-1"
            >
              <span>박용범 원장 </span>
              <br className="xl:hidden" />
              <span className="font-bold">책임 진료</span>
            </h4>
            <Link
              href={`/`}
              className="inline-flex items-center gap-1 mt-6 px-3 py-2 rounded-lg bg-base font-semibold text-accent text-[12px]
              xl:mt-2 xl:text-[16px]"
            >
              <span>의료진 자세히보기</span>
              <ChevronRight
                className="size-4
                xl:size-5"
              />
            </Link>
          </div>
        )}

        <p
          className="mt-5 p-3 text-center rounded-xl bg-oak-50 leading-[145%] text-oak-800 text-[12px]
          xl:hidden"
        >
          치료후기는 실제로 진료 받은 환자분들의
          <br />
          자발척 참여를 통해 만들어 갑니다
        </p>
      </div>

      <ContentDetailNavigation
        ariaLabel="이전 및 다음 치료 사례"
        basePath="/community/cases"
        listHref="/community/cases#community-cases-results"
        previous={previous}
        next={next}
      />
    </Inner>
  );
}
