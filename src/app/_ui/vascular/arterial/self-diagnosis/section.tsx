import Inner from '@/app/_components/common/inner';
import { arterialSelfDiagnosisQuestions } from '@/app/_data/vascular/arterial/self-diagnosis/questions';
import Image from 'next/image';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ArterialSelfDiagnosisItem from './item';

export default function ArterialSelfDiagnosis() {
  return (
    <section id="vascular-arterial-self-diagnosis">
      <Inner>
        <SectionHeading
          label="자가진단 테스트"
          labelVariant="accent"
          title={
            <>
              <b>지금 내 동맥은 괜찮을까?</b>
              <br />
              7가지 징후를 점검해보세요
            </>
          }
        />

        <div
          className="mt-10 grid gap-5
          xl:grid-cols-[4.5fr_5.5fr] xl:gap-6"
        >
          <div
            className="relative aspect-335/300 rounded-xl overflow-clip
            xl:rounded-[20px] xl:aspect-auto"
          >
            <Image
              src={`/vascular/arterial/blood-vessel.png`}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div
            className="px-5 py-2 rounded-xl border border-default divide-y divide-default break-keep
            xl:border-0 xl:divide-0 xl:space-y-3"
          >
            {arterialSelfDiagnosisQuestions.map((question) => (
              <ArterialSelfDiagnosisItem key={question} label={question} />
            ))}
          </div>
        </div>

        <div
          className="mt-5 flex justify-center items-center
          xl:mt-15"
        >
          <button
            className="w-full p-4 rounded-xl border border-default font-bold text-[15px]
            xl:w-auto xl:px-10 xl:py-4 xl:rounded-full xl:bg-green-900 xl:text-[16px] xl:text-inverse"
          >
            결과 확인하기
          </button>
        </div>
      </Inner>
    </section>
  );
}
