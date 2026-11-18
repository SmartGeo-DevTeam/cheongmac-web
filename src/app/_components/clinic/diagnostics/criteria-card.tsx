import type { DiagnosticCriteriaCard } from '@/app/_types/clinic/diagnostics';
import Image from 'next/image';
import InfoBullet from './info-bullet';

const toneClasses: Record<DiagnosticCriteriaCard['tone'], string> = {
  normal: 'bg-legacy-green',
  warning: 'bg-legacy-yellow',
  danger: 'bg-legacy-red',
};

export default function CriteriaCard({ image, label, tone, items }: DiagnosticCriteriaCard) {
  return (
    <li>
      <div className="relative aspect-410/340 rounded-xl overflow-clip xl:rounded-[20px]">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <div className="mt-3 flex flex-col items-center xl:mt-5">
        <span className={`px-6 py-1.5 rounded-full text-mo-body-2 text-inverse xl:px-7 xl:py-2 xl:font-bold xl:text-[18px] ${toneClasses[tone]}`}>
          {label}
        </span>
        <div className="mt-3 w-full space-y-1.5 xl:mt-5 xl:space-y-2">
          {items.map((text, index) => <InfoBullet key={index}>{text}</InfoBullet>)}
        </div>
      </div>
    </li>
  );
}
