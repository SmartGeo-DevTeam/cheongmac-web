import { getPrimaryNavigation } from '@/_lib/navigation';
import HeaderClient from './header-client';

export default async function Header() {
  const primaryNavigation = await getPrimaryNavigation();

  return <HeaderClient primaryNavigation={primaryNavigation} />;
}
