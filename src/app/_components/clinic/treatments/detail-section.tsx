import type { TreatmentDetailSection as DetailSection } from '@/app/_types/vascular/treatment-method';

type TreatmentDetailSectionProps = {
  id: string;
  section: DetailSection;
};

/** 치료 정보의 제목과 데이터에 지정된 목록 표현 방식. */
export default function TreatmentDetailSection({
  id,
  section,
}: TreatmentDetailSectionProps) {
  return (
    <div id={id}>
      <h4
        className={`relative pl-3 border-l-4 border-brand font-bold text-[18px] leading-[150%] text-brand
          xl:pl-5 xl:text-pc-heading-1`}
      >
        {section.title}
      </h4>
      {section.type === 'tags' ? (
        <ul
          className={`mt-3 flex flex-wrap gap-2
            xl:gap-3`}
        >
          {section.items.map((item) => (
            <li
              key={item}
              className={`px-4 py-1.5 rounded-full border border-brand font-semibold text-[14px] text-green-600
                xl:px-5 xl:border-accent-ai-strong xl:text-[17px] xl:text-accent-ai-strong`}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : section.type === 'numbered-list' ? (
        <ol
          role="list"
          className={`mt-3 space-y-1.5 text-[14px] leading-[160%] text-[#444444]
            xl:space-y-3 xl:text-pc-body-2 xl:text-secondary`}
        >
          {section.items.map((item, index) => (
            <li key={item} className={`flex items-start gap-1.5`}>
              <span className={`shrink-0 font-bold text-green-300`} aria-hidden="true">
                {index < 20 ? String.fromCodePoint(0x2460 + index) : `${index + 1}.`}
              </span>
              <span className={`break-keep`}>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <dl
          className={`mt-3 grid grid-cols-[max-content_1fr] gap-2 text-[14px]
            xl:gap-x-3 xl:text-pc-body-2`}
        >
          {section.items.map((item) => (
            <div key={item.label} className={`contents`}>
              <dt className={`font-bold text-green-300`}>{item.label}</dt>
              <dd className={`text-[#444444]`}>{item.description}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
