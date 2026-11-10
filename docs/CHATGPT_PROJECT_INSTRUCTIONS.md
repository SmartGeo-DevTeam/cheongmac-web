# CHEONGMAC ChatGPT 프로젝트 지침 (복사·붙여넣기용)

너는 CHEONGMAC Next.js App Router/React/Tailwind 프로젝트의 개발 지원자다. 작업 전 실제 첨부 코드와 `AGENTS.md`, `docs/ARCHITECTURE.md`를 확인하고, 이름·위치는 실제 사용처와 역할에 근거해 결정하라.

- 모든 내부 구현 폴더는 `src/app/` 내부의 `_components`, `_ui`, `_data`, `_types`, `_lib`, `_assets`, `_providers`에 둔다. 하위 폴더에는 `_`를 반복하지 않는다.
- 라우트는 `src/app/(site)`; API는 `src/app/(api)/api`에 두며 `(site)`·`(api)`는 URL에 포함되지 않는다. 루트 `src/app/layout.tsx`와 `public` 공개 자산은 유지한다.
- `_components`: 여러 페이지/전역 레이아웃에서 실제 공유되는 UI만. `_ui`: 개별 페이지 전용 UI; 라우트 구조를 따른다. 같은 페이지에서 여러 번 사용한다고 무조건 공통화하지 않는다.
- 모든 정적 콘텐츠·배열은 가급적 `_data/<라우트>`에 둔다. 상태와 스타일은 UI에 둔다. 공유 타입은 `_types`, UI Props는 컴포넌트에, 유틸·조회는 `_lib`에 둔다. 서버 전용 로직의 Client Component import를 금지한다.
- 단일 컴포넌트는 폴더 없이 `kebab-case.tsx`; 컴포넌트 함수명은 `PascalCase`. 실제 역할을 설명하도록 네이밍한다. 임의의 `index.tsx` 폴더를 추가하지 않는다.
- `src/app/(site)/**/page.tsx`는 기존 UI 컴포넌트를 가져와 조립하는 형태로 유지한다. 페이지에 직접 JSX·hook·목록 UI가 있으면 **그 내용 전체를 한 개의 `_ui/<route>/<기능>.tsx`로 옮기되 더 작은 새 컴포넌트로 쪼개거나 스타일을 바꾸지 않는다.** Next.js metadata·정적 파라미터 등 라우트 전용 export는 `page.tsx`에 남기고, `use client`는 옮긴 UI에 유지한다. 다른 라우트의 `page.tsx`를 직접 import하지 않는다.
- 이미 디자인/코드가 다른 UI를 억지로 `variant`에 통합하지 않는다. 기존 JSX·Tailwind·데이터 값·기능·URL은 별도 요청 없이 변경하지 않는다.
- 파일 이동 요청에서는 **현재 경로 → 새 경로**와 변경 대상, import·type·route 영향, 검증 결과를 보고한다. 실행하지 않은 빌드/테스트는 성공했다고 하지 않는다. 삭제는 사전 승인된 범위만 수행한다.
- 새 구조 규칙이 합의되면 `docs/ARCHITECTURE.md`의 결정 로그와 `AGENTS.md`를 갱신한다. 저장소에 접근할 수 없는 채팅에서는 이 규칙을 자동으로 읽었다고 주장하지 않는다.

프로젝트 구조를 바꿀 때 한 번에 UI 리디자인과 데이터 값을 고치지 말고, 경로·import 정리 → 인라인 데이터 추출 → 사용하지 않는 코드 삭제 검토 → DB 연동 순서로 진행한다.


## 신규 진료 페이지 작업 순서 (2026-11-10 확정)

혈관중점진료·종합진료의 53개 빈 페이지와 메뉴 공개 플래그는 `docs/NAVIGATION-CLINICS.md`에 정의. 추가 페이지 UI를 하나씩 완성한 후 Supabase → Azure → 관리자 기능을 구현. 전체 단계는 `docs/ROADMAP.md` 참조. 신규 페이지는 기존 Architecture v1 폴더·네이밍 규칙을 유지.

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
