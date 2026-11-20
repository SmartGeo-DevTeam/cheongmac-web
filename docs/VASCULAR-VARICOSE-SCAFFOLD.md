# 하지정맥류 상세 페이지 구성

- 공개 상태: `src/app/_data/site/navigation.ts`에서 하지정맥류만 `isPublished: true`로 변경.
- URL: `/vascular/venous/varicose`.
- 진입: `(site)/vascular/venous/varicose/page.tsx`에서 `Breadcrumb` + `PageHeader` + `VaricoseOverview`.
- 섹션 구성은 `_ui/vascular/venous/varicose/overview.tsx`에서만 제어.

## 현재 순서

1. `symptoms` — Symptoms · 증상 (콘텐츠 TODO)
2. `ceap` — 하지정맥류 국제 표준 진단 기준 CEAP / 나는 몇 기에 해당될까? (콘텐츠 TODO)
3. `diagnostics` — Diagnosis · 진단 (콘텐츠 TODO)
4. `treatments` — Treatment · 치료법 (콘텐츠 TODO)
5. `cases` — Cases · 실제 치료 사례 (콘텐츠 TODO)
6. `reservation-links` — 기존 예약 링크 2개 (기존 링크의 `/` URL 유지)
7. `strengths` — 공통 강점 카드 5개 사용, 전용 메시지는 TODO
8. `faq` — 공통 영상·댓글 아코디언 레이아웃 재사용, 전용 썸네일·아바타·Q&A는 TODO

## 공통화

- `_components/clinic/reservation-links/{section,item}.tsx`: 두 상세 페이지에서 사용.
- `_data/vascular/{reservation-links,strengths}/`: 두 페이지에서 재사용하는 예약 링크와 병원 강점 데이터(원본 이미지 URL 유지).
- `_components/clinic/strengths/{section,item}.tsx`: 스크롤 제목·강점 카드를 Props로 받음.
- `_components/clinic/media-faq/{section,item}.tsx`: 영상 썸네일·질문자 이미지·Q&A를 Props로 받음.
- 실제 데이터 및 이미지가 제공되지 않은 항목은 의도적으로 생성하지 않음.
- 기존 동맥 페이지 원문/이미지 URL/섹션 ID/질문 데이터는 유지.

## 나중에 입력할 항목

- `_data/vascular/venous/varicose/strengths/content.ts`: 고유 강조 문구 2줄 (현재 비어 있음).
- `_data/vascular/venous/varicose/faq/questions.ts`: 영상 썸네일 경로, 아바타, 질문·답변 배열.
- `_ui/vascular/venous/varicose/{symptoms,ceap,diagnostics,treatments,cases}/section.tsx`: 각 섹션 표시.
- 필요 시 병원 공통 강점 카드도 정맥 전용 데이터로 변경하되 공통 컴포넌트는 수정하지 않음.

## 주의

- 예약 링크는 기존 데이터의 `href='/'`를 그대로 사용하며 실제 네이버 URL이 설정된 것은 아님.
- 콘텐츠를 만들지 않은 영역은 빈 `section` 앵커로 렌더링됨.
- FAQ는 타이틀만 렌더링되고 썸네일과 질문은 데이터 등록 후 출력됨.
- 동맥 FAQ/강점 카드의 원문은 코드 변경 없이 그대로 유지.
