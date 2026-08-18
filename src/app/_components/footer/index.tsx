'use client';

import { Clock, MapPin, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const footerNavs = [
  {
    id: '1',
    title: '개인정보처리방침',
    link: '/privacy-policy',
  },
  {
    id: '2',
    title: '비급여진료비',
    link: '/non-covered-fees',
  },
  {
    id: '3',
    title: '이용약관',
    link: '/terms',
  },
  {
    id: '4',
    title: '환자권리장전',
    link: '/patient-rights',
  },
  {
    id: '5',
    title: '이메일무단수집거부',
    link: '/email-collection-refusal',
  },
];

const footerSocials = [
  {
    id: '1',
    title: 'youtube',
    imagePath: '/assets/icons/social-youtube.png',
    link: '/',
  },
  {
    id: '2',
    title: 'instagram',
    imagePath: '/assets/icons/social-instagram.png',
    link: '/',
  },
  {
    id: '3',
    title: 'naver-blog',
    imagePath: '/assets/icons/social-naver-blog.png',
    link: '/',
  },
  {
    id: '4',
    title: 'naver-talktalk',
    imagePath: '/assets/icons/social-naver-talktalk.png',
    link: '/',
  },
];

function FooterCardTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="shrink-0 size-6
        xl:size-7"
      />
      <h4
        className="font-medium text-xl
        xl:text-2xl"
      >
        {title}
      </h4>
    </div>
  );
}

function TimeLabel({ children }: { children: string }) {
  return (
    <span
      className="inline-block w-[4em] text-justify [text-align-last:justify] [text-justify:inter-character] font-bold text-sm text-[#F1F5F2]/50
      xl:text-lg"
    >
      {children}
    </span>
  );
}

function TimeText({ children }: { children: string }) {
  return (
    <p
      className="w-[13ch] font-medium whitespace-nowrap tabular-nums
      xl:text-[28px]"
    >
      {children}
    </p>
  );
}

export default function Footer(): ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!isMapReady) return;
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    const { naver } = window as any;

    if (!naver?.maps) return;

    const center = new naver.maps.LatLng(35.156721, 129.0593656);

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 15,
      disableDoubleClickZoom: true,
      scrollWheel: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });

    new naver.maps.Marker({
      position: center,
      map,
    });

    mapInstanceRef.current = map;
  }, [isMapReady]);

  return (
    <>
      <footer
        className="relative pt-10 pb-28 bg-[#205145] text-white [overflow-anchor:none] overflow-hidden z-0
        xl:pt-15 xl:pb-40"
      >
        <div className="relative mx-auto w-full max-w-7xl px-5">
          <div
            className="grid grid-cols-1 gap-y-2
            xl:grid-cols-3 xl:grid-rows-[auto_auto_auto] xl:items-stretch xl:gap-x-5 xl:gap-y-0"
          >
            {/* 지도 */}
            <section className="w-full aspect-video rounded-2xl overflow-clip">
              <div ref={mapRef} className="absolute inset-0 h-full w-full" />
            </section>

            <div
              className="space-y-2
              xl:space-y-5"
            >
              {/* 오시는길 */}
              <section
                className="px-3 py-5 rounded-2xl border border-white/10 overflow-clip
                xl:px-10 xl:pt-12 xl:pb-10"
              >
                <FooterCardTitle icon={MapPin} title="오시는길" />

                <CopyToClipboard text="부산 부산진구 중앙대로 716-1">
                  <div
                    className="mt-2 flex items-center gap-1
                    xl:mt-2.5"
                  >
                    <p
                      className="break-keep text-sm text-[#F1F5F2]
                      xl:text-lg"
                    >
                      부산 부산진구 중앙대로 716-1 지하1층 ~ 지상6층 (부전동)
                    </p>
                    <Image
                      src="/assets/icons/footer-copy.svg"
                      alt="copy"
                      width={20}
                      height={20}
                    />
                  </div>
                </CopyToClipboard>

                <div
                  className="mt-4 flex items-center flex-wrap gap-4 text-xs font-medium tracking-[-4%]
                  xl:mt-7 xl:justify-between xl:font-normal xl:text-base"
                >
                  <Link
                    target="_blank"
                    href="https://map.naver.com/p/directions/-/3AGZJe,2z8W3o,%EC%B2%AD%EB%A7%A5%EB%B3%91%EC%9B%90,13350806,PLACE_POI/-/car?c=14.00,0,0,0,dh"
                    className="flex items-center gap-1"
                  >
                    <div className="relative w-5 aspect-square rounded-sm overflow-clip xl:w-7.5">
                      <Image
                        src="/assets/icons/map-navermap.png"
                        alt="navermap"
                        fill
                      />
                    </div>
                    <span>네이버지도</span>
                  </Link>

                  <Link
                    target="_blank"
                    href="https://map.kakao.com/link/to/청맥병원,35.156721,129.0593656"
                    className="flex items-center gap-1"
                  >
                    <div className="relative w-5 aspect-square rounded-sm overflow-clip xl:w-7.5">
                      <Image
                        src="/assets/icons/map-kakaomap.png"
                        alt="kakaomap"
                        fill
                      />
                    </div>
                    <span>카카오맵</span>
                  </Link>

                  <Link
                    target="_blank"
                    href="https://apis.openapi.sk.com/tmap/app/routes?appKey=JNHjcWGVSQ9Iqwa4K54lYaU2EsjT2P8H2pHBcaS5&name=청맥병원&lon=129.0593656&lat=35.156721"
                    className="flex items-center gap-1"
                  >
                    <div className="relative w-5 aspect-square rounded-sm overflow-clip xl:w-7.5">
                      <Image src="/assets/icons/map-tmap.png" alt="tmap" fill />
                    </div>
                    <span>티맵</span>
                  </Link>

                  <Link
                    target="_blank"
                    href="https://www.google.com/maps/dir//%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC+%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C+716-1+%EC%B2%AD%EB%A7%A5%EB%B3%91%EC%9B%90/data=!4m16!1m7!3m6!1s0x35689548450cded7:0x82e362f3200ba929!2z7LKt66el67OR7JuQ!8m2!3d35.1566928!4d129.0593822!16s%2Fg%2F1vd3snsk!4m7!1m0!1m5!1m1!1s0x35689548450cded7:0x82e362f3200ba929!2m2!1d129.0593822!2d35.1566928?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                    className="flex items-center gap-1"
                  >
                    <div className="relative w-5 aspect-square rounded-sm overflow-clip xl:w-7.5">
                      <Image
                        src="/assets/icons/map-googlemap.png"
                        alt="googlemap"
                        fill
                      />
                    </div>
                    <span>구글맵</span>
                  </Link>
                </div>
              </section>

              {/* 대표전화 */}
              <section
                className="px-3 py-2.5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 overflow-clip
                xl:px-10 xl:py-7 xl:gap-5"
              >
                <span
                  className="shrink-0 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#F1F5F2] leading-[110%] font-extrabold text-sm text-[#1B2C25]
                  xl:w-19.5 xl:h-19.5 xl:text-2xl"
                >
                  대표
                  <br />
                  전화
                </span>

                <p
                  className="font-extrabold text-[28px] text-[#F1F5F2]
                  xl:text-[clamp(28px,2.2vw,34px)]"
                >
                  <Link target="_blank" href="tel:051-804-1119">
                    051·804·1119
                  </Link>
                </p>
              </section>
            </div>

            {/* 진료시간 */}
            <section
              className="px-5 py-5 rounded-2xl border border-white/10 overflow-clip
              xl:px-10 xl:pt-12 xl:pb-10"
            >
              <FooterCardTitle icon={Clock} title="진료시간" />

              <div
                className="mt-2 grid grid-cols-[4em_13ch] items-center gap-x-5 gap-y-2 
                xl:mt-5"
              >
                <TimeLabel>평일</TimeLabel>
                <TimeText>09:00 - 18:00</TimeText>

                <TimeLabel>점심시간</TimeLabel>
                <TimeText>12:30 - 13:30</TimeText>

                <TimeLabel>토요일</TimeLabel>
                <TimeText>09:00 - 13:00</TimeText>
              </div>

              <p
                className="mt-2 font-medium text-xs text-white/50
                xl:mt-9 xl:text-lg"
              >
                * 일요일 및 공휴일 휴진
              </p>
            </section>
          </div>
        </div>

        <div
          className="mt-5 -mr-5
        xl:mt-10 xl:border-t-[0.5px] xl:border-b-[0.5px] border-white/30"
        >
          <div className="relative mx-auto w-full max-w-7xl px-5">
            <nav aria-label="푸터 메뉴">
              <ul
                className="pr-5 flex flex-nowrap items-center gap-2 overflow-x-scroll
                xl:gap-8"
              >
                {footerNavs.map((item, index) => (
                  <li key={item.id} className="flex">
                    <Link
                      href={item.link}
                      className={`whitespace-nowrap text-xs
                        xl:py-5 xl:text-base
                        ${index === 0 ? 'font-extrabold' : 'opacity-70'}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-7xl px-5
          xl:mt-10 xl:flex xl:justify-between xl:items-center xl:opacity-50"
        >
          <div
            className="mt-6 grid grid-cols-1
            xl:mt-0 xl:grid-cols-[auto_auto] xl:items-center xl:gap-x-10"
          >
            <div
              className="relative w-36.5 aspect-logo
              xl:w-48"
            >
              <Image src={`/assets/brand/logo-white.svg`} alt="logo" fill />
            </div>

            <div
              className="mt-3 space-y-1 break-keep text-[13px]
              xl:text-[15px]"
            >
              <div className="flex gap-1.5">
                <span className="shrink-0 opacity-50">주소</span>
                <p>부산 부산진구 중앙대로 716-1 지하1층 ~ 지상6층 (부전동)</p>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-1.5">
                  <span className="shrink-0 opacity-50">대표자</span>
                  <p>박용범</p>
                </div>
                <div className="flex gap-1.5">
                  <span className="shrink-0 opacity-50">사업자등록번호</span>
                  <p>606-91-60274</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-1.5">
                  <span className="shrink-0 opacity-50">대표전화</span>
                  <p>
                    <Link target="_blank" href="tel:051-804-1119">
                      051-804-1119
                    </Link>
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="shrink-0 opacity-50">팩스</span>
                  <p>051-337-1101</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ul
              className="mt-3 flex justify-end gap-1
              xl:gap-2.5"
            >
              {footerSocials.map((social) => (
                <li
                  key={social.id}
                  className="relative w-7 h-7
                  xl:w-10 xl:h-10"
                >
                  <Link href={social.link}>
                    <Image src={social.imagePath} alt={social.title} fill />
                  </Link>
                </li>
              ))}
            </ul>

            <p
              className="mt-3 text-xs opacity-50
              xl:text-sm"
            >{`@ ${new Date().getFullYear()} CHEONGMAC HOSPITAL. ALL RIGHTS RESERVED`}</p>
          </div>
        </div>
      </footer>

      <Script
        id="naver-map-script"
        type="text/javascript"
        strategy="afterInteractive"
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=its02p5ph4"
        onReady={() => setIsMapReady(true)}
      />
    </>
  );
}
