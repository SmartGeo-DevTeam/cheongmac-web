# 하지동맥폐색증 페이지 구조 초안

기존 라우트 `/vascular/arterial/occlusion`과 `PageHeader`, `Breadcrumb`, 내비게이션 `isPublished` 설정은 유지합니다.
기존 화면용 `disease-content.tsx`의 빈 섹션 3개는 `overview.tsx`의 개별 섹션으로 옮깁니다.

## 구현 위치

- `(site)/vascular/arterial/occlusion/page.tsx`: 라우팅, `PageHeader`, 공개 상태 검사
- `_ui/vascular/arterial/occlusion/overview.tsx`: 섹션 순서만 구성
- `_ui/vascular/arterial/occlusion/<기능>/section.tsx`: 각 섹션 UI
- `_data/vascular/arterial/occlusion/content.ts`: 섹션 제목과 실제 존재하는 링크
- `_data/vascular/arterial/occlusion/<기능>/*.ts`: 목록과 탭 데이터
- `_types/vascular/arterial/occlusion.ts`: 여러 파일에서 사용할 아이템 타입
- `public/vascular/arterial/occlusion/<기능>/...`: 추후 디자인 원본 이미지 배치 (이번 패치에서 생성하지 않음)

## 예정 섹션 순서

1. introduction: 질환 개요 / 대표 이미지 (기존 `-about` ID 유지)
2. mechanism: 혈관 단면/혈류 변화
3. comparison: 두 영역 비교 카드 (기존 `ClinicSplitLayout` 재사용)
4. symptoms: 증상 (기존 `-symptoms` ID 유지)
5. diagnostics: 검사/진단 정보
6. treatments: 치료 방법 (기존 `-treatment` ID 유지)
7. 공통 `ClinicBanner`: 실제 기존 예약 배너 데이터 재사용
8. cases: 확인된 치료 사례와 공통 `ClinicLinkButton`
9. procedures: 시술 방법/단계 탭 (클릭 기능은 추후 UI 구현)
10. management: 치료 후 관리
11. resources: 예약·의료진·상담 링크
12. media: 영상 소개 (링크 미확정이면 렌더링하지 않음)

## 콘텐츠/디자인 주의

- 사용자 첨부 이미지는 전체 페이지 시안이며 페이지에 사용된 개별 이미지 원본이 아닙니다. 이미지 생성/이동/URL 지정은 하지 않았습니다.
- 진단·치료·수술 성과에 관한 텍스트를 추측하여 추가하지 않았습니다. 목록은 의도적으로 비어 있으며 `TODO(신규)`로 표시되어 있습니다.
- 기존 UI·Tailwind 클래스는 수정하지 않았습니다. 신규 UI 컴포넌트에는 임의의 Tailwind 클래스를 추가하지 않았습니다.
- `ClinicBanner`는 적용된 최근 공통화 패치를 전제로 합니다. 해당 파일이 없는 이전 버전에서는 사전 검사가 중단됩니다.
- 디자인에 맞춰 순서를 바꾸거나 비어 있는 섹션을 제외하려면 `overview.tsx`에서만 조정하세요.
- 기존 `arterial`의 `diagnostics`, `best-cases`는 개요 페이지 전용 UI이므로 상세 페이지에서 직접 import하지 않습니다. 공통 부분만 실제 재사용이 확인되면 `_components`로 승격하세요.
