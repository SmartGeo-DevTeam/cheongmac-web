import Breadcrumb from '@/app/_components/common/breadcrumb';
import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import Link from '@/app/_components/document/link';
import List from '@/app/_components/document/list';
import P from '@/app/_components/document/p';
import Table from '@/app/_components/document/table';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb />
      <PageHeader title="개인정보 처리방침" />

      <Inner>
        <div className="break-keep">
          {/* 컴포넌트 - documentSpacer 기능인데 네이밍은 내 아키텍쳐에 맞게끔 너가 분리해줘. */}
          <div className="mt-10" />

          <div>
            <P>
              청맥병원은 환자분의 소중한 개인정보를 안전하게 보호하며,
              『개인정보 보호법』을 엄격히 준수하고 있습니다.
            </P>
          </div>

          <div>
            <P className="mt-6">
              본 개인정보 처리방침은 정보주체(환자·이용자)께서 제공하시는
              개인정보가 어떠한 목적과 방식으로 처리되고 있는지, 그리고 안전한
              관리를 위해 어떠한 보호 조치가 취해지고 있는지 투명하게 안내해
              드립니다. 청맥병원은 언제나 환자분의 알 권리를 존중하며,
              정보주체의 권익 보호에 최선을 다하겠습니다.
            </P>
          </div>

          <div>
            <P className="mt-12">
              청맥병원은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
              목적이 변경되는 경우에는 『개인정보 보호법』 제18조에 따라 별도의
              동의를 받는 등 필요한 조치를 이행합니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                <b>홈페이지 회원 가입 및 관리:</b> 회원제 서비스 이용에 따른
                본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지
              </li>
              <li>
                <b>진료 예약 및 상담:</b> 진료 예약 접수·확인, 온라인
                상담(의학상담·고객의 소리) 처리 및 결과 회신
              </li>
              <li>
                <b>의료 서비스 제공:</b> 진료, 검사, 치료 등 의료 서비스 제공 및
                관련 안내
              </li>
              <li>
                <b>민원 처리:</b> 민원인의 신원 확인, 민원사항 확인, 처리결과
                통보
              </li>
              <li>
                <b>마케팅 및 정보 제공(선택):</b> 병원 소식, 질병 정보, 건강
                콘텐츠 안내, 만족도 조사
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 처리하는 개인정보를 ①정보주체의 동의를 받지 않고
              처리하는 항목과 ②정보주체의 동의를 받아 수집·이용하는 항목으로
              구분하여 처리합니다. 상세 내용은 아래 항목을 펼쳐 확인하실 수
              있습니다.
            </P>

            <P className="mt-10">
              ① 동의를 받지 않고 처리하는 개인정보 항목 아래 정보는 서비스 제공
              과정에서 자동으로 생성·수집되거나 법령에 근거가 있어, 『개인정보
              보호법』에서 정한 바에 따라 정보주체의 별도 동의 없이 처리됩니다
            </P>

            <Table className="mt-3" aria-label="개인정보 처리업무 위탁 예시">
              <thead>
                <tr>
                  <th scope="col">수탁업체</th>
                  <th scope="col">위탁 업무 내용</th>
                  <th scope="col">위탁 개인정보 항목</th>
                  <th scope="col">위탁 개인정보 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>스마트지오</td>
                  <td>
                    SMS 발송,
                    <br />
                    회원관리
                  </td>
                  <td>성명, 연락처</td>
                  <td>
                    위탁계약
                    <br />
                    종료 시까지
                  </td>
                </tr>
                <tr>
                  <td>[본인확인기관]</td>
                  <td>휴대폰 본인확인</td>
                  <td>
                    본인확인
                    <br />
                    필요 항목
                  </td>
                  <td>
                    위탁계약
                    <br />
                    종료 시까지
                  </td>
                </tr>
              </tbody>
            </Table>

            <P className="mt-10">
              ② 수집 시 동의를 받은 개인정보 항목 아래 정보는 정보주체의 동의를
              받아 수집·이용하며, 수집 목적이 달성되거나 보유 기간이 경과한 경우
              지체 없이 파기합니다.
            </P>

            <Table className="mt-3" aria-label="개인정보 처리업무 위탁 예시">
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">수집 항목</th>
                  <th scope="col">보유 및 이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    홈페이지 회원가입
                    <br />
                    (필수)
                  </td>
                  <td>
                    성명, 아이디, 비밀번호, 휴대전화번호, 이메일, 성별, 생년월일
                  </td>
                  <td>회원 탈퇴 시까지</td>
                </tr>
                <tr>
                  <td>
                    홈페이지 회원가입
                    <br />
                    (선택)
                  </td>
                  <td>관심분야, 이메일·SMS 수신 여부</td>
                  <td>회원 탈퇴 또는 동의 철회 시까지</td>
                </tr>
                <tr>
                  <td>
                    본인확인
                    <br />
                    (휴대폰 인증 등)
                  </td>
                  <td>
                    성명, 생년월일, 성별, 내/외국인 정보, 통신사, 휴대전화번호,
                    연계정보(CI), 중복가입확인정보(DI)
                  </td>
                  <td>6개월</td>
                </tr>
                <tr>
                  <td>
                    진료 예약·온라인 상담
                    <br />
                    (민감정보 포함)
                  </td>
                  <td>관심분야, 이메일·SMS 수신 여부</td>
                  <td>회원 탈퇴 또는 동의 철회 시까지</td>
                </tr>
              </tbody>
            </Table>

            <P variant="muted" className="mt-3">
              ※ 민감정보의 처리: 청맥병원은 진료 예약·상담 등 의료 서비스 제공에
              필요한 범위에서 건강에 관한 정보 등 민감정보(『개인정보 보호법』
              제23조)를 처리할 수 있습니다. 민감정보는 정보주체로부터 별도의
              동의를 받은 경우 또는 법령에서 정하는 경우에 한하여 처리하며, 다른
              개인정보와 분리하여 안전하게 관리합니다.
            </P>

            <P className="mt-5 font-bold">[수집 방법]</P>
            <List variant="bullet" className="mt-1">
              <li>
                홈페이지 회원가입 및 서비스 이용 과정에서 정보주체가 직접 입력
              </li>
              <li>본인확인 등 제휴 서비스 연동을 통한 수집</li>
              <li>진료 예약·상담·민원 접수 과정에서의 수집</li>
              <li>생성정보 수집 도구를 통한 자동 수집</li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 귀하의 개인정보를 제1조(처리 목적)에서 고지한 범위
              내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타
              기업·기관에 제공하지 않습니다. 다만, 보다 나은 서비스 제공을
              위하여 귀하의 개인정보를 제휴사에 제공하거나 제휴사와 공유할 수
              있으며, 이 경우 제공·공유되는 개인정보 항목, 제공받는 자, 이용
              목적 및 보유 기간 등을 사전에 귀하께 고지하고 동의를 받습니다.
            </P>
          </div>

          <div>
            <P className="mt-10">
              아울러 다음의 경우에는 『개인정보 보호법』 제17조 및 제18조에 따라
              정보주체의 동의 없이 개인정보를 제공할 수 있습니다.
            </P>
            <List variant="bullet" className="mt-1">
              <li>
                통계작성·학술연구 등의 목적으로 특정 개인을 알아볼 수 없는
                형태로 가공하여 제공하는 경우
              </li>
              <li>
                법령에 정해진 절차와 방법에 따라 수사기관 등의 요구가 있는 경우
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </P>
            <Table className="mt-3" aria-label="개인정보 처리업무 위탁 예시">
              <thead>
                <tr>
                  <th scope="col">수탁업체</th>
                  <th scope="col">위탁 업무 내용</th>
                  <th scope="col">위탁 개인정보 항목</th>
                  <th scope="col">위탁 개인정보 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>스마트지오</td>
                  <td>
                    SMS 발송,
                    <br />
                    회원관리
                  </td>
                  <td>성명, 연락처</td>
                  <td>
                    위탁계약
                    <br />
                    종료 시까지
                  </td>
                </tr>
                <tr>
                  <td>[본인확인기관]</td>
                  <td>휴대폰 본인확인</td>
                  <td>
                    본인확인
                    <br />
                    필요 항목
                  </td>
                  <td>
                    위탁계약
                    <br />
                    종료 시까지
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                <b>파기 절차:</b> 파기 사유가 발생한 개인정보를 선정하고,
                개인정보 보호책임자의 승인을 받아 파기합니다.
              </li>
              <li>
                <b>파기 방법:</b> 전자적 파일 형태의 정보는 기록을 재생할 수
                없는 기술적 방법을 사용하여 삭제하며, 종이 문서에 기록된
                개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              정보주체는 청맥병원에 대해 언제든지 개인정보
              열람·정정·삭제·처리정지 및 동의 철회를 요구할 수 있습니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                권리 행사는 서면, 전화, 이메일 등을 통하여 하실 수 있으며,
                청맥병원은 이에 대해 지체 없이 조치하겠습니다.
              </li>
              <li>
                정보주체가 개인정보의 오류 등에 대한 정정을 요구한 경우,
                정정·삭제를 완료할 때까지 해당 개인정보를 이용하거나 제공하지
                않습니다.
              </li>
              <li>
                법령에 따라 보존 의무가 있는 개인정보는 열람·정정·삭제 요구가
                있더라도 해당 보존 기간 동안 삭제되지 않을 수 있습니다.
              </li>
              <li>
                회원 탈퇴는 홈페이지 마이페이지의 『회원탈퇴』 절차 또는
                개인정보 보호책임자에게 연락하여 처리할 수 있습니다.
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              현재 청맥병원은 만 14세 미만 아동의 회원가입을 제한하고 있으며, 만
              14세 미만 아동의 개인정보를 수집하지 않습니다.
            </P>
            <p>
              회원가입 시 &quot;만 14세 이상입니다&quot; 확인 절차를 통해 연령을
              확인합니다.
            </p>
          </div>

          <div>
            <P className="mt-20 font-bold">[1] 쿠키(cookie)의 사용</P>
            <P className="mt-2">
              청맥병원은 이용자에게 맞춤형 서비스를 제공하기 위해 이용정보를
              저장하고 수시로 불러오는 쿠키를 사용합니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                쿠키는 웹사이트 서버가 이용자의 브라우저에 보내는 소량의 텍스트
                파일로, 이용자의 기기에 저장됩니다.
              </li>
              <li>
                이용자는 웹 브라우저의 옵션 설정을 통해 모든 쿠키를 허용하거나,
                저장 시마다 확인을 거치거나, 저장을 거부할 수 있습니다.
              </li>
              <li>
                다만 쿠키 저장을 거부할 경우 일부 맞춤형 서비스 이용에 제한이
                있을 수 있습니다.
              </li>
            </List>
          </div>

          <div>
            <P className="mt-10 font-bold">
              [2] 웹 분석 도구(구글 애널리틱스) 사용
            </P>
            <P className="mt-2">
              청맥병원은 홈페이지 이용 현황 분석 및 서비스 개선을 위하여 Google
              LLC의 웹 분석 도구인 구글 애널리틱스(Google Analytics)를
              사용합니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                구글 애널리틱스는 쿠키를 이용하여 이용자의 홈페이지 방문·이용에
                관한 정보(방문 페이지, 체류 시간, 접속 기기·브라우저 정보, 접속
                지역 등)를 수집하며, 해당 정보는 통계 분석 목적으로만
                이용됩니다.
              </li>
              <li>
                수집된 정보는 Google의 개인정보처리방침에 따라 처리되며,
                Google의 해외 서버에 저장·처리될 수 있습니다.
              </li>
              <li>
                이용자는 브라우저의 쿠키 설정을 변경하거나,{' '}
                <Link
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  구글 애널리틱스 차단 브라우저 부가기능
                </Link>
                을 설치하여 구글 애널리틱스의 정보 수집을 거부할 수 있습니다.
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 개인정보의 안전성 확보를 위하여 다음과 같은 조치를
              취하고 있습니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                <b>관리적 조치:</b> 내부관리계획 수립·시행, 개인정보 취급 인원
                최소화 및 정기적인 담당자 교육
              </li>
              <li>
                <b>기술적 조치:</b> 개인정보처리시스템 접근권한 관리,
                접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
                및 갱신
              </li>
              <li>
                <b>물리적 조치:</b> 개인정보가 보관된 시스템 및 문서보관 장소에
                대한 접근통제
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              청맥병원은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보
              처리와 관련한 정보주체의 문의·불만·피해구제 등을 처리하기 위하여
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다. 정보주체는
              청맥병원의 서비스를 이용하면서 발생한 모든 개인정보 보호 관련
              문의·불만·피해구제 등을 개인정보 보호책임자 및 담당부서로 문의하실
              수 있으며, 청맥병원은 이에 대해 지체 없이 답변 및 처리하겠습니다.
            </P>
            <Table className="mt-3" aria-label="개인정보 처리업무 위탁 예시">
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">부서 및 성명</th>
                  <th scope="col">연락처</th>
                  <th scope="col">이메일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>개인정보 보호 책임자</td>
                  <td>박용범</td>
                  <td>051-804-1119</td>
                  <td>yeshazi@naver.com</td>
                </tr>
                <tr>
                  <td>개인정보 보호 담당부서</td>
                  <td>청맥병원</td>
                  <td>051-804-1119</td>
                  <td>yeshazi@naver.com</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <P className="mt-20">
              정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에
              분쟁 해결이나 상담 등을 신청할 수 있습니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>
                <Link
                  href="https://www.kopico.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  개인정보분쟁조정위원회
                </Link>
                : (국번 없이) 1833-6972 / www.kopico.go.kr
              </li>
              <li>
                <Link
                  href="https://privacy.kisa.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  개인정보침해신고센터(한국인터넷진흥원)
                </Link>
                : (국번 없이) 118 / privacy.kisa.or.kr
              </li>
              <li>
                <Link
                  href="https://www.spo.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  대검찰청 사이버수사과
                </Link>
                : (국번 없이) 1301 / www.spo.go.kr
              </li>
              <li>
                <Link
                  href="https://ecrm.police.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  경찰청 사이버수사국
                </Link>
                : (국번 없이) 182 / ecrm.police.go.kr
              </li>
            </List>
          </div>

          <div>
            <P className="mt-20">
              이 개인정보 처리방침은 법령·정책 또는 보안기술의 변경에 따라
              내용의 추가·삭제 및 수정이 있을 경우, 변경사항의 시행 최소 7일
              전에 청맥병원 홈페이지를 통해 변경 이유 및 내용 등을 공지합니다.
            </P>
            <List variant="bullet" className="mt-5">
              <li>공고일자: [YYYY년 MM월 DD일]</li>
              <li>시행일자: [YYYY년 MM월 DD일]</li>
            </List>
          </div>
        </div>
      </Inner>
    </>
  );
}
