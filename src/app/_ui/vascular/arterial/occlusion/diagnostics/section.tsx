import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionDiagnosticMethods } from '@/app/_data/vascular/arterial/occlusion/diagnostics/methods';

export default function OcclusionDiagnostics() {
  return (
    <section id="vascular-arterial-occlusion-diagnostics">
      <Inner>
        <h2>{occlusionHeadings.diagnostics}</h2>
        <div>
          {occlusionDiagnosticMethods.map((method) => (
            <article key={method.id}>
              <h3>{method.title}</h3>
              {method.description && <p>{method.description}</p>}
              {/* TODO(신규): 검사 사진, 검사 결과 화면, 설명표 */}
            </article>
          ))}
        </div>
      </Inner>
    </section>
  );
}
