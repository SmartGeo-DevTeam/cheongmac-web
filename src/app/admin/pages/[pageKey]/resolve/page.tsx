import { getManagedPageConfig, isManagedPageKey } from '@/_lib/page-management-config';
import { ensureManagedPageSeeded } from '@/_lib/managed-pages';
import { prisma } from '@/_lib/prisma';
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ManagedPageItemResolver({
  params,
  searchParams,
}: {
  params: Promise<{ pageKey: string }>;
  searchParams: Promise<{
    itemKey?: string | string[];
    focus?: string | string[];
  }>;
}) {
  const [{ pageKey }, query] = await Promise.all([params, searchParams]);

  if (!isManagedPageKey(pageKey)) notFound();
  getManagedPageConfig(pageKey);

  const itemKey = first(query.itemKey)?.trim();
  const focus = first(query.focus)?.trim() || 'managed-item-content';

  if (!itemKey) notFound();

  await ensureManagedPageSeeded(pageKey);

  const item = await prisma.managedPageItem.findUnique({
    where: {
      pageKey_itemKey: {
        pageKey,
        itemKey,
      },
    },
    select: {
      id: true,
    },
  });

  if (!item) notFound();

  redirect(
    `/admin/pages/${encodeURIComponent(pageKey)}/${encodeURIComponent(item.id)}#${encodeURIComponent(focus)}`,
  );
}
