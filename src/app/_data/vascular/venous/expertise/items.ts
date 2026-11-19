import type { ClinicExpertiseItem } from '@/app/_types/clinic/expertise';
/** 기관 공통 소개 문구를 이용한 디자인 데이터. 정맥질환만의 성과 수치로 오인되지 않도록 작성했습니다. */
export const venousExpertiseItems: ClinicExpertiseItem[] = [
 { id: 'clinical-care', title: '혈관 진료에 집중하는 의료진', description: '환자의 혈관 상태와 증상을 함께 살피며 진료 계획을 수립합니다.', image: '/vascular/venous/expertise/vascular-consultation.png' },
 { id: 'research', title: '지속적인 학술 활동', description: '혈관 질환에 관한 연구와 학술 활동을 바탕으로 진료에 힘쓰고 있습니다.', image: '/vascular/venous/expertise/vascular-research-award.png' },
];
