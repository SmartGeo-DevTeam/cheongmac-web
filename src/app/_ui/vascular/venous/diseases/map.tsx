import Link from 'next/link';
import Image from 'next/image';
import {
  venousDiseasePoints,
  type BodyPoint,
} from '@/app/_data/vascular/venous/diseases/map';

/**
 * 동맥질환과 동일한 반응형 지도 좌표계.
 * 의료 이미지를 실제로 왜곡하지 않고, 점은 인체 이미지에 백분율로 고정합니다.
 * 상세 페이지는 네비게이션의 isPublished 플래그가 true가 되면 정상적으로 열립니다.
 */
export default function VenousDiseaseMap() {
  const canvasWidth = 335;
  const originalWidth = 612;
  const originalHeight = 1438;
  const mobileImageRatio = 3 / 5;
  const desktopImageRatio = 2 / 5;
  const canvasHeight =
    (canvasWidth * mobileImageRatio * originalHeight) / originalWidth;

  const toCanvasPoint = (body: BodyPoint, ratio: number): BodyPoint => ({
    x: canvasWidth * ((1 - ratio) / 2 + (body.x / originalWidth) * ratio),
    y: (body.y / originalHeight) * canvasHeight,
  });

  const renderLines = (ratio: number) =>
    venousDiseasePoints.map(({ id, body, mobile }) => {
      const dot = toCanvasPoint(body, ratio);
      return (
        <path
          key={id}
          d={`M ${dot.x} ${dot.y} L ${mobile.elbowX} ${mobile.labelY} L ${mobile.labelX} ${mobile.labelY}`}
          fill="none"
          stroke="#FFBFA8"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      );
    });

  return (
    <div className="relative mx-auto w-full">
      <div className="relative mx-auto w-3/5 xl:w-2/5">
        <Image
          src="/vascular/venous/diseases/venous-body.png"
          alt="전신 정맥 구조 이미지"
          width={306}
          height={719}
          className="block h-auto w-full"
          sizes="(min-width: 1280px) 40vw, 60vw"
        />
        {venousDiseasePoints.map(({ id, href, title, body }) => (
          <Link
            key={id}
            href={href}
            aria-label={`${title} 상세 페이지로 이동`}
            title={title}
            style={{
              left: `${(body.x / originalWidth) * 100}%`,
              top: `${(body.y / originalHeight) * 100}%`,
            }}
            className="absolute z-20 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 xl:size-10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto size-5 rounded-full bg-[#FFD5C3] blur-[2.5px] xl:size-9 xl:blur-[5px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto size-3 rounded-full bg-[#FF8756] blur-[2.5px] xl:size-5.5 xl:blur-[5px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto size-1.5 rounded-full bg-[#FA6805] xl:size-3"
            />
          </Link>
        ))}
      </div>

      <svg
        aria-hidden="true"
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 size-full"
      >
        <g className="xl:hidden">{renderLines(mobileImageRatio)}</g>
        <g className="hidden xl:inline">{renderLines(desktopImageRatio)}</g>
      </svg>

      {venousDiseasePoints.map(({ id, title, href, mobile }) => (
        <Link
          key={`${id}-label`}
          href={href}
          aria-label={`${title} 상세 페이지로 이동`}
          style={{
            left: `${(mobile.labelX / canvasWidth) * 100}%`,
            top: `${(mobile.labelY / canvasHeight) * 100}%`,
          }}
          className={`absolute z-30 -translate-y-1/2 whitespace-nowrap rounded-full bg-orange-500 px-3 py-1 font-medium text-[12px] text-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 xl:px-5 xl:py-1.5 xl:text-[18px] ${mobile.side === 'left' ? '-translate-x-full' : ''}`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
