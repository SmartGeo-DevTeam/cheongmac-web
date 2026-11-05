/** 진료 분야 선택지. 추후 DB/에디터와 연동할 때 여기만 교체할 수 있습니다. */
export const reservationFields = [
  { value: 'varicose', label: '하지정맥류' },
  { value: 'pelvic-vein', label: '골반정맥류' },
  { value: 'varicocele', label: '정계정맥류' },
  { value: 'fibroids', label: '자궁근종' },
  { value: 'peripheral-artery', label: '하지동맥폐색증' },
  { value: 'dialysis-access', label: '투석혈관' },
  { value: 'diabetic-foot', label: '당뇨발' },
  { value: 'dvt', label: '심부정맥혈전증' },
  { value: 'other', label: '기타' },
] as const;

/** 예약 입력 데이터 모델. 실제 접수 API 개발 시 요청/응답 타입의 기반으로 사용하세요. */
export type ReservationRequest = {
  name: string;
  phone: string;
  birthDate: string;
  field: (typeof reservationFields)[number]['value'];
  memo: string;
  privacyAgreed: boolean;
};
