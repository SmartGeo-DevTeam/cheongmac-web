import {
  RELATED_CONTENT_GROUPS,
  RELATED_CONTENT_META,
} from '@/_lib/related-content-types';
import { ArrowRight, Database } from 'lucide-react';
import Link from 'next/link';

export default function RelatedContentHubPage() {
  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
          <Database className="size-4" />
          관리자 데이터베이스
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          데이터 관리
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          각 데이터베이스는 독립적으로 관리되며 필요한 곳에서 의료진과 연결해
          사용합니다. 용도에 따라 진료 데이터, 학술·미디어, 환자 소통으로
          구분했습니다.
        </p>
      </div>

      {RELATED_CONTENT_GROUPS.map((group) => (
        <section key={group.id} className="space-y-3">
          <div>
            <h2 className="text-base font-semibold text-[#27272A]">
              {group.label}
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#8A8A91]">
              {group.description}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {group.resources.map((resource) => {
              const meta = RELATED_CONTENT_META[resource];

              return (
                <Link
                  key={resource}
                  href={meta.href}
                  className="group rounded-xl border border-[#E4E4E7] bg-white p-5 transition hover:border-[#B7CFC8] hover:bg-[#FAFCFB]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[#27272A]">
                        {meta.label}
                      </h3>
                      <p className="mt-2 break-keep text-xs leading-5 text-[#71717A]">
                        {meta.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-[#A1A1AA] transition group-hover:text-[#006651]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
