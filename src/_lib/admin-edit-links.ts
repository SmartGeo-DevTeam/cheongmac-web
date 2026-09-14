export function managedItemAdminHref(
  pageKey: string,
  itemKey: string,
  focus = 'managed-item-content',
) {
  const params = new URLSearchParams({
    itemKey,
    focus,
  });

  return `/admin/pages/${encodeURIComponent(pageKey)}/resolve?${params.toString()}`;
}

export function doctorAdminHref(
  doctorId: string,
  focus = 'admin-doctor-basic',
) {
  return `/admin/doctors/${encodeURIComponent(doctorId)}#${encodeURIComponent(focus)}`;
}

export function relatedContentAdminHref(
  resource: string,
  id: string | number,
  focus = 'admin-related-content-editor',
) {
  return `/admin/content-relations/${encodeURIComponent(resource)}/${encodeURIComponent(String(id))}#${encodeURIComponent(focus)}`;
}
