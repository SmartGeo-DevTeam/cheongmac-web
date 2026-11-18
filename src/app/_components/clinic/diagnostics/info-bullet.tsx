type InfoBulletProps = { children: string };

/** 검사 정보와 진단 기준의 공통 설명 불릿. */
export default function InfoBullet({ children }: InfoBulletProps) {
  return (
    <p className="relative ml-1 pl-2.5 text-mo-body-1 text-gray-900 before:absolute before:left-0 before:top-2.5 before:size-0.75 before:rounded-full before:bg-gray-900 xl:text-[20px] xl:before:top-3.5">
      {children}
    </p>
  );
}
