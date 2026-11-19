import type { OcclusionStrength } from '@/app/_types/vascular/arterial/occlusion/strengths';

/** 현재 페이지에 있는 다섯 강점의 원문·수치를 그대로 유지합니다. */
export const occlusionStrengthItems = [
  {
    id: 'vascular-care',
    titleLines: [{ text: '부산 유일' }, { text: '혈관 중점 진료 병원' }],
    description:
      '동맥·정맥부터 투석혈관까지, 부산에서 혈관질환만을 전문으로 진료하는 단 하나의 병원입니다.',
    visual: {
      kind: 'image',
      src: '/vascular/arterial/occlusion/strengths/vascular-care-team.png',
    },
    extraBottomPadding: true,
  },
  {
    id: 'experience',
    titleLines: [{ text: '170,000+', emphasis: true }, { text: '시간' }],
    description:
      '오직 혈관만 파고든 20년 이상 축적된 경험이 치료의 정확도를 높입니다.',
    visual: {
      kind: 'icon',
      src: '/vascular/arterial/occlusion/strengths/experience-icon.png',
    },
    descriptionNarrow: true,
  },
  {
    id: 'patent',
    titleLines: [{ text: '특허 치료법' }, { text: '자체 개발' }],
    description:
      '오직 혈관만 파고든 20년 이상 축적된 경험이 치료의 정확도를 높입니다.',
    visual: {
      kind: 'icon',
      src: '/vascular/arterial/occlusion/strengths/patent-icon.png',
    },
    descriptionNarrow: true,
    extraBottomPadding: true,
  },
  {
    id: 'expertise',
    titleLines: [{ text: '독보적인 전문성' }],
    description: '지속적인 연구와 학술 활동으로 혈관 치료의 기준을 이끕니다.',
    visual: {
      kind: 'icon',
      src: '/vascular/arterial/occlusion/strengths/expertise-icon.png',
    },
    descriptionNarrow: true,
    extraBottomPadding: true,
  },
  {
    id: 'operations',
    titleLines: [
      { text: '누적 혈관 수술' },
      { text: '50,738', emphasis: true, suffix: ' 례' },
    ],
    note: '(26.05.30 기준)',
    description: '타협 없는 정직한 판단으로 꼭 필요한 치료만 시행합니다.',
    visual: {
      kind: 'icon',
      src: '/vascular/arterial/occlusion/strengths/surgery-icon.png',
    },
    descriptionNarrow: true,
    extraBottomPadding: true,
  },
] as const satisfies readonly OcclusionStrength[];
