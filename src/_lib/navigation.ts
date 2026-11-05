export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'about',
    href: '/about/introduction',
    title: '병원 소개',
    children: [
      /*
       * 새 LNB 시안 전체 구조
       *
       * 아직 페이지가 구현되지 않은 메뉴는 노출하지 않습니다.
       * 실제 페이지가 구현되면 href를 확정한 뒤 해당 항목의 주석만 해제합니다.
       */

      {
        id: 'about-introduction',
        href: '/about/introduction',
        title: '청맥병원 소개',
      },
      {
        id: 'about-doctors',
        href: '/about/doctors',
        title: '의료진/진료과',
      },
      {
        id: 'about-tour',
        href: '/about/tour',
        title: '병원 둘러보기',
      },
      {
        id: 'about-equipment',
        href: '/about/equipment',
        title: '첨단의료장비',
      },
    ],
  },

  /*
   * 혈관중점진료
   *
   * 현재 구현된 연결 페이지가 없어 GNB/LNB 모두 비노출합니다.
   * 각 페이지 구현 시 이 블록과 필요한 하위 항목의 주석을 해제합니다.
   */
  // {
  //   id: 'vascular',
  //   href: '/vascular/arterial',
  //   title: '혈관중점진료',
  //   children: [
  //     {
  //       id: 'vascular-arterial',
  //       href: '/vascular/arterial',
  //       title: '동맥질환',
  //       children: [
  //         {
  //           id: 'vascular-arterial-atherosclerosis',
  //           href: '/vascular/arterial/atherosclerosis',
  //           title: '말초동맥폐쇄증',
  //         },
  //         {
  //           id: 'vascular-arterial-aorta',
  //           href: '/vascular/arterial/aorta',
  //           title: '대동맥질환',
  //         },
  //         {
  //           id: 'vascular-arterial-foot',
  //           href: '/vascular/arterial/foot',
  //           title: '당뇨발',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'vascular-venous',
  //       href: '/vascular/venous',
  //       title: '정맥질환',
  //       children: [
  //         {
  //           id: 'vascular-venous-varicose',
  //           href: '/vascular/venous/varicose',
  //           title: '하지정맥류',
  //         },
  //         {
  //           id: 'vascular-venous-pelvic',
  //           href: '/vascular/venous/pelvic',
  //           title: '골반정맥류',
  //         },
  //         {
  //           id: 'vascular-venous-spermatic',
  //           href: '/vascular/venous/spermatic',
  //           title: '정계정맥류',
  //         },
  //         {
  //           id: 'vascular-venous-dvt',
  //           href: '/vascular/venous/dvt',
  //           title: '심부정맥혈전증',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'vascular-special',
  //       href: '/vascular/special',
  //       title: '특수혈관질환',
  //       children: [
  //         {
  //           id: 'vascular-special-nutcracker',
  //           href: '/vascular/special/nutcracker',
  //           title: '호두까기증후군',
  //         },
  //         {
  //           id: 'vascular-special-kt',
  //           href: '/vascular/special/kt',
  //           title: 'KT 증후군',
  //         },
  //         {
  //           id: 'vascular-special-maythurner',
  //           href: '/vascular/special/maythurner',
  //           title: '메이타너증후군',
  //         },
  //         {
  //           id: 'vascular-special-raynaud',
  //           href: '/vascular/special/raynaud',
  //           title: '레이노증후군',
  //         },
  //         {
  //           id: 'vascular-special-buerger',
  //           href: '/vascular/special/buerger',
  //           title: '버거씨병',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'vascular-dialysis',
  //       href: '/vascular/dialysis',
  //       title: '투석혈관',
  //       children: [
  //         {
  //           id: 'vascular-dialysis-creation',
  //           href: '/vascular/dialysis/creation',
  //           title: '투석혈관 조성·관리',
  //         },
  //         {
  //           id: 'vascular-dialysis-revision',
  //           href: '/vascular/dialysis/revision',
  //           title: '교정술/축소술',
  //         },
  //         {
  //           id: 'vascular-dialysis-recanalization',
  //           href: '/vascular/dialysis/recanalization',
  //           title: '혈관개통술',
  //         },
  //         {
  //           id: 'vascular-dialysis-catheter',
  //           href: '/vascular/dialysis/catheter',
  //           title: '펌카테터 삽입/제거술',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'vascular-hbot',
  //       href: '/vascular/hbot',
  //       title: '고압산소치료',
  //       children: [
  //         {
  //           id: 'vascular-hbot-emergency',
  //           href: '/vascular/hbot/emergency',
  //           title: '응급질환',
  //         },
  //         {
  //           id: 'vascular-hbot-regenerative',
  //           href: '/vascular/hbot/regenerative',
  //           title: '면역/재생테라피',
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    id: 'academics',
    href: '/academics/collaboration',
    title: '교육·연구',
    children: [
      // {
      //   id: 'academics-institute',
      //   href: '/academics/institute',
      //   title: '맑은혈관연구소',
      // },
      // {
      //   id: 'academics-education',
      //   href: '/academics/education',
      //   title: '의학교육',
      // },
      {
        id: 'academics-collaboration',
        href: '/academics/collaboration',
        title: '학술교류',
      },
      {
        id: 'academics-conferences',
        href: '/academics/conferences',
        title: '학회활동',
      },
    ],
  },

  {
    id: 'community',
    href: '/community/cases',
    title: '소통공간',
    children: [
      {
        id: 'community-cases',
        href: '/community/cases',
        title: '치료사례',
      },
      {
        id: 'community-consultation',
        href: '/community/consultation',
        title: '의학상담',
      },
      {
        id: 'community-feedback',
        href: '/community/feedback',
        title: '고객의 소리',
      },
    ],
  },

  {
    id: 'newsroom',
    href: '/community/notice',
    title: '병원소식',
    children: [
      {
        id: 'newsroom-notice',
        href: '/community/notice',
        title: '공지사항',
      },
      {
        id: 'newsroom-news',
        href: '/community/news',
        title: '청맥뉴스',
      },
      // {
      //   id: 'newsroom-bid',
      //   href: '/community/bid',
      //   title: '입찰공고',
      // },
      // {
      //   id: 'newsroom-recruit',
      //   href: '/community/recruit',
      //   title: '채용공고',
      // },
      // {
      //   id: 'newsroom-program',
      //   href: '/community/program',
      //   title: '프로그램 신청',
      // },
    ],
  },

  {
    id: 'guide',
    href: '/guide/reservation',
    title: '이용안내',
    children: [
      {
        id: 'guide-reservation',
        href: '/guide/reservation',
        title: '진료예약',
      },
      /* 
      {
        id: 'guide-outpatient',
        href: '/guide/outpatient',
        title: '외래진료안내',
      },
       */
      {
        id: 'guide-hospitalized',
        href: '/guide/hospitalized',
        title: '입퇴원안내',
      },
      {
        id: 'guide-partner',
        href: '/guide/partner',
        title: '의료협약병원',
      },
      {
        id: 'guide-veterans',
        href: '/guide/veterans',
        title: '보훈위탁병원',
      },
    ],
  },

  /*
   * 첨부된 'LNB_종합진료' 시안은 현재 최종 Header GNB 시안에는
   * 상위 메뉴로 포함되어 있지 않아 활성 NAVIGATION에서는 제외합니다.
   * 추후 GNB에 '종합진료'가 추가되는 시점에 별도 반영합니다.
   */
];

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}

/**
 * 현재 URL에 해당하는 메뉴 경로 반환
 *
 * 예:
 * /about/doctors
 * → [병원 소개, 의료진/진료과]
 *
 * /community/news
 * → [병원소식, 청맥뉴스]
 */
export function getNavigationTrail(pathname: string): NavigationItem[] {
  const currentPath = pathname.replace(/\/+$/, '') || '/';

  let bestTrail: NavigationItem[] = [];
  let bestLength = -1;

  function traverse(items: NavigationItem[], parents: NavigationItem[] = []) {
    for (const item of items) {
      const href = item.href.replace(/\/+$/, '') || '/';
      const trail = [...parents, item];

      // 정확히 일치하거나 하위 경로인지 확인
      const isMatch =
        currentPath === href ||
        (href !== '/' && currentPath.startsWith(`${href}/`));

      // 가장 구체적인 경로를 우선 선택
      if (
        isMatch &&
        (href.length > bestLength ||
          (href.length === bestLength && trail.length > bestTrail.length))
      ) {
        bestTrail = trail;
        bestLength = href.length;
      }

      // 하위 메뉴 재귀 탐색
      if (item.children?.length) {
        traverse(item.children, trail);
      }
    }
  }

  traverse(NAVIGATION);

  return bestTrail;
}
