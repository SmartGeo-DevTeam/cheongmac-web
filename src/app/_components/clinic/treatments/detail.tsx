import Image from 'next/image';
import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';

type TreatmentDetailProps = {
  id: string;
  method: TreatmentMethod;
};

/** 선택된 치료법의 이미지·설명·치료 대상·특징. */
export default function TreatmentDetail({ id, method }: TreatmentDetailProps) {
  return (
    <div
      role="tabpanel"
      id={`${id}-${method.id}`}
      aria-labelledby={`${id}-${method.id}-tab`}
      tabIndex={0}
      className={`mt-5 grid
        xl:mt-0 xl:px-20 xl:pt-15 xl:pb-20 xl:grid-cols-2 xl:gap-15 xl:rounded-b-[30px] xl:bg-base`}
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

      <div className={`mt-5 break-keep
        xl:row-start-1 xl:col-span-2`}>
        <span className={`font-bold text-[12px] text-disabled
          xl:text-[16px]`}>{method.englishTitle}</span>
        <h3 className={`font-bold text-[26px] text-gray-900
          xl:font-bold xl:text-[40px] xl:text-primary`}>{method.title}</h3>
        <p className={`mt-5 text-[15px] text-gray-900
          xl:text-pc-body-1 xl:text-primary`}>{method.description}</p>
      </div>

      <div className={`mt-7 space-y-7
        xl:mt-3 xl:space-y-10`}>
        <div>
          <h4 className={`relative pl-3 border-l-4 border-brand font-bold text-[18px] leading-[150%] text-brand
            xl:pl-5 xl:text-pc-heading-1`}>이런 분께 고려할 수 있어요</h4>
          <ul className={`mt-3 flex flex-wrap gap-2
            xl:gap-3`}>
            {method.candidates.map((candidate) => (
              <li
                key={candidate}
                className={`px-4 py-1.5 rounded-full border border-brand font-semibold text-[14px] text-green-600
                  xl:px-5 xl:border-accent-ai-strong xl:text-[17px] xl:text-accent-ai-strong`}
              >{candidate}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={`relative pl-3 border-l-4 border-brand font-bold text-[18px] leading-[150%] text-brand
            xl:pl-5 xl:text-pc-heading-1`}>특징</h4>
          <dl className={`mt-3 grid grid-cols-[max-content_1fr] gap-2 text-[14px]
            xl:gap-x-3 xl:text-pc-body-2`}>
            {method.features.map((feature) => (
              <div key={`${method.id}-${feature.label}`} className={`contents`}>
                <dt className={`font-bold text-green-300`}>{feature.label}</dt>
                <dd className={`text-[#444444]`}>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
