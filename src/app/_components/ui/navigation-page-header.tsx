import type {
  InlineContentData,
  InlineContentField,
} from '@/_lib/inline-content-shared';
import { getNavigationPageContext } from '@/_lib/navigation';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import EditableRegion from '@/app/_components/inline-editor/editable-region';
import {
  isValidElement,
  type ReactNode,
} from 'react';
import PageHeader, {
  type PageHeaderTitleAs,
} from './page-header';

const HEADER_FIELDS: readonly InlineContentField[] = [
  {
    key: 'title',
    label: '페이지 제목',
    type: 'text',
    required: true,
  },
  {
    key: 'description',
    label: '페이지 설명',
    type: 'editor',
    description:
      '여러 줄 입력이 가능합니다. 한 글자 단위로 자유롭게 수정할 수 있습니다.',
    rows: 6,
  },
];

function nodeToText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map(nodeToText)
      .filter(Boolean)
      .join(' ');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeToText(node.props.children);
  }

  return '';
}

function normalizedNodeText(node: ReactNode) {
  return nodeToText(node)
    .replace(/\s+/g, ' ')
    .trim();
}

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

  const defaults: InlineContentData = {
    title: normalizedNodeText(resolvedTitle),
    description: normalizedNodeText(description),
  };

  const content = await getPageContentBlock(
    'navigation-page-header',
    navigationPath,
    defaults,
  );

  const savedTitle = content.data.title.trim();
  const savedDescription = content.data.description;

  const titleNode =
    content.persisted && savedTitle
      ? savedTitle
      : resolvedTitle;

  const descriptionNode =
    content.persisted
      ? savedDescription
        ? (
            <span className="whitespace-pre-line">
              {savedDescription}
            </span>
          )
        : undefined
      : description;

  return (
    <EditableRegion
      pageKey="navigation-page-header"
      sectionKey={navigationPath}
      label={`${defaults.title || navigationPath} 페이지 상단`}
      publicPath={navigationPath}
      fields={HEADER_FIELDS}
      data={content.data}
      persisted={content.persisted}
    >
      <PageHeader
        id={id}
        breadcrumbs={breadcrumbs}
        title={titleNode}
        description={descriptionNode}
        titleAs={titleAs}
        showDivider={showDivider}
      />
    </EditableRegion>
  );
}
