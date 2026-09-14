import { cn } from '@/_lib/utils';
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
} from 'react';

export type HeadingVariant =
  | 'default'
  | 'display'
  | 'section'
  | 'subsection'
  | 'accent'
  | 'muted';

export type ParagraphVariant =
  | 'default'
  | 'body'
  | 'lead'
  | 'muted'
  | 'caption'
  | 'accent'
  | 'note';

export type InlineVariant =
  | 'default'
  | 'semibold'
  | 'bold'
  | 'accent'
  | 'muted'
  | 'highlight';

const headingVariantClassNames: Record<HeadingVariant, string> = {
  default: '',
  display: 'break-keep font-extrabold tracking-[-0.05em]',
  section: 'break-keep font-bold tracking-[-0.04em]',
  subsection: 'break-keep font-semibold tracking-[-0.035em]',
  accent:
    'break-keep font-bold tracking-[-0.04em] text-cm-green',
  muted:
    'break-keep font-semibold tracking-[-0.03em] text-[#687078]',
};

const paragraphVariantClassNames: Record<ParagraphVariant, string> = {
  default: '',
  body: 'font-normal tracking-[-0.025em] text-[#40464E]',
  lead:
    'break-keep font-medium tracking-[-0.035em] text-[#252B33]',
  muted:
    'font-normal tracking-[-0.02em] text-[#737A82]',
  caption:
    'font-normal tracking-[-0.02em] text-[#9AA0A6]',
  accent:
    'font-medium tracking-[-0.03em] text-cm-green',
  note:
    'break-keep font-normal tracking-[-0.02em] text-[#60676F]',
};

const inlineVariantClassNames: Record<InlineVariant, string> = {
  default: '',
  semibold: 'font-semibold',
  bold: 'font-bold',
  accent: 'font-semibold text-cm-green',
  muted: 'font-medium text-[#737A82]',
  highlight:
    'rounded-[0.2em] bg-[#FFF3E8] px-[0.18em] font-semibold text-cm-orange',
};

type ManagedTypographyProps = {
  /** DB의 전역 font-size / line-height 적용 여부 */
  managed?: boolean;
  /** 태그 전체 글자색. 문장 일부만 바꿀 때는 Text를 사용합니다. */
  color?: CSSProperties['color'];
};

type HeadingVariantProps = {
  /**
   * font-size / line-height는 DB 설정을 유지하면서
   * 굵기·자간·색상 등의 표현만 조금씩 바꾸는 프리셋입니다.
   */
  variant?: HeadingVariant;
};

type ParagraphVariantProps = {
  /**
   * font-size / line-height는 DB 설정을 유지하면서
   * 본문 성격에 맞는 굵기·자간·색상 프리셋을 적용합니다.
   */
  variant?: ParagraphVariant;
};

function mergeColor(
  style: CSSProperties | undefined,
  color: CSSProperties['color'] | undefined,
): CSSProperties | undefined {
  if (!color) return style;
  return { ...style, color };
}

export type H1Props = ComponentPropsWithoutRef<'h1'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type H2Props = ComponentPropsWithoutRef<'h2'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type H3Props = ComponentPropsWithoutRef<'h3'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type H4Props = ComponentPropsWithoutRef<'h4'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type H5Props = ComponentPropsWithoutRef<'h5'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type H6Props = ComponentPropsWithoutRef<'h6'> &
  ManagedTypographyProps &
  HeadingVariantProps;
export type PProps = ComponentPropsWithoutRef<'p'> &
  ManagedTypographyProps &
  ParagraphVariantProps;

export function H1({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H1Props) {
  return (
    <h1
      {...props}
      className={cn(
        managed && 'cm-typography-h1',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function H2({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H2Props) {
  return (
    <h2
      {...props}
      className={cn(
        managed && 'cm-typography-h2',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function H3({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H3Props) {
  return (
    <h3
      {...props}
      className={cn(
        managed && 'cm-typography-h3',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function H4({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H4Props) {
  return (
    <h4
      {...props}
      className={cn(
        managed && 'cm-typography-h4',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function H5({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H5Props) {
  return (
    <h5
      {...props}
      className={cn(
        managed && 'cm-typography-h5',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function H6({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: H6Props) {
  return (
    <h6
      {...props}
      className={cn(
        managed && 'cm-typography-h6',
        headingVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export function P({
  managed = true,
  variant = 'default',
  color,
  className,
  style,
  ...props
}: PProps) {
  return (
    <p
      {...props}
      className={cn(
        managed && 'cm-typography-p',
        paragraphVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

export type StrongProps = ComponentPropsWithoutRef<'strong'> & {
  color?: CSSProperties['color'];
  variant?: InlineVariant;
};

export function Strong({
  variant = 'default',
  color,
  className,
  style,
  ...props
}: StrongProps) {
  return (
    <strong
      {...props}
      className={cn(
        inlineVariantClassNames[variant],
        className,
      )}
      style={mergeColor(style, color)}
    />
  );
}

/**
 * <bold>는 표준 HTML 태그가 아니므로 Bold는 실제 DOM에서
 * 의미론적으로 올바른 <strong>으로 렌더링합니다.
 */
export function Bold(props: StrongProps) {
  return <Strong {...props} />;
}

export type TextProps = ComponentPropsWithoutRef<'span'> & {
  color?: CSSProperties['color'];
  weight?: CSSProperties['fontWeight'];
  variant?: InlineVariant;
};

export function Text({
  variant = 'default',
  color,
  weight,
  className,
  style,
  ...props
}: TextProps) {
  return (
    <span
      {...props}
      className={cn(
        inlineVariantClassNames[variant],
        className,
      )}
      style={{
        ...style,
        ...(color ? { color } : {}),
        ...(weight ? { fontWeight: weight } : {}),
      }}
    />
  );
}
