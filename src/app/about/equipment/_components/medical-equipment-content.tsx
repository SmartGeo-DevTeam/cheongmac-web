'use client';

import {
  EQUIPMENT_CATEGORY_OPTIONS,
  MEDICAL_EQUIPMENT,
  type EquipmentCategory,
  type MedicalEquipment,
} from '../_data';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';

function CategoryTabs({
  value,
  onChange,
}: {
  value: EquipmentCategory;
  onChange: (category: EquipmentCategory) => void;
}) {
  return (
    <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-1 xl:justify-center xl:gap-3">
      {EQUIPMENT_CATEGORY_OPTIONS.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`h-11 shrink-0 rounded-full border px-5 text-base font-medium transition xl:h-12 xl:px-7 xl:text-xl ${
              active
                ? 'border-[#08715F] bg-[#08715F] text-white'
                : 'border-[#E0E3E5] bg-white text-[#81878D] hover:border-[#B9CFC9] hover:text-[#3D454B]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function EquipmentCard({
  item,
  onSelect,
}: {
  item: MedicalEquipment;
  onSelect: (item: MedicalEquipment) => void;
}) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="block w-full text-left"
      >
        <div className="relative aspect-[1.95/1] overflow-hidden rounded-xl bg-[#F3F4F5]">
          <Image
            src={item.image}
            alt={`${item.categoryLabel} ${item.model}`}
            fill
            className="object-contain transition duration-300 group-hover:scale-[1.015]"
            sizes="(min-width: 1280px) 360px, 50vw"
          />
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#FF6B3D] xl:text-base">
              {item.categoryLabel}
            </p>
            <h3 className="mt-1 line-clamp-2 break-keep text-base font-medium text-[#252B33] xl:text-xl">
              {item.model}
            </h3>
          </div>

          <span className="hidden shrink-0 items-center justify-center rounded-md border border-[#B8BEC4] px-3 py-1.5 text-sm font-medium text-[#8B9299] transition hover:border-[#929AA2] hover:text-[#666E76] xl:inline-flex">
            자세히보기
          </span>
        </div>
      </button>
    </article>
  );
}

function AllEquipmentGrid({
  onSelect,
}: {
  onSelect: (item: MedicalEquipment) => void;
}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 xl:mt-12 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-14">
      {MEDICAL_EQUIPMENT.map((item) => (
        <EquipmentCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

function EquipmentDetail({
  item,
}: {
  item: MedicalEquipment;
}) {
  const hasRichDetail = Boolean(
    item.description || item.highlights || item.diseases || item.cases,
  );

  return (
    <div>
      <div className="relative aspect-[1.9/1] overflow-hidden rounded-xl bg-[#F3F4F5]">
        <Image
          src={item.image}
          alt={`${item.categoryLabel} ${item.model}`}
          fill
          className="object-contain"
          sizes="(min-width: 1280px) 760px, 100vw"
          priority={item.id === 'ct'}
        />

        <span className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-[#C9CED3] xl:block">
          <ChevronLeft className="size-8" strokeWidth={1.5} />
        </span>
        <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-[#C9CED3] xl:block">
          <ChevronRight className="size-8" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-5 xl:mt-7">
        <p className="text-base font-semibold text-[#FF6B3D] xl:text-xl">
          {item.categoryLabel}
        </p>
        <h2 className="mt-1 break-keep text-2xl font-bold tracking-[-0.035em] text-[#252B33] xl:text-[32px]">
          {item.model}
        </h2>

        {item.subtitle ? (
          <p className="mt-3 border-b border-[#BFC4C8] pb-5 text-base font-semibold text-[#565D64] xl:mt-4 xl:pb-6 xl:text-xl">
            {item.subtitle}
          </p>
        ) : (
          <div className="mt-4 border-b border-[#BFC4C8]" />
        )}
      </div>

      {item.description ? (
        <p className="mt-5 break-keep text-base leading-[1.75] text-[#52585E] xl:mt-6 xl:text-xl xl:leading-[1.8]">
          {item.description}
        </p>
      ) : (
        <p className="mt-5 text-base leading-[1.7] text-[#92979C] xl:mt-6 xl:text-xl">
          장비별 상세 설명은 실제 콘텐츠 연동 시 입력됩니다.
        </p>
      )}

      {item.highlights ? (
        <div className="mt-5 grid gap-3 xl:grid-cols-2">
          {item.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex min-h-12 items-center gap-3 rounded-full bg-[#F4F5F6] px-4 text-base text-[#3F454B] xl:min-h-14 xl:px-5 xl:text-lg"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#79CDBB]">
                <Check className="size-5" strokeWidth={2} />
              </span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      ) : null}

      {item.diseases ? (
        <section className="mt-12 xl:mt-20">
          <p className="text-sm font-semibold text-[#A2A7AC] xl:text-xl">
            진단 가능 질환
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#252B33] xl:text-[32px]">
            어떤 질환을 알 수 있나요?
          </h3>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.diseases.map((disease) => (
              <span
                key={disease}
                className="inline-flex min-h-10 items-center rounded-full border border-[#08715F] px-4 text-base font-medium text-[#08715F] xl:min-h-11 xl:text-lg"
              >
                {disease}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {item.cases ? (
        <section className="mt-12 xl:mt-20">
          <p className="text-sm font-semibold text-[#A2A7AC] xl:text-xl">
            실제 진단 사례
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#252B33] xl:text-[32px]">
            검사 결과, 이렇게 확인해요
          </h3>

          <div className="mt-6 grid gap-8 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-10">
            {item.cases.map((caseItem, index) => (
              <article
                key={caseItem.id}
                className={caseItem.id === 'dvt' ? 'xl:col-span-1' : ''}
              >
                {caseItem.id === 'dvt' ? (
                  <div className="grid gap-2">
                    <div className="relative aspect-[1.45/1] overflow-hidden rounded-xl bg-black">
                      <Image
                        src="/assets/images/medical-equipment/ct-case-dvt-before.jpg"
                        alt="심부정맥혈전증 치료 전"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 340px, 100vw"
                      />
                      <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-[#252B33]">
                        심부정맥혈전증 치료 전
                      </span>
                    </div>
                    <div className="relative aspect-[1.45/1] overflow-hidden rounded-xl bg-black">
                      <Image
                        src="/assets/images/medical-equipment/ct-case-dvt-after.jpg"
                        alt="심부정맥혈전증 치료 후"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 340px, 100vw"
                      />
                      <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-[#252B33]">
                        심부정맥혈전증 치료 후
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[1.45/1] overflow-hidden rounded-xl bg-black">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 340px, 100vw"
                    />
                    <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-sm font-medium text-[#252B33]">
                      {caseItem.title}
                    </span>
                  </div>
                )}

                <p className="mt-3 break-keep text-base leading-[1.65] text-[#52585E] xl:text-lg">
                  {caseItem.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!hasRichDetail ? (
        <div className="mt-10 rounded-xl bg-[#F7F8F8] px-5 py-6 text-base leading-[1.7] text-[#777D83] xl:text-xl">
          현재는 장비명과 분류를 기준으로 UI를 구성한 더미 데이터입니다.
          실제 장비 설명과 진단 사례가 확정되면 이 영역에 바로 연결할 수 있습니다.
        </div>
      ) : null}
    </div>
  );
}

function DesktopCategoryDetail({
  category,
  selected,
  onSelect,
}: {
  category: Exclude<EquipmentCategory, 'all'>;
  selected: MedicalEquipment;
  onSelect: (item: MedicalEquipment) => void;
}) {
  const items = MEDICAL_EQUIPMENT.filter((item) => item.category === category);

  return (
    <div className="mx-auto mt-14 hidden w-full max-w-[1120px] grid-cols-[220px_minmax(0,1fr)] gap-16 xl:grid">
      <aside className="sticky top-32 self-start pt-1">
        <p className="mb-5 text-xl font-semibold tracking-[-0.025em] text-[#08715F]">
          {EQUIPMENT_CATEGORY_OPTIONS.find((option) => option.value === category)
            ?.label}
          장비
        </p>

        <nav aria-label="첨단의료장비 목록" className="flex flex-col gap-3">
          {items.map((item) => {
            const active = selected.id === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                aria-current={active ? 'true' : undefined}
                className={`w-full break-keep text-left text-[26px] tracking-[-0.045em] transition ${
                  active
                    ? 'font-bold text-[#252B33]'
                    : 'font-semibold text-[#9AA0A6] hover:text-[#646B72]'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0">
        <EquipmentDetail item={selected} />
      </div>
    </div>
  );
}

function MobileCategoryDetail({
  category,
  openId,
  onToggle,
}: {
  category: Exclude<EquipmentCategory, 'all'>;
  openId: string | null;
  onToggle: (item: MedicalEquipment) => void;
}) {
  const items = MEDICAL_EQUIPMENT.filter((item) => item.category === category);

  return (
    <div className="mt-6 xl:hidden">
      <div className="border-y border-[#2C3137]">
        {items.map((item) => {
          const active = openId === item.id;
          const panelId = `mobile-equipment-panel-${item.id}`;

          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => onToggle(item)}
                aria-expanded={active}
                aria-controls={panelId}
                className={`flex w-full items-center justify-between gap-3 border-b border-[#E1E4E6] px-3 py-4 text-left transition ${
                  active ? 'bg-[#FFF7F3]' : 'bg-white'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#FF6B3D]">
                    {item.categoryLabel}
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-[#252B33]">
                    {item.model}
                  </p>
                </div>
                {active ? (
                  <Minus className="size-5 shrink-0 text-[#B9BEC3]" />
                ) : (
                  <Plus className="size-5 shrink-0 text-[#B9BEC3]" />
                )}
              </button>

              {active ? (
                <div id={panelId} className="px-1 pb-8 pt-5">
                  <EquipmentDetail item={item} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MedicalEquipmentContent() {
  const [category, setCategory] = useState<EquipmentCategory>('all');
  const [selectedId, setSelectedId] = useState('ct');
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const contentTopRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => {
    const categoryItems =
      category === 'all'
        ? MEDICAL_EQUIPMENT
        : MEDICAL_EQUIPMENT.filter((item) => item.category === category);

    return (
      categoryItems.find((item) => item.id === selectedId) ??
      categoryItems[0] ??
      MEDICAL_EQUIPMENT[0]
    );
  }, [category, selectedId]);

  const changeCategory = (next: EquipmentCategory) => {
    setCategory(next);

    if (next === 'all') {
      setMobileOpenId(null);
      return;
    }

    const first = MEDICAL_EQUIPMENT.find((item) => item.category === next);

    if (first) {
      setSelectedId(first.id);
      setMobileOpenId(first.id);
    }
  };

  const selectEquipment = (item: MedicalEquipment) => {
    setSelectedId(item.id);

    if (category === 'all') {
      setCategory(item.category);
      setMobileOpenId(item.id);

      requestAnimationFrame(() => {
        contentTopRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const toggleMobileEquipment = (item: MedicalEquipment) => {
    if (mobileOpenId === item.id) {
      setMobileOpenId(null);
      return;
    }

    setSelectedId(item.id);
    setMobileOpenId(item.id);
  };

  return (
    <div
      ref={contentTopRef}
      className="mx-auto w-full max-w-7xl scroll-mt-28 px-5 pb-20 pt-8 xl:px-0 xl:pb-28 xl:pt-14"
    >
      <CategoryTabs value={category} onChange={changeCategory} />

      {category === 'all' ? (
        <AllEquipmentGrid onSelect={selectEquipment} />
      ) : (
        <>
          <DesktopCategoryDetail
            category={category}
            selected={selected}
            onSelect={selectEquipment}
          />
          <MobileCategoryDetail
            category={category}
            openId={mobileOpenId}
            onToggle={toggleMobileEquipment}
          />
        </>
      )}
    </div>
  );
}
