/**
 * 서버에서 권한을 검증한 뒤에만 상세 페이지에서 읽어야 하는 데이터입니다.
 * 실제 DB 연결 시 비공개 의료정보와 치료 후 파일 URL은 인증된 서버 API에서만 조회하세요.
 * 현재 데이터는 시안용 가상 설명이며, 치료 후 사진 원본은 포함하지 않았습니다.
 */
export type ProtectedCaseDetail = {
  afterTreatment: string;
  /** 보호된 원본 사진은 공개 public/ 또는 클라이언트 번들에 두면 안 됩니다. */
  afterImageUrl?: string;
};

const afterOverrides: Record<string, ProtectedCaseDetail> = {
  'case-002': {
    afterTreatment:
      '시술 후 경과를 확인하고 일상생활 및 운동에 대한 안내를 진행한 예시입니다. 실제 치료 결과는 환자별로 다르며, 이 문장은 시안 검토를 위한 가상 내용입니다.',
  },
};

export function getProtectedCaseDetail(id: string): ProtectedCaseDetail {
  return (
    afterOverrides[id] ?? {
      afterTreatment: '치료 후 상태를 확인하고 지속적인 관찰과 관리를 안내한 예시입니다.',
    }
  );
}
