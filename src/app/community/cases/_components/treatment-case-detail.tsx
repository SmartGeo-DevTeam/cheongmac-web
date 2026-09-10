import {
  H1 as TypographyH1,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { buttonClassName } from '@/app/_components/ui/button';
import type { TreatmentCase, TreatmentCaseDetailMedia } from '../_data';
import TreatmentCaseShareButton from './treatment-case-share-button';
import { TreatmentCaseBlurredText, TreatmentCaseContentLock, TreatmentCaseImageLock } from './treatment-case-access';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = { item: TreatmentCase; previousId?: number; nextId?: number; isAuthenticated: boolean };
const INFO_ROWS = [['환자정보', 'patient'], ['진단명', 'diagnosis'], ['치료정보', 'treatment'], ['치료 전', 'before'], ['치료 후', 'after']] as const;

function getYoutubeEmbedUrl(youtubeUrl: string) {
  try {
    const parsed = new URL(youtubeUrl);
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(parsed.hostname)) {
      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/embed/')[1]?.split('/')[0];
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    return null;
  } catch { return null; }
}

function TreatmentCaseMedia({ media, title, isAuthenticated }: { media: TreatmentCaseDetailMedia; title: string; isAuthenticated: boolean }) {
  if (media.type === 'youtube') {
    const embedUrl = getYoutubeEmbedUrl(media.youtubeUrl);
    if (embedUrl) {
      return <div className="overflow-hidden rounded-xl bg-black shadow-[0_1px_4px_rgba(0,0,0,0.08)]"><div className="relative aspect-video w-full"><iframe src={embedUrl} title={`${title} 영상`} className="absolute inset-0 size-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div>;
    }
    if (media.fallbackImage) return <div className="relative aspect-video overflow-hidden rounded-xl bg-black"><Image src={media.fallbackImage} alt={`${title} 영상 썸네일`} fill className="object-cover" sizes="(min-width: 1280px) 900px, 100vw" priority /></div>;
    return null;
  }

  return (
    <div className="space-y-7 xl:space-y-10">
      <div className="relative overflow-hidden rounded-xl bg-[#F2F3F4] shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
        <Image src={media.comparisonImage} alt={`${title} 치료 전후`} width={1040} height={650} className="h-auto w-full" priority />
        {!isAuthenticated ? <TreatmentCaseImageLock /> : null}
      </div>
      {media.diagnosticComparisonImage ? (
        <div className="relative overflow-hidden rounded-xl border border-[#E1E3E5] bg-white shadow-[0_1px_5px_rgba(0,0,0,0.06)]">
          <Image src={media.diagnosticComparisonImage} alt={`${title} CT 치료 전후`} width={1040} height={610} className="h-auto w-full" />
          {!isAuthenticated ? <TreatmentCaseImageLock /> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function TreatmentCaseDetail({ item, previousId, nextId, isAuthenticated }: Props) {
  const values = { patient: `${item.patientName} (${item.age}세 · ${item.sex})`, diagnosis: item.diagnosis, treatment: item.treatment, before: item.before, after: item.after };

  return (
    <article
      aria-labelledby="treatment-case-detail-title"
      className="mx-auto w-full max-w-7xl px-5 pb-20 xl:px-0 xl:pb-28"
    >
      <div className="mx-auto max-w-5xl">
        <header className="flex items-end justify-between gap-5 border-b border-[#E2E4E6] pb-5 xl:pb-7">
          <div className="min-w-0">
            <span className="inline-flex min-h-8 items-center rounded-md bg-[#E5F6F1] px-2.5 text-base font-semibold text-[#2C8A75] xl:min-h-9 xl:px-3 xl:text-xl">{item.category}</span>
            <TypographyH1 managed={false} id="treatment-case-detail-title" className="mt-3 break-keep text-2xl font-bold tracking-[-0.035em] text-[#272C31] xl:text-3xl">{item.title}</TypographyH1>
            <time dateTime={item.date} className="mt-2 block text-sm text-[#A5AAB0] xl:text-xl">{item.date.replaceAll('-', '. ')}</time>
          </div>
          <TreatmentCaseShareButton />
        </header>

        <div className="mx-auto mt-7 max-w-4xl xl:mt-10"><TreatmentCaseMedia media={item.detailMedia} title={item.title} isAuthenticated={isAuthenticated} /></div>

        <dl className="mt-7 space-y-4 xl:mt-12 xl:space-y-6">
          {INFO_ROWS.map(([label, key]) => {
            const isLong = key === 'before' || key === 'after';
            const isProtectedTreatment = item.detailMedia.type === 'before-after' && !isAuthenticated;
            const shouldBlur = isProtectedTreatment && (key === 'treatment' || key === 'before');
            if (isProtectedTreatment && key === 'after') return <div key={key}><TreatmentCaseContentLock /></div>;
            return (
              <div key={key} className={`grid grid-cols-[88px_1fr] items-start gap-3 xl:grid-cols-[130px_1fr] xl:gap-6 ${isLong ? '' : 'min-h-10 items-center'}`}>
                <dt className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#F5F6F7] px-2 text-base font-medium text-[#454A50] xl:min-h-11 xl:text-xl">{label}</dt>
                <dd className="break-keep pt-1 text-base leading-[1.8] text-[#42474C] xl:pt-1.5 xl:text-xl xl:leading-[1.85]">{shouldBlur ? <TreatmentCaseBlurredText>{values[key]}</TreatmentCaseBlurredText> : values[key]}</dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-9 overflow-hidden rounded-xl xl:mt-12"><Image src="/assets/images/treatment-cases/doctor-banner.jpg" alt="혈관외과 전문의 박용범 원장 책임 진료" width={1028} height={752} className="h-auto w-full" /></div>
        <TypographyP className="mt-4 rounded-xl bg-[#FBF8F4] px-5 py-4 text-center text-base leading-[1.6] text-[#A47B62] xl:mt-5 xl:px-8 xl:py-5 xl:text-xl">치료후기는 실제로 진료 받은 환자분들의 자발적 참여를 통해 만들어 갑니다.</TypographyP>

        <div className="mt-7 grid border-y border-[#E3E5E7] text-base text-[#777C82] xl:mt-10 xl:grid-cols-2 xl:text-xl">
          <div className="flex min-h-14 items-center gap-3 border-b border-[#E3E5E7] px-3 xl:min-h-16 xl:border-b-0 xl:border-r xl:px-5"><ChevronUp className="size-5 shrink-0" /><span className="shrink-0">이전글</span>{previousId ? <Link href={`/community/cases/${previousId}`} className="truncate text-[#4C5156] hover:text-cm-green">이전글 제목입니다.</Link> : <span className="truncate text-[#B2B6BA]">이전글이 없습니다.</span>}</div>
          <div className="flex min-h-14 items-center gap-3 px-3 xl:min-h-16 xl:px-5"><ChevronDown className="size-5 shrink-0" /><span className="shrink-0">다음글</span>{nextId ? <Link href={`/community/cases/${nextId}`} className="truncate text-[#4C5156] hover:text-cm-green">다음글 제목입니다.</Link> : <span className="truncate text-[#B2B6BA]">다음글이 없습니다.</span>}</div>
        </div>
        <div className="mt-8 flex justify-center xl:mt-10"><Link href="/community/cases" className={buttonClassName({ variant: 'outline', size: 'lg' })}>목록보기</Link></div>
      </div>
    </article>
  );
}
