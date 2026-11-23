import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import FaqList from '@/app/_components/common/faq-list';
import {
  venousFaqMoreLink,
  venousFaqs,
} from '@/app/_data/vascular/venous/faq/questions';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function VenousFaq() {
  return (
    <section id="vascular-venous-faq">
      <div
        className="my-20
        xl:my-30"
      >
        <ClinicSplitLayout
          className="xl:items-start"
          leading={
            <div className="text-center xl:text-left">
              <ClinicSplitHeading
                label="FAQ"
                title={
                  <>
                    정맥질환
                    <br />
                    <strong>자주 묻는 질문</strong>
                  </>
                }
              />
            </div>
          }
        >
          <div className="px-5">
            <FaqList items={venousFaqs} iconVariant="plus-minus" />
            <Link
              href={venousFaqMoreLink.href}
              className="mt-10 px-7 py-3 flex justify-center items-center gap-1 font-bold text-[14px] text-tertiary
                xl:px-10 xl:py-4 xl:justify-end xl:text-[16px]"
              aria-label="의학상담 더보기"
            >
              <Plus
                aria-hidden="true"
                className="size-3
                  xl:hidden"
              />
              {venousFaqMoreLink.title}
            </Link>
          </div>
        </ClinicSplitLayout>
      </div>
    </section>
  );
}
