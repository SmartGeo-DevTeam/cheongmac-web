import type { DiagnosticCriteriaTable } from '@/app/_types/clinic/diagnostics';

type CriteriaTableProps = {
  table: DiagnosticCriteriaTable;
  title: string;
};

/** 기존 진단 기준 제목은 MethodPanel이 담당합니다. 표와 주석만 렌더링합니다. */
export default function CriteriaTable({ table, title }: CriteriaTableProps) {
  return (
    <>
      <table
        className={`mt-5 w-full table-fixed border-collapse border-y-[1.5px] border-primary break-keep text-mo-body-1 text-primary
          xl:mt-6 xl:text-pc-body-1`}
      >
        <caption className={`sr-only`}>{title}</caption>
        <colgroup>
          <col className={`w-[30%]
            xl:w-[23.5%]`} />
          <col />
        </colgroup>
        <thead className={`bg-subtle`}>
          <tr className={`border-b border-gray-300`}>
            {table.columns.map((column, index) => (
              <th
                key={column.label}
                scope="col"
                className={`px-4 py-2.5 font-semibold text-left
                  xl:px-8 xl:py-5
                  ${index === 0 ? 'border-r border-gray-300' : ''}`}
              >
                {column.mobileLabel ? (
                  <>
                    <span className={`xl:hidden`}>{column.mobileLabel}</span>
                    <span className={`hidden xl:inline`}>{column.label}</span>
                  </>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.id} className={`border-b border-gray-300 last:border-b-0`}>
              <th
                scope="row"
                className={`px-4 py-3 border-r border-gray-300 font-normal text-left
                  xl:px-8 xl:py-5 xl:font-semibold`}
              >
                {row.cells[0]}
              </th>
              <td className={`px-4 py-3
                xl:px-8 xl:py-5`}>
                {row.cells[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {table.note && (
        <p className={`mt-5 break-keep text-mo-body-2 text-secondary
          xl:mt-6 xl:text-pc-body-2`}>
          {table.note}
        </p>
      )}
    </>
  );
}
