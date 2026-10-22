import { HistorySection } from './_components/history-section';
import { histories } from './data';

export default function AboutIntroductionHistoryPage() {
  return (
    <>
      {histories.map((section) => (
        <HistorySection key={section.id} section={section} />
      ))}
    </>
  );
}
