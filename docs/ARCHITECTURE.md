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


## 신규 진료 영역: 혈관중점진료 / 종합진료 (2026-11-10)

- `src/app/_data/site/navigation.ts`: 각 깊이별 공개 여부를 `isPublished`로 관리.
- 신규 라우트: `src/app/(site)/vascular`, `src/app/(site)/general` 하위 53개 빈 `page.tsx`.
- 기본 비공개로 시작하며 최하위 메뉴의 `isPublished`만 확인하고 부모는 자손 공개 상태로 계산합니다.
- 본문 UI는 현재 구현하지 않습니다. 추가 시 기존 `_ui`/`_components`/`_data`/_types 규칙을 따릅니다.
- 작업 순서는 `docs/ROADMAP.md`, URL/메뉴 목록은 `docs/NAVIGATION-CLINICS.md`를 참조합니다.
- 2026-11-10 결정: 신규 프론트 UI를 먼저 차례로 완성한 후 Supabase, Azure, 관리자 기능으로 전환합니다. 사용자 요청 없이 출시 순서를 변경하지 않습니다.

## 내비게이션 단일 데이터 원칙 (2026-11-10)

- 사이트 전체 GNB·LNB·Breadcrumb 1~3차 메뉴는 `src/app/_data/site/navigation.ts`의 `NAVIGATION` 배열 하나에서 정의합니다.
- 노드 공통 타입은 `src/app/_types/site/navigation.ts`의 `NavigationItem` 하나만 사용합니다.
- 진료 영역별 별도 `vascularNavigation`·`generalNavigation` 상수 또는 별도의 navigation.ts를 만들지 않습니다.
- `isPublished`와 부모의 공개 상태를 활용하는 기존 필터·직접 URL 접근 제어는 유지합니다.
- 새 메뉴를 추가할 때는 `NAVIGATION`에 직접 추가하고, `docs/NAVIGATION-CLINICS.md` 등 해당 메뉴 문서를 갱신합니다.

## 부모 메뉴 클릭 URL 규칙 (2026-11-10)

- 모든 사이트 NAVIGATION 데이터는 `src/app/_data/site/navigation.ts` 한 파일에서 관리합니다.
- PC GNB/LNB, 모바일 내비게이션, Breadcrumb 드롭다운에서 부모 메뉴 링크를 만들 때는 `getNavigationHref(item)`을 사용합니다.
- `getNavigationHref()`는 공개된 트리에서 첫 번째 공개 자식을 재귀적으로 선택합니다. 자식이 없으면 자신의 `href`를 사용합니다.
- 원본 `NAVIGATION[].href`는 덮어쓰지 않습니다. 메뉴 계층 인식·현재 경로 판별은 기존 로직을 유지합니다.
- 모바일 1차 메뉴의 `<summary>`는 펼침/접힘 기능을 유지합니다. 모바일 2차·3차 `<Link>`부터 이동 규칙이 적용됩니다.
- 이 규칙은 **클릭 시 이동 URL**에 관한 것이며, 브라우저 주소창에 부모 URL을 직접 입력한 경우의 서버 리다이렉트는 별도로 다룹니다.

## 내비게이션 공개 규칙: 최하위 페이지만 설정 (2026-11-10 확정)

- 전체 메뉴 트리는 `src/app/_data/site/navigation.ts`의 `NAVIGATION` 한 곳에서 관리합니다.
- `children`이 없는 진료 2·3차처럼 독립 콘텐츠가 있는 메뉴에는 `isPublished: true | false`를 지정합니다.
- 부모는 한 개 이상의 공개된 자손(손자 포함)이 있을 때 자동 노출됩니다. 공개된 자손이 없으면 숨깁니다.
- GNB, 모바일 LNB, Breadcrumb의 옵션은 `getPrimaryNavigation()`으로 공개된 트리만 사용합니다.
- 링크는 해당 메뉴 자체의 공개 페이지가 있으면 해당 href, 없으면 첫 공개 하위 페이지를 선택합니다.
- 신규 진료 페이지의 직접 URL 접근 검사는 `isPublishedNavigationPath()`를 사용합니다. 비공개 최하위 페이지는 404입니다.
- 향후 Supabase 관리자에서도 독립 콘텐츠가 있는 각 페이지의 공개 상태를 수정합니다.
- 이전 문서의 '부모까지 isPublished 지정', '상위가 false이면 자식도 숨김' 설명은 이 규칙으로 대체합니다.

## 2차 진료 루트 페이지 및 메뉴 공개 규칙 (2026-11-10)

- `src/app/_data/site/navigation.ts`에 전체 메뉴를 유지하며 데이터를 별도 분리하지 않습니다.
- 1차 `vascular`, `general`은 별도 콘텐츠를 갖지 않으므로 `isPublished`를 두지 않습니다. 클릭 및 직접 접근 시 첫 공개된 하위 페이지로 이동합니다.
- 2차 진료 메뉴(`arterial`, `venous`, `special`, `dialysis`, `hyperbaric`, `gynecology`, `andrology`, `urinary`, `chronic`, `wellness`, `checkup`)에는 각각 독립된 `page.tsx` 루트 페이지가 있습니다. 자기 페이지의 `isPublished: true | false`를 반드시 지정합니다.
- 3차 진료 메뉴에도 자기 페이지의 `isPublished`를 지정합니다. 현재 신규 진료 페이지들은 초기 `false`입니다.
- 메뉴 노출 조건은 `자기 isPublished === true` 또는 `공개 자손 존재`입니다. 공개된 자손이 있다면 부모는 자동으로 노출됩니다.
- 링크는 `getNavigationHref`: 자기 페이지가 공개면 자기 href를 사용하고, 비공개/미지정이면 첫 공개 자손 href를 사용합니다.
- 직접 URL 접근은 `isPublishedNavigationPath`에서 **그 URL의 자기 페이지**가 `isPublished: true`인지 확인합니다. 단순히 공개 자손이 있다는 이유로 비공개 부모 콘텐츠 페이지를 허용하지 않습니다.
- `src/app/(site)/vascular/page.tsx`, `src/app/(site)/general/page.tsx`는 첫 공개 하위 URL로 리다이렉트합니다.
- 2차의 `false`와 3차의 `true`가 공존할 수 있습니다. 이때 2차 메뉴는 보이지만 2차 루트 페이지는 비공개이며 클릭 시 공개 3차로 이동합니다.
- 이전의 "최하위 메뉴에만 isPublished", "부모 클릭 시 무조건 최하위 페이지" 규칙은 이 규칙으로 대체합니다.

## 동맥질환 개요 기능별 폴더 배치 (2026-11-11)
- `src/app/_ui/vascular/arterial/overview.tsx`는 자가진단·질환 소개·진행 단계 섹션만 조립합니다.
- 복수 자식 컴포넌트가 있는 섹션은 `_ui/vascular/arterial/{self-diagnosis,diseases,progression}/` 하위에 `section.tsx`, `item.tsx`, `map.tsx`, `card.tsx`로 기능별 배치합니다. `SectionHeading`은 진료분야 공통 UI이므로 `src/app/_components/clinic/section-heading.tsx`에 둡니다.
- 관련 정적 데이터는 `_data/vascular/arterial/{self-diagnosis,diseases,progression}/`의 명시적인 파일에 둡니다.
- 사용 이미지의 공개 경로는 `public/vascular/arterial/<기능>/<의미 있는 파일명>`으로 관리합니다. 기존 `/temp/` 이미지는 다른 코드 보호를 위해 삭제하지 않습니다.
- 진행 단계 이미지는 현재 원본 파일이 한 장뿐이므로 `artery-stage-placeholder.png`를 4단계가 임시 공유합니다. 실제 단계별 이미지가 생기면 해당 데이터의 이미지 경로만 교체합니다.
- 향후 `/vascular/arterial`의 새 섹션도 이와 같은 원칙으로 추가합니다.

## 진료분야 공통 제목 및 동맥질환 전문성 이미지 (CHEONGMAC_CLINIC_SECTION_HEADING_MOVE_2026_11_12)

- `src/app/_components/clinic/section-heading.tsx`는 기존 `SectionHeading` 코드를 변경하지 않고 이동한 공통 제목입니다.
- `src/app/_components/clinic/split-heading.tsx`는 2열 레이아웃 전용 제목으로 별도 유지합니다.
- `src/app/_ui/vascular/arterial/expertise/{section,item}.tsx`는 기존 JSX/스타일을 유지합니다. 콘텐츠는 `src/app/_data/vascular/arterial/expertise/items.ts`에 둡니다.
- 전문성 섹션의 공개 이미지는 `public/vascular/arterial/expertise/`에 의미 있는 파일명으로 보관합니다. 이 섹션에서만 사용하던 `public/________temp/temp-1~3.png`는 이전 후 제거합니다.


## 동맥질환 초안 구조 점검 및 진료분야 배너 공통화 (2026-11-17)

- 진료분야의 여러 페이지에서 사용할 배너 UI는 `src/app/_components/clinic/banner.tsx`의 `ClinicBanner`에서 관리합니다. `VascularBanner`의 JSX/Tailwind/Props 동작은 그대로 보존하면서 컴포넌트의 위치와 이름만 일반화했습니다.
- 기존 혈관 진료 전용 배너 데이터는 `src/app/_data/vascular/banner/content.ts`, 동맥폐쇄증 배너 데이터는 `src/app/_data/vascular/arterial/occlusion-banner/content.ts`에 그대로 둡니다.
- 더 이상 참조되지 않는 예전 동맥폐쇄증 전용 배너 렌더러 `src/app/_ui/vascular/arterial/occlusion-banner/section.tsx`는 중복 구현이므로 제거합니다(원본 불일치 또는 사용처 발견 시 자동 삭제하지 않음).
- 동맥질환의 나머지 feature 폴더, 정적 데이터, 이미지 URL, JSX 및 Tailwind 클래스는 이 구조 패치에서 변경하지 않습니다.

## 진료분야 검사·진단 UI 재사용과 하지동맥폐색증 진단 분리 (2026-11-18 승인)

- 다른 진료 페이지에서도 사용할 검사 선택·정보·진단 카드 UI는 `src/app/_components/clinic/diagnostics/`에 배치합니다. 질환별 검사명·시간·기준·이미지는 해당 라우트의 `_data`에만 둡니다.
- 탭은 선택한 검사 하나의 콘텐츠만 표시하며, 키보드 탐색을 제공합니다. PC에서는 기존 sticky 배치를 유지합니다.
- 진단 기준 그리드는 1~3개 항목을 지원하되 PC에서는 항상 3컬럼을 유지합니다. ABI와 같은 고유 레이아웃은 라우트 전용 `_ui`에 둡니다.
- 하지동맥폐색증 검사 콘텐츠는 기존 `comparison/section.tsx`에서 `diagnostics/`로 이동하며, 증상 비교 ID `vascular-arterial-occlusion-comparison`은 유지합니다. 진단 ID는 `vascular-arterial-occlusion-diagnostics`, 검사별 ID는 이 접두사에 검사 키를 붙여 사용합니다.
- 승인된 이미지 16개만 `public/_____________temp`에서 `public/vascular/arterial/occlusion/diagnostics/`로 원본 바이트 그대로 이동하고 기존 이미지 경로를 변경합니다.
- 상세 페이지의 기존 의료 문구·수치·검사 시간은 검증 없이 바꾸지 않습니다.
- 변경 이유: 여러 진료 페이지에서 재사용 가능한 UI를 분리하고 중복 섹션 ID, 빈 진단 스캐폴드, 임시 이미지 경로를 해소합니다. 되돌릴 때는 배포 ZIP 적용 전 백업을 복원합니다.


## 하지동맥폐색증 후반부 섹션 역할·공개 이미지 정리 (2026-11-19 승인)

- `overview.tsx`는 기존 `cases`를 유지하고 `treatments`, `reservation-links`, `care-message`, `faq` 섹션 순서만 조립합니다.
- `procedures`는 시술 과정이 아닌 5개 치료법 선택 UI이므로 `treatments`로 통합했습니다. 선택 탭 상태·화면 구성은 해당 라우트의 `_ui`, 치료 정보는 `_data/.../treatments/methods.ts`에 분리합니다. 원본에 없는 추가 의료 정보는 임의로 만들지 않습니다.
- `resources`는 네이버 예약·톡톡 링크이므로 `reservation-links`로, `message`는 스크롤 색상 강조 메시지이므로 `care-message`로, `media`는 Q&A이므로 `faq`로 의미를 통일합니다. 섹션 ID와 컴포넌트도 변경된 이름을 따릅니다.
- 네이버 링크는 운영 URL 확정 전까지 승인된 `href="/"`를 유지합니다. FAQ의 5개 답변은 디자인 확인용 예시로 명시하고, 정적 영상 썸네일은 재생 기능 없이 유지합니다. DB 연동 시 해당 진료분야에 속한 Q&A만 조회합니다.
- `public/_______temp/`의 이미지 9개는 원본 바이트 그대로 `public/vascular/arterial/occlusion/{treatments,reservation-links,faq}/` 하위로 옮기고, 이전 임시 이미지 경로와 미사용 스캐폴드를 삭제합니다.
- 다른 페이지에서 실제 공유하지 않는 UI는 `_components`로 승격하지 않으며 기존 `cases` 구현은 변경하지 않습니다.


## 하지동맥폐색증 진료 강점 섹션 분리 (2026-11-19)

- 기존 `care-message`는 도입 메시지 외에 혈관 진료 강점 5개를 다루므로 `strengths`로 변경합니다. 섹션 ID는 `vascular-arterial-occlusion-strengths`로 통일하고 `overview.tsx`에서 호출명을 갱신합니다.
- `strengths/section.tsx`는 스크롤 제목·목록 조립만 담당합니다. `strengths/item.tsx`는 `visual.kind`로 배경 사진(`image`)과 장식 아이콘(`icon`)의 렌더링을 구분합니다. 정적 문구와 이미지 경로는 `_data/.../strengths`로, 두 파일에서 사용하는 데이터 타입은 `_types/.../strengths.ts`로 분리합니다.
- PC에서는 6컬럼 그리드에 아이템당 2컬럼을 사용해 1행 3개/2행 2개를 중앙 정렬합니다. 모바일은 기존 1열을 유지합니다.
- 제목 애니메이션의 스크롤 대상은 섹션 전체가 아닌 제목 래퍼로 한정하고, 시작·종료 오프셋을 정상 순서로 수정합니다. 아래 방향 스크롤에서 진행률이 되감기지 않고 강조가 완료된 상태를 유지합니다.
- `public/_______temp/temp-1~5.png`의 원본은 바이트 변경 없이 `public/vascular/arterial/occlusion/strengths/`로 이동하며 기존 임시 경로를 삭제합니다. 병원 관련 문구·수치는 원문을 유지합니다.


## 정맥질환 개요 페이지 및 진료분야 공유 UI (2026-11-19)

- 정맥질환 `/vascular/venous`는 `_ui/vascular/venous/overview.tsx`에서 8개 섹션만 순서대로 조립합니다. 각각 `vascular-venous-<feature>` ID를 갖습니다.
- 기존 하지동맥폐색증 진단 UI의 공통 `MethodSelector`를 정맥 치료 탭에도 재사용하고, 동맥질환의 BEST 치료사례·질환 카드·전문성 카드·의료진 프로필/액션·FAQ 레이아웃을 `_components/clinic/` 아래로 공유합니다. 콘텐츠는 각 라우트 `_data`에 둡니다.
- 정맥질환에서 두 명의 의료진은 모바일 1.2개 슬라이드로, PC에서는 전체가 보이도록 구성하며 기존 동맥질환의 1인 레이아웃을 보존합니다.
- 제공된 ZIP에는 정맥질환 임상 사진/해부학 도해/치료법 검수 콘텐츠가 없어, 기존 공개 가능한 범용 이미지와 명시적 시안용 문구를 사용합니다. 추후 실제 전용 에셋 및 의료진 검수 콘텐츠로 교체합니다.
- `/vascular/venous`의 `isPublished: false`는 **유지**합니다. 디자인 검토와 별개로 사이트 공개 결정이 필요합니다.
- 기존 동맥질환 카드 데이터·배너·의료진 상세 URL은 변경하지 않습니다. 되돌릴 때는 패치 적용 전 백업을 복원합니다.
