import Image from 'next/image';

export default function DoctorProfileTitle({ title }: { title: string }) {
  return (
    <div
      className="pb-2 flex items-center gap-1 border-b-[1.5] border-b-default
      xl:pt-5 xl:gap-1.5"
    >
      <Image
        src="/symbol.svg"
        alt=""
        width={20}
        height={20}
        className="size-5 xl:size-8"
      />
      <h3
        className="font-semibold text-accent text-[16px]
        xl:text-[24px]"
      >
        {title}
      </h3>
    </div>
  );
}
