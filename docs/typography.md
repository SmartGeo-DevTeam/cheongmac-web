# 본문 타이포그래피 시스템

## 적용 범위

DB에서 관리하는 `font-size`와 `line-height`는 **상세페이지 본문에만 적용**합니다.

관리 대상 예:
- `/about/**`
- `/community/**`
- `/education-research/**`
- `/guide/**`
- 개인정보처리방침 / 이용약관 / 환자권리장전 등 상세 문서
- 상세페이지 공용 `PageHeader`

관리 제외:
- 메인페이지 `/`
- `src/app/_components/home/**`
- `src/app/_components/main-section-header/**`
- 카드, 버튼, 툴바 등 자체 크기 체계를 가진 일반 공용 UI

메인페이지에서 Typography 컴포넌트를 사용하더라도
`managed={false}`로 렌더링하여 기존 Tailwind `font-size` /
`line-height` 스타일을 그대로 유지합니다.

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

반응형 기준:
- 모바일: 1280px 미만
- 데스크탑: 1280px 이상

## 본문 컴포넌트

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

## DB 스타일을 적용하지 않는 경우

메인페이지 또는 자체적인 타이포그래피가 이미 정의된 UI는 아래처럼
`managed={false}`를 사용합니다.

```tsx
<P
  managed={false}
  className="text-lg leading-[1.5] xl:text-2xl"
>
  기존 디자인을 그대로 유지하는 문구
</P>
```
