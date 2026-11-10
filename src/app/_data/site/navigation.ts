import type { NavigationItem } from '@/app/_types/site/navigation';

// 모든 1·2·3차 메뉴는 이 파일의 NAVIGATION에서만 정의합니다.
// 독립 페이지가 있는 2·3차 메뉴에는 isPublished를 명시합니다. 부모 노출은 자기 페이지 또는 공개 자손으로 계산됩니다.
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
        isPublished: true,
      },
      {
        id: 'about-doctors',
        href: '/about/doctors',
        title: '의료진/진료과',
        isPublished: true,
      },
      {
        id: 'about-tour',
        href: '/about/tour',
        title: '병원 둘러보기',
        isPublished: true,
      },
      {
        id: 'about-equipment',
        href: '/about/equipment',
        title: '첨단의료장비',
        isPublished: true,
      },
    ],
  },

  {
    id: 'vascular',
    href: '/vascular',
    title: '혈관중점진료',
    children: [
      {
        id: 'vascular-arterial',
        href: '/vascular/arterial',
        title: '동맥질환',
        isPublished: true,
        children: [
          {
            id: 'vascular-arterial-occlusion',
            href: '/vascular/arterial/occlusion',
            title: '하지동맥폐색증',
            isPublished: false,
          },
          {
            id: 'vascular-arterial-aneurysm',
            href: '/vascular/arterial/aneurysm',
            title: '대동맥류',
            isPublished: false,
          },
          {
            id: 'vascular-arterial-foot',
            href: '/vascular/arterial/foot',
            title: '당뇨발',
            isPublished: false,
          },
        ],
      },
      {
        id: 'vascular-venous',
        href: '/vascular/venous',
        title: '정맥질환',
        isPublished: false,
        children: [
          {
            id: 'vascular-venous-varicose',
            href: '/vascular/venous/varicose',
            title: '하지정맥류',
            isPublished: false,
          },
          {
            id: 'vascular-venous-pelvic',
            href: '/vascular/venous/pelvic',
            title: '골반정맥류',
            isPublished: false,
          },
          {
            id: 'vascular-venous-varicocele',
            href: '/vascular/venous/varicocele',
            title: '정계정맥류',
            isPublished: false,
          },
          {
            id: 'vascular-venous-thrombosis',
            href: '/vascular/venous/thrombosis',
            title: '심부정맥혈전증',
            isPublished: false,
          },
        ],
      },
      {
        id: 'vascular-special',
        href: '/vascular/special',
        title: '특수혈관질환',
        isPublished: false,
        children: [
          {
            id: 'vascular-special-nutcracker',
            href: '/vascular/special/nutcracker',
            title: '호두까기증후군',
            isPublished: false,
          },
          {
            id: 'vascular-special-kt',
            href: '/vascular/special/kt',
            title: 'KT 증후군',
            isPublished: false,
          },
          {
            id: 'vascular-special-maythurner',
            href: '/vascular/special/maythurner',
            title: '메이터너증후군',
            isPublished: false,
          },
          {
            id: 'vascular-special-raynaud',
            href: '/vascular/special/raynaud',
            title: '레이노증후군',
            isPublished: false,
          },
          {
            id: 'vascular-special-buerger',
            href: '/vascular/special/buerger',
            title: '버거씨병',
            isPublished: false,
          },
        ],
      },
      {
        id: 'vascular-dialysis',
        href: '/vascular/dialysis',
        title: '투석혈관',
        isPublished: false,
        children: [
          {
            id: 'vascular-dialysis-creation',
            href: '/vascular/dialysis/creation',
            title: '투석혈관 조성관리',
            isPublished: false,
          },
          {
            id: 'vascular-dialysis-revision',
            href: '/vascular/dialysis/revision',
            title: '교정술/축소술',
            isPublished: false,
          },
          {
            id: 'vascular-dialysis-recanalization',
            href: '/vascular/dialysis/recanalization',
            title: '혈관개통술',
            isPublished: false,
          },
          {
            id: 'vascular-dialysis-catheter',
            href: '/vascular/dialysis/catheter',
            title: '펌카테터 삽입/제거술',
            isPublished: false,
          },
        ],
      },
      {
        id: 'vascular-hyperbaric',
        href: '/vascular/hyperbaric',
        title: '고압산소치료',
        isPublished: false,
        children: [
          {
            id: 'vascular-hyperbaric-emergency',
            href: '/vascular/hyperbaric/emergency',
            title: '응급질환',
            isPublished: false,
          },
          {
            id: 'vascular-hyperbaric-regenerative',
            href: '/vascular/hyperbaric/regenerative',
            title: '면역/재생테라피',
            isPublished: false,
          },
        ],
      },
    ],
  },

  {
    id: 'general',
    href: '/general',
    title: '종합진료',
    children: [
      {
        id: 'general-gynecology',
        href: '/general/gynecology',
        title: '여성 부인과질환',
        isPublished: false,
        children: [
          {
            id: 'general-gynecology-uterus',
            href: '/general/gynecology/uterus',
            title: '자궁질환',
            isPublished: false,
          },
          {
            id: 'general-gynecology-ovary',
            href: '/general/gynecology/ovary',
            title: '난소질환',
            isPublished: false,
          },
          {
            id: 'general-gynecology-inflammation',
            href: '/general/gynecology/inflammation',
            title: '질염/골반염',
            isPublished: false,
          },
          {
            id: 'general-gynecology-clinic',
            href: '/general/gynecology/clinic',
            title: '여성클리닉',
            isPublished: false,
          },
        ],
      },
      {
        id: 'general-andrology',
        href: '/general/andrology',
        title: '남성 전립선질환',
        isPublished: false,
        children: [
          {
            id: 'general-andrology-prostate',
            href: '/general/andrology/prostate',
            title: '전립선질환',
            isPublished: false,
          },
          {
            id: 'general-andrology-testicular',
            href: '/general/andrology/testicular',
            title: '고환/음낭질환',
            isPublished: false,
          },
          {
            id: 'general-andrology-clinic',
            href: '/general/andrology/clinic',
            title: '남성클리닉',
            isPublished: false,
          },
        ],
      },
      {
        id: 'general-urinary',
        href: '/general/urinary',
        title: '남녀 비뇨기질환',
        isPublished: false,
        children: [
          {
            id: 'general-urinary-stones',
            href: '/general/urinary/stones',
            title: '요로결석/신장결석',
            isPublished: false,
          },
          {
            id: 'general-urinary-voiding',
            href: '/general/urinary/voiding',
            title: '배뇨장애',
            isPublished: false,
          },
          {
            id: 'general-urinary-infections',
            href: '/general/urinary/infections',
            title: '방광염/신우신염',
            isPublished: false,
          },
        ],
      },
      {
        id: 'general-chronic',
        href: '/general/chronic',
        title: '만성질환',
        isPublished: false,
        children: [
          {
            id: 'general-chronic-metabolic',
            href: '/general/chronic/metabolic',
            title: '당뇨/고혈압/고지혈증',
            isPublished: false,
          },
          {
            id: 'general-chronic-lymphedema',
            href: '/general/chronic/lymphedema',
            title: '림프부종',
            isPublished: false,
          },
          {
            id: 'general-chronic-gout',
            href: '/general/chronic/gout',
            title: '통풍',
            isPublished: false,
          },
          {
            id: 'general-chronic-thyroid-liver',
            href: '/general/chronic/thyroid-liver',
            title: '갑상선/지방간',
            isPublished: false,
          },
        ],
      },
      {
        id: 'general-wellness',
        href: '/general/wellness',
        title: '웰니스 클리닉',
        isPublished: false,
        children: [
          {
            id: 'general-wellness-obesity',
            href: '/general/wellness/obesity',
            title: '비만클리닉',
            isPublished: false,
          },
          {
            id: 'general-wellness-hair',
            href: '/general/wellness/hair',
            title: '탈모치료',
            isPublished: false,
          },
          {
            id: 'general-wellness-infusion',
            href: '/general/wellness/infusion',
            title: '수액클리닉',
            isPublished: false,
          },
          {
            id: 'general-wellness-hyperbaric',
            href: '/general/wellness/hyperbaric',
            title: '고압산소치료',
            isPublished: false,
          },
          {
            id: 'general-wellness-vaccination',
            href: '/general/wellness/vaccination',
            title: '예방접종',
            isPublished: false,
          },
        ],
      },
      {
        id: 'general-checkup',
        href: '/general/checkup',
        title: '건강검진센터',
        isPublished: false,
        children: [
          {
            id: 'general-checkup-information',
            href: '/general/checkup/information',
            title: '건강검진안내',
            isPublished: false,
          },
          {
            id: 'general-checkup-individual',
            href: '/general/checkup/individual',
            title: '개인 건강검진',
            isPublished: false,
          },
          {
            id: 'general-checkup-corporate',
            href: '/general/checkup/corporate',
            title: '단체/기업 건강검진',
            isPublished: false,
          },
        ],
      },
    ],
  },

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
        isPublished: true,
      },
      {
        id: 'academics-conferences',
        href: '/academics/conferences',
        title: '학회활동',
        isPublished: true,
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
        isPublished: true,
      },
      {
        id: 'community-consultation',
        href: '/community/consultation',
        title: '의학상담',
        isPublished: true,
      },
      {
        id: 'community-feedback',
        href: '/community/feedback',
        title: '고객의 소리',
        isPublished: true,
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
        isPublished: true,
      },
      {
        id: 'newsroom-news',
        href: '/community/news',
        title: '청맥뉴스',
        isPublished: true,
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
        isPublished: true,
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
        isPublished: true,
      },
      {
        id: 'guide-partner',
        href: '/guide/partner',
        title: '의료협약병원',
        isPublished: true,
      },
      {
        id: 'guide-veterans',
        href: '/guide/veterans',
        title: '보훈위탁병원',
        isPublished: true,
      },
    ],
  },
];
