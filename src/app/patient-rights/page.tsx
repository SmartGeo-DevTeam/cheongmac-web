import Inner from '@/app/_components/inner';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '환자권리장전 | 청맥병원',
  description: '청맥병원의 환자권리장전을 안내합니다.',
};

interface ChildrenProps {
  children: ReactNode;
}

interface PatientSectionProps extends ChildrenProps {
  title: string;
}

interface PatientArticleProps extends ChildrenProps {
  title: string;
}

function PatientSection({ title, children }: PatientSectionProps) {
  return (
    <section className="mt-10 xl:mt-15">
      <h2
        className="mb-6 font-bold text-xl leading-[1.4] tracking-[-0.035em] text-[#262C35]
        xl:mb-7 xl:text-[34px]"
      >
        {title}
      </h2>

      <div
        className="space-y-7 text-sm leading-[1.7] text-[#262C35]
        xl:space-y-6 xl:text-lg xl:leading-[1.65]"
      >
        {children}
      </div>
    </section>
  );
}

function PatientArticle({ title, children }: PatientArticleProps) {
  return (
    <div>
      <h3 className="font-bold text-[#262C35]">{title}</h3>
      <div className="mt-1.5 break-keep">{children}</div>
    </div>
  );
}

export default function PatientRightsPage() {
  return (
    <div className="pt-20 xl:pt-5">
      <Inner usePaddingHorizontal>
        <div>
          <div className="flex items-center text-xs text-[#666666] xl:text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Home size={14} strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">현재 페이지</span>
              <select
                aria-label="현재 페이지"
                defaultValue="환자권리장전"
                className="appearance-none bg-transparent pr-1 text-xs outline-none xl:text-sm"
              >
                <option>환자권리장전</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>
          </div>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="font-bold text-[26px] tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              환자권리장전
            </h1>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <Inner usePaddingHorizontal>
        <article className="mx-auto max-w-[1080px] pb-14 pt-10 xl:pb-24 xl:pt-12">
          <p
            className="break-keep text-sm leading-[1.7] text-[#262C35]
            xl:text-center xl:text-lg xl:leading-[1.7]"
          >
            청맥병원은 인간 생명이 가지는 고귀한 존엄과 가치를 깊이 인식하며,
            신체적·정신적 어려움으로 병원을 찾는 모든 환자의 권리를 존중합니다.
            <br className="hidden xl:block" /> 환자분께 최선의 진료 서비스를
            제공하고 건강한 권익을 보호하기 위하여 다음과 같이 &apos;환자의
            권리와 의무&apos;를 명시합니다.
          </p>

          <PatientSection title="환자의 권리">
            <PatientArticle title="1. 진료 받을 권리">
              <p>
                환자는 자신의 건강보호와 증진을 위하여 적절한 보건의료서비스를
                받을 권리를 갖고, 성별·나이·종교·신분 및 경제적 사정 등을
                이유로 건강에 관한 권리를 침해받지 아니하며, 의료인은 정당한
                사유 없이 진료를 거부하지 못한다.
              </p>
            </PatientArticle>

            <PatientArticle title="2. 알권리 및 자기 결정권">
              <p>
                환자는 담당 의사·간호사 등으로부터 질병 상태, 치료 방법, 의학적
                연구 대상 여부, 장기이식 여부, 부작용 등 예상 결과 및 진료
                비용에 관하여 충분한 설명을 듣고 자세히 물어볼 수 있으며, 이에
                관한 동의 여부를 결정할 권리를 가진다.
              </p>
            </PatientArticle>

            <PatientArticle title="3. 비밀을 보호받을 권리">
              <p>
                환자는 진료와 관련된 신체상·건강상의 비밀과 사생활의 비밀을
                침해받지 아니하며, 의료인과 의료기관은 환자의 동의를 받거나 범죄
                수사 등 법률에서 정한 경우 외에는 비밀을 누설·발표하지 못한다.
              </p>
            </PatientArticle>

            <PatientArticle title="4. 상담·조정을 신청할 권리">
              <p>
                환자는 의료서비스 관련 분쟁이 발생한 경우, 한국의료분쟁조정
                중재원 등에 상담 및 조정 신청을 할 수 있다.
              </p>
            </PatientArticle>

            <PatientArticle title="5. 안전한 의료환경에서 진료받을 권리">
              <p>
                환자는 진료 정보가 보호되고 환자 안전이 유지되는 의료기관에서
                의료서비스를 제공받을 권리가 있다.
              </p>
            </PatientArticle>
          </PatientSection>

          <PatientSection title="환자의 의무">
            <PatientArticle title="1. 의료인에 대한 신뢰, 존중 의무">
              <p>
                환자는 자신의 건강 관련 정보를 의료인에게 정확히 알리고,
                의료인의 치료 계획을 신뢰하고 존중하여야 한다.
              </p>
            </PatientArticle>

            <PatientArticle title="2. 부정한 방법으로 진료를 받지 않을 의무">
              <p>
                환자는 진료 전에 본인의 신분을 밝혀야 하고, 다른 사람의 명의로
                진료를 받는 등 거짓이나 부정한 방법으로 진료를 받지 아니한다.
              </p>
            </PatientArticle>
          </PatientSection>
        </article>
      </Inner>
    </div>
  );
}
