import { HistorySection } from '@/app/_ui/about/introduction/history/history-section';
import { histories } from '@/app/_data/about/introduction/history/history';

export default function AboutIntroductionHistoryPage() {
  return (
    <>
      {histories.map((section, index) => (
        <HistorySection
          key={section.id}
          section={section}
          isFirst={index === 0}
        />
      ))}
    </>
  );
}
