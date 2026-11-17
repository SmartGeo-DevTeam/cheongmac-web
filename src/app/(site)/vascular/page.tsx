import { getNavigationHref, getPrimaryNavigation } from '@/app/_lib/navigation/navigation-tree';
import { notFound, redirect } from 'next/navigation';

export default function VascularPage() {
  const nav = getPrimaryNavigation().find((item) => item.id === 'vascular');
  if (!nav) notFound();

  redirect(getNavigationHref(nav));
}
