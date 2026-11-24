import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { ClinicDiseaseCardData } from '@/app/_types/vascular/disease-card';
import type { DiseaseMapPoint } from '@/app/_types/vascular/disease-map';
import { Info } from 'lucide-react';
import ClinicDiseaseBodyMap from './body-map';
import ClinicDiseaseCard from './disease-card';

type ClinicDiseasesProps = {
  id: string;
  content: { label: string; title: string; description: string; hint: string };
  map: {
    points: readonly DiseaseMapPoint[];
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
  };
  cards: readonly ClinicDiseaseCardData[];
  columns: 3 | 4;
  showMoreLink?: boolean;
  isPublishedHref: (href: string) => boolean;
};

export default function ClinicDiseases({
  id,
  content,
  map,
  cards,
  columns,
  showMoreLink = false,
  isPublishedHref,
}: ClinicDiseasesProps) {
  const publishedHrefs = new Set(
    [...map.points, ...cards].map(({ href }) => href).filter(isPublishedHref),
  );
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label={content.label}
          labelVariant="disabled"
          title={<b>{content.title}</b>}
          description={content.description}
        />

        {/* 이미지 좌표 */}
        <div>
          <div
            className="mt-10 flex items-center justify-center gap-1
          xl:mt-20 xl:gap-2"
          >
            <Info
              className="size-5 [&_circle]:fill-tertiary [&_circle]:stroke-tertiary [&_path]:stroke-white"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <p
              className="text-[13px] text-tertiary
            xl:text-[16px]"
            >
              {content.hint}
            </p>
          </div>

          <div
            className="mt-8
          xl:mt-10 xl:px-50"
          >
            <ClinicDiseaseBodyMap
              id={`${id}-map`}
              {...map}
              publishedHrefs={publishedHrefs}
            />
          </div>
        </div>

        {/* 아이템 */}
        <div
          className={`mt-10 grid gap-6 ${columns === 3 ? 'xl:grid-cols-3 xl:gap-10' : 'xl:grid-cols-4 xl:gap-5'}`}
        >
          {cards.map((item) => (
            <ClinicDiseaseCard
              key={item.id}
              id={`${id}-card-${item.id}`}
              item={item}
              isAvailable={publishedHrefs.has(item.href)}
              showMoreLink={showMoreLink}
            />
          ))}
        </div>
      </Inner>
    </section>
  );
}
