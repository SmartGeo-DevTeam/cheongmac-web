import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';

/** 정적 증상 데이터: 추후 조회 결과를 같은 공통 컴포넌트에 전달할 수 있습니다. */
export const varicoseSymptoms: SymptomCarouselItem[] = [
  {
    id: 'heaviness',
    label: '다리 무거움',
    image: '/vascular/venous/varicose/symptoms/leg-heaviness.png',
    imageAlt: '다리 무거움을 느끼는 모습',
    symptoms: [
      '오래 서 있으면 다리가 돌덩이처럼 무거워요',
      '오후만 되면 다리가 천근만근',
      '하루 종일 뻐근하고 피곤한 다리',
      '앉았다 일어나면 다리가 축 처지는 느낌이에요',
    ],
    caution: {
      lead: '처음엔 단순 피로처럼 느껴지지만, 다리가 무겁다는 것은 ',
      emphasis: '정맥 순환이 막히기 시작했다는 신호',
      tail: '입니다.',
    },
  },
  {
    id: 'swelling',
    label: '다리 부종',
    image: '/vascular/venous/varicose/symptoms/leg-swelling.png',
    imageAlt: '발목과 종아리가 부은 모습',
    symptoms: [
      '양말 자국이 깊게 남아요',
      '아침에 맞던 신발이 오후엔 꽉 껴요',
      '발목 라인이 사라져서 다리가 밋밋해요',
      '다리를 누르면 쑥 들어갔다 천천히 올라와요',
    ],
    caution: {
      lead: '잠깐 붓는 건 괜찮지만 ',
      emphasis: '저녁마다 반복되는 부종',
      tail: '은 정맥이 제 역할을 못하고 있다는 증거입니다.',
    },
  },
  {
    id: 'bulging-veins',
    label: '혈관 돌출',
    image: '/vascular/venous/varicose/symptoms/bulging-veins.png',
    imageAlt: '종아리 피부 위로 정맥이 돌출된 모습',
    symptoms: [
      '파란 핏줄이 구불구불 튀어나왔어요',
      '실핏줄이 거미줄처럼 퍼져 있어요',
      '지렁이처럼 울퉁불퉁한 혈관',
      '예전엔 없던 혈관이 점점 도드라져요',
      '반바지 입을 때 다리가 신경 쓰여요',
    ],
    caution: {
      lead: '겉으로 드러난 혈관은 ',
      emphasis: '이미 역류가 진행됐다는 뜻',
      tail: '으로, 저절로 사라지지 않습니다.',
    },
  },
  {
    id: 'numbness-pain',
    label: '저림·통증',
    image: '/vascular/venous/varicose/symptoms/numbness-pain.png',
    imageAlt: '종아리를 잡고 저림과 통증을 느끼는 모습',
    symptoms: [
      '자다가 다리에 쥐가 나서 깨요',
      '새벽마다 종아리가 뭉치고 당겨요',
      '다리가 찌릿찌릿 저려요',
      '오래 앉아 있으면 다리 감각이 둔하고 저려요',
      '다리가 화끈거리고 욱신거려요',
    ],
    caution: {
      lead: '특히 밤에 쥐가 나고 저린 증상은 ',
      emphasis: '고인 혈액이 신경과 근육을 자극',
      tail: '하고 있다는 신호입니다.',
    },
  },
  {
    id: 'skin-discoloration',
    label: '피부 변색',
    image: '/vascular/venous/varicose/symptoms/skin-discoloration.png',
    imageAlt: '발목과 종아리 피부가 갈색으로 변색된 모습',
    symptoms: [
      '발목 주변이 거뭇하게 변했어요',
      '정강이 아래가 갈색으로 착색됐어요',
      '피부가 가렵고 자꾸 건조하게 일어나요',
      '피부가 딱딱하고 가죽처럼 두꺼워졌어요',
    ],
    caution: {
      lead: '피부가 어둡게 변하거나 딱딱해지는 것은 정맥질환이 상당히 진행돼 ',
      emphasis: '피부·조직까지 영향',
      tail: '을 주고 있다는 신호입니다.',
    },
  },
];
