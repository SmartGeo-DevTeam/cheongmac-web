import type { VenousTreatmentMethod } from '@/app/_types/vascular/venous/treatments';

/** 기획 자료의 5종 치료법·표시 순서·설명 문구를 그대로 유지합니다. */
export const venousTreatmentMethods: VenousTreatmentMethod[] = [
  {
    id: 'surgery',
    title: '수술적 치료',
    image: '/vascular/venous/treatments/surgical-treatment.png',
    description:
      '매우 굵거나 굴곡이 심한 정맥, 폐쇄술이 어려운 정맥, 합병증을 동반한 진행된 정맥류 대상',
    procedures: ['근본발거술(스트리핑)', '냉동발거술', '보행성 정맥절제술'],
  },
  {
    id: 'thermal',
    title: '비수술 열 치료',
    image: '/vascular/venous/treatments/thermal-ablation.png',
    description: '곧게 뻗은 줄기 정맥(복재정맥)에 역류가 있는 하지정맥류 대상',
    procedures: ['레이저 정맥폐쇄술', '고주파 정맥폐쇄술'],
  },
  {
    id: 'nonthermal',
    title: '비수술 비열 치료',
    image: '/vascular/venous/treatments/nonthermal-treatment.png',
    description:
      '신경이 가까워 열 사용이 조심스러운 부위의 하지정맥류, 실핏줄처럼 가는 혈관에 적용',
    procedures: ['베나실', '누베나', '클라리베인', '플레보그립', '혈관경화요법(주사)'],
  },
  {
    id: 'embolization',
    title: '색전술',
    image: '/vascular/venous/treatments/embolization.png',
    description: '골반 안쪽 정맥의 역류로 생기는 골반정맥류와 정계정맥류 대상',
    procedures: ['코일 색전술', '글루 색전술', '경화제 색전술'],
  },
  {
    id: 'thrombosis',
    title: '정맥 혈전증 치료',
    image: '/vascular/venous/treatments/venous-thrombosis-treatment.png',
    description: '정맥이 굳은 피(혈전)로 막힌 경우 약으로 녹이거나 시술로 제거',
    procedures: ['항응고제', '혈전용해제', '혈전제거술', '스텐트 삽입술'],
  },
];
