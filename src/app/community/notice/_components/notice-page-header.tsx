import PageHeader from '@/app/_components/ui/page-header';

export default function NoticePageHeader() {
  return (
    <PageHeader
      breadcrumbs={[
        { label: '소통공간', href: '/community/cases' },
        { label: '공지사항' },
      ]}
      title="공지사항"
    />
  );
}
