import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import DotHeading from '@/app/_components/common/dot-heading';
import Image from 'next/image';

export default function OcclusionComparison() {
  return (
    <section id="vascular-arterial-occlusion-comparison">
      <Inner>
        <SectionHeading
          label="Diagnosis · 진단"
          labelVariant="disabled"
          title={
            <>
              <b>하지동맥폐색증 진단 방법</b>
            </>
          }
        />
      </Inner>

      <div
        className="mt-10 relative aspect-1280/480
        xl:mx-auto xl:mt-25 xl:max-w-4xl xl:rounded-[20px] xl:overflow-clip"
      >
        <Image src={`/_____________temp/temp.png`} alt="" fill />
      </div>

      <div
        className="mt-5 px-5 break-keep text-center
        xl:mx-auto xl:mt-15 xl:max-w-7xl"
      >
        <h3
          className="leading-[145%] font-medium text-[18px] text-secondary
          xl:mx-auto xl:w-4/5 xl:text-[34px]"
        >
          말초동맥폐쇄증 진단은
          <br />
          <strong className="font-extrabold text-primary">
            직접 맥박을 확인하는 촉진
          </strong>
          에서 시작됩니다.
        </h3>

        <p
          className="mt-5 text-[14px] text-[#666666]
          xl:mx-auto xl:mt-10 xl:w-4/5 xl:text-pc-body-1 xl:text-primary"
        >
          발등, 발목 안쪽, 무릎 뒤, 허벅지 안쪽의 맥박을 짚어 맥박이 약하거나
          만져지지 않으면 혈관 협착을 의심할 수 있으며,{' '}
          <br
            className="hidden
            xl:block"
          />
          하지냉감·피부 변색·상처 유무를 함께 육안으로 진찰합니다. 이후 협착이
          의심되는 경우 아래의 정밀 검사를 시행합니다.
        </p>
      </div>

      <Inner>
        {/* 추후 컴포넌트화 해야하는 진료분야->탭 버튼 섹션: 컴포넌트화 했을 때 기능도 필터링 되게끔 해야함. */}
        <div className="mt-15 grid grid-cols-2 gap-2 text-[16px]">
          <button className="py-3 rounded-lg border border-green-600 bg-green-600 font-semibold text-inverse">
            ABI 검사
          </button>
          <button className="py-3 rounded-lg border border-default font-medium">
            도플러 초음파 검사
          </button>
          <button className="py-3 rounded-lg border border-default font-medium">
            혈관 CT
          </button>
          <button className="py-3 rounded-lg border border-default font-medium">
            혈관 조영술
          </button>
        </div>

        <div className="mt-10">
          {/* 추후 컴포넌트화 해야하는 진료분야->방법->제목 섹션 */}
          <div>
            <span className="text-mo-caption text-disabled">
              Ankle-Brachial IndexTest
            </span>
            <h3 className="mt-2 leading-[135%] font-bold text-[24px] text-gray-900">
              발목상완지수 검사 (ABI 검사)
            </h3>
            <p className="mt-2 text-mo-body-2 text-gray-900">
              팔과 다리의 혈압을 측정하여 비교하는 간단하고 비침습적인
              동맥경화도 검사로, 말초동맥폐쇄증의 진단 및 중증도 평가에 가장
              기본적으로 사용됩니다.
            </p>
          </div>

          {/* 추후 컴포넌트 해야하는 진료분야-> 검사정보 섹션 */}
          <div className="mt-10">
            {/* 이미지 */}
            <div className="relative aspect-628/465 rounded-t-xl overflow-clip">
              <Image src={`/_____________temp/temp-2.png`} alt="" fill />
            </div>
            {/* 검사 정보 */}
            <div className="px-5 py-4 space-y-5 rounded-b-xl bg-gray-50">
              {/* 검사정보 내부 제목 */}
              <DotHeading title="검사 정보" />

              <div className="">
                <span className="font-bold text-[14px] text-green-500">
                  검사정보
                </span>
                <p
                  className="relative ml-1 pl-2.5 text-mo-body-1 text-gray-900
                  before:absolute before:left-0 before:top-2.5 before:size-0.75 before:rounded-full before:bg-gray-900"
                >
                  약 15분 소요
                </p>
              </div>
              <div className="">
                <span className="font-bold text-[14px] text-green-500">
                  검사과정
                </span>
                <p
                  className="relative ml-1 pl-2.5 text-mo-body-1 text-gray-900
                  before:absolute before:left-0 before:top-2.5 before:size-0.75 before:rounded-full before:bg-gray-900"
                >
                  양팔과 양쪽 발목에 커프 착용 후 혈압 측정
                </p>
              </div>
              <div className="">
                <span className="font-bold text-[14px] text-green-500">
                  특징
                </span>
                <p
                  className="relative ml-1 pl-2.5 text-mo-body-1 text-gray-900
                  before:absolute before:left-0 before:top-2.5 before:size-0.75 before:rounded-full before:bg-gray-900"
                >
                  동맥질환, 혈관나이, 동맥경화도 진단 가능
                </p>
                <p
                  className="relative ml-1 pl-2.5 text-mo-body-1 text-gray-900
                  before:absolute before:left-0 before:top-2.5 before:size-0.75 before:rounded-full before:bg-gray-900"
                >
                  혈관성 환자 판별하는 국제적 표준 선별 검사
                </p>
              </div>
            </div>
          </div>

          {/* 여기 아래 레이아웃 나누는 것부터 시작! */}
          {/* 여기는 모든 페이지에 공통되는 만큼 여러 스크린샷을 GPT에 올려서 variants로 분리하는 걸 이해관계를 맞춰야함. */}
        </div>
      </Inner>
    </section>
  );
}
