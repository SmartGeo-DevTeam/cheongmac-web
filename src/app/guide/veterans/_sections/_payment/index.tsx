import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import SectionDescription from '../../_components/section-description';
import { paymentDescription, paymentDocuments } from './data';

export default function Payment() {
  return (
    <section id="guide-veterans-payment">
      <Inner>
        <SectionBlock
          title="진료비 지급 신청"
          variant="side"
          className="mb-20 xl:mb-36"
        >
          <SectionDescription text={paymentDescription} />

          <ul
            className="mt-3 p-4 grid grid-cols-2 gap-x-3 gap-y-1 rounded-xl bg-gray-50
            xl:mt-10 xl:p-10"
          >
            {paymentDocuments.map((document, index) => (
              <li
                key={index}
                className="relative pl-3 leading-[160%] break-keep text-[12px] text-gray-700
                xl:text-pc-body-2
                before:absolute before:left-0 before:top-3 before:size-1 before:rounded-full before:bg-gray-700
                xl:before:top-3.25"
              >
                {document}
              </li>
            ))}
          </ul>
        </SectionBlock>
      </Inner>
    </section>
  );
}
