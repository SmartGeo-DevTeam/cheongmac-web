import type { ArterialDiagnosticMethod } from '@/app/_types/vascular/arterial/diagnostics';
import Image from 'next/image';

export default function ArterialDiagnosticItem({
  item,
}: {
  item: ArterialDiagnosticMethod;
}) {
  const details = [
    { label: '시간', value: item.time },
    { label: '방법', value: item.method },
    { label: '특징', value: item.feature },
  ];

  return (
    <article className="w-full break-keep">
      <div
        className="relative aspect-326/240 overflow-clip rounded-[20px]
        xl:aspect-440/350"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 440px, calc(100vw - 40px)"
          className="object-cover"
        />
      </div>

      <div className="mt-5 px-2">
        <h3
          className="text-mo-heading-1
          xl:font-bold xl:text-[28px]"
        >
          {item.title}
        </h3>

        <dl
          className="mt-3 grid grid-cols-[64px_minmax(0,1fr)] gap-y-1 text-mo-body-2
          xl:mt-4 xl:gap-y-3 xl:text-[20px]"
        >
          {details.map(({ label, value }) => (
            <div className="contents" key={label}>
              <dt
                className="relative mr-3 pr-3 font-bold text-green-300
                before:absolute before:left-full before:top-1/2 before:h-3.5 before:w-0.75 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-green-300
                xl:before:h-5"
              >
                <span className="flex w-full justify-between">
                  {label.split('').map((character, index) => (
                    <span key={`${label}-${index}`}>{character}</span>
                  ))}
                </span>
              </dt>
              <dd className="min-w-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
