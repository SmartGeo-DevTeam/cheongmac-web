import Inner from '@/app/_components/common/inner';
import Link from 'next/link';
import DoctorDesktopMoreLink from '../../_components/doctor-desktop-more-link';
import DoctorSectionHeader from '../_review/_components/doctor-section-header';
import { counsels } from './data';

export default function Counsel() {
  return (
    <section id="about-doctor-counsel">
      <div
        className="mt-14 grid grid-cols-1
          xl:mx-auto xl:mt-20 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] xl:gap-5"
      >
        <DoctorSectionHeader type="counsel" />

        <Inner>
          <ul
            className="mt-6 space-y-3
            xl:space-y-6"
          >
            {counsels.map((counsel) => (
              <li key={counsel.id}>
                <Link
                  href={counsel.href}
                  className="p-5 flex flex-col rounded-xl border border-default overflow-clip
                    xl:px-15 xl:py-10 xl:rounded-[20px]"
                >
                  <div className="flex justify-between items-center font-medium">
                    <span
                      className="px-3 py-1 rounded-full bg-gray-50 text-[12px]
                        xl:px-5 xl:py-1.5 xl:text-[15px]"
                    >
                      {counsel.category}
                    </span>

                    <span
                      className="font-medium text-gray-500 text-[14px]
                        xl:text-[15px]"
                    >
                      {counsel.date}
                    </span>
                  </div>

                  <p
                    className="mt-1 font-semibold text-[17px]
                      xl:mt-3 xl:text-pc-heading-2"
                  >
                    {counsel.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Inner>
      </div>

      <DoctorDesktopMoreLink type="counsel" />
    </section>
  );
}
