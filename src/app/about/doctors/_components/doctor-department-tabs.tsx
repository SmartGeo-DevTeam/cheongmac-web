'use client';

import FilterTabs from '@/app/_components/ui/filter-tabs';

export type DoctorDepartmentFilter =
  | 'vascular'
  | 'radiology'
  | 'anesthesiology';

const ITEMS = [
  { value: 'vascular' as const, label: '혈관외과' },
  { value: 'radiology' as const, label: '영상의학과' },
  { value: 'anesthesiology' as const, label: '마취통증의학과' },
];

export default function DoctorDepartmentTabs({
  value,
  onValueChange,
}: {
  value: DoctorDepartmentFilter;
  onValueChange: (value: DoctorDepartmentFilter) => void;
}) {
  return (
    <FilterTabs
      id="about-doctors-department-tabs"
      items={ITEMS}
      value={value}
      onValueChange={onValueChange}
      ariaLabel="의료진 진료과"
      variant="department"
    />
  );
}
