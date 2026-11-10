# CHEONGMAC 페이지 조립 규칙 적용 (2026-11-10)

기준: 직전 `cheongmac-architecture-v1-patch.zip`에 포함된 소스 파일.
기존 JSX·Tailwind·상태 처리·콘텐츠·API URL은 변경하지 않음.

## 직접 JSX → UI 파일 전체 이동 (10건)

| page.tsx (기존) | 이동한 기존 전체 UI | Client |
|---|---|---|
| `src/app/(site)/about/equipment/page.tsx` | `src/app/_ui/about/equipment/equipment-overview.tsx` | 아니오 |
| `src/app/(site)/about/tour/facilities/page.tsx` | `src/app/_ui/about/tour/facilities/facility-directory.tsx` | 예 |
| `src/app/(site)/about/tour/floors/page.tsx` | `src/app/_ui/about/tour/floors/floor-guide.tsx` | 아니오 |
| `src/app/(site)/community/cases/page.tsx` | `src/app/_ui/community/cases/cases-overview.tsx` | 아니오 |
| `src/app/(site)/community/consultation/page.tsx` | `src/app/_ui/community/consultation/consultation-overview.tsx` | 아니오 |
| `src/app/(site)/community/consultation/write/page.tsx` | `src/app/_ui/community/consultation/write/consultation-write-content.tsx` | 아니오 |
| `src/app/(site)/community/feedback/page.tsx` | `src/app/_ui/community/feedback/feedback-overview.tsx` | 예 |
| `src/app/(site)/community/feedback/write/page.tsx` | `src/app/_ui/community/feedback/write/feedback-write-content.tsx` | 아니오 |
| `src/app/(site)/community/news/page.tsx` | `src/app/_ui/community/news/news-board.tsx` | 예 |
| `src/app/(site)/guide/outpatient/page.tsx` | `src/app/_ui/guide/outpatient/outpatient-content.tsx` | 아니오 |

## 라우트 별칭 참조 정리 (2건)

- `(site)/about/tour/page.tsx`는 `./floors/page` 대신 `FloorGuide`를 직접 사용.
- `(site)/about/introduction/page.tsx`는 `./intro/page` 대신 기존 7개 소개 섹션 UI를 동일한 순서로 호출.

## 현상 유지 (21건)

- 원래부터 UI만 호출하거나 라우트 파라미터·메타데이터를 담당하는 다른 21개 페이지는 그대로 유지.
- `metadata`, `generateMetadata`, `generateStaticParams`, `notFound()` 등 라우트 전용 동작은 삭제하지 않았음.

## 제한 사항

- 소스 ZIP에 `node_modules`, `public` 전체와 `tsconfig.json`이 없어 전체 빌드와 실제 UI 렌더링은 원본 프로젝트에서 확인해야 함.
- 로컬에서 직전 Architecture v1 패치 후 해당 12개 라우트 파일을 추가 수정했다면 SHA256 검사에서 안전하게 적용이 중단됨.
- 이 패치에는 사용되지 않는 코드 삭제, 인라인 데이터 이동, 이름 없는 작은 하위 컴포넌트 분해가 포함되지 않음.
