import LegalPageLayout, {
  LegalArticle,
  LegalSection,
} from '@/app/_components/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '환자권리장전 | 청맥병원',
  description: '청맥병원의 환자권리장전을 안내합니다.',
};

export default function PatientRightsPage() {
  return (
    <LegalPageLayout
      title="환자권리장전"
      breadcrumbLabel="환자권리장전"
      articleClassName="mx-auto max-w-[1080px] pb-14 pt-10 xl:pb-24 xl:pt-12"
    >
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

          <LegalSection variant="patient" title="환자의 권리">
            <LegalArticle variant="patient" title="1. 진료 받을 권리">
              <p>
                환자는 자신의 건강보호와 증진을 위하여 적절한 보건의료서비스를
                받을 권리를 갖고, 성별·나이·종교·신분 및 경제적 사정 등을
                이유로 건강에 관한 권리를 침해받지 아니하며, 의료인은 정당한
                사유 없이 진료를 거부하지 못한다.
              </p>
            </LegalArticle>

            <LegalArticle variant="patient" title="2. 알권리 및 자기 결정권">
              <p>
                환자는 담당 의사·간호사 등으로부터 질병 상태, 치료 방법, 의학적
                연구 대상 여부, 장기이식 여부, 부작용 등 예상 결과 및 진료
                비용에 관하여 충분한 설명을 듣고 자세히 물어볼 수 있으며, 이에
                관한 동의 여부를 결정할 권리를 가진다.
              </p>
            </LegalArticle>

            <LegalArticle variant="patient" title="3. 비밀을 보호받을 권리">
              <p>
                환자는 진료와 관련된 신체상·건강상의 비밀과 사생활의 비밀을
                침해받지 아니하며, 의료인과 의료기관은 환자의 동의를 받거나 범죄
                수사 등 법률에서 정한 경우 외에는 비밀을 누설·발표하지 못한다.
              </p>
            </LegalArticle>

            <LegalArticle variant="patient" title="4. 상담·조정을 신청할 권리">
              <p>
                환자는 의료서비스 관련 분쟁이 발생한 경우, 한국의료분쟁조정
                중재원 등에 상담 및 조정 신청을 할 수 있다.
              </p>
            </LegalArticle>

            <LegalArticle variant="patient" title="5. 안전한 의료환경에서 진료받을 권리">
              <p>
                환자는 진료 정보가 보호되고 환자 안전이 유지되는 의료기관에서
                의료서비스를 제공받을 권리가 있다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection variant="patient" title="환자의 의무">
            <LegalArticle variant="patient" title="1. 의료인에 대한 신뢰, 존중 의무">
              <p>
                환자는 자신의 건강 관련 정보를 의료인에게 정확히 알리고,
                의료인의 치료 계획을 신뢰하고 존중하여야 한다.
              </p>
            </LegalArticle>

            <LegalArticle variant="patient" title="2. 부정한 방법으로 진료를 받지 않을 의무">
              <p>
                환자는 진료 전에 본인의 신분을 밝혀야 하고, 다른 사람의 명의로
                진료를 받는 등 거짓이나 부정한 방법으로 진료를 받지 아니한다.
              </p>
            </LegalArticle>
          </LegalSection>
        
    </LegalPageLayout>
  );
}
