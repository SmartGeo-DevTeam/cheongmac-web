import { prisma } from '@/_lib/prisma';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      include: { content: true, editor: { select: { name: true, email: true } } },
    }),
  ]);

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">CMS</Badge>
          <Badge variant="outline">Revision enabled</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          콘텐츠 관리
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717A]">
          EDITOR 이상 권한에서 사용할 수 있으며, 모든 콘텐츠 변경은 수정 이력과 감사 로그로 남습니다.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <ContentForm />

        <Card>
          <CardHeader>
            <CardTitle>최근 콘텐츠 키</CardTitle>
            <CardDescription>최근 수정 순으로 최대 30개를 표시합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contents.length ? (
                contents.map((item) => (
                  <div key={item.id} className="rounded-lg border border-[#ECECEF] px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-medium text-[#27272A]">{item.key}</p>
                      <Badge variant="outline">v{item.version}</Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#71717A]">{item.value}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#A1A1AA]">아직 등록된 콘텐츠가 없습니다.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 수정 이력</CardTitle>
          <CardDescription>수정자, 버전, 수정일을 확인할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>키</TableHead>
                <TableHead className="w-24">버전</TableHead>
                <TableHead>수정자</TableHead>
                <TableHead className="w-48">수정일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revisions.length ? (
                revisions.map((revision) => (
                  <TableRow key={revision.id}>
                    <TableCell className="font-medium text-[#27272A]">{revision.content.key}</TableCell>
                    <TableCell>v{revision.version}</TableCell>
                    <TableCell>
                      {revision.editor.name}
                      <span className="ml-1 text-xs text-[#A1A1AA]">({revision.editor.email})</span>
                    </TableCell>
                    <TableCell>{revision.createdAt.toLocaleString('ko-KR')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-[#A1A1AA]">
                    아직 수정 이력이 없습니다.
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
