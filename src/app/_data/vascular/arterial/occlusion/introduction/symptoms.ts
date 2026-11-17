import type { OcclusionIntroductionSymptom } from '@/app/_types/vascular/arterial/occlusion/introduction';

// TODO(신규): 각 탭의 실제 이미지가 준비되면 임시 공통 이미지 경로를 교체하세요.
const TEMP_IMAGE = '/vascular/arterial/occlusion/introduction/intermittent-claudication.png';

export const occlusionIntroductionSymptoms: OcclusionIntroductionSymptom[] = [
  {
    id: 'claudication',
    label: '간헐적 파행',
    image: TEMP_IMAGE,
    imageAlt: '하지동맥폐색증 증상',
    symptoms: [
      '조금만 걸어도 종아리가 아파서 멈춰 서게 돼요',
      '쉬면 금방 괜찮아지는데, 다시 걸으면 또 아파요',
      '종아리·허벅지·엉덩이에 쥐가 나요',
      '운동할 때 다리가 쥐어짜는 듯 아프고 저려요',
    ],
    caution: {
      lead: '통증 없이 걸을 수 있는 거리가 점점 짧아진다면',
      emphasis: '혈관이 더 좁아지고 있다는 신호',
      tail: '입니다.',
    },
  },
  {
    id: 'coldness',
    label: '하지 냉감',
    image: TEMP_IMAGE, // TODO(신규): 하지 냉감 이미지로 교체
    imageAlt: '하지 냉감 이미지 (임시)',
    symptoms: [], // TODO(신규): 하지 냉감의 증상 문구 입력
    caution: null, // TODO(신규): 주의 문구 입력
  },
  {
    id: 'numbness',
    label: '저림·감각저하',
    image: TEMP_IMAGE, // TODO(신규): 감각저하 이미지로 교체
    imageAlt: '저림·감각저하 이미지 (임시)',
    symptoms: [], // TODO(신규): 감각저하의 증상 문구 입력
    caution: null, // TODO(신규): 주의 문구 입력
  },
  {
    id: 'discoloration',
    label: '피부 변색·괴사',
    image: TEMP_IMAGE, // TODO(신규): 피부 변색 관련 이미지로 교체
    imageAlt: '피부 변색·괴사 이미지 (임시)',
    symptoms: [], // TODO(신규): 피부 변색 관련 증상 문구 입력
    caution: null, // TODO(신규): 주의 문구 입력
  },
];
