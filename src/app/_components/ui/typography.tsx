import { cn } from '@/_lib/utils';
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
} from 'react';

type ManagedTypographyProps = {
  /** DB의 전역 font-size / line-height 적용 여부 */
  managed?: boolean;
  /** 태그 전체 글자색. 문장 일부만 바꿀 때는 Text를 사용합니다. */
  color?: CSSProperties['color'];
};

function mergeColor(
  style: CSSProperties | undefined,
  color: CSSProperties['color'] | undefined,
): CSSProperties | undefined {
  if (!color) return style;
  return { ...style, color };
}

export type H1Props = ComponentPropsWithoutRef<'h1'> &
  ManagedTypographyProps;
export type H2Props = ComponentPropsWithoutRef<'h2'> &
  ManagedTypographyProps;
export type H3Props = ComponentPropsWithoutRef<'h3'> &
  ManagedTypographyProps;
export type H4Props = ComponentPropsWithoutRef<'h4'> &
  ManagedTypographyProps;
export type H5Props = ComponentPropsWithoutRef<'h5'> &
  ManagedTypographyProps;
export type H6Props = ComponentPropsWithoutRef<'h6'> &
  ManagedTypographyProps;
export type PProps = ComponentPropsWithoutRef<'p'> &
  ManagedTypographyProps;

export function H1({
  managed = true,
  color,
  className,
  style,
  ...props
}: H1Props) {
  return (
    <h1
      {...props}
      className={cn(managed && 'cm-typography-h1', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function H2({
  managed = true,
  color,
  className,
  style,
  ...props
}: H2Props) {
  return (
    <h2
      {...props}
      className={cn(managed && 'cm-typography-h2', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function H3({
  managed = true,
  color,
  className,
  style,
  ...props
}: H3Props) {
  return (
    <h3
      {...props}
      className={cn(managed && 'cm-typography-h3', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function H4({
  managed = true,
  color,
  className,
  style,
  ...props
}: H4Props) {
  return (
    <h4
      {...props}
      className={cn(managed && 'cm-typography-h4', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function H5({
  managed = true,
  color,
  className,
  style,
  ...props
}: H5Props) {
  return (
    <h5
      {...props}
      className={cn(managed && 'cm-typography-h5', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function H6({
  managed = true,
  color,
  className,
  style,
  ...props
}: H6Props) {
  return (
    <h6
      {...props}
      className={cn(managed && 'cm-typography-h6', className)}
      style={mergeColor(style, color)}
    />
  );
}

export function P({
  managed = true,
  color,
  className,
  style,
  ...props
}: PProps) {
  return (
    <p
      {...props}
      className={cn(managed && 'cm-typography-p', className)}
      style={mergeColor(style, color)}
    />
  );
}

export type StrongProps = ComponentPropsWithoutRef<'strong'> & {
  color?: CSSProperties['color'];
};

export function Strong({
  color,
  style,
  ...props
}: StrongProps) {
  return <strong {...props} style={mergeColor(style, color)} />;
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
};

export function Text({
  color,
  weight,
  style,
  ...props
}: TextProps) {
  return (
    <span
      {...props}
      style={{
        ...style,
        ...(color ? { color } : {}),
        ...(weight ? { fontWeight: weight } : {}),
      }}
    />
  );
}
