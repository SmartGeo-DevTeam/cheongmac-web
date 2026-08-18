export type NewsClientId = 1 | 2 | 3 | 4 | 5;

export type NewsClient = {
  id: NewsClientId;
  name: string;
  /**
   * public 기준 경로를 입력합니다.
   * 예: public/assets/news/clients/health-chosun.png
   *  -> /assets/news/clients/health-chosun.png
   */
  logoSrc?: string;
  /** Next/Image의 원본 비율 계산용 값입니다. 실제 로고 크기에 맞춰 변경할 수 있습니다. */
  logoWidth?: number;
  logoHeight?: number;
};

/**
 * 청맥뉴스 클라이언트 하드 DB
 *
 * 로고를 추가하는 방법
 * 1. public/assets/news/clients/ 폴더에 png, webp, svg 등의 로고 파일을 넣습니다.
 * 2. 해당 클라이언트의 logoSrc에 public을 제외한 경로를 입력합니다.
 * 3. news.ts의 게시물에 clientId를 연결하면 상세 제목 위에 자동 노출됩니다.
 */
export const NEWS_CLIENTS: NewsClient[] = [
  {
    id: 1,
    name: '청맥병원',
  },
  {
    id: 2,
    name: '헬스조선',
    // logoSrc: '/assets/news/clients/health-chosun.png',
    // logoWidth: 100,
    // logoHeight: 24,
  },
  {
    id: 3,
    name: 'KNN',
    // logoSrc: '/assets/news/clients/knn.png',
    // logoWidth: 88,
    // logoHeight: 24,
  },
  {
    id: 4,
    name: '경남의사',
    // logoSrc: '/assets/news/clients/gyeongnam-doctor.png',
    // logoWidth: 96,
    // logoHeight: 24,
  },
  {
    id: 5,
    name: 'MDTODAY',
    // logoSrc: '/assets/news/clients/mdtoday.png',
    // logoWidth: 112,
    // logoHeight: 24,
  },
];

export function getNewsClientById(
  id?: NewsClientId,
): NewsClient | undefined {
  if (!id) return undefined;
  return NEWS_CLIENTS.find((client) => client.id === id);
}
