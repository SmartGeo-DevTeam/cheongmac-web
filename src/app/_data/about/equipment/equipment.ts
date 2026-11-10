import type { EquipmentTabId } from './tabs';

export type EquipmentCategoryId = Exclude<EquipmentTabId, 'all'>;

export type EquipmentCaseImageType = {
  id: string;
  src: string;
  label?: string;
  alt?: string;
};

export type EquipmentCaseType = {
  id: string;
  title: string;
  image?: string; // 기존 단일 이미지 호환
  images?: EquipmentCaseImageType[]; // 여러 이미지
  description?: string;
};

export type EquipmentDetailType = {
  /** 장비의 영문 분류명 (상세 화면의 영문 소제목) */
  englishName?: string;
  /** 장비 소개 */
  description?: string;
  /** 장비의 주요 특징 */
  highlights?: string[];
  /** 진단·치료에 사용하는 질환/목적 */
  diseases?: string[];
  /** 검사·치료 사례 (이미지는 준비되었을 때 입력) */
  cases?: EquipmentCaseType[];
};

export type EquipmentType = {
  id: string;
  category: EquipmentCategoryId;
  title: string;
  model: string;
  image: string;
  detail?: EquipmentDetailType;
};

/** 순서는 장비 목록 노출 순서와 일치합니다. */
export const equipments: EquipmentType[] = [
  {
    id: 'ct',
    category: 'imaging',
    title: '전신용 CT',
    model: 'Ingenuity Elite 128',
    image: '/equipment/equipment-1.png',
    detail: {
      englishName: 'Computed Tomography',
      description:
        '인체 단면을 3차원 입체 영상으로 정밀하게 구현하는 장비로, 혈관 구조와 장기 병변을 진단하는 데 활용합니다.',
      highlights: [
        '128채널을 이용한 정밀 영상 촬영',
        'iDose4 기술을 활용한 영상 재구성',
      ],
      diseases: [
        '혈관질환',
        '심혈관질환',
        '악성종양 (암)',
        '복부·소화기질환',
        '흉부·폐질환',
        '근골격계질환',
      ],

      cases: [
        {
          id: 'pelvic',
          title: '골반정맥류 (골반울혈증후군)',
          images: [
            {
              id: 'main',
              src: '/equipment/temp-1.png',
              label: '골반정맥류 (골반울혈증후군)',
            },
          ],
          description: '골반 내 정맥의 확장 여부를 살펴보는 영상 사례입니다.',
        },
        {
          id: 'varicocele',
          title: '정계정맥류',
          images: [
            {
              id: 'main',
              src: '/equipment/temp-2.png',
              label: '정계정맥류',
            },
          ],
          description: '정맥의 확장 상태를 확인하는 영상 사례입니다.',
        },
        {
          id: 'dvt',
          title: '심부정맥혈전증',
          images: [
            {
              id: 'before',
              src: '/equipment/temp-3.png',
              label: '심부정맥혈전증 치료 전',
            },
            {
              id: 'after',
              src: '/equipment/temp-4.png',
              label: '심부정맥혈전증 치료 후',
            },
          ],
          description: '치료 전후의 혈관 상태를 비교하는 영상 사례입니다.',
        },
      ],
    },
  },
  {
    id: 'logiq-p9-pro',
    category: 'imaging',
    title: '진단전용 초음파',
    model: 'GE LOGIQ P9 Pro',
    image: '/equipment/equipment-2.png',
    detail: {
      englishName: 'Ultrasound System',
      description:
        '피부 아래 미세혈관까지 관찰하는 고성능 하이엔드 초음파 장비입니다.',
      highlights: [
        '실시간 도플러로 혈류 방향·속도 측정',
        '선명한 해상도와 깊은 투과율',
      ],
      diseases: [
        '하지정맥류',
        '정계정맥류',
        '골반정맥류',
        '말초동맥질환',
        '심부정맥혈전증',
        '동맥경화',
      ],
    },
  },
  {
    id: 'epiq-7g',
    category: 'imaging',
    title: '전신 초음파',
    model: 'PHILIPS EPIQ 7G',
    image: '/equipment/equipment-3.png',
    detail: {
      englishName: 'Ultrasound System',
      description:
        '혈관뿐 아니라 전신 장기까지 정밀하게 검사할 수 있는 고사양 초음파입니다.',
      highlights: [
        'nSIGHT 기술로 고해상도 영상 제공',
        '미세 혈류 감지 기능 (Micro CPA)',
      ],
      diseases: [
        '정맥류',
        '갑상선질환',
        '유방질환',
        '복부질환',
        '심장질환',
        '자궁 등 부인과질환',
        '전신 건강상태 평가',
      ],
    },
  },
  {
    id: 'infinix-core',
    category: 'imaging',
    title: '혈관조영장비',
    model: 'Canon Infinix-i Core +',
    image: '/equipment/equipment-4.png',
    detail: {
      englishName: 'Interventional Angiography System',
      description:
        '혈관 내부를 실시간 영상으로 확인하며 진단과 시술을 동시에 시행할 수 있는 중재적 시술 장비입니다.',
      highlights: [
        '진단·시술 동시 가능한 하이브리드 시스템',
        '환자의 움직임을 최소화한 시술 접근성',
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
    },
  },
  {
    id: 'vp-1000',
    category: 'functional',
    title: '동맥경화 진단장비',
    model: 'Omron VP-1000 plus',
    image: '/equipment/equipment-5.png',
    detail: {
      englishName: 'ABI Testing Device',
      description:
        '동맥 탄력성과 혈관의 협착 정도를 측정하여 동맥경화·말초동맥질환을 평가합니다.',
      highlights: [
        '통증·부작용 없는 비침습 검사',
        'PWV+ABI를 5분 내 동시 측정',
      ],
      diseases: [
        '동맥경화',
        '하지동맥폐색증',
        '혈관노화',
        '뇌·심혈관질환 발병 위험도',
        '심근경색·뇌경색',
      ],
    },
  },
  {
    id: 'cobas-e411',
    category: 'functional',
    title: '생화학 면역검사장비',
    model: 'Roche Cobas e411',
    image: '/equipment/equipment-6.png',
    detail: {
      englishName: 'Clinical Chemistry and Immunoassay Analyzer',
      description:
        '소량의 혈액으로 갑상선, 호르몬, 종양표지자, 바이러스 등 다양한 면역 검사를 수행하는 장비입니다.',
      highlights: ['다항목 정밀분석·빠른 결과', '치료 전 안전성 평가'],
      diseases: ['갑상선', '호르몬', '종양 표지자', '심혈관질환', '간염성질환'],
    },
  },
  {
    id: 'venue-50',
    category: 'procedure',
    title: '시술전용 초음파',
    model: 'GE Venue 50',
    image: '/equipment/equipment-7.png',
    detail: {
      englishName: 'Procedural Ultrasound System',
      description:
        '혈관의 위치와 상태를 실시간으로 확인하는 시술 전용 이동형 초음파입니다.',
      highlights: [
        'Pinpoint GT 기술로 선명한 시술 위치 표현',
        '신속한 진단·시술이 필요한 의료 현장에 최적화',
      ],
      diseases: ['하지정맥류', '투석혈관', '혈관 접근 가이드'],
    },
  },
  {
    id: 'venaseal',
    category: 'procedure',
    title: '하지정맥류 치료 의료기기',
    model: '베나실 VenaSeal™',
    image: '/equipment/equipment-8.png',
    detail: {
      englishName: 'Cyanoacrylate Closure Device',
      description:
        '의료용 생체접합제를 카테터로 주입해 역류 정맥을 폐쇄하는 정맥폐쇄 의료기기입니다.',
      highlights: [
        '의료용 접합제를 이용한 정맥 폐쇄',
        '열에너지를 사용하지 않는 방식',
      ],
      diseases: ['하지정맥류'],
    },
  },
  {
    id: 'clarivein',
    category: 'procedure',
    title: '하지정맥류 치료 의료기기',
    model: '클라리베인 ClariVein® IC',
    image: '/equipment/equipment-9.png',
    detail: {
      englishName: 'Mechanochemical Ablation Device',
      description:
        '회전 카테터로 물리적 자극과 약물 주입을 동시에 시행하는 기계화학적 정맥폐쇄 의료기기입니다.',
      highlights: ['기계적 자극과 약물 주입 병행', '비열 치료 방식'],
      diseases: ['하지정맥류'],
    },
  },
  {
    id: 'flebogrif',
    category: 'procedure',
    title: '하지정맥류 치료 의료기기',
    model: '플레보그립 Flebogrif®',
    image: '/equipment/equipment-10.png',
    detail: {
      englishName: 'Mechanochemical Ablation Device',
      description:
        '갈고리형 카테터의 물리적 자극과 거품형 경화제를 결합한 기계화학적 정맥폐쇄 의료기기입니다.',
      highlights: ['물리적 자극과 경화제 주입 결합', '하지정맥류 치료에 사용'],
      diseases: ['하지정맥류'],
    },
  },
  {
    id: 'diode-1940',
    category: 'procedure',
    title: '레이저 장비',
    model: 'Diotech Diode 1940nm',
    image: '/equipment/equipment-11.png',
    detail: {
      englishName: 'Endovenous Laser Ablation System',
      description:
        '혈관 내벽에 열에너지를 조사하여 혈관을 수축·폐쇄하는 레이저 치료 장비입니다.',
      highlights: [
        '정밀한 열 전달로 주변 조직 손상 최소화',
        '직경이 굵고 굽게 뻗은 복재정맥 치료에 사용',
      ],
      diseases: ['하지정맥류'],
    },
  },
  {
    id: 'closure-rfg',
    category: 'procedure',
    title: '고주파 치료기',
    model: 'Covidien ClosureRFG™',
    image: '/equipment/equipment-12.png',
    detail: {
      englishName: 'Radiofrequency Ablation System',
      description:
        '혈관 내벽에 고주파 열에너지를 전달해 혈관을 폐쇄시키는 치료기기입니다.',
      highlights: [
        '혈관이 많이 확장된 경우에도 사용 가능',
        '레이저 대비 적은 통증·멍',
      ],
      diseases: ['하지정맥류'],
    },
  },
  {
    id: 'ds-3000',
    category: 'procedure',
    title: '의약품 주입펌프',
    model: 'DAIWHA DS-3000',
    image: '/equipment/equipment-13.png',
    detail: {
      englishName: 'Infusion Pump',
      description:
        '환자에게 정량의 약물을 주입하거나 시간당 정확한 양으로 주입할 때 사용하는 의료기기입니다.',
      highlights: ['정밀 용량 제어·안전한 투약·자동 주입'],
      diseases: ['시술 중 약물투여', '수술 전후 관리'],
    },
  },
  {
    id: 'bm3',
    category: 'procedure',
    title: '환자케어 모니터',
    model: 'BioNet BM3',
    image: '/equipment/equipment-14.png',
    detail: {
      englishName: 'Patient Monitoring System',
      description:
        '환자의 혈압, 심박동수, 호흡수 등을 실시간으로 확인하는 환자 케어 장비입니다.',
      highlights: ['EtCO2 기반 실시간 호흡 모니터링'],
      diseases: ['시술 중 안전관리', '수술 전후 모니터링'],
    },
  },
  {
    id: 'o2-fresh',
    category: 'special',
    title: '고압산소치료기',
    model: 'HBOT O2 Fresh M50',
    image: '/equipment/equipment-15.png',
    detail: {
      englishName: 'Hyperbaric Oxygen Chamber',
      description:
        '높은 압력 환경에서 고농도 산소를 공급해 손상 조직의 회복을 돕는 치료 장비입니다.',
      highlights: ['고농도 산소공급', '조직재생 촉진'],
      diseases: [
        '당뇨병성 족부궤양',
        '상처 치유',
        '화상',
        '일산화탄소·시안화물 중독',
        '버거씨병',
        '감압병 및 가스 색전증',
        '돌발성 난청',
        '수술 후 회복',
      ],
    },
  },
];

export function getEquipmentById(id: string): EquipmentType | undefined {
  return equipments.find((equipment) => equipment.id === id);
}
