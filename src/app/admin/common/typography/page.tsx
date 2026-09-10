import {
  getCurrentSession,
  isActiveMember,
} from '@/_lib/auth-session';
import { canAccessAdmin } from '@/_lib/roles';
import { getTypographySettings } from '@/_lib/typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card';
import { redirect } from 'next/navigation';
import TypographyManager from './typography-manager';

export default async function AdminTypographyPage() {
  const session = await getCurrentSession();

  if (
    !session ||
    !isActiveMember(session) ||
    !canAccessAdmin(session.user.role)
  ) {
    redirect('/admin/content');
  }

  const settings = await getTypographySettings();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          본문 타이포그래피
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          홈페이지 본문에서 사용하는 H1~H6, P의 모바일·데스크탑
          font-size와 line-height를 DB에서 한 번에 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>관리 기준</CardTitle>
          <CardDescription>
            제목과 본문 크기·줄높이만 전역 관리하고, 굵기와 글자색은
            각 콘텐츠 컴포넌트에서 독립적으로 지정할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-[#52525B]">
          <p>
            Strong/Bold는 부모 태그의 크기와 줄높이를 그대로 상속하고
            굵기만 강조합니다.
          </p>
          <p>
            같은 P 안에서 일부 문구만 다른 색을 사용하려면 Typography의
            Text 컴포넌트에 color 값을 지정하면 됩니다.
          </p>
        </CardContent>
      </Card>

      <TypographyManager initialSettings={settings} />
    </section>
  );
}
