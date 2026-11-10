import { notFound } from 'next/navigation';
import EquipmentCategoryList from '@/app/_ui/about/equipment/category-list';
import isEquipmentCategoryId from '@/app/_lib/about/equipment/is-equipment-category-id';

export default async function EquipmentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isEquipmentCategoryId(category)) notFound();

  return <EquipmentCategoryList category={category} />;
}
