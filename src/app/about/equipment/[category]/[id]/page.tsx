import { notFound } from 'next/navigation';
import EquipmentCategoryDetail from '../../_components/category';
import isEquipmentCategoryId from '../../_lib/is-equipment-category-id';
import { getEquipmentById } from '../../data';

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const equipment = getEquipmentById(id);

  if (
    !isEquipmentCategoryId(category) ||
    !equipment ||
    equipment.category !== category
  ) {
    notFound();
  }

  return <EquipmentCategoryDetail category={category} selectedId={id} />;
}
