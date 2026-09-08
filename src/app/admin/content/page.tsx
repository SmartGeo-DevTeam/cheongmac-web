import { prisma } from '@/_lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ContentForm from './content-form';

export default async function AdminContentPage() {
  const [contents, revisions] = await Promise.all([
    prisma.content.findMany({ orderBy: { updatedAt: 'desc' }, take: 30 }),
    prisma.contentRevision.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        content: true,
        editor: { select: { name: true, email: true } },
      },
    }),
  ]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          콘텐츠 관리
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717A]">
          홈페이지에 사용되는 문구와 내용을 등록하고 수정할 수 있습니다. 저장한 내용은 나중에 누가 언제 바꿨는지 확인할 수 있도록 기록됩니다.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <ContentForm />

        <Card>
          <CardHeader>
            <CardTitle>최근 등록한 콘텐츠</CardTitle>
            <CardDescription>
              최근에 저장하거나 수정한 항목을 최대 30개까지 보여줍니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contents.length ? (
                contents.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-[#ECECEF] px-3 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-medium text-[#27272A]">
                        {item.key}
                      </p>
                      <span className="shrink-0 text-xs text-[#A1A1AA]">
                        수정 {item.version}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#71717A]">
                      {item.value}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#A1A1AA]">
                  아직 등록된 콘텐츠가 없습니다.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 변경 기록</CardTitle>
          <CardDescription>
            어떤 내용을 누가 언제 바꿨는지 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>관리 항목</TableHead>
                <TableHead className="w-24">수정 번호</TableHead>
                <TableHead>수정한 사람</TableHead>
                <TableHead className="w-48">수정일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revisions.length ? (
                revisions.map((revision) => (
                  <TableRow key={revision.id}>
                    <TableCell className="font-medium text-[#27272A]">
                      {revision.content.key}
                    </TableCell>
                    <TableCell>{revision.version}</TableCell>
                    <TableCell>
                      {revision.editor.name}
                      <span className="ml-1 text-xs text-[#A1A1AA]">
                        ({revision.editor.email})
                      </span>
                    </TableCell>
                    <TableCell>
                      {revision.createdAt.toLocaleString('ko-KR')}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-[#A1A1AA]"
                  >
                    아직 변경 기록이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
