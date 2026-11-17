import Link from 'next/link';

const backgroundColors = {
  'green-900': 'bg-green-900',
  'orange-500': 'bg-orange-500',
} as const;

type ClinicLinkButtonProps = {
  href: string;
  title: string;
  backgroundColor?: keyof typeof backgroundColors;
};

export default function ClinicLinkButton({
  href,
  title,
  backgroundColor = 'green-900',
}: ClinicLinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${backgroundColors[backgroundColor]}
      rounded-full px-7 py-3 font-bold text-[14px] text-gray
      xl:px-10 xl:py-4 xl:text-[16px]`}
    >
      {title}
    </Link>
  );
}
