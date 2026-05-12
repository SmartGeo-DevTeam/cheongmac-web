'use client';

import { useHome } from '@/app/_providers/home-provider';

export default function HomeTemp() {
  const { lang, home } = useHome();

  return <section className="relative mt-17.5"></section>;
}
