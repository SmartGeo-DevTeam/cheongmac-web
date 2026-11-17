# 혈관중점진료: 동맥질환 페이지 작성 규칙

이 문서는 CHEONGMAC Architecture v1의 `(site)` 라우트 조립 / `_ui` 실제 UI 구현 규칙을 따릅니다.

| URL | 라우트 파일 | UI 컴포넌트 |
| --- | --- | --- |
| `/vascular/arterial` | `(site)/vascular/arterial/page.tsx` | `_ui/vascular/arterial/overview.tsx` |
| `/vascular/arterial/occlusion` | `(site)/vascular/arterial/occlusion/page.tsx` | `_ui/vascular/arterial/occlusion/disease-content.tsx` |
| `/vascular/arterial/aneurysm` | `(site)/vascular/arterial/aneurysm/page.tsx` | `_ui/vascular/arterial/aneurysm/disease-content.tsx` |
| `/vascular/arterial/foot` | `(site)/vascular/arterial/foot/page.tsx` | `_ui/vascular/arterial/foot/disease-content.tsx` |

- `/vascular`는 첫 번째 공개된 2차 진료 페이지로 이동하는 상위 진입 경로입니다.
- 2차 동맥질환 페이지는 독립적인 **개요 페이지**입니다. 3차 질환 페이지를 그 안에 import하거나 렌더링하지 않습니다.
- 3차 질환 페이지는 각각 독립적인 상세 UI를 갖습니다. 서로 다른 질환 간 `_ui` 직접 import를 피합니다.
- `page.tsx`는 `isPublishedNavigationPath` 확인과 `Breadcrumb`, `PageHeader`, 전용 `_ui` 조립을 맡고, 실제 섹션 디자인은 `_ui`에서 만듭니다.
- 공통 UI `Breadcrumb`, `PageHeader`, `Inner`는 기존 컴포넌트를 재사용합니다.
- `src/app/_data/site/navigation.ts` 한 파일에서 메뉴와 공개 여부를 관리합니다. **2차 자체 콘텐츠**가 준비되면 2차의 `isPublished: true`; 개별 3차 질환은 준비된 경우에만 각각 `true`를 지정합니다.
- 진료분야 페이지에서 2차 루트가 공개됐다면 3차가 모두 비공개여도 2차 루트는 공개됩니다.
- 현재 추가한 `_ui` 섹션은 **콘텐츠 없는 골격**입니다. 실제 디자인, 에셋, 의료 설명문은 확정 시 채웁니다.
