import { getPrimaryNavigation } from '@/_lib/navigation';
import type { NavigationItem } from '@/_lib/navigation-shared';
import HeaderClient from './header-client';

export default async function Header({
  primaryNavigation,
}: {
  primaryNavigation?: NavigationItem[];
}) {
  const navigation = primaryNavigation ?? (await getPrimaryNavigation());

  return <HeaderClient primaryNavigation={navigation} />;
}
