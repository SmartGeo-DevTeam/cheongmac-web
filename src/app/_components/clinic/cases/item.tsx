import CaseDescription from '@/app/_components/community/cases/case-description';
import CaseTitle from '@/app/_components/community/cases/case-title';
import CaseCategoryBadge from '@/app/_components/community/cases/category-badge';
import CasePatientMeta from '@/app/_components/community/cases/patient-meta';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';
import Image from 'next/image';
import Link from 'next/link';

type ClinicCaseItemProps = {
  id: string;
  post: ClinicCasePreview;
  categoryLabel: string;
};

/** 진료 페이지 치료사례 미리보기 카드. 실제 게시글 URL과 표시 이미지는 데이터가 결정합니다. */
export default function ClinicCaseItem({
  id,
  post,
  categoryLabel,
}: ClinicCaseItemProps) {
  return (
    <Link
      id={id}
      href={post.href}
      className="inline-block w-full h-full rounded-xl overflow-clip border border-default
        xl:bg-[#F2F4F6]"
    >
      <div className="relative aspect-319/196 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
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
