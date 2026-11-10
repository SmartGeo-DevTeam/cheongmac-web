import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import VeteransSectionDescription from './section-description';
import { procedureDescription, veteransProcedure } from '@/app/_data/guide/veterans/procedure';

export default function VeteransProcedure() {
  return (
    <section id="guide-veterans-procedure">
      <Inner>
        <SectionBlock title="진료 절차" variant="side">
          <VeteransSectionDescription
            text={procedureDescription}
            className="font-semibold"
          />

          <ul
            className="mt-3 space-y-3 break-keep
            xl:mt-10 xl:grid xl:grid-cols-3 xl:gap-5 xl:space-y-0"
          >
            {veteransProcedure.map((item, index) => (
              <li
                key={item.title}
                className="p-3 flex items-center gap-3 rounded-xl border border-default
                xl:p-5 xl:rounded-lg"
              >
                <span
                  className="font-bold text-mo-body-1 text-brand
                  xl:font-bold xl:text-pc-body-1"
                >
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <h3
                  className="text-mo-body-2
                  xl:text-pc-body-2"
                >
                  {item.title}
                </h3>
              </li>
            ))}
          </ul>

          <p
            className="mt-4 text-mo-body-1
            xl:mt-10 xl:text-pc-body-1"
          >
            <b>당일진료</b>는 <b>오후 4시 이전에 접수</b>를 해야 진료
            가능합니다.
          </p>
        </SectionBlock>
      </Inner>
    </section>
  );
}
