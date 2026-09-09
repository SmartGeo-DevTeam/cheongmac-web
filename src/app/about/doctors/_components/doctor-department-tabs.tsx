'use client';

import FilterTabs from '@/app/_components/ui/filter-tabs';
import { useState } from 'react';

type Department = 'vascular' | 'radiology' | 'anesthesiology';

const ITEMS = [
  { value: 'vascular' as const, label: '혈관외과' },
  { value: 'radiology' as const, label: '영상의학과' },
  { value: 'anesthesiology' as const, label: '마취통증의학과' },
];

export default function DoctorDepartmentTabs() {
  const [department, setDepartment] = useState<Department>('vascular');

  return (
    <FilterTabs
      id="about-doctors-department-tabs"
      items={ITEMS}
      value={department}
      onValueChange={setDepartment}
      ariaLabel="의료진 진료과"
      variant="department"
    />
  );
}
