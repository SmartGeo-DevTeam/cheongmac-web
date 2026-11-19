import type { ClinicDiseaseCard } from '@/app/_types/clinic/disease-card';
/** 정맥질환 세부 페이지는 현재 비공개이므로, 게시 전 링크 유효성을 확인하세요. */
export const venousDiseaseCards: ClinicDiseaseCard[] = [
  { title: '하지정맥류', href: '/vascular/venous/varicose', image: '/vascular/venous/diseases/leg-vein-photo.webp', tags: ['#다리 무거움', '#혈관 돌출'] },
  { title: '골반정맥류', href: '/vascular/venous/pelvic', image: '/vascular/venous/diseases/consultation.png', tags: ['#골반 통증', '#정맥 순환'] },
  { title: '정계정맥류', href: '/vascular/venous/varicocele', image: '/vascular/venous/diseases/consultation.png', tags: ['#음낭 불편감', '#정맥 확장'] },
  { title: '심부정맥혈전증', href: '/vascular/venous/thrombosis', image: '/vascular/venous/diseases/leg-vein-photo.webp', tags: ['#다리 부종', '#통증'] },
];
