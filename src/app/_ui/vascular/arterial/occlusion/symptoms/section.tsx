import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionSymptoms } from '@/app/_data/vascular/arterial/occlusion/symptoms/items';

export default function OcclusionSymptoms() {
  return (
    <section id="vascular-arterial-occlusion-symptoms">
      <Inner>
        <h2>{occlusionHeadings.symptoms}</h2>
        <div>
          {occlusionSymptoms.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {/* TODO(신규): 증상 이미지/아이콘 */}
            </article>
          ))}
        </div>
        {/* TODO(신규): 시안의 증상 관련 안내/버튼 */}
      </Inner>
    </section>
  );
}
