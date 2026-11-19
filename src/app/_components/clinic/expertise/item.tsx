import type { ClinicExpertiseItem as ExpertiseItem } from '@/app/_types/clinic/expertise';
import Image from 'next/image';


export default function ClinicExpertiseItem({
  item,
}: {
  item: ExpertiseItem;
}) {
  return (
    <article>
      <div className="relative aspect-335/254 rounded-[20px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title || '청맥병원 전문성 소개'}
          fill
          className="object-cover"
        />
      </div>

      <div className="text-inverse">
        {item.title && (
          <div className="mt-6 flex justify-between items-center gap-3">
            <h3
              className="shrink-0 text-mo-heading-1
              xl:text-pc-heading-1"
            >
              {item.title}
            </h3>
            <span className="w-full h-px bg-inverse" />
          </div>
        )}

        {item.description && (
          <p
            className="mt-2 text-mo-body-2
            xl:text-pc-body-1"
          >
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
