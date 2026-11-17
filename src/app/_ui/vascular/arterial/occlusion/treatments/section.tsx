import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionTreatmentMethods } from '@/app/_data/vascular/arterial/occlusion/treatments/methods';

export default function OcclusionTreatments() {
  return (
    <section id="vascular-arterial-occlusion-treatment">
      <Inner>
        <h2>{occlusionHeadings.treatments}</h2>
        <div>
          {occlusionTreatmentMethods.map((method) => (
            <article key={method.id}>
              <h3>{method.title}</h3>
              {method.description && <p>{method.description}</p>}
              {/* TODO(신규): 세부 치료 절차, 이미지 묶음, 전후 비교 */}
            </article>
          ))}
        </div>
      </Inner>
    </section>
  );
}
