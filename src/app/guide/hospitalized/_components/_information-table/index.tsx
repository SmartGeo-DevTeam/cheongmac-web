import type { TableRow } from '../types';

export default function InformationTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: TableRow[];
}) {
  return (
    <table
      className="mt-5 w-full table-fixed border-y-[1.5px] border-y-gray-900 text-left text-mo-body-1
      xl:text-pc-body-1"
    >
      <colgroup>
        <col
          className="w-[33.3%]
          xl:w-[28%]"
        />
        <col />
      </colgroup>

      <thead className="bg-subtle">
        <tr className="border-b border-strong">
          {headers.map((header, index) => (
            <th
              key={header}
              scope="col"
              className={`px-4 py-2
                xl:px-8 xl:py-5
              ${index === 0 ? 'border-r border-strong' : ''}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-300">
        {rows.map((row) => (
          <tr key={row.label}>
            <th
              scope="row"
              className={`px-4 py-3 border-r border-gray-300 align-top font-bold break-keep
                xl:px-8 xl:py-5 xl:align-middle
              ${row.label === '반입금지물품' ? 'text-danger' : ''}`}
            >
              {row.label}
            </th>
            <td
              className="px-4 py-3 align-top break-keep
              xl:px-8 xl:py-5 xl:align-middle"
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
