import type { ImageProps } from 'next/image';

/** 진료 상세 페이지의 치료사례 카드에 필요한 표시 데이터만 보관합니다. */
export type ClinicCasePreview = {
  id: string;
  href: string;
  title: string;
  description: string;
  image: ImageProps['src'];
  imageAlt: string;
  patient?: string;
  age?: number;
  sex?: '남성' | '여성';
};
