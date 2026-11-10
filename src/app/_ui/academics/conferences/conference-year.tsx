import type { ConferenceYearType } from '@/app/_data/academics/conferences/conference-years';
import ConferencesItem from './conference-item';

export default function ConferencesYear({
  group,
}: {
  group: ConferenceYearType;
}) {
  return (
    <li
      className="relative pb-24
      before:absolute before:left-2 before:top-0 before:w-0.5 before:h-full before:bg-[#D9D9D9]
      xl:pb-0 xl:grid xl:grid-cols-[auto_1fr] xl:gap-12
      xl:before:content-none"
    >
      <div
        className="pt-1
        xl:p-0"
      >
        <h3
          className="mt-3 relative pl-8 text-accent text-mo-title-1
          before:absolute before:left-0.5 before:top-1/2 before:-translate-y-1/2 before:size-3.5 before:rounded-full before:bg-accent
          xl:m-0 xl:px-3 xl:py-5 xl:text-pc-title-1 xl:text-primary
          xl:before:content-none"
        >
          {group.year}년
        </h3>
      </div>
      {group.items.length > 0 ? (
        <ul
          className="relative mt-6 space-y-14
          xl:m-0 xl:pt-4 xl:pb-36 xl:space-y-18
          xl:before:absolute xl:before:left-0 xl:before:top-0 xl:before:w-0.5 xl:before:h-full xl:before:bg-[#D9D9D9]"
        >
          {group.items.map((item) => (
            <ConferencesItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-6 pl-8 text-secondary
          xl:mt-0 xl:pt-5 xl:pl-16"
        >
          해당 연도의 학술 활동 내역이 없습니다.
        </p>
      )}
    </li>
  );
}
