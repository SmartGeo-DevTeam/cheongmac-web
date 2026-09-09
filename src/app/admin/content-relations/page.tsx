import { RELATED_CONTENT_META, RELATED_CONTENT_RESOURCES } from '@/_lib/related-content-types';
import { ArrowRight, Database } from 'lucide-react';
import Link from 'next/link';

export default function RelatedContentHubPage() {
  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
          <Database className="size-4" />
          관계형 콘텐츠 DB
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          콘텐츠 데이터베이스
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          진료분야, 진료시간표, 발표 이력, 환자 후기, 미디어, 의학상담을 독립 데이터로
          관리하고 각 항목의 관련 의료진을 다대다로 연결합니다.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {RELATED_CONTENT_RESOURCES.map((resource) => {
          const meta = RELATED_CONTENT_META[resource];

          return (
            <Link
              key={resource}
              href={meta.href}
              className="group rounded-xl border border-[#E4E4E7] bg-white p-5 transition hover:border-[#B7CFC8] hover:bg-[#FAFCFB]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-[#27272A]">{meta.label}</h2>
                  <p className="mt-2 text-xs leading-5 text-[#71717A]">{meta.description}</p>
                </div>
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-[#A1A1AA] transition group-hover:text-[#006651]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
