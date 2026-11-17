import ClinicLinkButton from '@/app/_components/clinic/link-button';
import Inner from '@/app/_components/common/inner';
import { occlusionHeadings, occlusionLinks } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionCases } from '@/app/_data/vascular/arterial/occlusion/cases/items';

export default function OcclusionCases() {
  return (
    <section id="vascular-arterial-occlusion-cases">
      <Inner>
        <h2>{occlusionHeadings.cases}</h2>
        <div>
          {occlusionCases.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {/* TODO(신규): before/after 슬라이드, doctorId를 통한 의료진 정보 조회 */}
            </article>
          ))}
        </div>
        {/* 기존 공통 버튼 재사용. 시안에 따라 직접 스타일/배치 조정 */}
        <ClinicLinkButton href={occlusionLinks.cases} title="치료사례 더보기" />
      </Inner>
    </section>
  );
}
