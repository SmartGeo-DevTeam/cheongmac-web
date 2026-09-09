import { getNavigationPageContext } from '@/_lib/navigation';
import type { ReactNode } from 'react';
import PageHeader, {
  type PageHeaderTitleAs,
} from './page-header';

export default async function NavigationPageHeader({
  navigationPath,
  id,
  title,
  description,
  titleAs = 'h1',
  showDivider = true,
}: {
  navigationPath: string;
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  titleAs?: PageHeaderTitleAs;
  showDivider?: boolean;
}) {
  const navigationContext =
    await getNavigationPageContext(navigationPath);

  const navigationTitle = navigationContext?.current.title;
  const resolvedTitle = title ?? navigationTitle ?? '';

  const breadcrumbs =
    navigationContext?.levels.map((level, index, levels) => ({
      label: level.current.title,
      href:
        index < levels.length - 1
          ? level.current.href
          : undefined,
    })) ?? [];

  if (!resolvedTitle && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[NavigationPageHeader] navigation_menu에서 경로를 찾지 못했습니다: ${navigationPath}`,
    );
  }

  return (
    <PageHeader
      id={id}
      breadcrumbs={breadcrumbs}
      title={resolvedTitle}
      description={description}
      titleAs={titleAs}
      showDivider={showDivider}
    />
  );
}
