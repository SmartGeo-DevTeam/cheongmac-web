# 혈관중점진료 · 종합진료 메뉴 및 신규 라우트 계획

- 메뉴 정의: `src/app/_data/site/navigation.ts`
- 전체 메뉴 집계: **1차 2개 + 2차 11개 + 3차 40개 = 53개 빈 페이지**.
- 로직: `src/app/_lib/navigation/navigation-tree.ts`에서 공개 메뉴를 재귀적으로 필터링하고, `isPublishedNavigationPath()`로 직접 접근 허용 여부를 판단한다.
- 공개 조건: **방문 페이지와 모든 상위 메뉴의 `isPublished`가 `true`**여야 한다.
- 새 페이지 `page.tsx`는 본문을 비운 `return null` 골격이고, 구현 시 `_ui/<같은 라우트>/`에 UI를 작성해 조립한다.
- 초기 공개 상태는 모두 `false`이다. 빈 페이지가 검색/방문자에 노출되지 않도록 하기 위해서다.
- 미공개 페이지는 `notFound()`로 404를 반환하지만, **보안 권한 체크를 대체하지 않는다**.
- 기존 메인/헤더/기타 UI 스타일은 이번 단계에서 변경하지 않는다. 헤더에 1차 메뉴 2개가 늘어나므로 데스크톱 GNB 너비·모바일 3차 메뉴 스타일은 실제 디자인 단계에서 점검할 것.
- `고압산소치료`는 혈관중점진료 2차 메뉴와 종합진료 3차 메뉴에 모두 존재하며, 현재는 별도 URL을 사용한다.
- 데이터의 `고지혈증`은 요청에 쓰인 `고지혈정` 대신 제공된 디자인의 정식 표기를 따른다.

| 영역 | 단계 | 경로 | 메뉴명 |
|---|---|---|---|
| 혈관중점진료 | 1차 | `/vascular` | 혈관중점진료 |
| 혈관중점진료 | 2차 | `/vascular/arterial` | 동맥질환 |
| 혈관중점진료 | 3차 | `/vascular/arterial/occlusion` | 하지동맥폐색증 |
| 혈관중점진료 | 3차 | `/vascular/arterial/aneurysm` | 대동맥류 |
| 혈관중점진료 | 3차 | `/vascular/arterial/foot` | 당뇨발 |
| 혈관중점진료 | 2차 | `/vascular/venous` | 정맥질환 |
| 혈관중점진료 | 3차 | `/vascular/venous/varicose` | 하지정맥류 |
| 혈관중점진료 | 3차 | `/vascular/venous/pelvic` | 골반정맥류 |
| 혈관중점진료 | 3차 | `/vascular/venous/varicocele` | 정계정맥류 |
| 혈관중점진료 | 3차 | `/vascular/venous/thrombosis` | 심부정맥혈전증 |
| 혈관중점진료 | 2차 | `/vascular/special` | 특수혈관질환 |
| 혈관중점진료 | 3차 | `/vascular/special/nutcracker` | 호두까기증후군 |
| 혈관중점진료 | 3차 | `/vascular/special/kt` | KT 증후군 |
| 혈관중점진료 | 3차 | `/vascular/special/maythurner` | 메이터너증후군 |
| 혈관중점진료 | 3차 | `/vascular/special/raynaud` | 레이노증후군 |
| 혈관중점진료 | 3차 | `/vascular/special/buerger` | 버거씨병 |
| 혈관중점진료 | 2차 | `/vascular/dialysis` | 투석혈관 |
| 혈관중점진료 | 3차 | `/vascular/dialysis/creation` | 투석혈관 조성관리 |
| 혈관중점진료 | 3차 | `/vascular/dialysis/revision` | 교정술/축소술 |
| 혈관중점진료 | 3차 | `/vascular/dialysis/recanalization` | 혈관개통술 |
| 혈관중점진료 | 3차 | `/vascular/dialysis/catheter` | 펌카테터 삽입/제거술 |
| 혈관중점진료 | 2차 | `/vascular/hyperbaric` | 고압산소치료 |
| 혈관중점진료 | 3차 | `/vascular/hyperbaric/emergency` | 응급질환 |
| 혈관중점진료 | 3차 | `/vascular/hyperbaric/regenerative` | 면역/재생테라피 |
| 종합진료 | 1차 | `/general` | 종합진료 |
| 종합진료 | 2차 | `/general/gynecology` | 여성 부인과질환 |
| 종합진료 | 3차 | `/general/gynecology/uterus` | 자궁질환 |
| 종합진료 | 3차 | `/general/gynecology/ovary` | 난소질환 |
| 종합진료 | 3차 | `/general/gynecology/inflammation` | 질염/골반염 |
| 종합진료 | 3차 | `/general/gynecology/clinic` | 여성클리닉 |
| 종합진료 | 2차 | `/general/andrology` | 남성 전립선질환 |
| 종합진료 | 3차 | `/general/andrology/prostate` | 전립선질환 |
| 종합진료 | 3차 | `/general/andrology/testicular` | 고환/음낭질환 |
| 종합진료 | 3차 | `/general/andrology/clinic` | 남성클리닉 |
| 종합진료 | 2차 | `/general/urinary` | 남녀 비뇨기질환 |
| 종합진료 | 3차 | `/general/urinary/stones` | 요로결석/신장결석 |
| 종합진료 | 3차 | `/general/urinary/voiding` | 배뇨장애 |
| 종합진료 | 3차 | `/general/urinary/infections` | 방광염/신우신염 |
| 종합진료 | 2차 | `/general/chronic` | 만성질환 |
| 종합진료 | 3차 | `/general/chronic/metabolic` | 당뇨/고혈압/고지혈증 |
| 종합진료 | 3차 | `/general/chronic/lymphedema` | 림프부종 |
| 종합진료 | 3차 | `/general/chronic/gout` | 통풍 |
| 종합진료 | 3차 | `/general/chronic/thyroid-liver` | 갑상선/지방간 |
| 종합진료 | 2차 | `/general/wellness` | 웰니스 클리닉 |
| 종합진료 | 3차 | `/general/wellness/obesity` | 비만클리닉 |
| 종합진료 | 3차 | `/general/wellness/hair` | 탈모치료 |
| 종합진료 | 3차 | `/general/wellness/infusion` | 수액클리닉 |
| 종합진료 | 3차 | `/general/wellness/hyperbaric` | 고압산소치료 |
| 종합진료 | 3차 | `/general/wellness/vaccination` | 예방접종 |
| 종합진료 | 2차 | `/general/checkup` | 건강검진센터 |
| 종합진료 | 3차 | `/general/checkup/information` | 건강검진안내 |
| 종합진료 | 3차 | `/general/checkup/individual` | 개인 건강검진 |
| 종합진료 | 3차 | `/general/checkup/corporate` | 단체/기업 건강검진 |

## 내비게이션 단일 데이터 원칙 (2026-11-10)

- 사이트 전체 GNB·LNB·Breadcrumb 1~3차 메뉴는 `src/app/_data/site/navigation.ts`의 `NAVIGATION` 배열 하나에서 정의합니다.
- 노드 공통 타입은 `src/app/_types/site/navigation.ts`의 `NavigationItem` 하나만 사용합니다.
- 진료 영역별 별도 `vascularNavigation`·`generalNavigation` 상수 또는 별도의 navigation.ts를 만들지 않습니다.
- `isPublished`와 부모의 공개 상태를 활용하는 기존 필터·직접 URL 접근 제어는 유지합니다.
- 새 메뉴를 추가할 때는 `NAVIGATION`에 직접 추가하고, `docs/NAVIGATION-CLINICS.md` 등 해당 메뉴 문서를 갱신합니다.

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
