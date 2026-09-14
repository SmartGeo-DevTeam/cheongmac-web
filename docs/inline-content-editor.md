# 사용자 화면 인라인 콘텐츠 편집

청맥병원은 문구 수정 빈도가 높고 한 글자 단위 수정도 많기 때문에,
EDITOR / ADMIN / SUPER_ADMIN은 공개 사용자 화면에서 직접 콘텐츠를 수정할 수 있습니다.

## 기본 원칙

- UI 기능 문구가 아니라 운영 중 자주 바뀌는 콘텐츠는 DB 관리 대상으로 둡니다.
- 고정 섹션은 `PageContentBlock` (`pageKey + sectionKey`)으로 관리합니다.
- 반복 데이터는 기존 `ManagedPageItem`, Doctor, Notice, News 등의 모델을 유지합니다.
- 이미지 업로드는 기존 Azure `managed/**` 체계를 그대로 사용합니다.
- EDITOR 이상만 편집 UI가 보이며 Server Action에서도 권한을 다시 검사합니다.
- 모든 저장/초기화는 `AdminAuditLog`에 기록합니다.
- 화면 편집 모드는 로그인 상태에서도 기본 OFF이며 AccountDock에서 켭니다.

## 공개 화면 UX

편집 모드 ON → 편집 가능 영역 hover → 톱니(Settings2) → Dialog → 수정 → 저장

문자열 필드는 한 글자 단위까지 제한 없이 수정할 수 있습니다.
`text`, `textarea`, `editor`, `url`, `image` 필드를 지원합니다.

현재 `editor` 타입은 여러 줄 자유 편집용 큰 에디터 영역이며,
향후 구조화 Rich Text 편집기로 교체할 수 있도록 필드 타입을 분리해 두었습니다.

## 고정 섹션 추가 예시

```tsx
import EditableContentBlock from '@/app/_components/inline-editor/editable-content-block';

<EditableContentBlock
  pageKey="about-example"
  sectionKey="intro"
  label="소개 영역"
  publicPath="/about/example"
  defaults={{
    title: '기본 제목',
    description: '기본 설명',
    image: '/assets/images/example.jpg',
  }}
  fields={[
    { key: 'title', label: '제목', type: 'text' },
    { key: 'description', label: '설명', type: 'editor' },
    { key: 'image', label: '이미지', type: 'image' },
  ]}
>
  {(content) => (
    <section>
      <H2>{content.title}</H2>
      <P>{content.description}</P>
      <Image src={content.image} alt="" fill />
    </section>
  )}
</EditableContentBlock>
```

## 현재 자동 적용 범위

`NavigationPageHeader`를 사용하는 상세페이지의 페이지 제목/설명은
별도 페이지별 코드 수정 없이 즉시 인라인 편집 대상으로 연결됩니다.

나머지 본문 섹션은 위 `EditableContentBlock`을 사용해 같은 체계로
순차 DB화할 수 있습니다. 기존 DB 기반 반복 콘텐츠는 기존 모델을 유지하면서
인라인 편집 진입점만 추가하는 방식으로 확장합니다.
