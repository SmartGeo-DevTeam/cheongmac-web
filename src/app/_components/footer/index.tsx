'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Footer({
  isMobile,
}: {
  isMobile: boolean;
}): React.ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { naver } = window as any;
      const mapOptions = {
        center: new naver.maps.LatLng(35.156721, 129.0593656),
        zoom: 15,
        disableDoubleClickZoom: true,
        scrollWheel: false,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_BOTTOM,
          style: naver.maps.ZoomControlStyle.SMALL,
        },
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      new naver.maps.Marker({
        position: new naver.maps.LatLng(35.156721, 129.0593656),
        map: map,
      });
    }
  }, []);

  return (
    <footer
      className="relative py-30 bg-[#102716] text-white overflow-scroll z-0
      xl:pt-15 xl:pb-20"
    >
      <div className="relative mx-auto px-5 max-w-420 w-full">
        <div className="xl:grid xl:grid-cols-[1fr_auto_auto] xl:items-start xl:gap-5">
          <section
            className="flex items-center gap-2
            xl:pl-10 xl:pr-39 xl:py-10 xl:col-start-2 xl:col-end-3 xl:row-start-1 xl:row-end-2 xl:gap-5 xl:rounded-[20px] xl:border xl:border-white/10 xl:bg-white/5"
          >
            <span
              className="w-10 h-10 flex justify-center items-center rounded-[10px] bg-white leading-[100%] font-bold text-sm text-[#1B2C25]
              xl:w-20 xl:h-18.5 xl:text-2xl"
            >
              대표
              <br />
              전화
            </span>
            <p
              className="tracking-[-2%] font-bold text-[34px]
              xl:font-[40px]"
            >
              <Link target="_blank" href={`tel:051-804-1119`}>
                051·804·1119
              </Link>
            </p>
          </section>

          <section
            className="block mt-2 tracking-[-4%] font-medium text-xs
            xl:hidden"
          >
            <div>
              <CopyToClipboard text="부산 부산진구 중앙대로 716-1">
                <div className="flex items-center gap-1">
                  <p>부산 부산진구 중앙대로 716-1 지하1층 ~ 지상6층 (부전동)</p>
                  <Image
                    src={`/icons/common/footer/copy.svg`}
                    alt="copy"
                    width={20}
                    height={20}
                  />
                </div>
              </CopyToClipboard>
            </div>
          </section>

          <section
            className="mt-2 tracking-[-4%] font-medium text-xs
            xl:mt-0 xl:h-full xl:col-start-1 xl:col-end-2 xl:row-start-1 xl:row-end-3"
          >
            <div
              ref={mapRef}
              className="w-full aspect-retro rounded-[20px] overflow-clip
              xl:aspect-auto xl:h-full"
            />
          </section>

          <section
            className="mt-2 
            xl:px-10 xl:pt-10 xl:pb-15 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-3 xl:rounded-[20px] xl:border xl:border-white/10"
          >
            <div
              className="hidden
              xl:flex xl:flex-col"
            >
              <div className="py-2 flex items-center gap-2">
                <Image
                  src={`/icons/common/footer/location.svg`}
                  alt="location"
                  width={28}
                  height={28}
                />
                <h4 className="tracking-[-4%] font-medium text-2xl">
                  오시는길
                </h4>
              </div>

              <CopyToClipboard text="부산 부산진구 중앙대로 716-1">
                <div className="mt-2.5 flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <p>
                      부산 부산진구 중앙대로 716-1 지하1층 ~ 지상6층 (부전동)
                    </p>
                  </div>

                  <button className="py-1 px-4 flex items-center gap-1.5 rounded-full border-[0.5px] border-[#F1F5F2] bg-white/10 text-sm cursor-pointer">
                    <span>주소 복사</span>
                    <Image
                      src={`/icons/common/footer/copy.svg`}
                      alt="copy"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </CopyToClipboard>
            </div>

            <div
              className="flex items-center gap-4 tracking-[-4%] font-medium text-xs
              xl:mt-7 xl:justify-between xl:font-normal xl:text-base
            "
            >
              <Link
                target="_blank"
                href={`https://map.naver.com/p/directions/-/3AGZJe,2z8W3o,%EC%B2%AD%EB%A7%A5%EB%B3%91%EC%9B%90,13350806,PLACE_POI/-/car?c=14.00,0,0,0,dh`}
                className="flex items-center gap-2"
              >
                <Image
                  src={`/images/common/footer/navermap.png`}
                  alt="navermap"
                  width={isMobile ? 18 : 30}
                  height={isMobile ? 18 : 30}
                  className="rounded-sm"
                />
                <span>네이버지도</span>
              </Link>
              <Link
                target="_blank"
                href={`https://map.kakao.com/link/to/청맥병원,35.156721,129.0593656`}
                className="flex items-center gap-2"
              >
                <Image
                  src={`/images/common/footer/kakaomap.png`}
                  alt="kakaomap"
                  width={isMobile ? 18 : 30}
                  height={isMobile ? 18 : 30}
                  className="rounded-sm"
                />
                <span>카카오맵</span>
              </Link>
              <Link
                target="_blank"
                href={`https://apis.openapi.sk.com/tmap/app/routes?appKey=JNHjcWGVSQ9Iqwa4K54lYaU2EsjT2P8H2pHBcaS5&name=청맥병원&lon=129.0593656&lat=35.156721`}
                className="flex items-center gap-2"
              >
                <Image
                  src={`/images/common/footer/tmap.png`}
                  alt="tmap"
                  width={isMobile ? 18 : 30}
                  height={isMobile ? 18 : 30}
                  className="rounded-sm"
                />
                <span>티맵</span>
              </Link>
              <Link
                target="_blank"
                href={`https://www.google.com/maps/dir//%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC+%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C+716-1+%EC%B2%AD%EB%A7%A5%EB%B3%91%EC%9B%90/data=!4m16!1m7!3m6!1s0x35689548450cded7:0x82e362f3200ba929!2z7LKt66el67OR7JuQ!8m2!3d35.1566928!4d129.0593822!16s%2Fg%2F1vd3snsk!4m7!1m0!1m5!1m1!1s0x35689548450cded7:0x82e362f3200ba929!2m2!1d129.0593822!2d35.1566928?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D`}
                className="flex items-center gap-2"
              >
                <Image
                  src={`/images/common/footer/googlemap.png`}
                  alt="googlemap"
                  width={isMobile ? 18 : 30}
                  height={isMobile ? 18 : 30}
                  className="rounded-sm"
                />
                <span>구글맵</span>
              </Link>
            </div>
          </section>

          <section
            className="mt-8.5 px-5 py-4 border-t-2 border-t-white border-b border-b-white
            xl:mt-0 xl:p-10 xl:col-start-3 xl:col-end-4 xl:row-start-1 xl:row-end-3 xl:h-full xl:rounded-[20px] xl:border xl:border-white/10"
          >
            <div className="hidden xl:py-2 xl:flex xl:items-center xl:gap-2">
              <Image
                src={`/icons/common/footer/clock.svg`}
                alt="clock"
                width={28}
                height={28}
              />
              <h4 className="tracking-[-4%] font-medium text-2xl">진료시간</h4>
            </div>

            <div
              className="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-1 tracking-[-4%]
              [&_span]:font-bold
              [&_p]:font-medium
              xl:mt-5 xl:gap-x-16 xl:gap-y-2.5
              xl:[&_span]:font-normal xl:[&_span]:text-lg
              xl:[&_p]:text-[28px]
              "
            >
              <div className="flex justify-between">
                <span>평</span>
                <span>일</span>
              </div>
              <p>09:00~18:00</p>
              <span>점심시간</span>
              <p className="tracking-[-1.5%]">12:30~13:30</p>
              <div className="flex justify-between">
                <span>토</span>
                <span>요</span>
                <span>일</span>
              </div>
              <p>09:00~13:00</p>
              <h4
                className="col-span-2 font-medium text-xs text-cm-orange
                xl:mt-8 xl:font-normal xl:text-lg xl:text-white/50"
              >
                * 일요일 및 공휴일 휴진
              </h4>
            </div>
          </section>
        </div>
      </div>

      <div
        className="mt-5
        xl:mt-10 xl:py-5 xl:border-t xl:border-t-white/30 xl:border-b xl:border-b-white/30"
      >
        <section
          className="mx-auto px-5 py-2 max-w-420 w-full flex gap-2 tracking-[-4%] whitespace-nowrap text-xs overflow-x-scroll
        [&>*:first-child]:font-bold
        [&>*:not(:first-child)]:opacity-70
        xl:gap-10 xl:text-base"
        >
          <Link href={`/`}>개인정보처리방침</Link>
          <Link href={`/`}>환자권리장전</Link>
          <Link href={`/`}>이메일무단수집거부</Link>
          <Link href={`/`}>비급여진료비 안내</Link>
        </section>
      </div>

      <div
        className="mx-auto mt-8 px-5 max-w-420 w-full grid grid-cols-2 justify-between items-center tracking-[-4%] text-xs
        [&_span]:font-medium [&_span]:opacity-50
        xl:mt-10 xl:grid-cols-[auto_1fr_auto] xl:gap-x-10 xl:text-sm"
      >
        <section
          className="relative w-36.5 aspect-logo
          xl:w-50 xl:opacity-50"
        >
          <Image
            src={`/common/logo-white.svg`}
            alt="logo-white"
            fill
            style={{ objectFit: 'cover' }}
          />
        </section>

        <section
          className="justify-self-end
          xl:col-start-3 xl:col-end-4"
        >
          <div
            className="flex items-center gap-1
            xl:justify-end xl:gap-2.5"
          >
            <Link
              target="_blank"
              href={`/`}
              className="relative w-6 h-6 xl:w-11.5 xl:h-11.5"
            >
              <Image
                src={`/images/common/footer/youtube.png`}
                alt="youtube"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <Link
              target="_blank"
              href={`/`}
              className="relative w-6 h-6 xl:w-11.5 xl:h-11.5"
            >
              <Image
                src={`/images/common/footer/instagram.png`}
                alt="instagram"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <Link
              target="_blank"
              href={`/`}
              className="relative w-6 h-6 xl:w-11.5 xl:h-11.5"
            >
              <Image
                src={`/images/common/footer/blog.png`}
                alt="blog"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <Link
              target="_blank"
              href={`/`}
              className="relative w-6 h-6 xl:w-11.5 xl:h-11.5"
            >
              <Image
                src={`/images/common/footer/tictok.png`}
                alt="tictok"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <Link
              target="_blank"
              href={`/`}
              className="relative w-6 h-6 xl:w-11.5 xl:h-11.5"
            >
              <Image
                src={`/images/common/footer/kakao.png`}
                alt="kakao"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>

          <section
            className="hidden mx-auto mt-5 px-5 max-w-420 w-full
            xl:block xl:px-0 xl:mt-3.5 xl:text-sm"
          >
            <p className="tracking-[-4%] text-xs opacity-50">{`@ ${new Date().getFullYear()} CHEONGMAC HOSPITAL. ALL RIGHTS RESERVED`}</p>
          </section>
        </section>

        <div
          className="col-start-1 col-end-3 mt-8
          xl:col-start-2 xl:row-start-1 xl:row-end-2 xl:mt-0 xl:opacity-50"
        >
          <section className="col-start-1 col-end-3 flex items-center gap-1.5">
            <span>주소</span>
            <p>부산 부산진구 중앙대로 716-1 지하1층 ~ 지상6층 (부전동)</p>
          </section>

          <div className="mt-4 flex items-center gap-5">
            <section className="flex items-center gap-1.5">
              <span>대표자</span>
              <p>박용범</p>
            </section>

            <section className="flex items-center gap-1.5">
              <span>사업자등록번호</span>
              <p>606-91-60274</p>
            </section>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <section className="flex items-center gap-1.5">
              <span>대표전화</span>
              <p>
                <Link target="_blank" href={`tel:051-804-1119`}>
                  051-804-1119
                </Link>
              </p>
            </section>
            <section className="flex items-center gap-1.5">
              <span>팩스</span>
              <p>051-337-1101</p>
            </section>
          </div>
        </div>
      </div>

      <section className="block mx-auto mt-5 px-5 max-w-420 w-full xl:hidden">
        <p className="tracking-[-4%] text-xs opacity-50">{`@ ${new Date().getFullYear()} CHEONGMAC HOSPITAL. ALL RIGHTS RESERVED`}</p>
      </section>
    </footer>
  );
}
