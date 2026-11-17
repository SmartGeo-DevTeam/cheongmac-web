import Inner from '@/app/_components/common/inner';
import { occlusionHeadings } from '@/app/_data/vascular/arterial/occlusion/content';
import { occlusionMedia } from '@/app/_data/vascular/arterial/occlusion/media/content';
import Link from 'next/link';

export default function OcclusionMedia() {
  return (
    <section id="vascular-arterial-occlusion-media">
      <Inner>
        <h2>{occlusionHeadings.media}</h2>
        {/* TODO(신규): 동영상 썸네일과 설명, 재생 UI는 별도 구현 */}
        {occlusionMedia.videoUrl && (
          <Link href={occlusionMedia.videoUrl}>{occlusionMedia.title}</Link>
        )}
      </Inner>
    </section>
  );
}
