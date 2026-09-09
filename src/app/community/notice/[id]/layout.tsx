import { getNoticeDetail, notices } from '../_data';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return notices.map((notice) => ({
    id: notice.id,
  }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const detail = getNoticeDetail(id);
  const description =
    detail.paragraphs?.[0] ??
    detail.lead?.join(' ') ??
    '청맥병원의 주요 공지사항을 확인해보세요.';

  return {
    title: `${detail.title} | 공지사항 | 청맥병원`,
    description,
  };
}

export default function NoticeDetailLayout({ children }: LayoutProps) {
  return children;
}
