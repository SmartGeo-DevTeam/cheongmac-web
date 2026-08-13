export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};

export const NAVIGATION: NavigationItem[] = [
  {
    id: "about",
    href: "/about",
    title: "병원 소개",
    children: [
      {
        id: "about-hospital",
        href: "/about/hospital-introduction",
        title: "병원 소개",
      },
      {
        id: "about-doctors",
        href: "/about/doctors",
        title: "의료진/진료과",
      },
      {
        id: "about-tour",
        href: "/about/hospital-tour",
        title: "병원 둘러보기",
      },
      {
        id: "about-equipment",
        href: "/about/advanced-medical-equipment",
        title: "첨단의료장비",
      },
    ],
  },
  {
    id: "vascular-focus-care",
    href: "/vascular-focus-care",
    title: "혈관중점진료",
    children: [
      {
        id: "vascular-cardiovascular",
        href: "/vascular-focus-care/cardiovascular-disease",
        title: "심혈관질환",
        children: [
          {
            id: "vascular-cardiovascular-angina-mi",
            href: "/vascular-focus-care/cardiovascular-disease/angina-myocardial-infarction",
            title: "협십증 심근경색",
          },
          {
            id: "vascular-cardiovascular-arrhythmia",
            href: "/vascular-focus-care/cardiovascular-disease/arrhythmia",
            title: "부정맥",
          },
          {
            id: "vascular-cardiovascular-heart-failure",
            href: "/vascular-focus-care/cardiovascular-disease/heart-failure",
            title: "심부전",
          },
          {
            id: "vascular-cardiovascular-valvular",
            href: "/vascular-focus-care/cardiovascular-disease/valvular-heart-disease",
            title: "심장판막질환",
          },
        ],
      },
      {
        id: "vascular-arterial",
        href: "/vascular-focus-care/arterial-disease",
        title: "동맥질환",
        children: [
          {
            id: "vascular-arterial-paod",
            href: "/vascular-focus-care/arterial-disease/peripheral-arterial-occlusive-disease",
            title: "말초동맥폐쇄증",
          },
          {
            id: "vascular-arterial-aorta",
            href: "/vascular-focus-care/arterial-disease/aortic-disease",
            title: "대동맥질환",
          },
          {
            id: "vascular-arterial-carotid",
            href: "/vascular-focus-care/arterial-disease/carotid-disease",
            title: "경동맥질환",
          },
          {
            id: "vascular-arterial-renal",
            href: "/vascular-focus-care/arterial-disease/renal-artery-disease",
            title: "신장동맥질환",
          },
          {
            id: "vascular-arterial-diabetic-foot",
            href: "/vascular-focus-care/arterial-disease/diabetic-foot",
            title: "당뇨발",
          },
        ],
      },
      {
        id: "vascular-venous",
        href: "/vascular-focus-care/venous-disease",
        title: "정맥질환",
        children: [
          {
            id: "vascular-venous-varicose",
            href: "/vascular-focus-care/venous-disease/varicose-veins",
            title: "하지정맥류",
          },
          {
            id: "vascular-venous-pelvic-congestion",
            href: "/vascular-focus-care/venous-disease/pelvic-congestion-syndrome",
            title: "골반울혈증후군",
          },
          {
            id: "vascular-venous-varicocele",
            href: "/vascular-focus-care/venous-disease/varicocele",
            title: "정계정맥류",
          },
          {
            id: "vascular-venous-dvt",
            href: "/vascular-focus-care/venous-disease/deep-vein-thrombosis",
            title: "심부정맥혈전증",
          },
          {
            id: "vascular-venous-cvi",
            href: "/vascular-focus-care/venous-disease/chronic-venous-insufficiency",
            title: "만성정맥부전",
          },
        ],
      },
      {
        id: "vascular-rare-special",
        href: "/vascular-focus-care/rare-special-disease",
        title: "희귀특수질환",
        children: [
          {
            id: "vascular-rare-nutcracker",
            href: "/vascular-focus-care/rare-special-disease/nutcracker-syndrome",
            title: "호두까기증후군",
          },
          {
            id: "vascular-rare-kt",
            href: "/vascular-focus-care/rare-special-disease/kt-syndrome",
            title: "KT증후군",
          },
          {
            id: "vascular-rare-may-thurner",
            href: "/vascular-focus-care/rare-special-disease/may-thurner-syndrome",
            title: "메이터너증후군",
          },
          {
            id: "vascular-rare-raynaud",
            href: "/vascular-focus-care/rare-special-disease/raynaud-syndrome",
            title: "레이노증후군",
          },
        ],
      },
      {
        id: "vascular-renal-dialysis",
        href: "/vascular-focus-care/renal-dialysis-vascular",
        title: "신장·투석혈관",
        children: [
          {
            id: "vascular-renal-dialysis-center",
            href: "/vascular-focus-care/renal-dialysis-vascular/hemodialysis-center",
            title: "인공신장실 (혈액투석)",
          },
          {
            id: "vascular-renal-dialysis-access",
            href: "/vascular-focus-care/renal-dialysis-vascular/dialysis-access-management",
            title: "투석혈관 조성·관리",
          },
          {
            id: "vascular-renal-complications",
            href: "/vascular-focus-care/renal-dialysis-vascular/complications",
            title: "합병증",
          },
        ],
      },
    ],
  },
  {
    id: "education-research",
    href: "/education-research",
    title: "교육·연구",
    children: [
      {
        id: "education-institute",
        href: "/education-research/clear-vessel-research-institute",
        title: "맑은혈관연구소",
      },
      {
        id: "education-medical-education",
        href: "/education-research/medical-education",
        title: "의학 교육",
      },
      {
        id: "education-academic-exchange",
        href: "/education-research/academic-exchange",
        title: "학술 교류",
      },
      {
        id: "education-academic-society",
        href: "/education-research/academic-society-activity",
        title: "학회 활동",
      },
    ],
  },
  {
    id: "community",
    href: "/community",
    title: "소통공간",
    children: [
      {
        id: "community-notice",
        href: "/community/notice",
        title: "공지사항",
      },
      {
        id: "community-news",
        href: "/community/cheongmaek-news",
        title: "청맥 뉴스",
      },
      {
        id: "community-cases",
        href: "/community/case-study",
        title: "치료 사례",
      },
      {
        id: "community-consultation",
        href: "/community/medical-consultation",
        title: "의학 상담",
      },
      {
        id: "community-feedback",
        href: "/community/voice-of-customer",
        title: "고객의 소리",
      },
    ],
  },
  {
    id: "guide",
    href: "/guide",
    title: "이용안내",
    children: [
      {
        id: "guide-outpatient",
        href: "/guide/outpatient-care",
        title: "외래진료안내",
        children: [
          {
            id: "guide-outpatient-info",
            href: "/guide/outpatient-care/information",
            title: "진료 안내",
          },
          {
            id: "guide-outpatient-reservation",
            href: "/guide/outpatient-care/reservation",
            title: "진료 예약",
          },
          {
            id: "guide-outpatient-location-parking",
            href: "/guide/outpatient-care/location-parking",
            title: "오시는길 및 주차",
          },
          {
            id: "guide-outpatient-documents",
            href: "/guide/outpatient-care/document-issuance",
            title: "서류발급 안내",
          },
        ],
      },
      {
        id: "guide-admission-discharge",
        href: "/guide/admission-discharge",
        title: "입·퇴원안내",
        children: [
          {
            id: "guide-admission-preparation",
            href: "/guide/admission-discharge/preparation",
            title: "입원 준비",
          },
          {
            id: "guide-admission-life",
            href: "/guide/admission-discharge/hospital-life",
            title: "입원 생활",
          },
          {
            id: "guide-discharge-process",
            href: "/guide/admission-discharge/discharge-process",
            title: "퇴원 절차",
          },
        ],
      },
      {
        id: "guide-partner-hospital",
        href: "/guide/partner-hospital",
        title: "의료협약병원",
        children: [
          {
            id: "guide-partner-institutions",
            href: "/guide/partner-hospital/institutions",
            title: "협약기관 조회",
          },
          {
            id: "guide-veterans-hospital",
            href: "/guide/partner-hospital/veterans-commissioned-hospital",
            title: "보훈위탁병원",
          },
        ],
      },
    ],
  },
];

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}
