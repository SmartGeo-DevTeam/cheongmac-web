import { getNavigationHref, getPrimaryNavigation } from '@/app/_lib/navigation/navigation-tree';
import { notFound, redirect } from 'next/navigation';

export default function GeneralPage() {
  const nav = getPrimaryNavigation().find((item) => item.id === 'general');
  if (!nav) notFound();

  redirect(getNavigationHref(nav));
}
