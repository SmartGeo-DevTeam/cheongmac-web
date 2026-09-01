export type PartnerCategory = 'all' | 'care' | 'support';

export type PartnerInstitutionLogo = {
  id: string;
  name: string;
  image: string;
};

export type PartnerHospital = {
  id: string;
  category: Exclude<PartnerCategory, 'all'>;
  name: string;
  image: string;
  agreement: string;
  phone: string;
  tags: string[];
};

export const PARTNER_CATEGORY_OPTIONS: Array<{
  value: PartnerCategory;
  label: string;
}> = [
  { value: 'all', label: '전체' },
  { value: 'care', label: '진료협약' },
  { value: 'support', label: '제휴/지원' },
];

export const PARTNER_INSTITUTION_LOGOS: PartnerInstitutionLogo[] = [
  {
    id: 'pusan-national-university-hospital',
    name: '부산대학교병원',
    image:
      '/assets/images/partner-hospital/logo-pusan-national-university-hospital.jpg',
  },
  {
    id: 'donga-university-hospital',
    name: '동아대학교병원',
    image:
      '/assets/images/partner-hospital/logo-donga-university-hospital.jpg',
  },
  {
    id: 'inje-busan-paik-hospital',
    name: '인제대학교 부산백병원',
    image:
      '/assets/images/partner-hospital/logo-inje-busan-paik-hospital.jpg',
  },
  {
    id: 'ministry-patriots-veterans',
    name: '국가보훈부',
    image:
      '/assets/images/partner-hospital/logo-ministry-patriots-veterans.jpg',
  },
  {
    id: 'daegu-cheongmac-clinic',
    name: '대구청맥의원',
    image:
      '/assets/images/partner-hospital/logo-daegu-cheongmac-clinic.jpg',
  },
  {
    id: 'ulsan-cheongmac-surgery',
    name: '울산청맥외과의원',
    image:
      '/assets/images/partner-hospital/logo-ulsan-cheongmac-surgery.jpg',
  },
  {
    id: 'kyungnam-college',
    name: '경남정보대학교',
    image:
      '/assets/images/partner-hospital/logo-kyungnam-college.jpg',
  },
  {
    id: 'nambuk-hana',
    name: '남북하나개발원',
    image:
      '/assets/images/partner-hospital/logo-nambuk-hana.jpg',
  },
];

export const PARTNER_HOSPITALS: PartnerHospital[] = [
  {
    id: 'pusan-national-university-hospital',
    category: 'care',
    name: '부산대학교병원',
    image:
      '/assets/images/partner-hospital/pusan-national-university-hospital.jpg',
    agreement:
      '의료진 간 의학정보 교류의 활성화를 통해 바람직한 의료전달체계를 구축하여 진료의 연속성 보장, 국민보건향상을 주 목적으로 상호협약 체결',
    phone: '051-240-7000',
    tags: ['진료협력', '의료전달체계', '주요키워드 3개 정도'],
  },
  {
    id: 'donga-university-hospital',
    category: 'care',
    name: '동아대학교병원',
    image:
      '/assets/images/partner-hospital/donga-university-hospital.jpg',
    agreement:
      '의료진 간 의학정보 교류의 활성화를 통해 바람직한 의료전달체계를 구축하여 진료의 연속성 보장, 국민보건향상을 주 목적으로 상호협약 체결',
    phone: '051-240-7000',
    tags: ['진료협력', '의료전달체계', '주요키워드 3개 정도'],
  },
  {
    id: 'inje-busan-paik-hospital',
    category: 'care',
    name: '인제대학교부산백병원',
    image:
      '/assets/images/partner-hospital/inje-busan-paik-hospital.jpg',
    agreement:
      '의료진 간 의학정보 교류의 활성화를 통해 바람직한 의료전달체계를 구축하여 진료의 연속성 보장, 국민보건향상을 주 목적으로 상호협약 체결',
    phone: '051-240-7000',
    tags: ['진료협력', '의료전달체계', '주요키워드 3개 정도'],
  },
  {
    id: 'kyungnam-college',
    category: 'support',
    name: '경남정보대학교',
    image: '/assets/images/partner-hospital/kyungnam-college.jpg',
    agreement:
      '산학협력을 통한 기술 정보 및 학술 교류, 인적 물적 교류 지원, 간호학과 재학 우수 인재를 대상으로 현장 실습·견학·산학연계 교육 참여 기회 제공',
    phone: '051-324-5555',
    tags: ['산학협력', '의료 인재 양성', '주요키워드 3개 정도'],
  },
  {
    id: 'nambuk-hana',
    category: 'support',
    name: '(사)남북하나개발원',
    image: '/assets/images/partner-hospital/nambuk-hana.jpg',
    agreement: '새터민 대상 의료 지원 서비스 제공',
    phone: '051-240-7000',
    tags: ['의료지원', '의료전달체계', '주요키워드 3개 정도'],
  },
];

export const PARTNER_TOTAL_COUNT = 1362;
