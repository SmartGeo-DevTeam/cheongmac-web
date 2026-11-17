// 단계 2~4의 실제 이미지는 아직 제공되지 않아 한 장의 임시 이미지를 공통 사용합니다.
export type ArterialProgressionStepType = {
  stage: string;
  title: string;
  description: string;
  image: string;
};

export const arterialProgressionSteps: ArterialProgressionStepType[] = [
  {
    stage: '1단계',
    title: '정상동맥',
    description: '혈관이 깨끗하고 탄력있는 상태',
    image: '/vascular/arterial/progression/artery-stage-1.png',
  },
  {
    stage: '2단계',
    title: '지방 축적',
    description: '혈관 내벽에 콜레스테롤이 쌓이기 시작',
    image: '/vascular/arterial/progression/artery-stage-2.png',
  },
  {
    stage: '3단계',
    title: '협착',
    description: '혈관 내벽이 두꺼워지며 혈류 감소',
    image: '/vascular/arterial/progression/artery-stage-3.png',
  },
  {
    stage: '4단계',
    title: '폐쇄',
    description: '동맥경화로 인해 혈전 등 합병증 발병',
    image: '/vascular/arterial/progression/artery-stage-4.png',
  },
];
