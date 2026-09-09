# 회원 활동 로그

로그인 완료 상태(`membershipStatus = ACTIVE`)의 회원만 자체 활동 로그를 남깁니다.

## 저장 구조

- `UserLoginLog`: Better Auth 인증 세션별 로그인 기록
- `UserActivitySession`: 한 브라우저 탭에서 이어지는 방문 묶음
- `UserPageView`: 페이지 방문과 실제 활동 시간
- `UserActivityEvent`: 의미 있는 기능 이용 이벤트

관리자 페이지는 `/admin/members/[id]`에서 회원별 기록을 확인합니다.

## 자동으로 기록하는 항목

- 로그인 세션
- 방문 페이지 경로
- 페이지 제목
- 이전/다음 페이지
- 페이지 진입/이탈 시각
- 화면이 실제로 보이는 동안의 활동 시간
- 내부 페이지 링크 이동
- 외부 링크 이동

`/admin`, `/api`, `/auth`, `/signin`, `/join`은 방문 분석에서 제외합니다.

## 활동 시간

15초 간격 heartbeat를 사용합니다.

브라우저 탭이 숨겨지면 시간을 더하지 않고, 다시 보이는 시점부터 계산합니다.
따라서 단순히 페이지를 열어둔 시간보다 실제 화면을 보고 있던 시간에 가깝습니다.

## 민감한 내용은 이벤트 로그에 넣지 않습니다

다음 값은 활동 로그 metadata로 보내지 않습니다.

- 의학상담 본문
- 고객의 소리 본문
- 폼에 입력한 이름/전화번호
- 검색어 원문
- 첨부파일 내용

행동 여부만 기록합니다.

예:
- `CONSULTATION_START`
- `CONSULTATION_SUBMIT`
- `SEARCH` + `{ resultCount: 4 }`

## 추후 특정 기능 이벤트 연결

Client Component에서 아래 함수를 사용합니다.

```tsx
import { trackActivityEvent } from '@/_lib/activity-client';

trackActivityEvent('FILTER_CHANGE', {
  filter: '환자 후기',
});

trackActivityEvent('SEARCH', {
  resultCount: 4,
});
```

검색어 자체는 넣지 않습니다.

## 로그인 횟수

`UserLoginLog.authSessionId`는 unique입니다.
동일한 Better Auth 세션에서 페이지를 여러 번 열어도 로그인 1회로 계산합니다.

이 기능 도입 전에 이미 삭제된 과거 인증 세션은 복원하지 않습니다.
