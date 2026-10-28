import Image from 'next/image';
import ConferenceAward from '../../../_components/award';
import type { ConferenceItemType } from '../data';

export default function ConferenceItem({ item }: { item: ConferenceItemType }) {
  return (
    <li
      className="mt-3 relative pl-8.5
      xl:pl-16 xl:flex xl:gap-20"
    >
      <div>
        <div className="xl:flex xl:items-center xl:gap-3">
          <span
            className="relative font-bold text-tertiary text-[15px]
            xl:font-bold xl:text-[22px]
            before:absolute before:-left-7.5 before:top-1/2 before:-translate-y-1/2 before:size-2.5 before:rounded-full before:bg-action-secondary
            after:absolute after:left-[-27.5px] after:top-1/2 after:-translate-y-1/2 after:size-1.25 after:rounded-full after:bg-white
            xl:before:-left-17.5 xl:before:size-3.5
            xl:after:-left-16.75 xl:after:size-2"
          >
            {item.date}
          </span>
          <h4
            className="mt-1 text-gray-900 text-mo-heading-2
            xl:m-0 xl:text-pc-heading-1"
          >
            {item.title}
          </h4>
        </div>
        <div
          className="mt-2 flex items-center gap-2 font-bold
          xl:mt-5 xl:gap-3"
        >
          <span
            className="text-tertiary text-[15px]
            xl:text-pc-body-2 xl:text-secondary"
          >
            {item.speaker}
          </span>
          {item.award && <ConferenceAward label={item.award} />}
        </div>
        <p
          className="mt-2 text-tertiary text-[12px]
          xl:text-pc-body-2"
        >
          {item.description}
        </p>
      </div>
      {item.image && (
        <div
          className="relative my-5 w-full aspect-628/400 rounded-xl overflow-clip
          xl:shrink-0 xl:w-85"
        >
          <Image src={item.image.src} alt={item.image.alt} fill />
        </div>
      )}
    </li>
  );
}
