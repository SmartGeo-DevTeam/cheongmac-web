import CaseDescription from '@/app/_components/community/cases/case-description';
import CaseTitle from '@/app/_components/community/cases/case-title';
import CaseCategoryBadge from '@/app/_components/community/cases/category-badge';
import CasePatientMeta from '@/app/_components/community/cases/patient-meta';
import type { CasePost } from '@/app/_data/community/cases/cases';
import Image from 'next/image';
import Link from 'next/link';

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
    <Link
      href={`/community/cases/${post.id}`}
      className="inline-block w-full h-full rounded-xl overflow-clip border border-default
      xl:bg-[#F2F4F6]"
    >
      <div className="relative aspect-319/196 overflow-hidden">
        <Image
          src={sampleImage}
          alt="시안용 혈관 비교 이미지. 실제 환자의 치료 전후 사진이 아닙니다."
          fill
          className="object-cover"
        />
      </div>
      <div
        className="px-5 pt-4 pb-5
        xl:px-15 xl:py-10 xl:pb-15"
      >
        <div className="flex justify-between items-center flex-wrap">
          <CaseCategoryBadge label={categoryLabel} />
          <CasePatientMeta
            patient={post.patient}
            age={post.age}
            sex={post.sex}
            className="justify-end"
          />
        </div>
        <CaseTitle>{post.title}</CaseTitle>
        <CaseDescription>{post.description}</CaseDescription>
      </div>
    </Link>
  );
}
