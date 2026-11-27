import type { ComponentPropsWithRef } from 'react';

type DivProps = ComponentPropsWithRef<'div'>;

export default function Div(props: DivProps) {
  return <div {...props} />;
}
