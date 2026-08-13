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
      articleClassName="mx-auto max-w-420 pb-14 pt-6 xl:pb-24 xl:pt-12"
    >
          <LegalSection title="[제1장] 총칙">
            <LegalArticle title="제1조 (목적)">
              <p>
                이 약관은 청맥병원(이하 &quot;병원&quot;)이 제공하는 홈페이지
                서비스의 이용 조건 및 절차, 병원과 회원의 권리·의무를 규정함을
                목적으로 합니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제2조 (용어의 정의)">
              <p>이 약관에서 사용하는 용어의 뜻은 다음과 같습니다.</p>
              <TermsList>
                <li>
                  &quot;회원&quot;이란 약관에 동의하고 가입하여 서비스를
                  이용하는 자를 말합니다.
                </li>
                <li>
                  &quot;아이디(ID)&quot;란 회원 식별을 위해 회원이 정하고 병원이
                  승인한 문자·숫자의 조합을 말합니다.
                </li>
                <li>
                  &quot;비밀번호&quot;란 회원 본인 확인을 위해 회원이 정한
                  문자·숫자의 조합을 말합니다.
                </li>
                <li>
                  &quot;운영자&quot;란 서비스의 운영·관리를 담당하는 담당자를
                  말합니다.
                </li>
              </TermsList>
            </LegalArticle>

            <LegalArticle title="제3조 (약관의 게시 및 변경)">
              <p>병원은 이 약관을 홈페이지 초기화면에 게시합니다.</p>
              <p>
                병원은 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수
                있으며, 개정 시 시행일 최소 7일 전에 홈페이지에 공지합니다.
              </p>
              <p>
                회원이 개정 약관에 동의하지 않는 경우 이용계약을 해지할 수
                있습니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="[제2장] 이용계약">
            <LegalArticle title="제4조 (이용계약의 성립)">
              <p>
                이용계약은 이용자가 약관에 동의하고 회원가입을 신청한 후 병원이
                이를 승낙함으로써 성립합니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제5조 (회원가입)">
              <p>
                회원가입은 실명으로 신청하여야 하며, 만 14세 미만은 가입할 수
                없습니다.
              </p>
              <p>
                병원은 허위 정보 기재, 타인 정보 도용 등의 경우 가입 승낙을
                거절하거나, 가입을 취소할 수 있습니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제6조 (회원정보의 변경)">
              <p>
                회원은 가입 시 기재한 정보가 변경된 경우 즉시 수정해야 하며,
                미수정으로 발생한 불이익에 대해 병원은 책임지지 않습니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="[제3장] 서비스 이용">
            <LegalArticle title="제7조 (서비스의 제공 및 변경)">
              <p>
                병원은 진료 예약·상담, 병원 및 의료 정보 제공, 게시판 등의
                서비스를 제공하며, 필요한 경우 서비스의 내용을 변경할 수
                있습니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제8조 (서비스 이용시간)">
              <p>
                서비스는 연중무휴 24시간 제공을 원칙으로 하며, 시스템 점검 등
                필요한 경우 일부 제한될 수 있습니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제9조 (서비스의 중단)">
              <p>
                병원은 시스템 점검·보수, 통신 장애, 천재지변 등 부득이한 사유가
                있는 경우 서비스 제공을 일시 중단할 수 있습니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="[제4장] 의무 사항">
            <LegalArticle title="제10조 (병원의 의무)">
              <p>
                병원은 관련 법령과 약관을 준수하며, 안정적인 서비스 제공과
                회원의 개인정보 보호를 위해 노력합니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제11조 (회원의 의무)">
              <p>
                회원은 관련 법령과 약관을 준수해야 하며, 타인의 권리 침해, 허위
                정보 등록, 서비스 운영 방해 등의 행위를 해서는 안 됩니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제12조 (아이디·비밀번호 관리)">
              <p>
                회원은 자신의 아이디와 비밀번호를 직접 관리할 책임이 있으며,
                이를 제3자가 이용하게 해서는 안 됩니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제13조 (게시물의 관리)">
              <p>
                회원이 작성한 게시물이 법령을 위반하거나 타인의 권리를 침해하는
                경우, 병원은 사전 통보 없이 해당 게시물을 삭제하거나 이용을
                제한할 수 있습니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="[제5장] 계약 해지 및 이용 제한">
            <LegalArticle title="제14조 (계약 해지 및 이용 제한)">
              <p>
                회원은 언제든지 회원 탈퇴를 통해 이용계약을 해지할 수 있습니다.
              </p>
              <p>
                병원은 회원이 약관을 위반한 경우 이용을 제한하거나 이용계약을
                해지할 수 있습니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="[제6장] 기타">
            <LegalArticle title="제15조 (개인정보의 보호)">
              <p>
                병원은 회원의 개인정보를 관련 법령 및 병원의 개인정보 처리방침에
                따라 보호합니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제16조 (면책)">
              <p>
                병원은 천재지변, 회원의 귀책사유 등 병원의 책임 없는 사유로
                발생한 손해에 대해서는 책임을 지지 않습니다.
              </p>
              <p>
                홈페이지에서 제공하는 의료 정보는 참고용이며, 실제 진단 및
                치료는 의료진의 진료를 통해 이루어집니다.
              </p>
            </LegalArticle>

            <LegalArticle title="제17조 (분쟁의 해결)">
              <p>
                이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한
                분쟁은 관련 법령 및 상관례에 따라 해결합니다.
              </p>
            </LegalArticle>
          </LegalSection>

          <LegalSection title="부칙">
            <p>이 약관은 [2026년 MM월 DD일]부터 시행합니다.</p>
          </LegalSection>
        
    </LegalPageLayout>
  );
}
