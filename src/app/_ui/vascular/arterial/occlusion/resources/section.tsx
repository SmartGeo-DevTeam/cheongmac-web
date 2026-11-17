import Inner from '@/app/_components/common/inner';
import { occlusionHeadings, occlusionLinks } from '@/app/_data/vascular/arterial/occlusion/content';
import Link from 'next/link';

export default function OcclusionResources() {
  return (
    <section id="vascular-arterial-occlusion-resources">
      <Inner>
        <h2>{occlusionHeadings.resources}</h2>
        {/* TODO(신규): 의료 정보/진료 장점/통계 카드 및 시안 문구 */}
        <nav aria-label="하지동맥폐색증 관련 안내">
          <Link href={occlusionLinks.reservation}>진료예약</Link>
          <Link href={occlusionLinks.doctors}>의료진 소개</Link>
          <Link href={occlusionLinks.consultation}>의학상담</Link>
        </nav>
      </Inner>
    </section>
  );
}
