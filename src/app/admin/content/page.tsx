import { prisma } from '@/_lib/prisma';
import ContentForm from './content-form';

export default async function AdminContentPage() {
  const [contents, revisions] = await Promise.all([
    prisma.content.findMany({ orderBy: { updatedAt: 'desc' }, take: 30 }),
    prisma.contentRevision.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { content: true, editor: { select: { name: true, email: true } } },
    }),
  ]);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#222222]">콘텐츠 관리</h1>
          <p className="mt-2 text-sm text-[#777777]">EDITOR 이상 권한에서 사용할 수 있으며 모든 변경은 수정 이력과 감사 로그로 남습니다.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <ContentForm />
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#333333]">최근 등록된 콘텐츠 키</h2>
          <div className="mt-4 space-y-2">
            {contents.length ? contents.map((item) => (
              <div key={item.id} className="rounded-xl border border-[#ECEDEE] p-3">
                <p className="text-sm font-semibold text-[#333333]">{item.key}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#777777]">{item.value}</p>
                <p className="mt-1 text-[11px] text-[#AAAAAA]">v{item.version}</p>
              </div>
            )) : <p className="text-sm text-[#999999]">아직 등록된 콘텐츠가 없습니다.</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm xl:p-6">
        <h2 className="font-bold text-[#333333]">최근 수정 이력</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#E8E8E8] text-[#777777]">
              <tr><th className="py-3">키</th><th>버전</th><th>수정자</th><th>수정일</th></tr>
            </thead>
            <tbody>
              {revisions.map((revision) => (
                <tr key={revision.id} className="border-b border-[#F0F0F0]">
                  <td className="py-3 font-medium text-[#333333]">{revision.content.key}</td>
                  <td>v{revision.version}</td>
                  <td>{revision.editor.name} ({revision.editor.email})</td>
                  <td>{revision.createdAt.toLocaleString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
