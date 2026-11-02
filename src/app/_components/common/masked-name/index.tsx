import Image from 'next/image';

export default function MaskedName({
  name,
  suffix = '님',
  className = '',
}: {
  name: string;
  suffix?: string;
  className?: string;
}) {
  const chars = [...name.trim().replace(/님$/, '')];

  if (chars.length === 0) return null;

  const maskedIndex = chars.findIndex((char) => /[○●*]/.test(char));
  const middleIndex =
    maskedIndex >= 0 ? maskedIndex : Math.floor(chars.length / 2);

  const replaceMiddleCharacter = maskedIndex >= 0 || chars.length >= 3;

  return (
    <span className={`inline-flex items-center whitespace-nowrap ${className}`}>
      {chars.slice(0, middleIndex).join('')}

      <Image
        src="/symbol.svg"
        alt=""
        aria-hidden="true"
        width={12}
        height={12}
        className="mx-0.5 size-3 grayscale"
      />

      {chars.slice(middleIndex + (replaceMiddleCharacter ? 1 : 0)).join('')}

      {suffix}
    </span>
  );
}
