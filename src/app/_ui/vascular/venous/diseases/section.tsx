import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { venousDiseasesContent } from '@/app/_data/vascular/venous/diseases/content';
import { venousDiseaseCards } from '@/app/_data/vascular/venous/diseases/cards';
import { Info } from 'lucide-react';
import ClinicDiseaseCard from '@/app/_components/clinic/diseases/disease-card';
import VenousDiseaseMap from './map';

/** 부위별 정맥질환: 기존 동맥질환과 동일한 섹션 조립 구조. */
export default function VenousDiseases() {
  return (
    <section id="vascular-venous-diseases">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label={venousDiseasesContent.label}
          labelVariant="disabled"
          title={<b>{venousDiseasesContent.title}</b>}
          description={venousDiseasesContent.description}
        />

        <div>
          <div className="mt-10 flex items-center justify-center gap-1 xl:mt-20 xl:gap-2">
            <Info
              className="size-5 [&_circle]:fill-tertiary [&_circle]:stroke-tertiary [&_path]:stroke-white"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <p className="text-[13px] text-tertiary xl:text-[16px]">
              {venousDiseasesContent.hint}
            </p>
          </div>
          <div className="mt-8 xl:mt-10 xl:px-50">
            <VenousDiseaseMap />
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-4 xl:gap-5">
          {venousDiseaseCards.map((item) => (
            <ClinicDiseaseCard key={item.id} item={item} showMoreLink />
          ))}
        </div>
      </Inner>
    </section>
  );
}
