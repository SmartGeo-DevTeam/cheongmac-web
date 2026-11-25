import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';

export const thrombosisSymptoms: SymptomCarouselItem[] = [
  {
    id: 'unilateral-leg-swelling',
    label: '한쪽 다리 부종',
    image: '/vascular/venous/thrombosis/symptoms/unilateral-leg-swelling.png',
    imageAlt: '한쪽 다리가 심하게 부어 양쪽 다리 굵기가 달라진 모습',
    symptoms: [
      '왼쪽 다리만 코끼리처럼 퉁퉁 부었어요',
      '양쪽 다리 굵기가 눈에 띄게 달라졌어요',
      '한쪽 발목이 부어서 신발이 잘 안 들어가요',
      '손가락으로 누르면 자국이 한참 남아요',
    ],
    caution: {
      lead: '유독 한쪽 다리에만 증상이 나타난다면, ',
      emphasis: '단순 피로때문이 아닐 수 있습니다.',
      tail: '',
    },
  },
  {
    id: 'calf-pain',
    label: '종아리 통증',
    image: '/vascular/venous/thrombosis/symptoms/calf-pain.png',
    imageAlt: '손으로 종아리를 잡고 있는 모습',
    symptoms: [
      '걸을 때마다 종아리가 당기고 묵직해요',
      '종아리를 누르면 아파요',
      '근육통인 줄 알았는데 며칠째 낫지 않아요',
    ],
    caution: {
      lead: '초기에는 근육통과 헷갈리기 쉽지만 ',
      emphasis: '한쪽 종아리 통증이 며칠째 이어진다면 혈관 상태 점검이 필요합니다.',
      tail: '',
    },
  },
  {
    id: 'warmth-skin-discoloration',
    label: '열감·피부색 변화',
    image: '/vascular/venous/thrombosis/symptoms/warmth-skin-discoloration.png',
    imageAlt: '한쪽 종아리 피부가 붉게 변하고 부어 있는 모습',
    symptoms: [
      '부은 쪽 다리를 만지면 반대쪽보다 뜨끈해요',
      '다리 피부가 붉거나 자줏빛으로 변했어요',
      '피부가 팽팽하고 반질거려요',
    ],
    caution: {
      lead: '부은 다리가 뜨겁거나 색이 변했다면 ',
      emphasis: '혈류가 원활하지 않다는 신호일 수 있습니다.',
      tail: '',
    },
  },
  {
    id: 'bulging-veins',
    label: '혈관 돌출',
    image: '/vascular/venous/thrombosis/symptoms/bulging-veins.png',
    imageAlt: '다리 피부 아래 혈관이 돌출된 모습',
    symptoms: [
      '다리 피부 아래 혈관이 평소보다 굵게 비쳐요',
      '다리에 전에 없던 핏줄이 선명하게 보여요',
      '붓기가 생기면서 혈관이 도드라져 보여요',
    ],
    caution: {
      lead: '하지정맥류와 달리 급성 부종이 동반된다면 ',
      emphasis: '심부정맥혈전증을 의심해볼 수 있습니다.',
      tail: '',
    },
  },
];
