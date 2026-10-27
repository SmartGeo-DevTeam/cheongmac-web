import { notFound } from 'next/navigation';
import AboutEquipmentCategory from '../_components/category';
import isEquipmentCategoryId from '../_lib/is-equipment-category-id';

export default async function EquipmentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isEquipmentCategoryId(category)) notFound();

  return <AboutEquipmentCategory category={category} />;
}
