import LegalPageLayout from '@/app/_components/legal-page';
import { Mail, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일 무단수집거부 | 청맥병원',
  description: '청맥병원의 이메일 무단수집거부 안내입니다.',
};

export default function EmailCollectionRefusalPage() {
  return (
    <LegalPageLayout
      title="이메일 무단수집거부"
      breadcrumbLabel="이메일무단수집거부"
      articleClassName="mx-auto max-w-[1080px] pb-14 xl:pb-24"
    >
      <div
        className="flex flex-col items-center gap-10
            xl:flex-row xl:justify-center xl:gap-12"
      >
        <div
          className="relative h-[112px] w-[112px] shrink-0
              xl:h-[120px] xl:w-[120px]"
          aria-hidden="true"
        >
          <Mail
            className="absolute left-0 top-0 h-[88px] w-[88px] text-[#DADDE1]
                xl:h-[96px] xl:w-[96px]"
            strokeWidth={1.7}
          />
          <ShieldCheck
            className="absolute bottom-0 right-0 h-[58px] w-[58px] fill-white text-[#FF7448]
                xl:h-[62px] xl:w-[62px]"
            strokeWidth={2.5}
          />
        </div>

        <div className="w-full max-w-7xl text-[#262C35]">
          <p
            className="break-keep text-lg font-bold leading-[1.55]
                xl:text-[22px]"
          >
            청맥병원은 본 서비스 내 이메일 주소의 무단 수집을 거부합니다.
          </p>

          <p
            className="mt-7 break-keep text-sm leading-[1.85]
                xl:mt-2 xl:text-lg xl:leading-[1.7]"
          >
            자동 수집 장치를 이용한 이메일 추출 등 부당한 방법으로 이메일 주소를
            획득하거나 광고성 정보를 전송할 경우 관련 법령에 따라 처벌될 수
            있습니다.
          </p>

          <p
            className="mt-7 text-sm text-[#969AA3]
                xl:mt-6 xl:text-base"
          >
            게시일: 2026년 MM월 DD일
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}
