import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionManagementItems } from '@/app/_data/vascular/arterial/occlusion/management/items';

export default function OcclusionManagement() {
  return (
    <section id="vascular-arterial-occlusion-management">
      <Inner>
        <h2>{occlusionHeadings.management}</h2>
        <div>
          {occlusionManagementItems.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {/* TODO(신규): 주의사항, 운동/관리 방법 관련 카드 */}
            </article>
          ))}
        </div>
      </Inner>
    </section>
  );
}
