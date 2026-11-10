import { HistoryType } from '@/app/_data/about/introduction/history/history';
import IntroductionHistoryHistoryItem from './history-item';

export default function IntroductionHistoryHistoryContent({ section }: { section: HistoryType }) {
  return (
    /* 연도별 연혁 */
    <ul
      id="about-history-content"
      className="relative z-10
      xl:flex xl:flex-col xl:items-end
      "
    >
      {section.items.map((item) => (
        <IntroductionHistoryHistoryItem key={item.year} item={item} />
      ))}
    </ul>
  );
}
