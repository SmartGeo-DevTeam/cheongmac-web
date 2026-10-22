import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { DoctorType } from '../data';
import { fields } from '../data';

export default function DoctorItem({ doctor }: { doctor: DoctorType }) {
  const specialistTitle = fields
    .filter(({ id }) => doctor.fieldIds.includes(id))
    .map(({ specialistTitle }) => specialistTitle)
    .join(' · ');

  return (
    <li>
      <div
        className="relative grid grid-cols-[168px_1fr] gap-4
        xl:grid-cols-2 xl:gap-6"
      >
        <div
          className="relative aspect-158/200 rounded-[14px] overflow-clip
          xl:aspect-auto"
        >
          <Image
            src={doctor.mobileImgSrc}
            alt={`${doctor.name}`}
            fill
            className="object-cover xl:hidden"
          />
          <Image
            src={doctor.desktopImgSrc}
            alt={`${doctor.name}`}
            fill
            className="hidden object-cover xl:block"
          />
        </div>

        <div
          className="pt-2
          xl:pt-10 xl:space-y-2"
        >
          <div>
            <h3
              className="font-semibold text-[14px] text-[#C8AFA4]
              xl:text-[18px]"
            >
              {specialistTitle}
            </h3>
            <h2
              className="text-mo-heading-1
              xl:text-[26px]"
            >
              <strong
                className="text-mo-title-2
                xl:text-[32px]"
              >
                {doctor.name}
              </strong>{' '}
              원장
            </h2>
          </div>

          <div
            className="mt-3 space-y-1
            xl:mt-6 xl:space-y-2"
          >
            <span
              className="font-semibold text-[14px] text-[#BBBBBB]
            xl:text-[16px]"
            >
              전문분야
            </span>
            <ul
              className="flex items-center flex-wrap gap-x-2 font-medium text-[14px]
              xl:text-[20px]"
            >
              {doctor.expertise.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="w-px h-3 bg-[#D9D9D9]"
                    />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="hidden
            xl:mt-20 xl:grid xl:grid-cols-2 xl:gap-2"
          >
            <Link
              href={doctor.detailHref}
              className="py-3 rounded-full bg-green-300 font-bold text-center text-[16px] text-white"
            >
              상세보기
            </Link>
            <Link
              href={doctor.reservationHref}
              className="py-3 rounded-full bg-orange-500 font-bold text-center text-[16px] text-white"
            >
              예약하기
            </Link>
          </div>
        </div>

        <button
          className="absolute right-2 top-3
        xl:left-6 xl:top-6"
        >
          <Heart
            aria-hidden="true"
            className="size-5 text-[#B2AFAC]
          xl:size-7"
          />
        </button>
      </div>

      <div
        className="mt-3 grid grid-cols-2 rounded-lg overflow-clip text-white
        xl:hidden"
      >
        <Link
          href={doctor.detailHref}
          className="py-3 bg-green-300 font-bold text-center text-[15px]"
        >
          상세보기
        </Link>
        <Link
          href={doctor.reservationHref}
          className="py-3 bg-orange-500 font-bold text-center text-[15px]"
        >
          예약하기
        </Link>
      </div>
    </li>
  );
}
