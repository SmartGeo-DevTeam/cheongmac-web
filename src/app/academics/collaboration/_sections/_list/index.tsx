import ContentList from '@/app/_components/content-list';
import ContentCard from '@/app/_components/content-list/card';
import { collaborations } from '../../data';
import Pagination from './_pagination';
import SearchInput from './_search';

const PAGE_SIZE = 6;

export default function List({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  return (
    <ContentList
      id="academics-collaboration-list"
      items={collaborations}
      getKey={(item) => item.id}
      getSearchText={(item) =>
        [item.title, item.description, item.organization, item.date].join(' ')
      }
      query={query}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      variant="full"
      search={<SearchInput query={query} />}
      renderItem={(item) => (
        <ContentCard media={{ type: 'single', src: item.image, alt: item.alt }}>
          <p className="flex items-center gap-0.5 text-[14px] font-medium text-[#BCBFC7] xl:text-[15px] xl:font-semibold">
            <span>{item.date}</span>
            <span>·</span>
            <span>{item.organization}</span>
          </p>
          <h3 className="mt-2 text-mo-heading-1 text-gray-900 xl:text-pc-heading-2">
            {item.title}
          </h3>
          <p className="mt-2 text-mo-body-1 text-secondary xl:text-pc-body-2">
            {item.description}
          </p>
        </ContentCard>
      )}
      renderPagination={({ currentPage: page, totalPages }) => (
        <Pagination currentPage={page} totalPages={totalPages} query={query} />
      )}
    />
  );
}
