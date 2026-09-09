import LegalPageLayout, { LegalSection } from '@/app/_components/legal-page';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | 청맥병원',
  description: '청맥병원의 개인정보 처리방침을 안내합니다.',
};

interface ChildrenProps {
  children: ReactNode;
}

function SectionSubTitle({ children }: ChildrenProps) {
  return <h3 className="font-semibold text-[#444444]">{children}</h3>;
}

function PolicyList({ children }: ChildrenProps) {
  return (
    <ul className="list-disc space-y-1 pl-5 marker:text-[#444444] xl:space-y-1.5">
      {children}
    </ul>
  );
}

function PolicyTable({ children }: ChildrenProps) {
  return (
    <div className="w-full overflow-hidden border-y border-[#E5E7EB]">
      <table className="w-full table-fixed border-collapse text-center text-[10px] leading-normal text-[#555555] xl:text-[13px] xl:leading-[1.55]">
        {children}
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="개인정보 처리방침"
      breadcrumbLabel="개인정보처리방침"
      articleClassName="pb-14 xl:pb-24"
    >
      <div className="flex flex-col">
        <p className="order-2 mx-auto mt-6 max-w-7xl break-keep text-[15px] leading-[1.75] tracking-[-0.02em] text-[#555555] xl:order-1 xl:mt-0 xl:text-center xl:text-xl xl:leading-[1.9]">
          청맥병원은 환자분의 소중한 개인정보를 안전하게 보호하며, 『개인정보
          보호법』을 엄격히 준수하고 있습니다.
          <br />
          <br className="block xl:hidden" />본 개인정보 처리방침은
          정보주체(환자·이용자)께서 제공하시는 개인정보가 어떠한 목적과 방식으로
          처리되고 있는지, 그리고 안전한 관리를 위해 어떠한 보호 조치가 취해지고
          있는지 투명하게 안내해 드립니다. 청맥병원은 언제나 환자분의 알 권리를
          존중하며, 정보주체의 권익 보호에 최선을 다하겠습니다.
        </p>

        <div className="order-1 grid grid-cols-2 gap-1 text-[14px] font-semibold xl:order-2 xl:mt-8 xl:gap-4">
          <button
            type="button"
            aria-current="page"
            className="py-3 rounded-lg border border-[#045545] bg-[#045545] text-[15px] text-white shadow-none
                xl:py-3.5 xl:text-[22px]"
          >
            현행방침
          </button>
          <button
            type="button"
            className="py-3 rounded-lg border border-[#E5E7EB] text-[15px] text-[#8E9099] shadow-none
                xl:py-3.5 xl:text-[22px]"
          >
            이전방침
          </button>
        </div>
      </div>

      <LegalSection title="1. 개인정보의 처리 목적">
        <p>
          청맥병원은 다음의 목적을 위하여 개인정보를 처리합니다.
          <br />
          처리하는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
          목적이 변경되는 경우에는 『개인정보 보호법』 제18조에 따라 별도의
          동의를 받는 등 필요한 조치를 이행합니다.
        </p>

        <PolicyList>
          <li>
            <b>홈페이지 회원 가입 및 관리</b>: Google·NAVER·Kakao 소셜 계정을 통한
            회원 식별·인증, 홈페이지 회원 전환, 회원자격 유지·관리, 서비스 부정이용 방지
          </li>
          <li>
            <b>홈페이지 서비스 운영 및 개선</b>: 로그인 회원의 페이지 방문·이동,
            실제 활동 시간과 주요 기능 이용 흐름을 분석하여 서비스 품질 개선
          </li>
          <li>
            <b>진료 예약 및 상담</b>: 진료 예약 접수·확인, 온라인
            상담(의학상담·고객의 소리) 처리 및 결과 회신
          </li>
          <li>
            <b>의료 서비스 제공</b>: 진료, 검사, 치료 등 의료 서비스 제공 및
            관련 안내
          </li>
          <li>
            <b>민원 처리</b>: 민원인의 신원 확인, 민원사항 확인, 처리결과 통보
          </li>
          <li>
            <b>마케팅 및 정보 제공(선택)</b>: 병원 소식, 질병 정보, 건강 콘텐츠
            안내, 만족도 조사
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="2. 처리하는 개인정보의 항목 및 수집 방법">
        <p>
          청맥병원은 처리하는 개인정보를 ①정보주체의 동의를 받지 않고 처리하는
          항목과 ②정보주체의 동의를 받아 수집·이용하는 항목으로 구분하여
          처리합니다. 상세 내용은 아래 항목을 펼쳐 확인하실 수 있습니다.
        </p>

        {/* PC: 디자인 시안처럼 두 안내 라벨을 나란히 표시 */}
        <div className="hidden flex-wrap gap-2 text-[13px] font-semibold text-[#287C68] xl:flex">
          <span className="rounded-[3px] border border-[#6DB3A4] px-3 py-1.5">
            동의를 받지 않고 처리하는 개인정보 항목
          </span>
          <span className="rounded-[3px] border border-[#6DB3A4] px-3 py-1.5">
            수집 시 동의를 받는 개인정보 항목
          </span>
        </div>

        {/* Mobile: 첫 번째 표 바로 앞에 첫 번째 안내 라벨 표시 */}
        <span className="inline-flex rounded-[3px] border border-[#6DB3A4] px-3 py-1.5 text-xs font-semibold text-[#287C68] xl:hidden">
          동의를 받지 않고 처리하는 개인정보 항목
        </span>

        <SectionSubTitle>
          ① 동의를 받지 않고 처리하는 개인정보 항목
        </SectionSubTitle>
        <p>
          아래 항목은 서비스 제공 과정에서 자동으로 생성·수집되거나 법령에
          근거가 있어 개인정보 보호법에 따라 별도의 동의 없이 처리됩니다.
        </p>

        <PolicyTable>
          <thead>
            <tr>
              <th className="w-[34%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                구분
              </th>
              <th className="w-[40%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                항목
              </th>
              <th className="w-[26%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                보유 및 이용기간
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                서비스 이용 과정에서
                <br />
                자동 생성·수집되는 정보
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                로그인 일시, 페이지 방문·이동 경로, 페이지 이용 일시,
                실제 활동 시간, 주요 기능 이용 이벤트, 접속 로그, 쿠키,
                <br className="hidden xl:block" /> 접속 IP 정보,
                기기정보(브라우저·OS 등)
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원 탈퇴 또는 처리 목적 달성 시까지
                <br />
                (관계 법령상 보존 의무가 있는 경우 해당 기간)
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                법령에 따라 처리·보관하는
                <br />
                진료 관련 정보
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                진료 및 의료 서비스 제공 과정에서 생성되는 정보
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                의료법, 세법 등 관계 법령에서 정한 기간
                <br />
                (예: 진료기록부 10년, 처방전 2년)
              </td>
            </tr>
          </tbody>
        </PolicyTable>

        {/* Mobile: 첫 번째 표가 끝난 뒤 두 번째 안내 라벨 표시 */}
        <span className="inline-flex rounded-[3px] border border-[#6DB3A4] px-3 py-1.5 text-xs font-semibold text-[#287C68] xl:hidden">
          수집 시 동의를 받는 개인정보 항목
        </span>

        <SectionSubTitle>② 수집 시 동의를 받는 개인정보 항목</SectionSubTitle>
        <p>
          아래 정보는 정보주체의 동의를 받아 수집·이용하며, 수집 목적이
          달성되거나 보유 기간이 경과한 경우 지체 없이 파기합니다.
        </p>

        <PolicyTable>
          <thead>
            <tr>
              <th className="w-[28%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                구분
              </th>
              <th className="w-[48%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                항목
              </th>
              <th className="w-[24%] bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                보유 및 이용기간
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                홈페이지 회원가입 (필수)
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                본명, 이메일, 휴대전화번호
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원 탈퇴 시까지
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원가입·동의 이력
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원가입일, 이용약관 동의 버전·동의일시, 개인정보 수집·이용 동의 버전·동의일시
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원 탈퇴 또는 동의 철회 시까지
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                소셜 로그인(간편가입) 연동
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                소셜 로그인 제공자(Google·NAVER·Kakao), 소셜 계정 식별자(연동번호), 이메일, 프로필 이름·이미지(제공 및 동의 시)
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                회원 탈퇴 시까지
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                진료 예약·온라인 상담
                <br />
                (민감정보 포함)
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                성명, 연락처, 예약 희망 정보, 증상·문의 내용 등
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                목적 달성 시까지
                <br />
                (진료 전환 정보는 관계 법령에 따름)
              </td>
            </tr>
          </tbody>
        </PolicyTable>

        <p className="text-[11px] leading-[1.65] text-[#999999] xl:text-[11px]">
          ※ 홈페이지의 기능 및 서비스 구성에 따라 실제 수집 항목은 달라질 수
          있으며, 법령상 보존 의무가 있는 경우에는 해당 기간 동안 보관합니다.
        </p>

        <SectionSubTitle>[수집 방법]</SectionSubTitle>
        <PolicyList>
          <li>
            홈페이지 회원가입 및 서비스 이용 과정에서 정보주체가 직접 입력
          </li>
          <li>Google·NAVER·Kakao 소셜 로그인 연동을 통한 수집</li>
          <li>진료 예약·상담·민원 접수 과정에서의 수집</li>
          <li>생성정보 수집 도구를 통한 자동 수집</li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="3. 개인정보의 제3자 제공">
        <p>
          청맥병원은 원칙적으로 정보주체의 개인정보를 개인정보의 처리 목적에서
          명시한 범위 내에서만 사용하며, 정보주체의 동의 없이 그 범위를 초과하여
          이용하거나 제3자에게 제공하지 않습니다. 다만, 정보주체가 사전에 제3자
          제공에 동의한 경우 또는 법률에 특별한 규정이 있는 경우에는 예외로
          합니다.
        </p>
        <p>
          아래와 같은 경우에는 「개인정보 보호법」 제17조 및 제18조에 따라
          개인정보를 제공할 수 있습니다.
        </p>
        <PolicyList>
          <li>
            통계작성, 학술연구 등의 목적으로 특정 개인을 알아볼 수 없는 형태로
            가공하여 제공하는 경우
          </li>
          <li>법령에 특별한 규정이 있거나 법적 의무가 있는 경우</li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="4. 개인정보 처리업무의 위탁">
        <p>
          청맥병원은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
          처리업무를 위탁하고 있습니다.
        </p>

        <PolicyTable>
          <thead>
            <tr>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                수탁업체
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                위탁 업무 내용
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                위탁 개인정보 항목
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                위탁 개인정보 항목
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                스마트지킴
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                SMS 발송, 카카오알림
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                성명, 연락처
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                위탁계약 종료 시까지
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                [본인확인기관]
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                휴대폰 본인확인
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                본인확인 필요 항목
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                위탁계약 종료 시까지
              </td>
            </tr>
          </tbody>
        </PolicyTable>
      </LegalSection>

      <LegalSection title="5. 개인정보의 파기 절차 및 방법">
        <p>
          청맥병원은 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
          불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 홈페이지 회원이
          탈퇴를 요청한 경우 회원정보와 소셜 로그인 연동정보도 관계 법령상 보존 의무가 있는
          경우를 제외하고 지체 없이 파기합니다.
        </p>
        <PolicyList>
          <li>
            <strong>파기 절차:</strong> 파기 사유가 발생한 개인정보를 선정하고,
            개인정보 보호책임자의 승인을 받아 파기합니다.
          </li>
          <li>
            <strong>파기 방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할
            수 없는 기술적 방법을 사용하여 삭제하며, 종이 문서에 기록된
            개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="6. 정보주체와 법정대리인의 권리·의무 및 행사 방법">
        <p>
          정보주체는 청맥병원에 대해 언제든지 개인정보 열람·정정·삭제·처리정지,
          동의 철회 및 홈페이지 회원 탈퇴를 요구할 수 있습니다. 별도의 온라인 탈퇴 기능이
          제공되지 않는 기간에는 개인정보 보호 담당부서를 통해 회원 탈퇴를 요청할 수 있습니다.
        </p>
        <PolicyList>
          <li>
            권리 행사는 서면, 전화, 이메일 등을 통하여 하실 수 있으며,
            청맥병원은 이에 대해 지체 없이 조치하겠습니다.
          </li>
          <li>
            정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우,
            정정·삭제를 완료할 때까지 해당 개인정보를 이용하거나 제공하지
            않습니다.
          </li>
          <li>
            법정대리인이 만 14세 미만 아동의 개인정보 열람·정정·삭제 및
            처리정지를 요구할 수 있습니다.
          </li>
          <li>
            관련 법령에 따라 보존 의무가 있는 개인정보는 열람·정정·삭제 요구가
            제한될 수 있습니다.
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="7. 만 14세 미만 아동의 개인정보 처리">
        <p>
          현재 청맥병원은 만 14세 미만 아동의 회원가입을 제한하고 있으며, 만
          14세 미만 아동의 개인정보를 수집하지 않습니다. 필요한 경우 만 14세
          미만임을 확인하고 법정대리인의 동의를 받는 절차를 진행합니다.
        </p>
      </LegalSection>

      <LegalSection title="8. 개인정보 자동 수집 장치의 설치·운영 및 웹 분석 도구 사용">
        <p>
          청맥병원은 이용자에게 맞춤형 서비스를 제공하기 위해 이용정보를
          저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용할 수 있으며, 서비스
          개선을 위해 Google LLC의 웹 분석 도구인 Google Analytics를 사용할 수
          있습니다.
        </p>

        <SectionSubTitle>① 쿠키(cookie)의 사용</SectionSubTitle>
        <PolicyList>
          <li>
            쿠키는 웹사이트 서버가 이용자의 브라우저에 보내는 소량의 텍스트
            파일로, 이용자의 기기에 저장됩니다.
          </li>
          <li>
            이용자는 웹 브라우저의 옵션 설정을 통해 모든 쿠키를 허용하거나, 저장
            시마다 확인을 거치거나, 저장을 거부할 수 있습니다.
          </li>
          <li>
            다만 쿠키 저장을 거부할 경우 일부 맞춤형 서비스 이용에 제한이 있을
            수 있습니다.
          </li>
        </PolicyList>

        <SectionSubTitle>② 구글애널리틱스의 사용</SectionSubTitle>
        <p>
          청맥병원의 웹사이트 방문과 서비스 이용 현황 분석을 위해 Google LLC의
          웹 분석 도구인 Google Analytics를 사용할 수 있습니다.
        </p>
        <PolicyList>
          <li>
            구글 애널리틱스는 쿠키를 이용하여 이용자의 홈페이지 방문·이용 관련
            정보를 비식별 형태로 수집하고 통계 분석 목적으로 이용합니다.
          </li>
          <li>
            수집된 정보는 Google의 개인정보처리방침에 따라 처리되며, Google의
            분석 서비스 정책이 적용될 수 있습니다.
          </li>
          <li>
            이용자는 브라우저의 쿠키 설정 또는 Google에서 제공하는 차단 도구를
            통해 정보 수집을 제한할 수 있습니다.
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="9. 개인정보의 안전성 확보 조치">
        <p>
          청맥병원은 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고
          있습니다.
        </p>
        <PolicyList>
          <li>
            관리적 조치: 내부관리계획 수립·시행, 개인정보 취급 인원 최소화 및
            정기적인 담당자 교육
          </li>
          <li>
            기술적 조치: 개인정보처리시스템 접근권한 관리, 접근통제시스템 설치,
            고유식별정보 등의 암호화, 보안프로그램 설치 및 갱신
          </li>
          <li>
            물리적 조치: 개인정보가 보관된 시설 및 문서보관 장소에 대한 접근통제
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="10. 개인정보 보호책임자 및 담당부서">
        <p>
          청맥병원은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보
          처리와 관련한 정보주체의 문의·불만·피해구제 등을 처리하기 위하여
          아래와 같이 개인정보 보호책임자를 지정하고 있습니다. 정보주체는
          청맥병원의 서비스를 이용하면서 발생한 모든 개인정보 보호 관련
          문의·불만·피해구제 등을 개인정보 보호책임자 및 담당부서로 문의하실 수
          있으며, 청맥병원은 이에 대해 지체 없이 답변 및 처리하겠습니다.
        </p>

        <PolicyTable>
          <thead>
            <tr>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                구분
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                부서 및 성명
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                연락처
              </th>
              <th className="bg-[#F4F5F6] px-1.5 py-2 font-bold text-[#444444] xl:px-3 xl:py-3">
                이메일
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                개인정보 보호책임자
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                박용범
              </td>
              <td
                className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle tabular-nums last:border-r-0 xl:px-3 xl:py-3"
                rowSpan={2}
              >
                051-804-1119
              </td>
              <td
                className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3"
                rowSpan={2}
              >
                yochoz@naver.com
              </td>
            </tr>
            <tr>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                개인정보 보호 담당부서
              </td>
              <td className="border-t border-r border-[#E9EAEC] px-1.5 py-2 align-middle last:border-r-0 xl:px-3 xl:py-3">
                [총무행정 담당부서]
              </td>
            </tr>
          </tbody>
        </PolicyTable>
      </LegalSection>

      <LegalSection title="11. 정보주체의 권익침해에 대한 구제 방법">
        <p>
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁
          해결이나 상담 등을 신청할 수 있습니다.
        </p>

        <PolicyList>
          <li>
            <strong>개인정보분쟁조정위원회:</strong> (국번없이) 1833-6972 /{' '}
            <Link
              href="https://www.kopico.go.kr"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              www.kopico.go.kr
            </Link>
          </li>
          <li>
            <strong>개인정보침해신고센터(한국인터넷진흥원):</strong> (국번없이)
            118 /{' '}
            <Link
              href="https://privacy.kisa.or.kr"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              privacy.kisa.or.kr
            </Link>
          </li>
          <li>
            <strong>대검찰청 사이버수사과:</strong> (국번없이) 1301 /{' '}
            <Link
              href="https://www.spo.go.kr"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              www.spo.go.kr
            </Link>
          </li>
          <li>
            <strong>경찰청 사이버수사국:</strong> (국번없이) 182 /{' '}
            <Link
              href="https://ecrm.police.go.kr"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              ecrm.police.go.kr
            </Link>
          </li>
        </PolicyList>
      </LegalSection>

      <LegalSection title="12. 개인정보 처리방침의 변경에 관한 사항">
        <p>
          이 개인정보 처리방침은 법령·정책 또는 보안기술의 변경에 따라 내용의
          추가·삭제 및 수정이 있을 경우, 변경사항의 시행 최소 7일 전에 청맥병원
          홈페이지를 통해 변경 이유 및 내용을 공지합니다.
        </p>
        <PolicyList>
          <li>공고일자: 2026년 9월 8일</li>
          <li>시행일자: 2026년 9월 8일</li>
        </PolicyList>
      </LegalSection>
    </LegalPageLayout>
  );
}
