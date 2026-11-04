import { ReactNode } from 'react';

export default function Title({ text }: { text: ReactNode }): ReactNode {
  return <h2 className="text-gray-900 text-mo-title-2">{text}</h2>;
}
