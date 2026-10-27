import Image from 'next/image';
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
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredCollaborations = collaborations.filter((item) => {
    if (!normalizedQuery) return true;

    return [item.title, item.description, item.organization, item.date]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery);
  });

  const totalPages = Math.ceil(filteredCollaborations.length / PAGE_SIZE);

  const activePage = Math.min(currentPage, Math.max(totalPages, 1));

  const visibleCollaborations = filteredCollaborations.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  return (
    <section id="academics-collaboration-list">
      <div
        className="mt-5
        xl:mx-auto xl:mt-20 xl:max-w-7xl xl:w-full"
      >
        <div className="px-5 flex justify-between items-end gap-5">
          <div
            className="flex items-center gap-1 text-pc-caption text-gray-500
            xl:font-medium xl:text-[16px]"
          >
            <span>총</span>
            <span>
              <strong
                className="text-accent
                xl:font-semibold"
              >
                {filteredCollaborations.length.toLocaleString('ko-KR')}
              </strong>
            </span>
            <span>건</span>
          </div>

          <SearchInput query={query} />
        </div>
      </div>

      {visibleCollaborations.length > 0 ? (
        <ul
          className="mt-5 mb-20 grid gap-10
          xl:mx-auto xl:px-5 xl:max-w-7xl xl:w-full xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12"
        >
          {visibleCollaborations.map((item) => (
            <li
              key={item.id}
              className="xl:rounded-[20px] xl:border xl:border-default xl:overflow-clip"
            >
              <div className="relative w-full aspect-410/260">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <p
                  className="flex items-center gap-0.5 font-medium text-[#BCBFC7] text-[14px]
                  xl:font-semibold xl:text-[15px]"
                >
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>{item.organization}</span>
                </p>

                <h3
                  className="mt-2 text-mo-heading-1 text-gray-900
                  xl:text-pc-heading-2"
                >
                  {item.title}
                </h3>

                <p
                  className="mt-2 text-mo-body-1 text-secondary
                  xl:text-pc-body-2"
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p role="status" className="my-20 text-center text-secondary">
          검색 결과가 없습니다.
        </p>
      )}

      <Pagination
        currentPage={activePage}
        totalPages={totalPages}
        query={query}
      />
    </section>
  );
}
