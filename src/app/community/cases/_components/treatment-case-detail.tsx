import type { TreatmentCase } from '../_data';
import TreatmentCaseShareButton from './treatment-case-share-button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  item: TreatmentCase;
  previousId?: number;
  nextId?: number;
};

const INFO_ROWS = [
  ['환자정보', 'patient'],
  ['진단명', 'diagnosis'],
  ['치료정보', 'treatment'],
  ['치료 전', 'before'],
  ['치료 후', 'after'],
] as const;

export default function TreatmentCaseDetail({
  item,
  previousId,
  nextId,
}: Props) {
  const values = {
    patient: `${item.patientName} (${item.age}세 · ${item.sex})`,
    diagnosis: item.diagnosis,
    treatment: item.treatment,
    before: item.before,
    after: item.after,
  };

  return (
    <article className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 xl:px-0 xl:pb-28 xl:pt-16">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-end justify-between gap-5 border-b border-[#E2E4E6] pb-5 xl:pb-7">
          <div className="min-w-0">
            <span className="inline-flex min-h-8 items-center rounded-md bg-[#E5F6F1] px-2.5 text-base font-semibold text-[#2C8A75] xl:min-h-9 xl:px-3 xl:text-xl">
              {item.category}
            </span>
            <h2 className="mt-3 break-keep text-2xl font-bold tracking-[-0.035em] text-[#272C31] xl:text-3xl">
              {item.title}
            </h2>
            <time
              dateTime={item.date}
              className="mt-2 block text-sm text-[#A5AAB0] xl:text-xl"
            >
              {item.date.replaceAll('-', '. ')}
            </time>
          </div>

          <TreatmentCaseShareButton />
        </header>

        <div className="mt-7 xl:mt-10">
          {item.mediaType === 'video' ? (
            <div className="relative aspect-[268/151] overflow-hidden rounded-xl bg-black xl:mx-auto xl:max-w-4xl">
              <Image
                src="/assets/images/treatment-cases/case-video.jpg"
                alt={`${item.title} 영상 인터뷰 썸네일`}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 900px, 100vw"
                priority
              />
            </div>
          ) : (
            <div className="relative aspect-[257/193] overflow-hidden rounded-xl bg-[#F2F3F4] xl:mx-auto xl:max-w-4xl">
              <Image
                src="/assets/images/treatment-cases/case-before-after.jpg"
                alt={`${item.title} 치료 전후`}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 900px, 100vw"
                priority
              />
            </div>
          )}
        </div>

        <dl className="mt-7 space-y-4 xl:mt-12 xl:space-y-6">
          {INFO_ROWS.map(([label, key]) => {
            const isLong = key === 'before' || key === 'after';

            return (
              <div
                key={key}
                className={`grid grid-cols-[88px_1fr] items-start gap-3 xl:grid-cols-[130px_1fr] xl:gap-6 ${
                  isLong ? '' : 'min-h-10 items-center'
                }`}
              >
                <dt className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#F5F6F7] px-2 text-base font-medium text-[#454A50] xl:min-h-11 xl:text-xl">
                  {label}
                </dt>
                <dd className="break-keep pt-1 text-base leading-[1.8] text-[#42474C] xl:pt-1.5 xl:text-xl xl:leading-[1.85]">
                  {values[key]}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-9 overflow-hidden rounded-xl xl:mt-12">
          <Image
            src="/assets/images/treatment-cases/doctor-banner.jpg"
            alt="혈관외과 전문의 박용범 원장 책임 진료"
            width={1028}
            height={752}
            className="h-auto w-full"
          />
        </div>

        <p className="mt-4 rounded-xl bg-[#FBF8F4] px-5 py-4 text-center text-base leading-[1.6] text-[#A47B62] xl:mt-5 xl:px-8 xl:py-5 xl:text-xl">
          치료후기는 실제로 진료 받은 환자분들의 자발적 참여를 통해
          만들어 갑니다.
        </p>

        <div className="mt-7 grid border-y border-[#E3E5E7] text-base text-[#777C82] xl:mt-10 xl:grid-cols-2 xl:text-xl">
          <div className="flex min-h-14 items-center gap-3 border-b border-[#E3E5E7] px-3 xl:min-h-16 xl:border-b-0 xl:border-r xl:px-5">
            <ChevronUp className="size-5 shrink-0" />
            <span className="shrink-0">이전글</span>
            {previousId ? (
              <Link
                href={`/community/cases/${previousId}`}
                className="truncate text-[#4C5156] hover:text-cm-green"
              >
                이전글 제목입니다.
              </Link>
            ) : (
              <span className="truncate text-[#B2B6BA]">
                이전글이 없습니다.
              </span>
            )}
          </div>

          <div className="flex min-h-14 items-center gap-3 px-3 xl:min-h-16 xl:px-5">
            <ChevronDown className="size-5 shrink-0" />
            <span className="shrink-0">다음글</span>
            {nextId ? (
              <Link
                href={`/community/cases/${nextId}`}
                className="truncate text-[#4C5156] hover:text-cm-green"
              >
                다음글 제목입니다.
              </Link>
            ) : (
              <span className="truncate text-[#B2B6BA]">
                다음글이 없습니다.
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center xl:mt-10">
          <Link
            href="/community/cases"
            className="inline-flex h-12 min-w-[112px] items-center justify-center rounded-full border border-cm-green px-6 text-base font-semibold text-cm-green transition hover:bg-cm-green hover:text-white xl:h-14 xl:min-w-[136px] xl:text-xl"
          >
            목록보기
          </Link>
        </div>
      </div>
    </article>
  );
}
