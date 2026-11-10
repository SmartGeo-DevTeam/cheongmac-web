# Architecture v1 적용 이력 / Migration Guide

- 날짜: 2026-11-09
- 기준 소스: 사용자가 제공한 `아카이브.zip`의 `src/`와 프로젝트 설정 (318개 실파일, 22개 macOS `.DS_Store` 메타데이터 제외).
- 원칙: **기존 JSX, Tailwind, 사용자에게 보이는 데이터 값, API/페이지 URL을 유지**하고 경로와 이름을 정리한다.
- 적용 상태: 아래 패치 스크립트가 성공하면 적용 완료. 아직 실행하지 않았다면 계획/예정.

## 1. 이번 1차 패치에 포함된 내용

- `src/app/_components`, `_ui`, `_data`, `_types`, `_lib`, `_assets`, `_providers` 배치
- 단일 `index.tsx`를 이름 있는 `kebab-case.tsx` 파일로 재배치
- 기본 export React 컴포넌트 함수명을 역할 중심 `PascalCase`로 변경
- `(site)`와 `(api)` Route Group으로 Next.js 라우트 이동, URL 경로 유지
- 기존 정적 `data.ts`의 `_data/` 이동. `NAVIGATION` 배열과 타입/조회 함수 분리
- `next/font/local`의 상대 폰트 경로 갱신
- 전체 import 경로 재계산; 원래 파일을 지우기 전에 SHA-256 검사 및 백업
- `public/`·루트 설정·`src/app/layout.tsx`의 화면 구조는 유지

## 2. 이번 패치에서 제외한 내용

- TSX 안에 직접 선언된 인라인 정적 배열 전체 추출 및 타입 선언 68개 일괄 이전 (후속 2차 작업)
- 미사용 구형 홈/메인 컴포넌트 삭제: 임의 삭제하지 않고 `_ui/home/legacy/`로 이동 보존
- DB 연결·API 응답 구조 변경·화면 스타일 변경·기존 public 에셋 URL 변경
- `src/app/layout.tsx`에서 `(site)/layout.tsx`로 Header/Footer 책임 이동 (별도 결정)
- Next.js 빌드 및 브라우저 실제 출력의 완전 검증: 첨부 ZIP에 `node_modules`, `public`, `tsconfig.json`이 없어 원본 런타임과 같은 환경 구축 불가

## 3. 검증 내역

- 원본 318개 실파일 모두 기록, 사라진 비승인 코드는 없음
- 새 경로의 TS/TSX 문법 파싱, 기존 내부 import 해석, 내부 named/default export 검사
- `(site)` 페이지 라우트 33개, 중복 URL 없음
- `.next/types/routes.d.ts`는 Next.js가 생성하는 파일이므로 정적 파일 검사에서 예외
- 실제 Next.js lint/build와 브라우저 출력은 사용자 프로젝트에 패치 적용 후 실행 필요

## 4. 적용과 백업

```bash
bash ~/Downloads/apply-cheongmac-architecture-v1.sh \
  ~/Downloads/cheongmac-architecture-v1-patch.zip \
  /Users/ungveloper/Desktop/UNG/cheongmac-web
```

패치 스크립트는 기존 코드의 SHA-256이 ZIP 기준과 일치하는지 **먼저 검증**한다. 다르면 덮어쓰지 않고 중지하므로 사용 중인 최신 변경사항을 보호한다. 변경 전 파일은 프로젝트 상위 디렉터리의 `.cheongmac-backups/` 아래에 ZIP으로 백업한다. 실패하거나 결과가 마음에 들지 않으면 백업 ZIP과 함께 롤백 가능하다.

패치 직후: `npm run dev`, `npx tsc --noEmit`, `npm run lint`, `npm run build` 중 환경에 맞게 확인한다. 이미 실행 중인 개발 서버가 있다면 한 번 재시작해 라우트 재인식을 확인한다.

## 5. 새 규칙 변경 시

`docs/ARCHITECTURE.md`의 결정 기록에 날짜·사유·영향 파일을 추가한다. UI 변경, API 변경, 미사용 파일 삭제는 별도 승인 뒤 추진한다.

상세 파일별 위치는 `docs/MIGRATION-MAP.csv`에서 확인한다.
