import Image from 'next/image';
import Link from 'next/link';

type SocialLink = {
  id: string;
  title: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
};

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'youtube',
    title: '유튜브',
    href: '/',
    iconSrc: '/assets/icons/social-youtube.png',
    iconAlt: '유튜브',
  },
  {
    id: 'blog',
    title: '블로그',
    href: '/',
    iconSrc: '/assets/icons/social-naver-blog.png',
    iconAlt: '네이버 블로그',
  },
  {
    id: 'instagram',
    title: '인스타그램',
    href: '/',
    iconSrc: '/assets/icons/social-instagram.png',
    iconAlt: '인스타그램',
  },
];

export default function MoreSocials({
  title = '더 다양한 소식은?',
  links = DEFAULT_SOCIAL_LINKS,
}: {
  title?: string;
  links?: SocialLink[];
}) {
  return (
    <section className="mx-auto w-full max-w-[790px] px-5">
      <h2 className="text-center text-xl font-semibold tracking-[-0.04em] text-[#252B33] xl:text-[24px]">
        {title}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-2.5 xl:mt-6 xl:grid-cols-3 xl:gap-3">
        {links.map((social) => (
          <Link
            key={social.id}
            href={social.href}
            className="flex min-h-20 items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-5 transition hover:-translate-y-0.5 hover:shadow-sm xl:min-h-24 xl:px-7"
          >
            <div>
              <p className="text-[18px] font-semibold tracking-[-0.04em] text-[#252B33] xl:text-[20px]">
                {social.title}
              </p>
              <p className="mt-0.5 text-xs text-[#959BA4] xl:text-sm">바로가기</p>
            </div>

            <div className="relative size-9 shrink-0 xl:size-10">
              <Image src={social.iconSrc} alt={social.iconAlt} fill sizes="40px" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
