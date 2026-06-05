import Link from 'next/link';

const notices = [
  {
    id: 1,
    category: '공지사항',
    date: '2026-05-22',
    title: '5월 휴진 안내',
    description: '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',
    href: '/',
  },
  {
    id: 2,
    category: '연구학회',
    date: '2026-05-22',
    title: '박용범 원장 대한정맥학회',
    description: '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',
    href: '/',
  },
  {
    id: 3,
    category: '원내소식',
    date: '2026-05-22',
    title: '하지정맥류 수술 50,000',
    description: '하지정맥류 수술 50,000례 달성을 기념하여 원내 행사가 진행',
    href: '/',
  },
  {
    id: 4,
    category: '공지사항',
    date: '2026-05-22',
    title: '5월 휴진 안내',
    description: '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',
    href: '/',
  },
  {
    id: 5,
    category: '연구학회',
    date: '2026-05-22',
    title: '박용범 원장 대한정맥학회',
    description: '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',
    href: '/',
  },
  {
    id: 6,
    category: '연구학회',
    date: '2026-05-22',
    title: '박용범 원장 대한정맥학회',
    description: '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',
    href: '/',
  },
  {
    id: 7,
    category: '원내소식',
    date: '2026-05-22',
    title: '하지정맥류 수술 50,000',
    description: '하지정맥류 수술 50,000례 달성을 기념하여 원내 행사가 진행',
    href: '/',
  },
  {
    id: 8,
    category: '공지사항',
    date: '2026-05-22',
    title: '5월 휴진 안내',
    description: '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',
    href: '/',
  },
  {
    id: 9,
    category: '연구학회',
    date: '2026-05-22',
    title: '박용범 원장 대한정맥학회',
    description: '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',
    href: '/',
  },
] as const;

export default function HomeInfo() {
  return (
    <section className="mt-25 xl:mt-40">
      <div
        className="px-5 text-[#262C35]
        xl:mx-auto xl:max-w-7xl xl:w-full"
      >
        <span
          className="font-semibold text-lg
          xl:text-2xl"
        >
          알려드립니다
        </span>
        <h2
          className="mt-2 font-bold text-[30px]
          xl:text-[50px]"
        >
          청맥병원 소식
        </h2>
      </div>

      <div
        className="mt-5 overflow-x-auto overflow-y-hidden
        xl:mt-6"
      >
        <ul
          className="px-5 flex w-max items-stretch gap-3 text-[#262C35]
          xl:gap-6 xl:pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] xl:pr-5"
        >
          {notices.map((notice) => (
            <li key={notice.id} className="flex shrink-0">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={notice.href}
                className="px-5 pt-7 pb-10 w-[60vw] flex flex-col rounded-2xl bg-[#F3F3F3]
                xl:px-10 xl:pt-10 xl:pb-15 xl:w-[16vw]"
              >
                <div
                  className="flex items-center gap-1.75 font-medium text-xs
                  xl:gap-3 xl:text-sm"
                >
                  <h4
                    className="px-3 py-0.75 rounded-sm bg-white
                    xl:px-5 xl:py-1.5"
                  >
                    {notice.category}
                  </h4>
                  <span>{notice.date}</span>
                </div>

                <h3
                  className="mt-3 font-extrabold text-lg
                  xl:mt-6.5 xl:text-2xl"
                >
                  {notice.title}
                </h3>
                <p
                  className="mt-3 break-keep text-sm
                  xl:mt-5 xl:text-xl"
                >
                  {notice.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-5 flex justify-center
        xl:mx-auto xl:mt-10 xl:max-w-7xl xl:w-full"
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`/`}
          className="px-10 py-2.5 rounded-full bg-[#333333] text-white
          xl:text-xl"
        >
          더보기
        </Link>
      </div>
    </section>
  );
}
