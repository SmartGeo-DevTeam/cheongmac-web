import Image from 'next/image';

/** CEAP C1~C6 단계 도해: 모바일/데스크톱 원본 이미지를 각각 선택합니다. */
export default function CeapIllustration() {
  return (
    <div id="vascular-venous-varicose-ceap-illustration">
      <div
        className="relative aspect-347/183
        xl:aspect-846/460 xl:rounded-[20px] overflow-clip"
      >
        <Image
          src={`/vascular/venous/varicose/ceap/ceap-stages-mobile.png`}
          alt=""
          fill
          className="xl:hidden"
        />

        <Image
          src={`/vascular/venous/varicose/ceap/ceap-stages-desktop.png`}
          alt=""
          fill
          className="hidden xl:block"
        />
      </div>
    </div>
  );
}
