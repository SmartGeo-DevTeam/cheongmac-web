import { HistoryType } from '../../data';
import HistoryItem from './_components/history-item';

export default function HistoryContent({ section }: { section: HistoryType }) {
  return (
    /* 연도별 연혁 */
    <ul
      id="introduction-history-content"
      className="relative z-10
      xl:flex xl:flex-col xl:items-end
      "
    >
      {section.items.map((item) => (
        <HistoryItem key={item.year} item={item} />
      ))}
    </ul>
  );
}
