import { tabs } from '../_components/tabs/data';
import { EquipmentCategoryId } from '../data';

export default function isEquipmentCategoryId(
  value: string,
): value is EquipmentCategoryId {
  return tabs.some((tab) => tab.id !== 'all' && tab.id === value);
}
