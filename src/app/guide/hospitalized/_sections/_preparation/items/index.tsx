import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import InformationTable from '@/app/guide/hospitalized/_components/_information-table';
import Image from 'next/image';
import { preparationCards, preparationRows } from './data';

export default function PreparationItems() {
  return (
    <section id="guide-hospitalized-preparation-items">
      <Inner>
        <SectionBlock title="입원 준비물" className="xl:mt-40">
          <div className="xl:grid xl:grid-cols-[6fr_3.5fr] xl:items-start xl:gap-21">
            <InformationTable
              headers={['항목', '상세 내용']}
              rows={preparationRows}
            />
            <div className="mt-5">
              <ul
                className="grid grid-cols-2 gap-3
                xl:gap-6"
              >
                {preparationCards.map((item) => {
                  const isNotice = item.type === 'notice';

                  return (
                    <li
                      key={item.id}
                      className={`p-5 flex flex-col items-center leading-[140%] rounded-lg
                        xl:rounded-xl
                        ${isNotice ? 'col-span-2 bg-accent-subtle' : 'bg-subtle'}`}
                    >
                      <div className={`relative w-25 h-20`}>
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span
                        className="whitespace-break-spaces text-center font-medium text-[15px]
                        xl:mt-1 xl:text-[17px]"
                      >
                        {item.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </SectionBlock>
      </Inner>
    </section>
  );
}
