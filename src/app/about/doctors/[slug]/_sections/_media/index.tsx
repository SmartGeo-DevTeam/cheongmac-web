import Inner from '@/app/_components/common/inner';
import Image from 'next/image';
import DoctorDesktopMoreLink from '../../_components/doctor-desktop-more-link';
import DoctorSectionHeader from '../_review/_components/doctor-section-header';
import { mediaItems } from './data';

export default function Media() {
  return (
    <section id="about-doctor-media">
      <div
        className="mt-14 grid grid-cols-1
        xl:mx-auto xl:mt-20 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] xl:gap-5"
      >
        <DoctorSectionHeader type="media" />

        <Inner>
          <div
            className="mt-6 grid grid-cols-3 gap-2
              xl:mt-0 xl:gap-x-5 xl:gap-y-6"
          >
            {mediaItems.map((media, index) => (
              <div
                key={media.id}
                className={`relative w-full aspect-video rounded-lg overflow-clip
                  xl:rounded-[20px]
                  ${index === 0 ? 'col-span-3' : ''}
                  `}
              >
                <Image src={media.image} alt={media.alt} fill />
              </div>
            ))}
          </div>
        </Inner>
      </div>

      <DoctorDesktopMoreLink type="media" />
    </section>
  );
}
