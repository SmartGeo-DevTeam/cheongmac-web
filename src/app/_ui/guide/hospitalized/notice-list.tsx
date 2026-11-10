import Image from 'next/image';

export default function HospitalizedNoticeList({ items }: { items: string[] }) {
  return (
    <ul
      className="mt-5 border-y border-y-default divide-y divide-default
      xl:mt-0"
    >
      {items.map((item) => (
        <li
          key={item}
          className="py-4 flex items-start gap-3
          xl:p-6"
        >
          <Image
            src={`/guide/check.png`}
            alt=""
            width={20}
            height={20}
            className="relative top-0.5 size-5
            xl:size-7"
          />
          <p
            className="text-mo-body-1
            xl:text-pc-body-1"
          >
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}
