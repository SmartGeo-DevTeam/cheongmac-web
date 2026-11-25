import type { OcclusionIntroductionSymptom } from '@/app/_types/vascular/arterial/occlusion/introduction';

export const occlusionIntroductionSymptoms: OcclusionIntroductionSymptom[] = [
  {
    id: 'claudication',
    label: '간헐적 파행',
    image:
      '/vascular/arterial/occlusion/introduction/intermittent-claudication.png',
    imageAlt: '종아리를 손으로 짚고 있는 모습',
    symptoms: [
      '조금만 걸어도 다리가 아파서 멈추게 돼요',
      '잠깐 쉬면 금방 괜찮아져요',
      '다시 걸으면 또다시 아파요',
      '종아리·허벅지·엉덩이에 쥐가 나요',
      '운동할 때 다리가 쥐어짜는 듯 아프고 저려요',
    ],
    caution: {
      lead: '통증 없이 걸을 수 있는 거리가 점점 짧아진다면 ',
      emphasis: '혈관이 더 좁아지고 있다는 신호',
      tail: '입니다.',
    },
  },
  {
    id: 'coldness',
    label: '하지 냉감',
    image: '/vascular/arterial/occlusion/introduction/coldness.png',
    imageAlt: '발등을 손으로 감싸고 있는 모습',
    symptoms: [
      '여름에도 발이 얼음장처럼 차가워요',
      '발과 발가락이 차갑고 창백해요',
      '양말을 신어도 발이 잘 안 따뜻해져요',
      '반대쪽 발과 비교했을 때 온도 차이가 뚜렷해요',
    ],
    caution: {
      lead: '계절과 관계없이 지속되는 냉감이라면 ',
      emphasis: '혈류 문제일 가능성이 높습니다.',
      tail: '',
    },
  },
  {
    id: 'numbness',
    label: '저림·감각저하',
    image: '/vascular/arterial/occlusion/introduction/numbness.png',
    imageAlt: '발가락을 손으로 만지고 있는 모습',
    symptoms: [
      '발가락 끝이 저려요',
      '발바닥에 뭐가 붙어 있는 느낌이 들어요',
      '발/다리 감각이 둔해요',
      '뜨거운 물에 발을 담가도 잘 못 느끼겠어요',
      '밤에 누우면 저림이 더 심해져서 잠을 설쳐요',
    ],
    caution: {
      lead: '혈관성 감각 저하는 ',
      emphasis: '자세를 바꾼다고 해서 증상이 전혀 호전되지 않습니다.',
      tail: '',
    },
  },
  {
    id: 'discoloration',
    label: '피부 변색·괴사',
    image:
      '/vascular/arterial/occlusion/introduction/skin-discoloration-necrosis.png',
    imageAlt: '검게 변색된 발가락 모습',
    symptoms: [
      '발가락 끝이 창백해요',
      '발의 상처가 몇 주가 지나도 전혀 아물지 않아요',
      '다리털이 없어지고 피부가 얇아졌어요',
      '발의 피부가 검푸르게 변했어요',
      '발톱이 두꺼워지고 잘 자라지 않아요',
    ],
    caution: {
      lead: '절단을 초래하는 가장 심각한 징후로, ',
      emphasis: '신속히 막힌 혈관을 뚫는 재개통 치료가 권장됩니다.',
      tail: '',
    },
  },
];
