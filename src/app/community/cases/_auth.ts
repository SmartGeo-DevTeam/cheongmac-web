/**
 * 치료사례 로그인 보호 UI용 임시 인증 상태입니다.
 *
 * 현재 프로젝트에는 실제 로그인 세션을 읽는 공용 auth API/hook이 연결되어 있지
 * 않아 기본값을 로그아웃(false)으로 둡니다.
 *
 * 로그인 기능이 연결되면 이 값을 직접 쓰는 대신 실제 session/auth 상태를
 * TreatmentCaseList / TreatmentCaseDetail에 주입하면 됩니다.
 */
export const TREATMENT_CASE_IS_AUTHENTICATED = false;
