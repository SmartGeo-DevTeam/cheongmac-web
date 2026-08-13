import { Fragment } from 'react';

import {
  NON_COVERED_FEE_CATEGORIES,
  NON_COVERED_FEE_ITEMS,
} from '../_data/non-covered-fees';

const cellClassName =
  'border-b border-r border-[#D8DADC] px-2 py-2 align-middle last:border-r-0 xl:px-2.5 xl:py-2.5';

export default function NonCoveredFeeTable() {
  const categories = [...NON_COVERED_FEE_CATEGORIES].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="mt-8 w-full overflow-x-auto overscroll-x-contain xl:mt-10 xl:overflow-visible">
      <table className="w-full min-w-[1120px] table-fixed border-collapse text-center text-sm leading-[1.45] tracking-[-0.02em] text-[#3C4249] xl:min-w-0">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[9%]" />
          <col className="w-[23%]" />
          <col className="w-[5%]" />
          <col className="w-[8%]" />
          <col className="w-[8%]" />
          <col className="w-[8%]" />
          <col className="w-[10%]" />
          <col className="w-[9%]" />
        </colgroup>

        <thead>
          <tr className="bg-[#075C4B] text-white">
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">중분류</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">소분류</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">코드</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">명칭</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">구분</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">
              비용
              <br />
              (단위: 만원)
            </th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">
              치료재료대
              <br />
              포함여부
            </th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">
              약제비
              <br />
              포함여부
            </th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">특이사항</th>
            <th className="px-1 py-2 font-semibold xl:px-2 xl:py-3">최종변경일</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => {
            const items = NON_COVERED_FEE_ITEMS.filter(
              (item) => item.categoryId === category.id,
            ).sort((a, b) => a.order - b.order);

            return (
              <Fragment key={category.id}>
                {category.showHeader && (
                  <tr>
                    <th
                      colSpan={10}
                      className="border-b border-[#C7C9CC] bg-[#F2F3F4] px-2 py-1.5 font-bold text-[#262C35] xl:py-2"
                    >
                      {category.title}
                    </th>
                  </tr>
                )}

                {items.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className={cellClassName}>{item.majorCategory}</td>
                    <td className={cellClassName}>{item.subCategory}</td>
                    <td className={`${cellClassName} tabular-nums`}>{item.code}</td>
                    <td className={`${cellClassName} break-keep font-medium text-[#2F343B]`}>
                      {item.name}
                    </td>
                    <td className={cellClassName}>{item.classification}</td>
                    <td className={`${cellClassName} whitespace-nowrap tabular-nums`}>
                      {item.fee}
                    </td>
                    <td className={cellClassName}>{item.materialIncluded}</td>
                    <td className={cellClassName}>{item.medicationIncluded}</td>
                    <td className={`${cellClassName} break-keep`}>
                      {item.notes || '-'}
                    </td>
                    <td className={`${cellClassName} whitespace-nowrap tabular-nums`}>
                      {item.updatedAt}
                    </td>
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
