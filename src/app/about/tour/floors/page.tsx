import Inner from '@/app/_components/common/inner';
import { floors } from './data';

export default function AboutTourFloorsPage() {
  return (
    <section id="about-tour-floors">
      <div
        className="pt-5
        xl:pt-20 xl:bg-linear-to-b xl:from-[#FFFFFF] xl:to-[#EAF2FD]"
      >
        <Inner>
          <div className="xl:grid xl:grid-cols-2 xl:gap-0">
            <div className="relative hidden xl:block">
              <div className="absolute bottom-0 right-0 h-full aspect-683/782 bg-[url('/tour/hospital.png')] bg-contain bg-bottom-right bg-no-repeat pointer-events-none" />
            </div>
            <ul
              className="relative pb-10 space-y-3 z-10
              xl:pb-15"
            >
              {floors.map((item) => (
                <li
                  key={item.id}
                  className="p-5 rounded-lg border border-default
                  xl:rounded-xl xl:bg-white"
                >
                  <div
                    className="flex items-center gap-2
                    xl:gap-3"
                  >
                    <p
                      className="flex justify-center items-center w-7.5 aspect-square rounded-sm bg-subtle text-center font-bold text-[16px]
                      xl:w-11.5 xl:text-pc-heading-2"
                    >
                      {item.floor}
                    </p>
                    <h3
                      className="text-mo-heading-2
                      xl:text-pc-heading-2"
                    >
                      {item.title}
                    </h3>
                  </div>

                  <ul
                    className="mt-2 space-y-1.5 text-mo-body-2
                    xl:mt-4 xl:pl-1 xl:space-y-2 xl:text-pc-body-2"
                  >
                    {item.descriptions.map((description, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="relative ml-2 pl-3
                        before:absolute before:left-0 before:top-2.5 before:w-1 before:h-1 before:rounded-full before:bg-gray-900"
                      >
                        {description}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Inner>
      </div>
    </section>
  );
}
