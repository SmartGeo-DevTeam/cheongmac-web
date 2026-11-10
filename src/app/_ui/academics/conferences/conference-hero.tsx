import Inner from '@/app/_components/common/inner';
import ConferencesAward from './award';
import { conferences } from '@/app/_data/academics/conferences/featured-conferences';

export default function ConferencesHero() {
  return (
    <section id="academics-conferences-hero">
      <div
        className="bg-[url('/conferences/featured-m.png')] bg-cover bg-center bg-no-repeat
        xl:bg-[url('/conferences/featured-pc.png')]"
      >
        <Inner>
          <div
            className="mt-20 pt-13 pb-24
            xl:pt-25 xl:pb-30"
          >
            <p
              className="text-center text-mo-label text-inverse
              xl:text-left xl:text-pc-heading-1"
            >
              · 주요 발표 ·
            </p>
            <div
              className="mt-8 px-5
              xl:mt-16.5 xl:px-0 xl:grid xl:grid-cols-2 xl:gap-25"
            >
              <div
                className="relative isolate
                before:absolute before:left-1/2 before:-top-8 before:-translate-x-1/2 before:w-9/10 before:aspect-417/62 before:bg-[url('/conferences/featured-typo.png')] before:bg-cover before:bg-center before:bg-no-repeat before:z-0
                xl:before:left-2 xl:before:-top-14 xl:before:translate-x-0 xl:before:w-7/10"
              >
                <div
                  className="relative z-10 w-full aspect-628/400 rounded-xl bg-[url('/conferences/temp-1.png')] bg-cover bg-center bg-no-repeat
                  xl:rounded-[20px]"
                />
              </div>

              <div
                className="mt-5
                xl:mt-10"
              >
                <ConferencesAward label={conferences.award} variant="featured" />
                <h3
                  className="mt-2 leading-[150%] font-bold text-inverse text-[20px]
                  xl:mt-1 xl:text-pc-title-2"
                >
                  {conferences.title}
                </h3>
                <p
                  className="mt-3 text-accent-ai text-[12px]
                  xl:mt-5 xl:text-pc-body-1"
                >
                  {conferences.topic}
                </p>
              </div>
            </div>
          </div>
        </Inner>
      </div>
    </section>
  );
}
