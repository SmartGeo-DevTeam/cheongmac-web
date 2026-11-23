import DotHeading from '@/app/_components/common/dot-heading';
import InfoBullet from '@/app/_components/clinic/diagnostics/info-bullet';
import MethodHeading from '@/app/_components/clinic/diagnostics/method-heading';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import Image from 'next/image';

type PhysicalExaminationProps = { method: DiagnosticMethod };

/** 이학적 검사는 별도 진단기준이 없으므로 검사 정보만 표시합니다. */
export default function PhysicalExamination({ method }: PhysicalExaminationProps) {
  return (
    <div id="vascular-venous-varicose-diagnostics-physical-detail">
      <MethodHeading eyebrow={method.eyebrow} title={method.title} description={method.description} />
      <div className={`mt-10 grid overflow-hidden rounded-xl bg-gray-50
        xl:grid-cols-2 xl:gap-6 xl:overflow-visible xl:bg-transparent`}>
        <div className={`relative aspect-628/410 overflow-hidden
          xl:aspect-628/303 xl:rounded-xl`}>
          <Image
            src={method.image}
            alt="의료진이 환자의 증상과 병력을 확인하는 이학적 검사 모습"
            fill
            sizes="(min-width: 1280px) 628px, 100vw"
            className={`object-cover`}
          />
        </div>
        <div className={`px-5 py-5
          xl:px-0 xl:py-0`}>
          <div className={`hidden xl:block`}>
            <DotHeading title="검사 정보" as="h4" />
          </div>
          {method.infoGroups.map((group) => (
            <div
              key={group.label}
              className={`xl:mt-5 xl:px-8 xl:py-5 xl:rounded-xl xl:bg-subtle`}
            >
              <p className={`font-bold text-mo-body-1 text-green-500
                xl:text-[20px]`}>
                {group.label}
              </p>
              <div className={`mt-1 space-y-1`}>
                {group.items.map((item) => (
                  <InfoBullet key={item}>{item}</InfoBullet>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
