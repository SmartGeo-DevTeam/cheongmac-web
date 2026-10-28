import Image from 'next/image';

type ConferenceAwardProps = {
  label: string;
  variant?: 'featured' | 'list';
};

export default function ConferenceAward({
  label,
  variant = 'list',
}: ConferenceAwardProps) {
  const isFeatured = variant === 'featured';

  return (
    <div
      className={
        isFeatured
          ? 'flex items-center gap-0.5 xl:gap-1.5'
          : 'flex items-center gap-1'
      }
    >
      <Image
        src="/conferences/badge.png"
        alt=""
        width={12}
        height={19}
        className="w-3 h-4.75 xl:w-4 xl:h-6.25"
      />
      <span
        className={
          isFeatured
            ? 'font-bold text-[#EDB309] text-[14px] xl:text-[18px]'
            : 'text-[#D29A2B] text-[14px] xl:text-[16px]'
        }
      >
        {label}
      </span>
    </div>
  );
}
