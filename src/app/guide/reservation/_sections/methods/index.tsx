import Inner from '@/app/_components/common/inner';
import SectionTitle from '@/app/_components/common/section-title';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { methods } from './data';

const cardClassName = `relative p-7 pb-5 flex flex-col items-start rounded-xl bg-subtle
  xl:p-10`;

export default function Methods(): ReactNode {
  return (
    <section id="guide-reservation-methods">
      <Inner>
        <div className="mt-10 xl:mt-30">
          <SectionTitle
            text={
              <>
                언제 어디서나 <br className="xl:hidden" />
                간편하게 예약하세요
              </>
            }
          />
        </div>

        <ul className="mt-5 space-y-3 xl:mt-15 xl:grid xl:grid-cols-3 xl:gap-6">
          {methods.map((method) => {
            const content = (
              <>
                <h3 className="text-mo-title-2 xl:text-pc-title-2">
                  {method.title}
                </h3>
                <p className="mt-1 text-mo-body-1 xl:text-pc-body-1">
                  {method.description}
                </p>
                <span className="mt-5 px-8 py-3 flex items-center gap-3 rounded-full bg-base">
                  <span className="font-bold text-[16px]">
                    {method.href ? '예약하기' : '링크 등록 예정'}
                  </span>
                  {method.href && <ChevronRight className="size-4" />}
                </span>
                <div className="absolute right-5 top-5 size-15 xl:right-10 xl:top-10">
                  <Image src={method.image} alt="" fill />
                </div>
              </>
            );

            return (
              <li key={method.id}>
                {!method.href ? (
                  <div className={cardClassName} aria-disabled="true">
                    {content}
                  </div>
                ) : method.href.startsWith('tel:') ||
                  method.href.startsWith('http') ? (
                  <a
                    href={method.href}
                    className={cardClassName}
                    {...(method.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={method.href} className={cardClassName}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Inner>
    </section>
  );
}
