import CaseCategoryBadge from '@/app/_components/community/cases/category-badge';
import CaseDescription from '@/app/_components/community/cases/case-description';
import CaseTitle from '@/app/_components/community/cases/case-title';
import CasePatientMeta from '@/app/_components/community/cases/patient-meta';
import type { CasePost } from '@/app/_data/community/cases/cases';
import Link from 'next/link';
import Image from 'next/image';

type OcclusionCaseItemProps = {
  post: CasePost;
  categoryLabel: string;
  sampleImage: string;
};

/** 실제 비교 영상이 준비될 때까지 세 사례 모두 시안용 이미지를 사용합니다. */
export default function OcclusionCaseItem({
  post,
  categoryLabel,
  sampleImage,
}: OcclusionCaseItemProps) {
  return (
    <article className="h-full overflow-hidden rounded-xl border border-default bg-base xl:rounded-2xl xl:border-0 xl:bg-[#F7F8F9]">
      <div className="relative aspect-319/196 overflow-hidden bg-black xl:aspect-846/420">
        <Image
          src={sampleImage}
          alt="시안용 혈관 비교 이미지. 실제 환자의 치료 전후 사진이 아닙니다."
          fill
          sizes="(min-width: 1280px) 625px, calc(100vw - 56px)"
          className="object-cover"
        />
      </div>
      <div className="px-5 pt-4 pb-5 xl:px-10 xl:pt-7 xl:pb-9">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <CaseCategoryBadge label={categoryLabel} />
          <CasePatientMeta
            patient={post.patient}
            age={post.age}
            sex={post.sex}
            className="justify-end"
          />
        </div>
        <Link
          href={`/community/cases/${post.id}`}
          className="inline-block hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <CaseTitle>{post.title}</CaseTitle>
        </Link>
        <CaseDescription>
          {post.description}
        </CaseDescription>
      </div>
    </article>
  );
}
