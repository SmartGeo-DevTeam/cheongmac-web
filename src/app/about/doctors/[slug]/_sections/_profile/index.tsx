import Inner from '@/app/_components/common/inner';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { DoctorType } from '../../../_sections/_doctors/data';
import { fields } from '../../../_sections/_doctors/data';
import DoctorProfileTitle from './_components/doctor-profile-title';

export default function Profile({ doctor }: { doctor: DoctorType }) {
  const specialistTitle = fields
    .filter((field) => doctor.fieldIds.includes(field.id))
    .map((field) => field.specialistTitle)
    .join(' · ');

  return (
    <section id="about-doctor-profile">
      <div
        className="py-5 bg-gray-50
          xl:py-10"
      >
        <Inner>
          <div
            className="grid grid-cols-1 gap-5
              xl:grid-cols-2 xl:gap-12"
          >
            <div className="w-full rounded-xl overflow-clip">
              <div
                className="relative w-full aspect-336/300 bg-white
                  xl:aspect-628/560"
              >
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-full aspect-302/360">
                  <Image
                    src={doctor.pathImgSrc}
                    alt={`${doctor.name} 원장 프로필`}
                    fill
                    priority
                  />
                </div>
              </div>

              <div
                className="mt-3 flex justify-between items-center
                  xl:mt-5"
              >
                <div
                  className="flex items-end gap-1
                    xl:gap-2"
                >
                  <h2
                    className="font-bold text-gray-900 text-[20px]
                      xl:text-[34px]"
                  >
                    {doctor.name} 원장
                  </h2>
                  <span
                    className="relative bottom-1 font-medium text-[#767C88] text-[12px]
                      xl:bottom-2 xl:text-[18px]"
                  >
                    {specialistTitle}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2.5
                    xl:gap-5"
                >
                  <button
                    type="button"
                    aria-label={`${doctor.name} 원장 관심 의료진`}
                  >
                    <Heart
                      className="text-[#B2AFAC] size-6
                        xl:size-8"
                    />
                  </button>
                  <Link
                    href={doctor.reservationHref}
                    className="px-5 py-2 rounded-full bg-orange-500 font-bold text-white text-[14px]
                      xl:px-10 xl:py-3 xl:text-[20px]"
                  >
                    진료 예약하기
                  </Link>
                </div>
              </div>
            </div>

            <div className="xl:leading-[1.7]">
              <div>
                <DoctorProfileTitle title="전문진료분야" />
                <ul
                  className="mt-2 flex items-center flex-wrap gap-2
                    xl:px-2 xl:font-semibold xl:text-[22px]"
                >
                  {doctor.expertise.map((expertise, index) => (
                    <li
                      key={`${expertise}-${index}`}
                      className="flex items-center gap-2"
                    >
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="w-px h-3 bg-[#D9D9D9]
                            xl:h-4"
                        />
                      )}
                      {expertise}
                    </li>
                  ))}
                </ul>
              </div>
              {/* 약력 */}
              <div
                className="mt-5
                xl:mt-10"
              >
                <DoctorProfileTitle title="약력" />
                <ul
                  className="mt-2 text-gray-900 text-[16px]
                    xl:text-[20px]
                  "
                >
                  {doctor.educations.map((education, index) => (
                    <li
                      key={`${education}-${index}`}
                      className="relative pl-3 before:absolute before:left-0 before:top-[12.5px] before:w-1 before:h-1 before:rounded-full before:bg-gray-900"
                    >
                      {education}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Inner>
      </div>
    </section>
  );
}
