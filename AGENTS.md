# CHEONGMAC AI 개발 지침 (Architecture v1)

> 새 파일 추가·컴포넌트 분리·네이밍·파일 이동을 시작하기 전에 `docs/ARCHITECTURE.md`를 먼저 읽습니다. 실제 파일과 import 관계를 확인하고, **이 문서가 현재 저장소 상태보다 오래되었다면 실제 파일을 우선**합니다.
>
> 이 지침은 사용자가 승인한 2026-11-09 1차 아키텍처를 설명합니다. 기존 UI 스타일·데이터 값·기능을 임의로 변경하지 않습니다.

## 반드시 준수할 규칙

1. **내부 구현은 모두 `src/app` 아래**의 `_components`, `_ui`, `_data`, `_types`, `_lib`, `_assets`, `_providers` 중 목적에 맞는 곳에 둡니다.
2. **URL을 만드는 페이지는 `src/app/(site)/`**, **API 라우트는 `src/app/(api)/api/`**에 둡니다. `(site)`·`(api)`는 URL에 포함되지 않습니다. `src/app/layout.tsx`, `globals.css`, `favicon.ico` 등 기존 루트 전역 파일은 유지합니다.
3. `_components`: **서로 다른 페이지 또는 전역 레이아웃에서 실제 공유하는 UI**만 둡니다. 같은 페이지 안에서 3번 사용한다는 이유만으로 승격하지 않습니다. `variant`가 복잡해지면 공통화하지 않습니다.
4. `_ui`: 개별 라우트 전용 섹션·카드·목록·보조 UI. **기존 라우트 경로를 따라갑니다**. 예: `_ui/guide/veterans/eligibility.tsx`. 다른 라우트 `_ui`를 직접 import하지 않습니다.
5. `_data`: 정적 콘텐츠·탭 정의·샘플 레코드 등 데이터. 기존 파일의 데이터 값을 유지합니다. UI 상태·이벤트·Tailwind 클래스는 데이터로 추출하지 않습니다. 새 UI에서는 데이터 조회를 페이지에서 수행하고 Props로 전달하는 방식을 우선 고려합니다.
6. `_types`: 서로 다른 파일이 공유하는 타입. **단일 컴포넌트 Props 타입은 컴포넌트 근처에서 정의**합니다. 정적 값에서 타입을 추론하고 있다면 이동 시 순환 참조 위험을 먼저 검사합니다.
7. `_lib`: UI가 아닌 기능별 유틸·검증·조회/서비스. 서버 비밀키 접근 로직을 Client Component에서 import하지 않습니다. 서버 전용 로직은 `server-only` 경계를 유지합니다.
8. `_assets`: `import`형 이미지·폰트·아이콘. `public/`은 루트에 그대로 유지하며 **기존 공개 URL은 변경하지 않습니다**. 폰트 선언 파일을 이동하면 상대 경로를 검증합니다.
9. `_providers`: 앱 전역 React Context/Provider; 클라이언트 경계를 확인합니다.
10. **최상위 내부 구현 폴더에만 `_` 접두사**. 하위는 `about`, `guide`, `veterans` 등 라우트/기능 이름 그대로. Route Group은 `(site)`, `(api)` 둘만 사용합니다(새 그룹은 별도 승인).
11. 단일 컴포넌트는 `index.tsx` 전용 폴더를 만들지 않고 **`kebab-case.tsx`**, export되는 컴포넌트 함수명은 **`PascalCase`**. 파일명이 구현 목적을 설명하도록 `clinic-closures`, `expense-claim`, `reason-card`처럼 의미를 분명히 합니다.
12. **라우트 `page.tsx`는 화면 조립과 라우트 책임에 집중합니다.** 페이지 전용 `<section>`, 목록 마크업, 이벤트·상태·Swiper 구현이 직접 들어 있다면 JSX 전체를 `_ui/<같은 라우트>/<의미 있는 이름>.tsx` 한 파일로 옮기고 `page.tsx`에서는 호출만 합니다. 이 과정에서 기존 UI를 더 작은 컴포넌트로 억지 분해하지 않습니다. `metadata`, `generateMetadata`, `generateStaticParams`, 경로 유효성 판단처럼 Next.js 라우트 전용 기능은 `page.tsx`에 유지하고, `use client`는 실제 UI 컴포넌트에 남깁니다. 이미 `page.tsx`가 UI 호출만 하고 있다면 불필요한 래퍼를 새로 만들지 않습니다.
13. 파일을 이동할 때 기존 JSX, Tailwind class, API 동작, 정적 데이터 값, URL을 바꾸지 않습니다. 미사용 파일 삭제·데이터 값 수정·함수 리팩토링은 **추가 승인** 후 수행합니다.

## import 방향 (권장)

- `(site)/page.tsx` → `_ui`, `_components`, `_data`, `_lib`, `_types`
- `_ui` → `_components`, `_data`(필요 시), `_lib`, `_types`
- `_components` → `_lib`, `_types` (특정 페이지 `_ui`에 의존하지 않음)
- `_data` → `_types`; 데이터 조회·변환 로직은 `_lib`
- `_types` → 가급적 타입만; 런타임 컴포넌트·정적 레코드에 의존하지 않음
- `(api)/api/.../route.ts` → 서버 전용 `_lib`, `_types`

## ChatGPT 신규 작업 절차

1. 요청된 파일과 사용처, import 그래프를 먼저 확인합니다.
2. 새 컴포넌트가 실제 여러 라우트에서 재사용되는지 확인합니다.
3. 파일 이름과 위치를 위 구조로 결정하되 임의로 과도한 공통화는 하지 않습니다.
4. 코드 패치 시 이전 경로 → 새 경로와 영향받는 모듈을 확인합니다.
5. TS/TSX 구문·타입·상대경로·import export·라우트 중복·기존 UI 동작을 검증하고 결과를 명시합니다.
6. 새 규칙/예외가 사용자에게 승인되면 `docs/ARCHITECTURE.md`의 **변경 기록**을 추가합니다. 기존 결정은 조용히 덮어쓰지 않습니다.
7. ChatGPT가 문서를 자동으로 읽을 수 없는 대화에서는 사용자가 프로젝트 지침/파일로 이 문서를 전달해야 합니다. **대화 간 기억을 전제로 하지 않습니다**.

## 현재 리팩토링 진행 상태

- Architecture v1: 경로 중앙화, `(site)`/`(api)` Route Group 도입, 컴포넌트 선언명·파일명 정리, 내비게이션 데이터/타입 분리.
- **후속 작업:** TSX 안의 인라인 배열 전체 추출, `_data`에 남은 공유 타입의 단계적 중앙화, 미사용 코드 삭제 여부 검토, DB repository 도입.
- 자세한 이력: `docs/MIGRATION-ARCHITECTURE-V1.md`.

## 페이지 JSX 정리 이력 (2026-11-10)

- JSX가 직접 들어간 10개 라우트 페이지의 기존 구현 전체를 `_ui` 파일 하나씩으로 이동하고, `page.tsx`는 UI 호출만 담당하도록 정리했습니다.
- `(site)/about/introduction/page.tsx`, `(site)/about/tour/page.tsx`는 다른 라우트의 `page.tsx`를 import하지 않도록 고쳤습니다.
- 기존 컴포넌트 분할, 기능 변경, CSS/JSX 스타일 변경, 데이터 추출은 수행하지 않았습니다.


## 신규 진료 페이지 골격 및 공개 플래그 (2026-11-10)

- 작업 우선순위는 `docs/ROADMAP.md`, 진료 메뉴 전체 표는 `docs/NAVIGATION-CLINICS.md`를 참조합니다.
- `src/app/_data/site/navigation.ts`의 모든 메뉴는 `isPublished` boolean으로 관리하며 최초 `false`입니다.
- 자식 중 하나라도 공개되면 상위 메뉴가 자동으로 표시됩니다. 비공개 직접 URL은 404입니다. 실제 의료정보/민감정보 보안은 별도 인증·권한 체크를 적용해야 합니다.
- 새 `page.tsx`는 구조만 제공하고 `return null`을 유지합니다. 디자인 구현 요청을 받으면 기존 규칙대로 `_ui/<라우트>/*.tsx`를 추가하고 페이지에서 조립합니다.
- 추가 진료 페이지 UI를 먼저 완료하고 이후 Supabase DB, Azure 에셋, 관리자 페이지를 단계적으로 진행합니다.

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
