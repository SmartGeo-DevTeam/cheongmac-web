import { CEAP_STAGES } from '@/app/_data/vascular/venous/varicose/ceap/stages';
import CeapStageItem from './stage-item';

/** CEAP C1~C6 단계별 설명 목록과 연결 그라디언트를 배치합니다. */
export default function CeapStageList() {
  return (
    <div
      id="vascular-venous-varicose-ceap-stage-list"
      className={`
        py-6 px-5 border-b border-b-default
        xl:p-0 xl:border-0
        `}
    >
      <ol
        className={`relative flex flex-col gap-4
          before:absolute before:left-4.25 before:top-4.5 before:bottom-4.5 before:w-0.5 before:bg-[linear-gradient(180deg,#F5CD76_0%,#F5CD76_20%,#F3A54B_40%,#E04C36_60%,#C52E2B_80%,#A81321_100%)]
          xl:before:left-5.75
          `}
      >
        {CEAP_STAGES.map(({ code, description }) => (
          <CeapStageItem key={code} code={code} description={description} />
        ))}
      </ol>
    </div>
  );
}
