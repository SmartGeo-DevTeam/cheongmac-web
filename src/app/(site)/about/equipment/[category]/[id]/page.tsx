import { notFound } from 'next/navigation';
import EquipmentCategoryDetail from '@/app/_ui/about/equipment/category-list';
import isEquipmentCategoryId from '@/app/_lib/about/equipment/is-equipment-category-id';
import { getEquipmentById } from '@/app/_data/about/equipment/equipment';

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
