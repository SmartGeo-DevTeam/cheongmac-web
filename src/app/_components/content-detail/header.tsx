import ContentDetailShareButton from './share-button';

type Props = {
  category: string;
  title: string;
  date: string;
  shareLabel: string;
  /** 제목 레벨과 배지 색상은 페이지의 역할에 따라 결정합니다. */
  headingLevel?: 'h1' | 'h2';
  badgeVariant?: 'accent' | 'neutral';
  /** 화면별 최상단 여백은 호출하는 쪽에서 지정합니다. */
  className?: string;
};

/** 치료 사례·공지사항 등 상세 콘텐츠의 제목/분류/날짜/공유 영역입니다. */
export default function ContentDetailHeader({
  category,
  title,
  date,
  shareLabel,
  headingLevel = 'h1',
  badgeVariant = 'accent',
  className = '',
}: Props) {
  const Heading = headingLevel;

  return (
    <header
      className={`mt-8 grid grid-cols-[1fr_auto] pb-4 border-b border-b-gray-200
        xl:mt-20 xl:pb-5 xl:border-b-gray-300 ${className}`}
    >
      <span
        className={`inline-block justify-self-start rounded-lg px-2 py-1 font-semibold text-[12px]
          xl:px-3 xl:py-1.5 xl:text-[14px]
          ${badgeVariant === 'neutral' ? 'bg-subtle text-brand' : 'bg-ai-subtle text-brand'}`}
      >
        {category}
      </span>
      <Heading
        className="col-start-1 col-end-2 mt-1 font-bold text-[20px] text-primary
        xl:mt-2 xl:text-pc-heading-1"
      >
        {title}
      </Heading>
      <time
        dateTime={date}
        className="col-start-1 col-end-2 font-medium text-gray-400 text-[14px]
        xl:mt-2 xl:text-[18px]"
      >
        {date.replaceAll('-', '. ')}
      </time>
      <ContentDetailShareButton title={title} ariaLabel={shareLabel} />
    </header>
  );
}
