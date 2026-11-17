import type { OcclusionMechanismStage } from '@/app/_types/vascular/arterial/occlusion/mechanism';

/** 기존 4단계 문구를 변경 없이 분리한 정적 데이터입니다. */
export const occlusionMechanismStages: OcclusionMechanismStage[] = [
  {
    id: 'stage-1',
    label: '1단계',
    description: '혈관이 조금 좁아진 상태로 겉으로는 증상이 없음',
  },
  {
    id: 'stage-2',
    label: '2단계',
    description: '걸을 때 다리 통증이 있지만 잠깐 쉬면 사라짐',
  },
  {
    id: 'stage-3',
    label: '3단계',
    description: '쉬어도 통증이 지속되며 혈관이 많이 막힌 상태',
  },
  {
    id: 'stage-4',
    label: '4단계',
    description: '쉬어도 통증이 지속되며 혈관이 많이 막힌 상태',
  },
];
