import { tabs } from '@/app/_data/about/equipment/tabs';
import { EquipmentCategoryId } from '@/app/_data/about/equipment/equipment';

export default function isEquipmentCategoryId(
  value: string,
): value is EquipmentCategoryId {
  return tabs.some((tab) => tab.id !== 'all' && tab.id === value);
}
