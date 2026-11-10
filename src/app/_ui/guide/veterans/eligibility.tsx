import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import VeteransSectionDescription from './section-description';
import { eligibilityCases, eligibilityFeeRows, eligibilityLead } from '@/app/_data/guide/veterans/eligibility';

export default function VeteransEligibility() {
  return (
    <section id="guide-veterans-eligibility">
      <Inner>
        <SectionBlock title="대상" variant="side">
          <VeteransSectionDescription
            text={eligibilityLead}
            className="font-semibold"
          />

          {/* 대상 안내: 이 섹션 전용 불렛 목록 */}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-mo-body-2 xl:mt-6 xl:text-pc-body-1">
            {eligibilityCases.map((text) => (
              <li key={text} className="break-keep pl-1">
                {text}
              </li>
            ))}
          </ul>

          {/* 국비 환자 진료비: PC 전용 표 */}
          <div className="mt-10 hidden xl:block">
            <table className="w-full table-fixed border-collapse border-y-[1.5px] border-y-gray-900 text-left text-pc-body-2">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[37%]" />
                <col className="w-[31%]" />
                <col className="w-[18%]" />
              </colgroup>

              <thead className="bg-subtle">
                <tr className="border-b border-default">
                  <th scope="col" className="border-r border-default px-5 py-5">
                    구분
                  </th>
                  <th
                    scope="col"
                    colSpan={2}
                    className="border-r border-default px-5 py-5"
                  >
                    대상
                  </th>
                  <th scope="col" className="px-5 py-5">
                    진료비
                  </th>
                </tr>
              </thead>

              <tbody>
                {eligibilityFeeRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b border-default last:border-b-0"
                  >
                    {index === 0 && (
                      <th
                        scope="rowgroup"
                        rowSpan={eligibilityFeeRows.length}
                        className="border-r border-default bg-subtle px-5 py-5 align-middle font-semibold"
                      >
                        국비 환자
                      </th>
                    )}

                    {/* 대상: 셀 내부 불렛 목록 */}
                    {'bullets' in row && (
                      <td
                        colSpan={'condition' in row ? 1 : 2}
                        rowSpan={
                          'subjectRowSpan' in row
                            ? row.subjectRowSpan
                            : undefined
                        }
                        className="border-r border-default px-6 py-5 align-middle break-keep"
                      >
                        <ul className="list-disc space-y-2 pl-5">
                          {row.bullets.map((bullet) => (
                            <li key={bullet.title} className="pl-1">
                              <strong className="font-semibold">
                                {bullet.title}
                              </strong>
                              {'description' in bullet && bullet.description
                                ? `: ${bullet.description}`
                                : ''}
                            </li>
                          ))}
                        </ul>
                      </td>
                    )}

                    {/* 등급판정 */}
                    {'condition' in row && (
                      <td className="border-r border-default px-6 py-5 align-middle">
                        {row.condition}
                      </td>
                    )}

                    {/* 진료비 */}
                    <td className="px-5 py-5 align-middle break-keep">
                      {row.fee.split('\n').map((line, index) => (
                        <span
                          key={index}
                          className={`block ${
                            index === 0 ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {line}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>
      </Inner>
    </section>
  );
}
