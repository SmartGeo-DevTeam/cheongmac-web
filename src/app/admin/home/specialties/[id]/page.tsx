import HomeSectionEditor from '../../_components/home-section-editor';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <HomeSectionEditor
      sectionKey="specialties"
      id={id}
    />
  );
}
