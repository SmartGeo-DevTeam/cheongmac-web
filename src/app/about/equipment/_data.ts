export type EquipmentCategory =
  | 'all'
  | 'imaging'
  | 'functional'
  | 'procedure'
  | 'special';

export type EquipmentCase = {
  id: string;
  title: string;
  image: string;
  description: string;
};

export type MedicalEquipment = {
  id: string;
  category: Exclude<EquipmentCategory, 'all'>;
  categoryLabel: string;
  title: string;
  model: string;
  image: string;
  subtitle?: string;
  description?: string;
  highlights?: string[];
  diseases?: string[];
  cases?: EquipmentCase[];
};

export const EQUIPMENT_CATEGORY_OPTIONS: Array<{
  value: EquipmentCategory;
  label: string;
}> = [
  { value: 'all', label: '전체' },
  { value: 'imaging', label: '영상진단' },
  { value: 'functional', label: '기능생체검사' },
  { value: 'procedure', label: '시술·수술' },
  { value: 'special', label: '특수치료' },
];

export const MEDICAL_EQUIPMENT: MedicalEquipment[] = [
  {
    id: 'ct',
    category: 'imaging',
    categoryLabel: '전신용 CT',
    title: '전신용 CT',
    model: 'PHILIPS Ingenuity Elite 128',
    image: '/assets/images/medical-equipment/ct.jpg',
    subtitle: '전산화단층촬영 (Computed Tomography)',
    description:
      '인체 단면을 3차원 입체 영상으로 정밀하게 구현하는 첨단 장비로, 미세한 혈관 구조와 장기 병변을 빠르고 정확하게 진단합니다.',
    highlights: [
      '초당 128장 촬영 · 검사시간 5분 내외',
      'iDose4 기술로 저선량 고화질 영상 제공',
    ],
    diseases: [
      '혈관질환',
      '심혈관질환',
      '악성종양 (암)',
      '복부·소화기질환',
      '흉부·폐질환',
      '근골격계질환',
      '미세한 장기병소',
    ],
    cases: [
      {
        id: 'pelvic',
        title: '골반정맥류 (골반울혈증후군)',
        image: '/assets/images/medical-equipment/ct-case-pelvic.jpg',
        description:
          '골반 내 정맥 혈류 정체로 인해 확장된 정맥이 확인되는 골반정맥류 영상 예시입니다.',
      },
      {
        id: 'varicocele',
        title: '정계정맥류',
        image: '/assets/images/medical-equipment/ct-case-varicocele.jpg',
        description:
          '정맥 부위의 혈류 정체와 확장된 혈관을 확인하는 정계정맥류 영상 예시입니다.',
      },
      {
        id: 'dvt',
        title: '심부정맥혈전증 치료 전·후',
        image: '/assets/images/medical-equipment/ct-case-dvt-before.jpg',
        description:
          '치료 전후의 혈관 상태 변화를 비교해 확인하는 심부정맥혈전증 영상 예시입니다.',
      },
    ],
  },
  {
    id: 'logiq-p9-pro',
    category: 'imaging',
    categoryLabel: '진단전용 초음파',
    title: '진단전용 초음파',
    model: 'LOGIQ P9 Pro',
    image: '/assets/images/medical-equipment/logiq-p9-pro.jpg',
  },
  {
    id: 'epiq-7g',
    category: 'imaging',
    categoryLabel: '전신 초음파',
    title: '전신 초음파',
    model: 'PHILIPS EPIQ 7G',
    image: '/assets/images/medical-equipment/epiq-7g.jpg',
  },
  {
    id: 'infinix-core',
    category: 'imaging',
    categoryLabel: '혈관조영장비',
    title: '혈관조영장비',
    model: 'Canon Infinix-i Core +',
    image: '/assets/images/medical-equipment/infinix-core.jpg',
  },
  {
    id: 'vp-1000',
    category: 'functional',
    categoryLabel: '동맥경화 진단장비',
    title: '동맥경화 진단장비',
    model: 'Omron VP-1000 plus',
    image: '/assets/images/medical-equipment/vp-1000.jpg',
  },
  {
    id: 'cobas-e411',
    category: 'functional',
    categoryLabel: '생화학 면역검사장비',
    title: '생화학 면역검사장비',
    model: 'Roche Cobas e411',
    image: '/assets/images/medical-equipment/cobas-e411.jpg',
  },
  {
    id: 'venue-50',
    category: 'procedure',
    categoryLabel: '시술전용 초음파',
    title: '시술전용 초음파',
    model: 'GE Venue 50',
    image: '/assets/images/medical-equipment/venue-50.jpg',
  },
  {
    id: 'venaseal',
    category: 'procedure',
    categoryLabel: '하지정맥류 치료 의료기기',
    title: '하지정맥류 치료 의료기기',
    model: '베나실 VenaSeal™',
    image: '/assets/images/medical-equipment/venaseal.jpg',
  },
  {
    id: 'clarivein',
    category: 'procedure',
    categoryLabel: '하지정맥류 치료 의료기기',
    title: '하지정맥류 치료 의료기기',
    model: '클라리베인 ClariVein®',
    image: '/assets/images/medical-equipment/clarivein.jpg',
  },
  {
    id: 'flebogrif',
    category: 'procedure',
    categoryLabel: '하지정맥류 치료 의료기기',
    title: '하지정맥류 치료 의료기기',
    model: '플레보그립 Flebogrif®',
    image: '/assets/images/medical-equipment/flebogrif.jpg',
  },
  {
    id: 'diode-1940',
    category: 'procedure',
    categoryLabel: '레이저 장비',
    title: '레이저 장비',
    model: 'Diode 1940nm Laser',
    image: '/assets/images/medical-equipment/diode-1940.jpg',
  },
  {
    id: 'closure-rfg',
    category: 'procedure',
    categoryLabel: '고주파 치료기',
    title: '고주파 치료기',
    model: 'Covidien ClosureRFG™',
    image: '/assets/images/medical-equipment/closure-rfg.jpg',
  },
  {
    id: 'ds-3000',
    category: 'procedure',
    categoryLabel: '의약품주입펌프',
    title: '의약품주입펌프',
    model: 'DAIWHA DS-3000',
    image: '/assets/images/medical-equipment/ds-3000.jpg',
  },
  {
    id: 'bm3',
    category: 'procedure',
    categoryLabel: '환자케어 모니터',
    title: '환자케어 모니터',
    model: 'BioNet BM3',
    image: '/assets/images/medical-equipment/bm3.jpg',
  },
  {
    id: 'o2-fresh',
    category: 'special',
    categoryLabel: '고압산소치료기',
    title: '고압산소치료기',
    model: 'HBOT O2 Fresh M50',
    image: '/assets/images/medical-equipment/o2-fresh.jpg',
  },
];

export function getEquipmentById(id: string) {
  return MEDICAL_EQUIPMENT.find((item) => item.id === id) ?? null;
}
