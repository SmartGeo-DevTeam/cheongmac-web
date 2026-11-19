/** 시안용 치료법 소개. 실제 적응증·시간·치료 효과는 의료진 확인 후 등록합니다. */
export const venousTreatments = [
  { id: 'radiofrequency', label: '고주파 치료', title: '고주파 정맥폐쇄술', description: '정맥의 상태와 증상을 살펴 치료 방법을 결정합니다.', image: '/vascular/venous/treatments/consultation.png', details: ['환자의 정맥 초음파 결과 확인', '의료진 상담 후 적용 여부 결정'] },
  { id: 'laser', label: '레이저 치료', title: '레이저 정맥폐쇄술', description: '검사 결과에 따라 치료 계획을 검토합니다.', image: '/vascular/venous/treatments/consultation.png', details: ['환자의 증상과 정맥 위치 확인', '의료진 상담 후 치료 계획 결정'] },
  { id: 'sclerotherapy', label: '경화요법', title: '정맥 경화요법', description: '정맥의 위치와 환자 상태를 고려해 적절한 치료를 상담합니다.', image: '/vascular/venous/treatments/consultation.png', details: ['초음파 검사 결과 확인', '상담을 통해 치료 선택'] },
  { id: 'surgery', label: '수술적 치료', title: '정맥 수술', description: '필요한 경우 수술적 방법을 포함해 치료 계획을 논의합니다.', image: '/vascular/venous/treatments/consultation.png', details: ['정맥 질환의 범위 확인', '의료진 상담 후 치료 방식 결정'] },
] as const;
