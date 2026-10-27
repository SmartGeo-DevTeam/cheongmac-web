import Inner from '@/app/_components/common/inner';
import Image from 'next/image';
import Link from 'next/link';
import { equipments } from './data';

export default function AboutEquipmentPage() {
  return (
    <>
      <section id="about-equipment-equipments">
        <Inner>
          <ul
            className="mt-5 mb-32 grid grid-cols-2 gap-x-2 gap-y-4
            xl:mt-15 xl:gap-x-6 xl:gap-y-25"
          >
            {equipments.map((equipment) => (
              <li key={equipment.id}>
                <Link
                  href={`/about/equipment/${equipment.category}/${equipment.id}`}
                >
                  <div className="relative aspect-628/340">
                    <Image
                      src={equipment.image}
                      alt={`${equipment.title} ${equipment.model}`}
                      fill
                    />
                  </div>
                  <div
                    className="mt-1 px-2 py-1 flex justify-between items-center
                  xl:p-2"
                  >
                    <div>
                      <p
                        className="font-bold text-accent text-[12px]
                      xl:text-[20px]"
                      >
                        {equipment.title}
                      </p>
                      <h4
                        className="font-medium text-[14px]
                      xl:mt-1 xl:text-pc-heading-2"
                      >
                        {equipment.model}
                      </h4>
                    </div>
                    <span
                      className="hidden
                      xl:block xl:px-5 xl:py-2 rounded-lg border border-default font-semibold text-[16px] text-disabled"
                    >
                      자세히 보기
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Inner>
      </section>
    </>
  );
}
