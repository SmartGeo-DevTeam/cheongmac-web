import type { ComponentPropsWithRef } from 'react';

type SpanProps = ComponentPropsWithRef<'span'>;

export default function Span(props: SpanProps) {
  return <span {...props} />;
}
