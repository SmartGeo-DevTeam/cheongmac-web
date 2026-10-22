import { cn } from '@/_lib/utils';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

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
  // With managed=false, display renders the full Display 1 scale.
  display: 'cm-type-display-1 break-keep',
  section: 'break-keep font-bold',
  subsection: 'break-keep font-bold',
  accent: 'break-keep font-bold text-cm-teal-600',
  muted: 'break-keep text-cm-gray-600',
};

const paragraphVariantClassNames: Record<ParagraphVariant, string> = {
  default: '',
  body: 'font-normal text-cm-gray-800',
  lead: 'break-keep font-medium text-cm-gray-900',
  muted: 'font-normal text-cm-gray-600',
  // Caption has its own 12px style and therefore bypasses DB body-size.
  caption: 'cm-type-caption text-cm-gray-600',
  accent: 'font-medium text-cm-teal-600',
  note: 'break-keep font-normal text-cm-gray-700',
};

const inlineVariantClassNames: Record<InlineVariant, string> = {
  default: '',
  semibold: 'font-semibold',
  bold: 'font-bold',
  accent: 'font-semibold text-cm-teal-600',
  muted: 'font-medium text-cm-gray-600',
  highlight:
    'rounded-[0.2em] bg-cm-orange-50 px-[0.18em] font-semibold text-cm-orange-700',
};

type ManagedTypographyProps = {
  /** 관리자가 설정한 상세페이지 font-size / line-height 적용 여부 */
  managed?: boolean;
  color?: CSSProperties['color'];
};

type HeadingVariantProps = { variant?: HeadingVariant };
type ParagraphVariantProps = { variant?: ParagraphVariant };

function mergeColor(
  style: CSSProperties | undefined,
  color: CSSProperties['color'] | undefined,
): CSSProperties | undefined {
  if (!color) return style;
  return { ...style, color };
}

export type H1Props = ComponentPropsWithoutRef<'h1'> & ManagedTypographyProps & HeadingVariantProps;
export type H2Props = ComponentPropsWithoutRef<'h2'> & ManagedTypographyProps & HeadingVariantProps;
export type H3Props = ComponentPropsWithoutRef<'h3'> & ManagedTypographyProps & HeadingVariantProps;
export type H4Props = ComponentPropsWithoutRef<'h4'> & ManagedTypographyProps & HeadingVariantProps;
export type H5Props = ComponentPropsWithoutRef<'h5'> & ManagedTypographyProps & HeadingVariantProps;
export type H6Props = ComponentPropsWithoutRef<'h6'> & ManagedTypographyProps & HeadingVariantProps;
export type PProps = ComponentPropsWithoutRef<'p'> & ManagedTypographyProps & ParagraphVariantProps;

export function H1({ managed = true, variant = 'default', color, className, style, ...props }: H1Props) {
  return <h1 {...props} className={cn(managed && 'cm-typography-h1', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function H2({ managed = true, variant = 'default', color, className, style, ...props }: H2Props) {
  return <h2 {...props} className={cn(managed && 'cm-typography-h2', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function H3({ managed = true, variant = 'default', color, className, style, ...props }: H3Props) {
  return <h3 {...props} className={cn(managed && 'cm-typography-h3', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function H4({ managed = true, variant = 'default', color, className, style, ...props }: H4Props) {
  return <h4 {...props} className={cn(managed && 'cm-typography-h4', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function H5({ managed = true, variant = 'default', color, className, style, ...props }: H5Props) {
  return <h5 {...props} className={cn(managed && 'cm-typography-h5', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function H6({ managed = true, variant = 'default', color, className, style, ...props }: H6Props) {
  return <h6 {...props} className={cn(managed && 'cm-typography-h6', headingVariantClassNames[variant], className)} style={mergeColor(style, color)} />;
}

export function P({ managed = true, variant = 'default', color, className, style, ...props }: PProps) {
  return (
    <p
      {...props}
      className={cn(managed && variant !== 'caption' && 'cm-typography-p', paragraphVariantClassNames[variant], className)}
      style={mergeColor(style, color)}
    />
  );
}

export type StrongProps = ComponentPropsWithoutRef<'strong'> & {
  color?: CSSProperties['color'];
  variant?: InlineVariant;
};

export function Strong({ variant = 'default', color, className, style, ...props }: StrongProps) {
  return (
    <strong {...props} className={cn(inlineVariantClassNames[variant], className)} style={mergeColor(style, color)} />
  );
}

/** Bold renders a semantic <strong> rather than a nonstandard <bold> tag. */
export function Bold(props: StrongProps) {
  return <Strong {...props} />;
}

export type TextProps = ComponentPropsWithoutRef<'span'> & {
  color?: CSSProperties['color'];
  weight?: CSSProperties['fontWeight'];
  variant?: InlineVariant;
};

export function Text({ variant = 'default', color, weight, className, style, ...props }: TextProps) {
  return (
    <span
      {...props}
      className={cn(inlineVariantClassNames[variant], className)}
      style={{
        ...style,
        ...(color ? { color } : {}),
        ...(weight ? { fontWeight: weight } : {}),
      }}
    />
  );
}
