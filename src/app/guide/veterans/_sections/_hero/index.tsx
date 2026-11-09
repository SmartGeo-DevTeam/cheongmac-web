import Inner from '@/app/_components/common/inner';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function Hero(): ReactNode {
  return (
    <section id="guide-veterans-hero">
      <Inner>
        <div
          className="mt-10 grid gap-2
          xl:mt-20 xl:grid-cols-[auto_1fr] xl:gap-6"
        >
          <div
            className="relative aspect-square rounded-xl overflow-clip
            xl:min-w-80 xl:h-full xl:rounded-[20px]"
          >
            <Image src={`/guide/thumbnail.png`} alt="" fill />
          </div>
          <div
            className="p-4 rounded-xl overflow-clip bg-gray-50
            xl:p-15 xl:flex xl:flex-col xl:justify-center"
          >
            <h3
              className="text-mo-heading-2 text-accent
              xl:text-pc-title-2"
            >
              전문위탁진료란?
            </h3>
            <div
              className="mt-2 space-y-2 break-keep text-[12px] text-gray-700
              xl:mt-5 xl:space-y-4 xl:text-pc-body-2"
            >
              <p>
                전문위탁은 국비 진료 대상자 중 전문의 소견과 당해 보훈병원의
                의료진 시설 장비 등 진료여건을 고려하여 보훈병원에서 진료가
                곤란한 환자에 대하여 전문병원에 위탁 의뢰하여 진료를 받을 수
                있도록 하는 제도입니다.
              </p>
              <p>
                청맥병원은 보훈병원과의 협약을 통해
                <br />
                <strong
                  className="text-mo-heading-2
                  xl:text-pc-heading-2"
                >
                  [투석혈관을 위한 혈관 수술 및 치료]
                </strong>{' '}
                전문위탁 진료를 시행합니다.
              </p>
            </div>
          </div>
        </div>
      </Inner>
    </section>
  );
}
