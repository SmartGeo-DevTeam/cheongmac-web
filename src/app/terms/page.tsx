import LegalPageLayout, {
  LegalArticle,
  LegalSection,
} from '@/app/_components/legal-page';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '이용약관 | 청맥병원',
  description: '청맥병원 홈페이지 이용약관을 안내합니다.',
};

interface ChildrenProps {
  children: ReactNode;
}

function TermsList({ children }: ChildrenProps) {
  return <ol className="list-decimal space-y-1 pl-5">{children}</ol>;
}

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="이용약관"
      breadcrumbLabel="이용약관"
      articleClassName="mx-auto max-w-7xl pb-14 pt-6 xl:pb-24 xl:pt-12"
    >
      <LegalSection title="[제1장] 총칙">
        <LegalArticle title="제1조 (목적)">
          <p>
            이 약관은 청맥병원(이하 &quot;병원&quot;)이 제공하는 홈페이지 서비스의 이용 조건 및 절차,
            병원과 회원의 권리·의무를 규정함을 목적으로 합니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제2조 (용어의 정의)">
          <p>이 약관에서 사용하는 용어의 뜻은 다음과 같습니다.</p>
          <TermsList>
            <li>
              &quot;회원&quot;이란 Google, NAVER, Kakao 등 병원이 제공하는 소셜 로그인으로 본인 계정을
              인증하고, 필수 회원정보 입력 및 약관 동의를 완료하여 홈페이지 회원 자격을 취득한 자를
              말합니다.
            </li>
            <li>
              &quot;소셜 계정&quot;이란 회원이 홈페이지 로그인에 사용하는 Google, NAVER, Kakao 등 외부
              서비스 사업자의 계정을 말합니다.
            </li>
            <li>&quot;운영자&quot;란 서비스의 운영·관리를 담당하는 담당자를 말합니다.</li>
          </TermsList>
        </LegalArticle>

        <LegalArticle title="제3조 (약관의 게시 및 변경)">
          <p>병원은 이 약관을 홈페이지에서 이용자가 확인할 수 있도록 게시합니다.</p>
          <p>
            병원은 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 시행일 최소
            7일 전에 홈페이지에 공지합니다.
          </p>
          <p>회원이 개정 약관에 동의하지 않는 경우 이용계약의 해지를 요청할 수 있습니다.</p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="[제2장] 이용계약">
        <LegalArticle title="제4조 (이용계약의 성립)">
          <p>
            이용계약은 이용자가 소셜 로그인을 통해 계정을 인증하고, 본명·이메일·휴대전화번호 등 필수
            회원정보를 확인 또는 입력한 뒤 이용약관 및 개인정보 수집·이용에 동의하고 병원이 이를
            승낙함으로써 성립합니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제5조 (회원가입)">
          <p>
            병원은 별도의 이메일·비밀번호 방식 회원가입을 제공하지 않으며 Google, NAVER, Kakao 소셜
            로그인을 통해서만 홈페이지 회원가입을 제공합니다.
          </p>
          <p>회원가입은 본인의 실제 정보를 사용하여야 하며, 만 14세 미만은 가입할 수 없습니다.</p>
          <p>
            병원은 허위 정보 기재, 타인 정보 도용, 타인의 소셜 계정 이용 등의 경우 가입 승낙을 거절하거나
            회원 자격을 제한 또는 취소할 수 있습니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제6조 (회원정보의 변경)">
          <p>
            회원은 가입 시 제공한 본명·연락처 등의 정보가 변경된 경우 병원이 제공하는 방법에 따라 이를
            수정하거나 변경을 요청해야 합니다.
          </p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="[제3장] 서비스 이용">
        <LegalArticle title="제7조 (서비스의 제공 및 변경)">
          <p>
            병원은 홈페이지 회원에게 병원 및 의료 정보, 회원 전용 콘텐츠, 게시판 등 홈페이지에서 제공하는
            서비스를 제공할 수 있으며 필요한 경우 서비스의 내용을 변경할 수 있습니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제8조 (서비스 이용시간)">
          <p>
            서비스는 연중무휴 24시간 제공을 원칙으로 하며, 시스템 점검·장애·보안 조치 등 필요한 경우 일부
            또는 전부가 일시 제한될 수 있습니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제9조 (서비스의 중단)">
          <p>
            병원은 시스템 점검·보수, 통신 장애, 천재지변 등 부득이한 사유가 있는 경우 서비스 제공을 일시
            중단할 수 있습니다.
          </p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="[제4장] 의무 사항">
        <LegalArticle title="제10조 (병원의 의무)">
          <p>
            병원은 관련 법령과 약관을 준수하며, 안정적인 서비스 제공과 회원의 개인정보 보호를 위해
            노력합니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제11조 (회원의 의무)">
          <p>
            회원은 관련 법령과 약관을 준수해야 하며, 타인의 권리 침해, 허위 정보 등록, 타인의 계정 이용,
            서비스 운영 방해 등의 행위를 해서는 안 됩니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제12조 (소셜 계정 관리)">
          <p>
            회원은 로그인에 사용하는 소셜 계정을 안전하게 관리할 책임이 있으며, 소셜 계정의 도용·분실
            또는 제3자의 무단 사용을 인지한 경우 해당 소셜 서비스 사업자 및 병원에 필요한 조치를 취해야
            합니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제13조 (게시물의 관리)">
          <p>
            회원이 작성한 게시물이 법령을 위반하거나 타인의 권리를 침해하는 경우, 병원은 관련 법령과
            운영정책에 따라 해당 게시물을 삭제하거나 이용을 제한할 수 있습니다.
          </p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="[제5장] 계약 해지 및 이용 제한">
        <LegalArticle title="제14조 (회원 탈퇴 및 이용 제한)">
          <p>
            회원은 언제든지 회원 탈퇴를 요청하여 이용계약을 해지할 수 있습니다. 별도의 온라인 탈퇴 기능이
            제공되지 않는 기간에는 개인정보 처리방침에 기재된 개인정보 보호 담당부서를 통해 탈퇴를 요청할
            수 있습니다.
          </p>
          <p>
            회원 탈퇴 시 회원정보와 소셜 로그인 연동정보는 관계 법령상 보존 의무가 있는 경우를 제외하고
            처리 목적 달성 후 지체 없이 파기합니다.
          </p>
          <p>병원은 회원이 약관을 위반한 경우 이용을 제한하거나 이용계약을 해지할 수 있습니다.</p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="[제6장] 기타">
        <LegalArticle title="제15조 (개인정보의 보호)">
          <p>
            병원은 회원의 개인정보를 관련 법령 및 병원의 개인정보 처리방침에 따라 보호합니다. 홈페이지
            회원가입 및 소셜 로그인 과정에서 처리되는 개인정보의 구체적인 항목, 목적, 보유기간은 개인정보
            처리방침에서 확인할 수 있습니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제16조 (면책)">
          <p>
            병원은 천재지변, 회원의 귀책사유 등 병원의 책임 없는 사유로 발생한 손해에 대해서는 책임을 지지
            않습니다.
          </p>
          <p>
            홈페이지에서 제공하는 의료 정보는 참고용이며, 실제 진단 및 치료는 의료진의 진료를 통해
            이루어집니다.
          </p>
        </LegalArticle>

        <LegalArticle title="제17조 (분쟁의 해결)">
          <p>
            이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 관련 법령 및 상관례에 따라
            해결합니다.
          </p>
        </LegalArticle>
      </LegalSection>

      <LegalSection title="부칙">
        <p>이 약관은 2026년 9월 8일부터 시행합니다.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
