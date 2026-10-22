import type { CardItemType } from '../data';

export function CardItem({ title, desc }: CardItemType) {
  return (
    <li
      className="relative px-4 py-5 flex flex-col justify-center items-center rounded-full border border-cm-gray-100 bg-white shadow-[0_2px_10px_rgba(38,44,53,0.15)] text-center z-10
      xl:px-10
      "
    >
      <h3
        className="text-[18px] font-bold leading-[1.35] text-accent
        xl:text-[22px]"
      >
        {title}
      </h3>

      <p
        className="mt-1 break-keep text-mo-body-2
        xl:text-pc-body-2"
      >
        {desc}
      </p>
    </li>
  );
}
