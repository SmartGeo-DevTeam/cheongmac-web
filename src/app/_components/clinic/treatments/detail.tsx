import type {
  TreatmentDetailSection as DetailSection,
  TreatmentDisplayMode,
  TreatmentMethod,
} from '@/app/_types/vascular/treatment-method';
import Image from 'next/image';
import TreatmentDetailSection from './detail-section';

type TreatmentDetailProps = {
  id: string;
  method: TreatmentMethod;
  mode?: TreatmentDisplayMode;
};

/** 기존 치료 대상·특징 데이터도 동일한 상세 정보 렌더러로 연결합니다. */
function getDetailSections(method: TreatmentMethod): readonly DetailSection[] {
  if (method.sections !== undefined) return method.sections;

  return [
    {
      id: 'candidates',
      title: '이런 분께 고려할 수 있어요',
      type: 'tags',
      items: method.candidates,
    },
    {
      id: 'features',
      title: '특징',
      type: 'description-list',
      items: method.features,
    },
  ];
}

/** 탭과 단독 표시에서 동일한 이미지·제목·설명·상세 정보를 사용합니다. */
export default function TreatmentDetail({
  id,
  method,
  mode = 'tabs',
}: TreatmentDetailProps) {
  const isStandalone = mode === 'standalone';
  const detailId = `${id}-${method.id}`;
  const sections = getDetailSections(method);

  return (
    <div
      id={detailId}
      role={isStandalone ? undefined : 'tabpanel'}
      aria-labelledby={isStandalone ? undefined : `${detailId}-tab`}
      tabIndex={isStandalone ? undefined : 0}
      className={`${isStandalone ? 'mt-10' : 'mt-5'} grid
        xl:px-20 xl:pt-15 xl:pb-20 xl:grid-cols-2 xl:gap-15 xl:bg-base
        ${isStandalone ? 'xl:mt-20 xl:rounded-[30px]' : 'xl:mt-0 xl:rounded-b-[30px]'}`}
    >
      <div className={`relative aspect-1008/696 rounded-xl overflow-clip`}>
        <Image
          src={method.image.src}
          alt={method.image.alt}
          fill
          sizes="(min-width: 1280px) 45vw, 100vw"
          className={`object-cover`}
        />
      </div>

      <div
        className={`mt-5 break-keep
        xl:row-start-1 xl:col-span-2`}
      >
        <span
          className={`font-bold text-[12px] text-disabled ${isStandalone ? 'uppercase' : ''}
          xl:text-[16px]`}
        >
          {method.englishTitle}
        </span>
        <h3
          className={`font-bold text-[26px] text-gray-900
          xl:font-bold xl:text-[40px] xl:text-primary`}
        >
          {method.title}
        </h3>
        <p
          className={`mt-3 text-[15px] text-gray-900
          xl:text-pc-body-1 xl:text-primary`}
        >
          {method.description}
        </p>
      </div>

      <div
        className={`mt-7 space-y-7
        xl:mt-3 xl:space-y-10`}
      >
        {sections.map((section) => (
          <TreatmentDetailSection
            key={section.id}
            id={`${detailId}-${section.id}`}
            section={section}
          />
        ))}
      </div>
    </div>
  );
}
