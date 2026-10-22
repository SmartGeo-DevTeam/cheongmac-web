import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function Summary() {
  return (
    <section
      id="introduction-intro-summary"
      className="mt-15 mb-25
      xl:my-30"
    >
      <Inner>
        <h2
          className="text-mo-title-1
          xl:text-center xl:text-pc-title-1"
        >
          청맥병원 개요
        </h2>
        <div
          className="mt-5 grid grid-cols-1
          xl:mt-12 xl:grid-cols-[4.5fr_5.5fr] xl:gap-21.5"
        >
          <div
            className="relative min-w-0 w-full aspect-600/337 rounded-lg overflow-clip
            xl:rounded-xl
            "
          >
            <Image src={`/introduction/intro/summary.png`} alt="summary" fill />
          </div>

          <table
            className="mt-5 min-w-0 w-full table-fixed border-collapse border-y-[1.5px] border-y-gray-900 text-left text-mo-body-2
            xl:m-0 xl:text-pc-body-2"
          >
            <colgroup>
              <col
                className="w-1/3
                xl:w-35"
              />
              <col
                className="w-2/3
                xl:w-auto"
              />
            </colgroup>

            <thead className="bg-bg-subtle">
              <tr className="border-y border-strong">
                <th
                  className="border-r border-strong px-4 py-2
                  xl:px-5 xl:py-3"
                >
                  구분
                </th>
                <th
                  className="px-4 py-2
                  xl:px-5 xl:py-3"
                >
                  내용
                </th>
              </tr>
            </thead>

            <tbody className="[&_tr]:border-b [&_tr]:border-strong">
              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  개원
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  2010년 4월 5일 개원
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  진료과
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  3개 전문 진료과 / 6인 전문의 구성
                  <br />
                  외과 (혈관외과 분과전문의), 영상의학과, 마취통증의학과
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  전문진료 영역
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  혈관질환 전문
                  <br />
                  (정맥질환, 동맥질환, 투석혈관, 당뇨발, 기타)
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  주소
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  부산광역시 부산진구 중앙대로 716
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  규모
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  지하 1층 ~ 지상 6층
                  <br />
                  (지하주차장 주차가능대수 N대)
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  대표전화
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  <a href="tel:0518041119">051-804-1119</a>
                  <br />
                  (FAX 051-337-1101)
                </td>
              </tr>

              <tr>
                <th
                  className="border-r border-strong px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  진료시간
                </th>
                <td
                  className="break-keep px-4 py-3 align-top
                  xl:px-5 xl:py-3"
                >
                  평일 09:00~18:00
                  <br />
                  (점심시간 12:30~13:30)
                  <br />
                  토요일 09:00~13:00
                  <br />
                  일·공휴일 휴진
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Inner>
    </section>
  );
}
