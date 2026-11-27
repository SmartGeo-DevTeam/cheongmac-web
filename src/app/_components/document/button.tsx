import type { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

export default function Button(props: ButtonProps) {
  return <button {...props} />;
}
