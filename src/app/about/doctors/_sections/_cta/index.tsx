import Inner from '@/app/_components/common/inner';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ctas } from './data';

export default function CTA() {
  return (
    <section id="introduction-doctors-cta">
      <Inner>
        <div
          className="my-5
          xl:mt-10 xl:mb-20"
        >
          <ul
            className="grid grid-cols-1 gap-2
            xl:grid-cols-3 xl:gap-6"
          >
            {ctas.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="relative flex px-10 py-6 rounded-xl overflow-clip
                  xl:py-8"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <div
                    className="space-y-4
                    xl:space-y-5"
                  >
                    <h4
                      className="flex flex-col leading-[1.4] font-extrabold text-[20px]
                    xl:text-[24px]"
                    >
                      {item.title.map((line, index) => (
                        <span key={index}>{line}</span>
                      ))}
                    </h4>

                    <p
                      className="flex items-center gap-1 text-[#555555] text-[15px]
                      xl:text-[18px]"
                    >
                      <span className="font-medium">{item.description}</span>
                      <ChevronRight
                        className="size-4
                        xl:size-5"
                      />
                    </p>
                  </div>

                  <div
                    className="absolute right-8 bottom-3.5 w-23 aspect-square
                  xl:right-9 xl:bottom-8"
                  >
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Inner>
    </section>
  );
}
