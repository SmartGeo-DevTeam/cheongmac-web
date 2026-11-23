import Image from 'next/image';

/** CEAP C1~C6 단계 도해: 모바일/데스크톱 원본 이미지를 각각 선택합니다. */
export default function CeapIllustration() {
  return (
    <figure
      id="vascular-venous-varicose-ceap-illustration"
      className={`pt-10 pb-10
        xl:pt-12 xl:pb-0`}
    >
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet="/vascular/venous/varicose/ceap/ceap-stages-desktop.png"
          width={846}
          height={460}
        />
        <Image
          src="/vascular/venous/varicose/ceap/ceap-stages-mobile.png"
          alt="하지정맥류 CEAP 임상 분류 C1부터 C6까지 단계별 다리 상태를 비교한 도해"
          width={347}
          height={183}
          sizes="(min-width: 1280px) 66vw, calc(100vw - 40px)"
          className={`block w-full h-auto
            xl:rounded-2xl`}
        />
      </picture>
    </figure>
  );
}
