import Link from 'next/link';
import { arterialDiseasePoints, type BodyPoint } from '@/app/_data/vascular/arterial/diseases/map';

export default function ArterialDiseaseMap() {
  const canvasWidth = 335;
  const imageWidthRatio = 3 / 5;
  const imageScale = (canvasWidth * imageWidthRatio) / 612;
  const canvasHeight = imageScale * 1438;

  // CHEONGMAC_ARTERIAL_RESPONSIVE_LINES_V1
  // SVG의 Y축은 동일한 인체 이미지 비율을, X축은 실제 반응형 이미지 너비를 사용합니다.
  // 두 버전 모두 기존 모바일 라벨 좌표를 유지하므로 점선은 버튼 끝까지 연결됩니다.
  const toCanvasPoint = (body: BodyPoint, ratio: number): BodyPoint => ({
    x: canvasWidth * ((1 - ratio) / 2 + (body.x / 612) * ratio),
    y: (body.y / 1438) * canvasHeight,
  });

  const renderLines = (ratio: number) =>
    arterialDiseasePoints.map((point) => {
      const pos = point.mobile;
      const bodyPoint = toCanvasPoint(point.body, ratio);
      const additionalBodyPoint = point.additionalPoint
        ? toCanvasPoint(point.additionalPoint.body, ratio)
        : null;
      const extraElbowX = point.additionalPoint?.mobile.elbowX;

      return (
        <g key={point.id}>
          <path
            d={`M ${bodyPoint.x} ${bodyPoint.y} L ${pos.elbowX} ${pos.labelY} L ${pos.labelX} ${pos.labelY}`}
            fill="none"
            stroke="#FFBFA8"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          {additionalBodyPoint && extraElbowX !== undefined && (
            <path
              d={`M ${pos.labelX} ${pos.labelY} L ${extraElbowX} ${additionalBodyPoint.y} L ${additionalBodyPoint.x} ${additionalBodyPoint.y}`}
              fill="none"
              stroke="#FFBFA8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}
        </g>
      );
    });

  return (
    <div className="relative mx-auto w-full">
      <div
        className="relative mx-auto w-3/5
        xl:w-2/5"
      >
        <img
          src="/vascular/arterial/artery-body.png"
          alt="전신 동맥 구조 이미지"
        />
        {arterialDiseasePoints.flatMap((point) => {
          const dots = [
            point.body,
            ...(point.additionalPoint ? [point.additionalPoint.body] : []),
          ];

          return dots.map((body, index) => (
            <Link
              key={`${point.id}-${index}`}
              href={point.href}
              aria-label={`${point.title} 위치에서 상세 페이지로 이동`}
              title={point.title}
              style={{
                left: `${(body.x / 612) * 100}%`,
                top: `${(body.y / 1438) * 100}%`,
              }}
              className="absolute z-20 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full
              xl:size-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 m-auto size-5 rounded-full bg-[#FFD5C3] blur-[2.5px]
                xl:size-9 xl:blur-[5px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 m-auto size-3 rounded-full bg-[#FF8756] blur-[2.5px]
                xl:size-5.5 xl:blur-[5px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 m-auto size-1.5 rounded-full bg-[#FA6805]
                xl:size-3"
              />
            </Link>
          ));
        })}
      </div>

      {/* SVG/라벨은 모바일 335 기준이며, 전체 지도 폭에 비례해 함께 확대/축소됩니다. */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 size-full"
      >
        {/* 이미지 너비: 모바일 60%, 데스크톱 40%. 좌표만 별도로 계산합니다. */}
        <g className="xl:hidden">{renderLines(3 / 5)}</g>
        <g className="hidden xl:inline">{renderLines(2 / 5)}</g>
      </svg>

      {arterialDiseasePoints.map((point) => {
        const pos = point.mobile;

        return (
          <Link
            key={point.id}
            href={point.href}
            aria-label={`${point.title} 상세 페이지로 이동`}
            style={{
              left: `${(pos.labelX / canvasWidth) * 100}%`,
              top: `${(pos.labelY / canvasHeight) * 100}%`,
            }}
            className={`absolute z-30 -translate-y-1/2 px-3 py-1 whitespace-nowrap rounded-full bg-orange-500 font-medium text-[12px] text-inverse
              xl:px-5 xl:py-1.5 xl:text-[18px] ${pos.side === 'left' ? '-translate-x-full' : ''}`}
          >
            {point.title}
          </Link>
        );
      })}
    </div>
  );
}
