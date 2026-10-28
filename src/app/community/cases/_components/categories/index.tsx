'use client';

import CategoryTabs, {
  type CategoryTabType,
} from '@/app/_components/category-tabs';
import Inner from '@/app/_components/common/inner';
import type { CaseCategoryId } from '../../data';

type CasesCategoriesProps = {
  categories: readonly CategoryTabType<CaseCategoryId>[];
  activeId: CaseCategoryId;
  onChange: (id: CaseCategoryId) => void;
};

/** 진료분야 목록 생성 및 게시글 존재 여부 판정은 부모가 담당합니다. */
export default function CasesCategories({
  categories,
  activeId,
  onChange,
}: CasesCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <Inner usePaddingHorizontalInMobile={false}>
      <CategoryTabs
        id="community-cases-categories"
        ariaLabel="치료 사례 진료분야"
        categories={categories}
        activeId={activeId}
        onChange={onChange}
        className="mt-3 xl:mt-7"
        desktopAlign="center"
      />
    </Inner>
  );
}
