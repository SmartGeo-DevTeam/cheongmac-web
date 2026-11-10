# CHEONGMAC 아키텍처 (Architecture v1)

> 기준일 2026-11-09 · 상태: **1차 구조 확정** · 앞으로 변경 가능하며 변경 시 결정 이유를 기록합니다.
>
> 구조의 첫 적용은 `docs/MIGRATION-ARCHITECTURE-V1.md`를 참고하십시오. **이번 패치는 JSX 구조·Tailwind 스타일·기능·API URL을 변경하지 않는 경로/명칭 중심 이동**입니다.

## 1. 루트 구조

```text
cheongmac-web/
├── AGENTS.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CHATGPT_PROJECT_INSTRUCTIONS.md
│   └── MIGRATION-ARCHITECTURE-V1.md
├── public/                                # 기존 공개 자산/URL 유지
├── src/
│   └── app/
│       ├── _components/                   # 실제 재사용 UI
│       ├── _ui/                           # 개별 페이지 전용 UI
│       ├── _data/                         # 정적 데이터
│       ├── _types/                        # 공유 타입
│       ├── _lib/                          # 비UI 기능 로직
│       ├── _assets/                       # import형 폰트/이미지/아이콘
│       ├── _providers/                    # React Provider
│       ├── (site)/                        # 페이지 라우트, URL에 미포함
│       │   ├── page.tsx                   # /
│       │   ├── about/
│       │   ├── academics/
│       │   ├── community/
│       │   └── guide/
│       ├── (api)/
│       │   └── api/                       # /api/* URL 유지
│       ├── layout.tsx                     # 공통 root layout 유지
│       ├── globals.css
│       └── favicon.ico
├── package.json
└── next.config.ts
```

## 2. 파일 배치 의사결정

| 질문 | 배치 |
| --- | --- |
| 서로 다른 라우트 또는 전역 레이아웃에서 동일한 UI를 실제로 재사용하는가? | `_components/<기능>/name.tsx` |
| 특정 페이지에서만 사용되는 섹션·목록·카드인가? | `_ui/<라우트>/name.tsx` |
| 정적 목록, 문구, 샘플 레코드, 탭 항목인가? | `_data/<라우트>/meaningful-name.ts` |
| 여러 파일이 참조하는 공통 도메인 타입인가? | `_types/<도메인>/name.ts` |
| 특정 컴포넌트 Props 타입뿐인가? | 컴포넌트 파일 내부 |
| 조회·검증·파싱·서버 비밀키 등 비UI 로직인가? | `_lib/<기능>/name.ts` |
| `import`하는 로컬 폰트/이미지인가? | `_assets/fonts` 또는 `_assets/images` |
| `/partner/foo.png` 같은 URL로 접근하는 자원인가? | `public/` 유지 |
| 페이지/레이아웃/라우트 핸들러인가? | `(site)`의 `page.tsx` / `(api)/api`의 `route.ts` |

## 3. 이름과 폴더 규칙

- **컴포넌트 단일 파일은 `kebab-case.tsx`**; 불필요한 `index.tsx` 하위 폴더를 만들지 않음.
- export React 컴포넌트는 `PascalCase`; 경로로 기능이 식별되면 접두어는 필요할 때만 사용.
- 불분명한 `off.tsx`·`card-item.tsx`·`payment.tsx`는 목적에 맞는 `clinic-closures.tsx`·`reason-card.tsx`·`expense-claim.tsx`를 선호.
- `_`는 `src/app/_components`, `_ui`, `_data`, `_types`, `_lib`, `_assets`, `_providers`처럼 **최상위 내부 영역에만** 붙인다.
- 하위 디렉터리는 기존 라우트 구성을 따르며 `_guide`, `_veterans`처럼 접두어를 반복하지 않는다.
- 실제 라우트 그룹은 `(site)`·`(api)`만 사용한다. 추가 그룹은 요구사항이 생겼을 때 검토한다.
- 실제 URL이 생성되는 경로에 `_`를 붙이지 않는다. `[slug]`·`[id]` 같은 동적 세그먼트는 유지한다.

## 4. 예시: 보훈위탁병원

```text
src/app/
├── _components/common/
│   ├── inner.tsx
│   └── section-block.tsx
├── _ui/guide/veterans/
│   ├── overview.tsx
│   ├── eligibility.tsx
│   ├── procedure.tsx
│   ├── expense-claim.tsx
│   └── section-description.tsx
├── _data/guide/veterans/
│   ├── eligibility.ts
│   ├── procedure.ts
│   └── expense-claim.ts
└── (site)/guide/veterans/
    ├── page.tsx
    └── layout.tsx
```

입원 절차와 보훈 진료 절차처럼 UI 구조가 다른 컴포넌트는 별도로 유지한다. 단일 페이지에 여러 번 쓰더라도 `_ui`에 둔다.

## 5. 의존 방향 및 실행 환경

```text
(site)/page.tsx  →  _ui  →  _components
       │               └── _lib, _types
       └── _data  ─────────► _types
(api)/api/*/route.ts → _lib(server), _types
```

- 페이지 경계를 넘는 `_ui` import는 금지하고 실제 재사용이 확인되면 `_components`로 승격한다.
- `_components`는 특정 `_ui`나 페이지 데이터에 결합하지 않는다. 필요한 값은 Props로 넘긴다.
- `_lib`은 비UI 로직이며 서버/클라이언트 실행 경계를 따진다. 서버 전용 코드는 `server-only` 등으로 보호한다.
- `_types`는 가급적 런타임 코드에 의존하지 않게 한다. 타입 추론을 위한 값 의존이 필요하다면 분리 시 검증한다.
- 기존 Client Component의 `'use client'`를 임의 제거하지 않는다. API route는 서버 라우트로 유지한다.
- `src/app/layout.tsx`의 Header/Footer 등은 이번에 **그대로 유지**한다. 나중에 `(site)/layout.tsx`로 이전할 수 있으나 별도 작업으로 진행한다.

## 6. 데이터와 향후 DB 연동

현재는 `_data`의 정적 데이터를 사용한다. DB 도입 시 서버 데이터 조회 계층을 `_lib/server` 등에 도입하고 `page.tsx` 또는 서버 함수에서 조회하여 UI에 Props로 전달한다.

- 기존 `data.ts`는 의미 있는 파일명으로 `_data`에 이동했다.
- `NAVIGATION`과 `NavigationItem`은 각각 `_data/site/navigation.ts`, `_types/site/navigation.ts`로 분리했다.
- **남은 작업:** TSX 내부에 직접 들어간 `doctors`, `notices` 등의 인라인 배열·텍스트 추출, `_data` 파일 안의 혼합 타입/헬퍼 분리. 동작 변경을 피하기 위해 이번 1차 이동에서 제외했다.
- 데이터 값, DB 스키마, API URL, 이미지 public URL은 구조 변경만으로 수정하지 않는다.
- 정적 UI 탭 정의는 DB 도입 후에도 남을 수 있으므로 `_data` 폴더 전체 삭제를 전제하지 않는다.

## 7. 변경 검증 규칙

실제 코드 작업 시 다음을 확인한다: (1) 경로와 import/export (2) 새 파일명 및 선언명 (3) API/페이지 URL 중복 (4) 자산 상대 경로·폰트 (5) TS 구문과 타입 (6) 가능할 때 lint/build (7) 원본과 UI·문구·스타일·동작 비교. 수행하지 않은 테스트는 성공으로 보고하지 않는다.

## 8. 결정 기록 (Architecture Decision Log)

| 일자 | 결정 | 상태 |
| --- | --- | --- |
| 2026-11-09 | `_components`는 페이지 간 실제 재사용 UI만, `_ui`는 페이지 전용 UI | 확정 |
| 2026-11-09 | `_data`는 정적 콘텐츠, `_types`는 공유 타입, `_lib`은 비UI 로직 | 확정 |
| 2026-11-09 | 내부 구현 영역 모두 `src/app`으로 통일, `public/`은 기존 루트 및 URL 유지 | 확정 |
| 2026-11-09 | 최상위 내부 폴더에만 `_` 사용, 하위는 라우트/기능 이름 | 확정 |
| 2026-11-09 | 단일 컴포넌트 `kebab-case.tsx`, 컴포넌트 선언 `PascalCase`, 의미 기반 파일명 | 확정 |
| 2026-11-09 | 라우트 그룹은 `(site)`와 `(api)`만 추가, URL은 그대로 유지 | 확정 |
| 2026-11-09 | 1차 패치는 경로·import·선언명 중심, 인라인 데이터 정리/미사용 삭제는 후속 | 확정 |
| 2026-11-10 | 모든 `page.tsx`를 화면 조립 중심으로 유지하고 인라인 JSX는 `_ui`로 전체 이동. 별도 하위 컴포넌트 분리나 스타일 변경 금지 | 확정 |

### 향후 결정의 변경 방법

변경이 필요하면 기존 결정을 지우지 말고 **새 날짜·사유·영향 범위·되돌리는 방법**을 이 표 또는 별도 ADR에 기록한다. ChatGPT는 새 구현을 시작하기 전에 이 문서를 읽는다.

## 9. `page.tsx` 화면 조립 규칙 (2026-11-10 추가)

- `src/app/(site)/**/page.tsx`는 페이지의 **화면 조립**, 라우트 파라미터·유효성 검사, Next.js 전용 메타데이터·정적 파라미터 내보내기에 집중한다.
- `<section>`, `<table>`, `<ul>`, 검색·폼 상태·이벤트·Swiper 등 실질적인 페이지 UI가 `page.tsx`에 직접 들어 있다면, JSX와 기존 로직을 **변경 없이 통째로** `src/app/_ui/<동일 라우트>/<의미 있는 이름>.tsx` 파일로 옮긴다. `page.tsx`에서는 이 UI 컴포넌트를 import하여 호출한다. 하나의 UI를 더 작은 여러 컴포넌트로 나누는 작업은 별도 승인 대상이다.
- 기존 `page.tsx`가 여러 섹션 UI를 직접 호출하는 정상적인 조립 형태이면 그대로 둔다. 정리만을 위해 추가 래퍼 컴포넌트를 만들지 않는다.
- 다른 라우트의 `page.tsx`를 import하지 않는다. 동일한 화면이 필요한 경우 `_ui` 컴포넌트를 직접 사용한다.
- Server Component / Client Component 경계를 지킨다. 기존 `use client` 지시문과 hook들은 실제 `_ui` 모듈에 함께 옮긴다. `metadata`, `generateMetadata`, `generateStaticParams`는 라우트 파일에 남긴다.
- 서버 데이터 조회 및 `searchParams` 처리의 소유권 재설계는 향후 DB 작업에서 검토한다. 이번 이동은 동작 동일성을 우선한다.

### 이 규칙 적용: 2026-11-10

아래 10개 페이지에서 기존 JSX와 비즈니스 로직을 각 1개 전용 UI 파일로 이동했다.

| 기존 페이지 | 전용 UI 이동 경로 |
|---|---|
| `src/app/(site)/about/equipment/page.tsx` | `src/app/_ui/about/equipment/equipment-overview.tsx` |
| `src/app/(site)/about/tour/facilities/page.tsx` | `src/app/_ui/about/tour/facilities/facility-directory.tsx` |
| `src/app/(site)/about/tour/floors/page.tsx` | `src/app/_ui/about/tour/floors/floor-guide.tsx` |
| `src/app/(site)/community/cases/page.tsx` | `src/app/_ui/community/cases/cases-overview.tsx` |
| `src/app/(site)/community/consultation/page.tsx` | `src/app/_ui/community/consultation/consultation-overview.tsx` |
| `src/app/(site)/community/consultation/write/page.tsx` | `src/app/_ui/community/consultation/write/consultation-write-content.tsx` |
| `src/app/(site)/community/feedback/page.tsx` | `src/app/_ui/community/feedback/feedback-overview.tsx` |
| `src/app/(site)/community/feedback/write/page.tsx` | `src/app/_ui/community/feedback/write/feedback-write-content.tsx` |
| `src/app/(site)/community/news/page.tsx` | `src/app/_ui/community/news/news-board.tsx` |
| `src/app/(site)/guide/outpatient/page.tsx` | `src/app/_ui/guide/outpatient/outpatient-content.tsx` |

또한 `/about/tour`, `/about/introduction`의 루트 페이지가 자식 라우트 `page.tsx`를 import하지 않도록 정리했다. 전체 33개 페이지를 점검했고, 이미 UI 컴포넌트를 조립하는 페이지는 유지했다.
