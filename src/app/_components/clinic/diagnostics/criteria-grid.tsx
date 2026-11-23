import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';
import CriteriaCard from './criteria-card';

/** 항목은 1~3개지만 데스크톱 그리드는 항상 3컬럼입니다. */
export default function CriteriaGrid({
  cards,
  description,
}: DiagnosticCriteriaSet) {
  return (
    <>
      {description && (
        <p className="mt-3 whitespace-break-spaces break-keep text-mo-body-1 text-gray-900">
          {description}
        </p>
      )}
      <ul className="mt-5 grid gap-8 xl:grid-cols-3 xl:gap-6">
        {cards.map((card, index) => (
          <CriteriaCard key={`${card.image}-${index}`} {...card} />
        ))}
      </ul>
    </>
  );
}
