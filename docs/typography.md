# 본문 타이포그래피 시스템

## 관리자

경로: `/admin/common/typography`

DB 관리 대상:

- H1
- H2
- H3
- H4
- H5
- H6
- P

각 태그는 아래 값을 독립적으로 저장합니다.

- 모바일 font-size (px)
- 모바일 line-height (배수)
- 데스크탑 font-size (px)
- 데스크탑 line-height (배수)

현재 사이트의 `xl` 기준에 맞춰 모바일은 1280px 미만,
데스크탑은 1280px 이상입니다.

## 본문 컴포넌트 사용

```tsx
import {
  H2,
  P,
  Strong,
  Bold,
  Text,
} from '@/app/_components/ui/typography';

export default function Example() {
  return (
    <>
      <H2>하지정맥류 치료</H2>

      <P>
        일반 본문 안에서 <Strong>중요한 내용은 굵게</Strong>{' '}
        표시할 수 있고,{' '}
        <Text color="#FA6805">특정 문구만 다른 색</Text>
        으로 표현할 수 있습니다.
      </P>

      <P>
        <Bold color="#08715F">Bold도 굵기와 색상을 함께 지정</Bold>
        할 수 있습니다.
      </P>
    </>
  );
}
```

`<bold>`는 표준 HTML 태그가 아니므로 `Bold` 컴포넌트는 실제 DOM에서
접근성과 문서 의미에 맞는 `<strong>`으로 렌더링합니다.

## 전역 본문 크기를 적용하면 안 되는 UI 텍스트

카드의 작은 메타정보, 버튼 안 문구, 폼 라벨처럼 본문 태그를 사용하지만
전역 본문 크기를 적용하면 안 되는 경우에는 `managed={false}`를 사용합니다.

```tsx
<P managed={false} className="text-sm leading-5">
  카드 보조정보
</P>
```

이번 마이그레이션에서는 공용 UI 컴포넌트 내부와 버튼/링크/폼 안의 작은 P를
컴포넌트화하되 `managed={false}`로 보존하여 기존 UI 크기가 갑자기 커지지
않도록 처리합니다.
