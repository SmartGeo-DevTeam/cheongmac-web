/**
 * 로그인 권한을 확인하는 서버 전용 연결 지점입니다.
 * 현재 제공된 프로젝트 코드에는 검증 가능한 세션 모듈이 없으므로 기본 차단합니다.
 * 실제 인증 도입 시 서버에서 session 및 회원 권한을 검증한 결과로 교체하세요.
 * 브라우저 쿠키 존재 여부/클라이언트 상태만으로 권한을 부여하면 안 됩니다.
 */
export async function canViewProtectedCaseDetail(): Promise<boolean> {
  return false;
}
