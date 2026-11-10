// 신규: 협약기관 목록에 사용할 데이터 타입 (추후 API 응답 타입으로 교체 가능)
export type PartnerCategory = 'medical' | 'support';

export type PartnerItem = {
  id: string;
  name: string;
  category: PartnerCategory;
  imageSrc: string;
  description?: string;
  phone?: string;
  keywords?: string[];
  websiteHref?: string;
};
