import {
  getPrimaryNavigation,
  type NavigationItem,
} from '@/_lib/navigation';
import HeaderClient from './header-client';

export default async function Header({
  primaryNavigation,
}: {
  primaryNavigation?: NavigationItem[];
}) {
  const navigation = primaryNavigation ?? (await getPrimaryNavigation());

  return <HeaderClient primaryNavigation={navigation} />;
}
