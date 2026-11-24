'use client';

import {
  footerHours,
  footerMapLinks,
  footerNavs,
  footerSocials,
} from '@/app/_data/site/footer';
import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import FooterCardTitle from './card-title';
import FooterTimeRow from './time-row';

type NaverMapsApi = {
  LatLng: new (latitude: number, longitude: number) => object;
  Map: new (
    element: HTMLDivElement,
    options: {
      center: object;
      zoom: number;
      disableDoubleClickZoom: boolean;
      scrollWheel: boolean;
      zoomControl: boolean;
      zoomControlOptions: { position: unknown; style: unknown };
    },
  ) => object;
  Marker: new (options: { position: object; map: object }) => object;
  Position: { RIGHT_BOTTOM: unknown };
  ZoomControlStyle: { SMALL: unknown };
};

const FOOTER_NO_MARGIN_PATHS = [
  '/about/introduction/history',
  '/about/tour',
  '/about/tour/floors',
  '/academics/conferences',
];

export default function SiteFooter(): ReactElement {
  const pathname = usePathname();
  const isNoMargin = FOOTER_NO_MARGIN_PATHS.includes(pathname ?? '');

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!isMapReady) return;
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    const { naver } = window as Window & { naver?: { maps?: NaverMapsApi } };

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
        className={`relative pt-10 pb-28 bg-[#205145] text-white [overflow-anchor:none] overflow-hidden z-0
        xl:pt-15 xl:pb-40
        ${isNoMargin ? 'mt-0' : 'mt-32'}`}
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
                  {footerMapLinks.map((item) => (
                    <Link
                      key={item.id}
                      target="_blank"
                      href={item.link}
                      className="flex items-center gap-1"
                    >
                      <div className="relative w-5 aspect-square rounded-sm overflow-clip xl:w-7.5">
                        <Image src={item.imagePath} alt={item.alt} fill />
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
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
                {footerHours.map((item) => (
                  <FooterTimeRow
                    key={item.id}
                    label={item.label}
                    time={item.time}
                  />
                ))}
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
              className="mt-3 flex gap-1
              xl:justify-end xl:gap-2.5"
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
