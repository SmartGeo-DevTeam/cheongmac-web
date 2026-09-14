# 공개 화면 전체 인라인 편집 확장

## 적용 범위

다음 목록 페이지의 `NavigationPageHeader` 아래 본문까지 편집 대상으로 연결합니다.

- `/about/doctors`
- `/about/tour`
- `/about/equipment`
- `/education-research/society`
- `/education-research/exchange`
- `/community/consultation`
- `/community/customer-voice`
- `/community/notice`
- `/community/news`
- `/guide/partner-hospital`

## 편집 방식

### 고정 문구 / 고정 이미지

`EditablePageCopyBlock` + `PageContentBlock`으로 저장합니다.

EDITOR 이상에서 화면 편집 모드를 켜면 해당 페이지 본문 영역에 톱니 버튼이 나타납니다.
문구는 한 글자 단위로 자유롭게 수정할 수 있으며 이미지 필드는 Azure managed asset 업로드를 사용합니다.

Dialog의 입력 순서는 다음과 같습니다.

1. text / textarea / editor / URL 등 고정 문구
2. 이미지
3. 관계형 데이터 관리자 이동 영역

### 관계형 아이템

DB 아이템 자체를 `PageContentBlock`에 복제하지 않습니다.

- 병원 둘러보기: `ManagedPageItem(tour)`
- 첨단의료장비: `ManagedPageItem(equipment)`
- 학회활동: `ManagedPageItem(society)`
- 학술교류: `ManagedPageItem(exchange)`
- 공지사항: `ManagedPageItem(notice)`
- 청맥뉴스: `ManagedPageItem(news)`
- 의료협약병원: `ManagedPageItem(partner-hospital)`
- 의료진: Doctor DB
- 의학상담: Related Consultation DB

각 카드의 톱니 버튼은 해당 아이템의 기존 관리자 편집 화면으로 연결합니다.

## 정확한 관리자 포커스

관리자 링크는 가능한 경우 hash target을 포함합니다.

예:

- `#managed-item-content`
- `#admin-related-content-editor`
- `#admin-related-content-list`
- `#admin-doctor-basic`
- `#admin-doctor-images`
- `#admin-doctor-careers`

`AdminHashFocus`는 관리자 화면 진입 후 target을 찾아:

- 부모 `<details>` 자동 열기
- `scrollIntoView({ block: 'center' })`
- 주황색 outline + ring
- keyboard focus
- 약 6.5초 후 강조 제거

를 수행합니다.

## ManagedPageItem resolver

공개 화면에서는 DB row id보다 안정적인 `itemKey`를 알고 있는 경우가 많으므로:

`/admin/pages/[pageKey]/resolve?itemKey=...`

경로가 `pageKey + itemKey`를 실제 row id로 변환하고 정확한 편집 페이지의 `#managed-item-content`로 redirect합니다.
