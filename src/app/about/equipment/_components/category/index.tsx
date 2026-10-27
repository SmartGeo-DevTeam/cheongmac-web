import Inner from '@/app/_components/common/inner';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { equipments, type EquipmentCategoryId } from '../../data';
import AboutEquipmentDetail from '../detail';
import { tabs } from '../tabs/data';

export default function AboutEquipmentCategory({
  category,
  selectedId,
}: {
  category: EquipmentCategoryId;
  selectedId?: string;
}) {
  const items = equipments.filter(
    (equipment) => equipment.category === category,
  );
  const selected =
    items.find((equipment) => equipment.id === selectedId) ?? items[0];
  const categoryLabel = tabs.find((tab) => tab.id === category)?.label ?? '';
  const categoryHref = `/about/equipment/${category}`;

  if (!selected) return null;

  const selectedIndex = items.findIndex(
    (equipment) => equipment.id === selected.id,
  );
  const previous = items[(selectedIndex - 1 + items.length) % items.length];
  const next = items[(selectedIndex + 1) % items.length];

  return (
    <section id="about-equipment-category">
      <Inner>
        <div
          className="mt-8 mb-20
          xl:mt-15 xl:grid xl:grid-cols-4 xl:gap-24"
        >
          <aside
            className="min-w-0
            xl:col-span-1 xl:sticky xl:top-32 xl:self-start"
          >
            <h2
              className="hidden font-semibold text-brand text-[20px]
              xl:block xl:text-pc-heading-2"
            >
              {categoryLabel} 장비
            </h2>

            <nav aria-label={`${categoryLabel} 장비 목록`}>
              <ul
                className="border-y border-dim
                xl:mt-5 xl:space-y-2 xl:border-0"
              >
                {items.map((equipment) => {
                  const isOpen = selectedId === equipment.id;
                  const isDesktopActive = selected.id === equipment.id;
                  const detailHref = `${categoryHref}/${equipment.id}`;
                  const mobileHref = `${isOpen ? categoryHref : detailHref}#about-euipment-tabs`;

                  return (
                    <li
                      key={equipment.id}
                      className="border-b border-default last:border-b-0 xl:border-0"
                    >
                      <Link
                        href={mobileHref}
                        aria-expanded={isOpen}
                        aria-controls={
                          isOpen ? `equipment-panel-${equipment.id}` : undefined
                        }
                        className={`
                          px-3 py-4 flex justify-between items-center gap-3 text-left
                          xl:hidden
                          ${isOpen ? 'bg-orange-50' : ''}
                          `}
                      >
                        <div>
                          <p className="font-semibold text-accent text-[16px]">
                            {equipment.title}
                          </p>
                          <h4 className="text-mo-heading-2">
                            {equipment.model}
                          </h4>
                        </div>
                        {isOpen ? (
                          <Minus className="size-6 text-border-strong" />
                        ) : (
                          <Plus className="size-6 text-border-strong" />
                        )}
                      </Link>

                      {isOpen && (
                        <div
                          id={`equipment-panel-${equipment.id}`}
                          className="mt-5
                          xl:hidden"
                        >
                          <AboutEquipmentDetail equipment={equipment} />
                        </div>
                      )}

                      <Link
                        href={detailHref}
                        scroll={false}
                        aria-current={
                          selectedId === equipment.id ? 'page' : undefined
                        }
                        className={`hidden
                          xl:block xl:text-pc-title-2 xl:break-keep
                          ${isDesktopActive ? '' : 'text-disabled'}`}
                      >
                        {equipment.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="hidden min-w-0 xl:col-span-3 xl:block">
            <AboutEquipmentDetail
              equipment={selected}
              previousHref={
                items.length > 1 ? `${categoryHref}/${previous.id}` : undefined
              }
              nextHref={
                items.length > 1 ? `${categoryHref}/${next.id}` : undefined
              }
            />
          </div>
        </div>
      </Inner>
    </section>
  );
}
