# 정맥질환 개요 페이지 아키텍처 골격 (2026-11-19)

이 문서는 첨부 코드 및 사용자 요청에 기반해 생성한 **UI 미구현 구조**를 정의합니다. 의료 콘텐츠, 임시 이미지, DB 조회, 슬라이더는 추가하지 않았습니다.

## 섹션 순서·ID·저장 위치

| 순서 | 섹션명 | 컴포넌트 | 섹션 ID | 정적 데이터 |
|---|---|---|---|---|
| 1 | 원인 | `VenousCauses` (`_ui/vascular/venous/causes/section.tsx`) | `vascular-venous-causes` | `_data/vascular/venous/causes/content.ts` |
| 2 | 부위별 정맥질환 | `VenousDiseases` (`_ui/vascular/venous/diseases/section.tsx`) | `vascular-venous-diseases` | `_data/vascular/venous/diseases/cards.ts` |
| 3 | 혈관 맞춤 치료 | `VenousTreatments` (`_ui/vascular/venous/treatments/section.tsx`) | `vascular-venous-treatments` | `_data/vascular/venous/treatments/methods.ts` |
| 4 | BEST 치료사례 | `VenousBestCases` (`_ui/vascular/venous/best-cases/section.tsx`) | `vascular-venous-best-cases` | `_data/vascular/venous/best-cases/cases.ts` |
| 5 | 청맥병원의 남다른 전문성 | `VenousExpertise` (`_ui/vascular/venous/expertise/section.tsx`) | `vascular-venous-expertise` | `_data/vascular/venous/expertise/items.ts` |
| 6 | 정맥질환 전문 의료진 | `VenousSpecialists` (`_ui/vascular/venous/specialists/section.tsx`) | `vascular-venous-specialists` | `_data/vascular/venous/specialists/content.ts` |
| 7 | 정맥질환 자주 묻는 질문 | `VenousFaq` (`_ui/vascular/venous/faq/section.tsx`) | `vascular-venous-faq` | `_data/vascular/venous/faq/questions.ts` |

## 구현 경계

- `(site)/vascular/venous/page.tsx`: navigation 공개 여부 확인, Breadcrumb/PageHeader, `VenousOverview` 호출
- `_ui/vascular/venous/overview.tsx`: 위 7개 섹션의 순서만 조립
- 각 `_ui/.../<section>/section.tsx`: 해당 라우트 전용 UI; 이 단계에서는 빈 섹션과 안정적인 ID만 제공
- `_data/vascular/venous/<section>/`: 내용이 실제 확정되면 의료 문구·이미지 경로·목록을 정의. 지금은 미구현 메모만 보관
- `_types`: 둘 이상의 파일에서 공유하는 타입이 필요해질 때 생성. 단일 Props 타입은 컴포넌트 옆에 둠
- `_components/clinic`: 동맥질환과 정맥질환 등 **서로 다른 페이지에서 실제 재사용**을 확인한 후에만 승격
- `public`: 새 이미지는 원본/라이선스/용도가 확정된 후 배치. 임의 이미지 제작·복사 없음

## 기존 동맥질환 UI 참고 (직접 import 금지)

- 원인: 별도의 신설 UI 예정 (동맥질환에 1:1 대응 섹션 없음)
- 부위별 질환: `_ui/vascular/arterial/diseases/`
- 혈관 맞춤 치료: `_ui/vascular/arterial/diagnostics/`의 카드·슬라이드 및 `_components/clinic/diagnostics` 등 비교
- BEST 치료사례: `_ui/vascular/arterial/best-cases/`
- 전문성: `_ui/vascular/arterial/expertise/`
- 전문 의료진: `_ui/vascular/arterial/specialists/` (추후 모바일 Swiper/PC 다인 레이아웃 필요 시 페이지별 구현)
- FAQ: `_ui/vascular/arterial/faq/`; 기존 `_components/common/faq-list.tsx` 활용 가능

## 범위·공개 상태

- 첨부 코드의 `NAVIGATION`에서 정맥질환 루트 `isPublished: true`가 이미 설정돼 있으므로 변경하지 않음
- 정맥질환 3차 하위 페이지는 기존 비공개 상태 유지
- `vascularHealthBanner`는 **이번 사용자 목록(7개 섹션)**에 포함되지 않아 `overview.tsx`에 추가하지 않음. 추가 요청 시 기존 `ClinicBanner`를 직접 사용
- 시안은 향후 UI 작업의 참고이며 이 단계에 픽셀 단위 디자인, 가상 의료 정보, 이미지를 생성하지 않음

## 차후 작업할 때

1. 각 섹션의 `section.tsx`를 구현하고 해당 `_data` 모듈에 확정 콘텐츠를 추가합니다.
2. 필요한 `item.tsx`, `carousel.tsx`, `selector.tsx`는 실제 구현이 요구될 때 해당 섹션 아래에 추가합니다.
3. 2개 이상 서로 다른 페이지가 동일한 UI를 사용할 때 `_components/clinic/`으로 옮기고 Props로 데이터 받도록 만듭니다.
4. 섹션 ID는 그대로 유지하고, 필요시 항목 ID는 `vascular-venous-<section>-<item>` 패턴을 따릅니다.
5. UI 구현 후 `npm run build`와 실제 모바일/PC 브라우저 검증을 수행합니다.

## Causes · 원인 섹션 구현 (2026-11-19)

- `_ui/vascular/venous/causes/section.tsx`는 제목과 두 비교 카드의 배치만 담당합니다.
- `_ui/vascular/venous/causes/item.tsx`는 두 카드에 반복되는 이미지·제목·설명·세부 정보 행을 렌더링합니다.
- `_data/vascular/venous/causes/content.ts`는 섹션 제목/설명, `cards.ts`는 카드 문구·배지 정보를 보관합니다.
- `_types/vascular/venous/causes.ts`는 데이터와 UI가 함께 참조하는 카드 타입입니다.
- 기존 `public/_______temp/temp-1.png` 및 `temp-2.png`는 각각 `public/vascular/venous/causes/normal-vein.png`, `impaired-venous-circulation.png`로 원본 바이트 그대로 이동했습니다.
- `vascular-venous-causes` 섹션 ID, 반응형 스타일, 카드 배치, 행 구분선, 마지막 행 여백을 유지합니다.
- 다른 정맥질환 섹션의 미구현 상태 및 공개 설정은 이번 변경 범위에 포함하지 않습니다.
