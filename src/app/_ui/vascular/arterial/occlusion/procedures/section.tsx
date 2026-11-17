import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionProcedureTabs } from '@/app/_data/vascular/arterial/occlusion/procedures/tabs';

export default function OcclusionProcedures() {
  return (
    <section id="vascular-arterial-occlusion-procedures">
      <Inner>
        <h2>{occlusionHeadings.procedures}</h2>
        <div>
          {occlusionProcedureTabs.map((tab) => (
            <article key={tab.id}>
              <h3>{tab.label}</h3>
              {tab.description && <p>{tab.description}</p>}
              {/* TODO(신규): 활성 탭 UI는 탭 디자인 확정 후 클라이언트 컴포넌트로 분리 */}
            </article>
          ))}
        </div>
      </Inner>
    </section>
  );
}
