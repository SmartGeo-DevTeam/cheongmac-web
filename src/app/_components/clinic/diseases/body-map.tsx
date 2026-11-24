import type {
  DiseaseBodyPoint,
  DiseaseMapPoint,
} from '@/app/_types/vascular/disease-map';
import Image from 'next/image';
import DiseaseLink from './link';

type Props = {
  id: string;
  points: readonly DiseaseMapPoint[];
  publishedHrefs: ReadonlySet<string>;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

const CANVAS_WIDTH = 335;
const ORIGINAL_WIDTH = 612;
const ORIGINAL_HEIGHT = 1438;
const MOBILE_IMAGE_RATIO = 3 / 5;
const DESKTOP_IMAGE_RATIO = 2 / 5;
const CANVAS_HEIGHT = (CANVAS_WIDTH * MOBILE_IMAGE_RATIO * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;

/** 기존 두 지도와 같은 좌표·링크 UI. 동맥의 두 번째 표시점도 그대로 렌더링합니다. */
export default function ClinicDiseaseBodyMap({
  id,
  points,
  publishedHrefs,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: Props) {
  const toCanvasPoint = (body: DiseaseBodyPoint, ratio: number): DiseaseBodyPoint => ({
    x: CANVAS_WIDTH * ((1 - ratio) / 2 + (body.x / ORIGINAL_WIDTH) * ratio),
    y: (body.y / ORIGINAL_HEIGHT) * CANVAS_HEIGHT,
  });

  const renderLines = (ratio: number) =>
    points.map((point) => {
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
    <div id={id} className="relative mx-auto w-full">
      <div
        className="relative mx-auto w-3/5
          xl:w-2/5"
      >
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes="(min-width: 1280px) 40vw, 60vw"
          className="block h-auto w-full"
        />
        {points.flatMap((point) => {
          const dots = [
            point.body,
            ...(point.additionalPoint ? [point.additionalPoint.body] : []),
          ];

          return dots.map((body, index) => (
            <DiseaseLink
              key={`${point.id}-${index}`}
              href={publishedHrefs.has(point.href) ? point.href : undefined}
              ariaLabel={`${point.title} 위치에서 상세 페이지로 이동`}
              title={point.title}
              style={{
                left: `${(body.x / ORIGINAL_WIDTH) * 100}%`,
                top: `${(body.y / ORIGINAL_HEIGHT) * 100}%`,
              }}
              className="absolute z-20 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500
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
            </DiseaseLink>
          ));
        })}
      </div>

      <svg
        aria-hidden="true"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 size-full"
      >
        <g className="xl:hidden">{renderLines(MOBILE_IMAGE_RATIO)}</g>
        <g className="hidden xl:inline">{renderLines(DESKTOP_IMAGE_RATIO)}</g>
      </svg>

      {points.map((point) => {
        const pos = point.mobile;

        return (
          <DiseaseLink
            key={point.id}
            href={publishedHrefs.has(point.href) ? point.href : undefined}
            ariaLabel={`${point.title} 상세 페이지로 이동`}
            style={{
              left: `${(pos.labelX / CANVAS_WIDTH) * 100}%`,
              top: `${(pos.labelY / CANVAS_HEIGHT) * 100}%`,
            }}
            className={`absolute z-30 -translate-y-1/2 px-3 py-1 whitespace-nowrap rounded-full bg-orange-500 font-medium text-[12px] text-inverse
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500
              xl:px-5 xl:py-1.5 xl:text-[18px]
              ${pos.side === 'left' ? '-translate-x-full' : ''}`}
          >
            {point.title}
          </DiseaseLink>
        );
      })}
    </div>
  );
}
