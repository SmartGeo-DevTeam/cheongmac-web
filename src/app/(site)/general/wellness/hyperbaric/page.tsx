import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function GeneralWellnessHyperbaricPage() {
  if (!isPublishedNavigationPath('/general/wellness/hyperbaric')) notFound();

  // TODO: 이 페이지의 UI가 준비되면 _ui/general/wellness/hyperbaric/ 아래에 구현하고 여기에서 조립합니다.
  return null;
}
