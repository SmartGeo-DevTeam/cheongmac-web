import {
  MANAGED_PAGE_CONFIGS,
  MANAGED_PAGE_KEYS,
} from '@/_lib/page-management-config';
import {
  ArrowRight,
  Building2,
  HeartPulse,
  Handshake,
  Microscope,
  Newspaper,
  Presentation,
  ScrollText,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

const ICONS: Record<string, LucideIcon> = {
  tour: Building2,
  equipment: Microscope,
  exchange: Handshake,
  society: Presentation,
  cases: HeartPulse,
  notice: ScrollText,
  news: Newspaper,
  'partner-hospital': Building2,
};

export default function AdminManagedPagesHub() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium text-[#A1A1AA]">페이지 관리</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          홈페이지 페이지 데이터
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          각 홈페이지 페이지에 노출되는 항목을 페이지명 기준으로 관리합니다.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {MANAGED_PAGE_KEYS.map((pageKey) => {
          const config = MANAGED_PAGE_CONFIGS[pageKey];
          const Icon = ICONS[pageKey] ?? Newspaper;

          return (
            <Link
              key={pageKey}
              href={`/admin/pages/${pageKey}`}
              className="group rounded-xl border border-[#E4E4E7] bg-white p-5 transition hover:border-[#B7CFC8] hover:bg-[#FAFCFB]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#F4F4F5] text-[#52525B]">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#A1A1AA]">
                      {config.groupLabel}
                    </p>
                    <h2 className="mt-0.5 text-base font-semibold text-[#27272A]">
                      {config.label}
                    </h2>
                    <p className="mt-2 break-keep text-xs leading-5 text-[#71717A]">
                      {config.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="mt-2 size-4 shrink-0 text-[#A1A1AA] transition group-hover:text-[#006651]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
