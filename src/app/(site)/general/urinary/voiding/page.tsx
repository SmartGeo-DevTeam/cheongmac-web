import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function GeneralUrinaryVoidingPage() {
  if (!isPublishedNavigationPath('/general/urinary/voiding')) notFound();

  // TODO: 이 페이지의 UI가 준비되면 _ui/general/urinary/voiding/ 아래에 구현하고 여기에서 조립합니다.
  return null;
}
