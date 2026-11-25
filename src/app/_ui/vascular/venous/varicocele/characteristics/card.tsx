import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';
import Image from 'next/image';

type VaricoceleCharacteristicCardProps = {
  id: string;
  item: VaricoceleInformationItem;
};

export default function VaricoceleCharacteristicCard({
  id,
  item,
}: VaricoceleCharacteristicCardProps) {
  return (
    <li id={id} className={`flex flex-col items-center`}>
      <div
        className={`relative w-full aspect-820/500 rounded-xl overflow-hidden bg-gray-50
          xl:rounded-2xl`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1280px) 400px, 1px"
          className={`object-cover`}
        />
      </div>

      <div
        className={`mt-5 size-2.5 rounded-full bg-accent-ai-strong`}
      />

      <h3 className={`mt-5 text-pc-heading-1 text-center`}>
        {item.title}
      </h3>

      <p className={`mt-5 break-keep text-pc-body-2 text-center`}>
        {item.description}
      </p>
    </li>
  );
}
