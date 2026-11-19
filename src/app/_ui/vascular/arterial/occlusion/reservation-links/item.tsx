import Image from 'next/image';
import Link from 'next/link';
import type { occlusionReservationLinks } from '@/app/_data/vascular/arterial/occlusion/reservation-links/links';

type ReservationLink = (typeof occlusionReservationLinks)[number];
type ReservationLinkItemProps = { item: ReservationLink };

export default function ReservationLinkItem({ item }: ReservationLinkItemProps) {
  const background = item.id === 'naver-reservation' ? 'bg-[#E6F8D8]' : 'bg-green-50';
  return (
    <Link href={item.href} className={`relative p-6 rounded-xl ${background} xl:p-10`}>
      <h3 className="font-bold text-[20px] text-[#222222] xl:text-[26px]">{item.title}</h3>
      <p className="font-medium text-[14px] text-[#5C805D] xl:text-[18px]">{item.description}</p>
      <Image src={item.image} alt="" width={48} height={48} className="absolute right-6 top-1/2 -translate-y-1/2 size-12 xl:right-10 xl:size-15" />
    </Link>
  );
}
