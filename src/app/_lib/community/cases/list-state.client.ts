/** 치료 사례 목록의 필터는 URL에, 상세 이동 직전 스크롤은 세션에 저장합니다. */
export type CasesListParams = {
  tab: string;
  category: string;
  query: string;
  page: number;
};

const SCROLL_KEY = 'cheongmac:community-cases:scroll';

export function readCasesListParams(): CasesListParams {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get('page') ?? '1');

  return {
    tab: params.get('tab') ?? 'before-after',
    category: params.get('category') ?? 'all',
    query: params.get('q') ?? '',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

/** replaceState를 사용해 필터 변경이 브라우저 뒤로가기 기록을 늘리지 않게 합니다. */
export function replaceCasesListParams({
  tab,
  category,
  query,
  page,
}: CasesListParams) {
  const url = new URL(window.location.href);

  if (tab === 'before-after') url.searchParams.delete('tab');
  else url.searchParams.set('tab', tab);

  if (category === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', category);

  if (!query.trim()) url.searchParams.delete('q');
  else url.searchParams.set('q', query);

  if (page <= 1) url.searchParams.delete('page');
  else url.searchParams.set('page', String(page));

  window.history.replaceState(
    window.history.state,
    '',
    `${url.pathname}${url.search}${url.hash}`,
  );
}

/** 현재 탭/페이지에서 상세 링크를 클릭하기 직전의 화면 위치를 기록합니다. */
export function saveCasesListScroll() {
  try {
    window.sessionStorage.setItem(
      SCROLL_KEY,
      JSON.stringify({
        url: `${window.location.pathname}${window.location.search}`,
        y: window.scrollY,
      }),
    );
  } catch {
    // 시크릿 브라우징 등에서 세션 저장소가 차단되어도 상세 이동은 가능합니다.
  }
}

/** 동일한 목록 URL로 되돌아온 경우에만 위치를 한 번 복원합니다. */
export function consumeCasesListScroll(): number | null {
  try {
    const value = window.sessionStorage.getItem(SCROLL_KEY);
    if (!value) return null;
    window.sessionStorage.removeItem(SCROLL_KEY);

    const saved: unknown = JSON.parse(value);
    if (typeof saved !== 'object' || saved === null) return null;
    const { url, y } = saved as { url?: unknown; y?: unknown };

    return url === `${window.location.pathname}${window.location.search}` &&
      typeof y === 'number' &&
      Number.isFinite(y) &&
      y >= 0
      ? y
      : null;
  } catch {
    return null;
  }
}
