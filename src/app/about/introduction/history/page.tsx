import { HistorySection } from './_components/_history-section';
import { histories } from './data';

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
