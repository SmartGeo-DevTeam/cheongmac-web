import { updateCustomerVoiceStatus } from '@/app/admin/_actions/customer-voice';
import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { createPrivateAttachmentUrl } from '@/_lib/private-form-storage';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin, normalizeRole } from '@/_lib/roles';
import { ArrowLeft, ExternalLink, Save } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function categoryLabel(value: string) {
  if (value === 'praise') return '칭찬/감사';
  if (value === 'suggestion') return '건의사항';
  if (value === 'complaint') return '불만/고충';
  return value;
}

export default async function AdminCustomerVoiceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getCurrentSession();
  if (
    !session ||
    !isActiveMember(session) ||
    !canAccessAdmin(normalizeRole(session.user.role))
  ) {
    redirect('/admin');
  }

  const { id } = await params;
  const item = await prisma.customerVoiceSubmission.findUnique({
    where: { id },
  });

  if (!item) notFound();

  const attachmentUrl = await createPrivateAttachmentUrl(item.attachmentUrl);

  return (
    <section className="space-y-6 pb-12">
      <div>
        <Link
          href="/admin/customer-voice"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-[#18181B]"
        >
          <ArrowLeft className="size-3.5" />
          고객의 소리
        </Link>
        <p className="mt-4 text-xs font-medium text-[#A1A1AA]">
          소통공간 · {categoryLabel(item.category)}
        </p>
        <h1 className="mt-1 break-keep text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          {item.title}
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-[#27272A]">접수 내용</h2>
          <p className="mt-5 whitespace-pre-wrap break-keep text-sm leading-7 text-[#52525B]">
            {item.content}
          </p>

          {item.attachmentName ? (
            <div className="mt-6 rounded-lg bg-[#F7F7F8] px-4 py-3">
              <p className="text-xs font-medium text-[#71717A]">첨부파일</p>
              {attachmentUrl ? (
                <a
                  href={attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#006651]"
                >
                  {item.attachmentName}
                  <ExternalLink className="size-3.5" />
                </a>
              ) : (
                <p className="mt-1 text-sm text-[#52525B]">{item.attachmentName}</p>
              )}
            </div>
          ) : null}
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-[#E4E4E7] bg-white p-5">
            <h2 className="text-sm font-semibold text-[#27272A]">작성자 정보</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-[#A1A1AA]">이름</dt>
                <dd className="mt-1 font-medium text-[#52525B]">{item.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#A1A1AA]">연락처</dt>
                <dd className="mt-1 font-medium text-[#52525B]">{item.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#A1A1AA]">접수일</dt>
                <dd className="mt-1 font-medium text-[#52525B]">
                  {new Intl.DateTimeFormat('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(item.createdAt)}
                </dd>
              </div>
            </dl>
          </div>

          <form
            action={updateCustomerVoiceStatus.bind(null, item.id)}
            className="rounded-xl border border-[#E4E4E7] bg-white p-5"
          >
            <label
              htmlFor="customer-voice-status"
              className="text-sm font-semibold text-[#27272A]"
            >
              처리 상태
            </label>
            <select
              id="customer-voice-status"
              name="status"
              defaultValue={item.status}
              className="mt-3 h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#52525B]"
            >
              <option value="RECEIVED">접수</option>
              <option value="IN_PROGRESS">처리중</option>
              <option value="COMPLETED">완료</option>
              <option value="ARCHIVED">보관</option>
            </select>
            <button
              type="submit"
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#18181B] text-sm font-medium text-white"
            >
              <Save className="size-4" />
              상태 저장
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
