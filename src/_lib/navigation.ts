import type { Locale } from '@/i18n-config';
import { isLocale } from '@/i18n-config';

export type LocalizedLabel = {
  ko: string;
  en?: string;
  ja?: string;
};

export type NavigationItem = {
  id: string;
  href: string;
  title: LocalizedLabel;
  children?: NavigationItem[];
};

export type ResolvedNavigationItem = Omit<
  NavigationItem,
  'title' | 'children'
> & {
  title: string;
  children?: ResolvedNavigationItem[];
};

const title = (ko: string, en?: string, ja?: string): LocalizedLabel => ({
  ko,
  en,
  ja,
});

export const LANGUAGE_OPTIONS: Array<{ code: Locale; label: string }> = [
  { code: 'ko', label: 'ko' },
  { code: 'en', label: 'en' },
  { code: 'ja', label: 'ja' },
];

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'about',
    href: '/about',
    title: title('병원 소개', 'About', '病院紹介'),
    children: [
      {
        id: 'about-hospital',
        href: '/about/hospital-introduction',
        title: title('병원 소개', 'Hospital Introduction', '病院紹介'),
      },
      {
        id: 'about-doctors-departments',
        href: '/about/doctors-departments',
        title: title(
          '의료진/진료과',
          'Doctors & Departments',
          '医療スタッフ・診療科',
        ),
      },
      {
        id: 'about-tour',
        href: '/about/hospital-tour',
        title: title('병원 둘러보기', 'Hospital Tour', '院内案内'),
      },
      {
        id: 'about-equipment',
        href: '/about/advanced-medical-equipment',
        title: title(
          '첨단의료장비',
          'Advanced Medical Equipment',
          '先端医療機器',
        ),
      },
    ],
  },
  {
    id: 'vascular-focus-care',
    href: '/vascular-focus-care',
    title: title('혈관중점진료', 'Vascular Focus Care', '血管重点診療'),
    children: [
      {
        id: 'vascular-cardiovascular',
        href: '/vascular-focus-care/cardiovascular-disease',
        title: title('심혈관질환', 'Cardiovascular Disease', '心血管疾患'),
        children: [
          {
            id: 'vascular-cardiovascular-angina-mi',
            href: '/vascular-focus-care/cardiovascular-disease/angina-myocardial-infarction',
            title: title(
              '협십증 심근경색',
              'Angina & Myocardial Infarction',
              '狭心症・心筋梗塞',
            ),
          },
          {
            id: 'vascular-cardiovascular-arrhythmia',
            href: '/vascular-focus-care/cardiovascular-disease/arrhythmia',
            title: title('부정맥', 'Arrhythmia', '不整脈'),
          },
          {
            id: 'vascular-cardiovascular-heart-failure',
            href: '/vascular-focus-care/cardiovascular-disease/heart-failure',
            title: title('심부전', 'Heart Failure', '心不全'),
          },
          {
            id: 'vascular-cardiovascular-valvular',
            href: '/vascular-focus-care/cardiovascular-disease/valvular-heart-disease',
            title: title(
              '심장판막질환',
              'Valvular Heart Disease',
              '心臓弁膜症',
            ),
          },
        ],
      },
      {
        id: 'vascular-arterial',
        href: '/vascular-focus-care/arterial-disease',
        title: title('동맥질환', 'Arterial Disease', '動脈疾患'),
        children: [
          {
            id: 'vascular-arterial-paod',
            href: '/vascular-focus-care/arterial-disease/peripheral-arterial-occlusive-disease',
            title: title(
              '말초동맥폐쇄증',
              'Peripheral Arterial Occlusive Disease',
              '末梢動脈閉塞症',
            ),
          },
          {
            id: 'vascular-arterial-aorta',
            href: '/vascular-focus-care/arterial-disease/aortic-disease',
            title: title('대동맥질환', 'Aortic Disease', '大動脈疾患'),
          },
          {
            id: 'vascular-arterial-carotid',
            href: '/vascular-focus-care/arterial-disease/carotid-disease',
            title: title('경동맥질환', 'Carotid Artery Disease', '頸動脈疾患'),
          },
          {
            id: 'vascular-arterial-renal',
            href: '/vascular-focus-care/arterial-disease/renal-artery-disease',
            title: title('신장동맥질환', 'Renal Artery Disease', '腎動脈疾患'),
          },
          {
            id: 'vascular-arterial-diabetic-foot',
            href: '/vascular-focus-care/arterial-disease/diabetic-foot',
            title: title('당뇨발', 'Diabetic Foot', '糖尿病足'),
          },
        ],
      },
      {
        id: 'vascular-venous',
        href: '/vascular-focus-care/venous-disease',
        title: title('정맥질환', 'Venous Disease', '静脈疾患'),
        children: [
          {
            id: 'vascular-venous-varicose',
            href: '/vascular-focus-care/venous-disease/varicose-veins',
            title: title('하지정맥류', 'Varicose Veins', '下肢静脈瘤'),
          },
          {
            id: 'vascular-venous-pelvic-congestion',
            href: '/vascular-focus-care/venous-disease/pelvic-congestion-syndrome',
            title: title(
              '골반울혈증후군',
              'Pelvic Congestion Syndrome',
              '骨盤うっ血症候群',
            ),
          },
          {
            id: 'vascular-venous-varicocele',
            href: '/vascular-focus-care/venous-disease/varicocele',
            title: title('정계정맥류', 'Varicocele', '精索静脈瘤'),
          },
          {
            id: 'vascular-venous-dvt',
            href: '/vascular-focus-care/venous-disease/deep-vein-thrombosis',
            title: title(
              '심부정맥혈전증',
              'Deep Vein Thrombosis',
              '深部静脈血栓症',
            ),
          },
          {
            id: 'vascular-venous-cvi',
            href: '/vascular-focus-care/venous-disease/chronic-venous-insufficiency',
            title: title(
              '만성정맥부전',
              'Chronic Venous Insufficiency',
              '慢性静脈不全',
            ),
          },
        ],
      },
      {
        id: 'vascular-rare-special',
        href: '/vascular-focus-care/rare-special-disease',
        title: title(
          '희귀특수질환',
          'Rare & Special Disease',
          '希少・特殊疾患',
        ),
        children: [
          {
            id: 'vascular-rare-nutcracker',
            href: '/vascular-focus-care/rare-special-disease/nutcracker-syndrome',
            title: title(
              '호두까기증후군',
              'Nutcracker Syndrome',
              'ナットクラッカー症候群',
            ),
          },
          {
            id: 'vascular-rare-kt',
            href: '/vascular-focus-care/rare-special-disease/kt-syndrome',
            title: title('KT증후군', 'KT Syndrome', 'KT症候群'),
          },
          {
            id: 'vascular-rare-may-thurner',
            href: '/vascular-focus-care/rare-special-disease/may-thurner-syndrome',
            title: title(
              '메이터너증후군',
              'May-Thurner Syndrome',
              'メイ・サーナー症候群',
            ),
          },
          {
            id: 'vascular-rare-raynaud',
            href: '/vascular-focus-care/rare-special-disease/raynaud-syndrome',
            title: title('레이노증후군', 'Raynaud Syndrome', 'レイノー症候群'),
          },
        ],
      },
      {
        id: 'vascular-renal-dialysis',
        href: '/vascular-focus-care/renal-dialysis-vascular',
        title: title(
          '신장·투석혈관',
          'Renal & Dialysis Vascular Care',
          '腎臓・透析血管',
        ),
        children: [
          {
            id: 'vascular-renal-dialysis-center',
            href: '/vascular-focus-care/renal-dialysis-vascular/hemodialysis-center',
            title: title(
              '인공신장실 (혈액투석)',
              'Hemodialysis Center',
              '人工腎臓室（血液透析）',
            ),
          },
          {
            id: 'vascular-renal-dialysis-access',
            href: '/vascular-focus-care/renal-dialysis-vascular/dialysis-access-management',
            title: title(
              '투석혈관 조성·관리',
              'Dialysis Access Creation & Management',
              '透析血管の作成・管理',
            ),
          },
          {
            id: 'vascular-renal-complications',
            href: '/vascular-focus-care/renal-dialysis-vascular/complications',
            title: title('합병증', 'Complications', '合併症'),
          },
        ],
      },
    ],
  },
  {
    id: 'education-research',
    href: '/education-research',
    title: title('교육·연구', 'Education & Research', '教育・研究'),
    children: [
      {
        id: 'education-institute',
        href: '/education-research/clear-vessel-research-institute',
        title: title(
          '맑은혈관연구소',
          'Clear Vessel Research Institute',
          'クリア血管研究所',
        ),
      },
      {
        id: 'education-medical-education',
        href: '/education-research/medical-education',
        title: title('의학 교육', 'Medical Education', '医学教育'),
      },
      {
        id: 'education-academic-exchange',
        href: '/education-research/academic-exchange',
        title: title('학술 교류', 'Academic Exchange', '学術交流'),
      },
      {
        id: 'education-academic-society',
        href: '/education-research/academic-society-activity',
        title: title('학회 활동', 'Academic Society Activity', '学会活動'),
      },
    ],
  },
  {
    id: 'community',
    href: '/community',
    title: title('소통공간', 'Community', 'コミュニティ'),
    children: [
      {
        id: 'community-notice',
        href: '/community/notice',
        title: title('공지사항', 'Notice', 'お知らせ'),
      },
      {
        id: 'community-news',
        href: '/community/cheongmaek-news',
        title: title('청맥 뉴스', 'Cheongmaek News', 'チョンメクニュース'),
      },
      {
        id: 'community-cases',
        href: '/community/case-study',
        title: title('치료 사례', 'Treatment Cases', '治療事例'),
      },
      {
        id: 'community-consultation',
        href: '/community/medical-consultation',
        title: title('의학 상담', 'Medical Consultation', '医療相談'),
      },
      {
        id: 'community-feedback',
        href: '/community/voice-of-customer',
        title: title('고객의 소리', 'Voice of Customer', 'お客様の声'),
      },
    ],
  },
  {
    id: 'guide',
    href: '/guide',
    title: title('이용안내', 'Guide', '利用案内'),
    children: [
      {
        id: 'guide-outpatient',
        href: '/guide/outpatient-care',
        title: title('외래진료안내', 'Outpatient Guide', '外来診療案内'),
        children: [
          {
            id: 'guide-outpatient-info',
            href: '/guide/outpatient-care/information',
            title: title('진료 안내', 'Care Information', '診療案内'),
          },
          {
            id: 'guide-outpatient-reservation',
            href: '/guide/outpatient-care/reservation',
            title: title('진료 예약', 'Reservation', '診療予約'),
          },
          {
            id: 'guide-outpatient-location-parking',
            href: '/guide/outpatient-care/location-parking',
            title: title(
              '오시는길 및 주차',
              'Directions & Parking',
              'アクセス・駐車場',
            ),
          },
          {
            id: 'guide-outpatient-documents',
            href: '/guide/outpatient-care/document-issuance',
            title: title('서류발급 안내', 'Document Issuance', '書類発行案内'),
          },
        ],
      },
      {
        id: 'guide-admission-discharge',
        href: '/guide/admission-discharge',
        title: title(
          '입·퇴원안내',
          'Admission & Discharge Guide',
          '入退院案内',
        ),
        children: [
          {
            id: 'guide-admission-preparation',
            href: '/guide/admission-discharge/preparation',
            title: title('입원 준비', 'Admission Preparation', '入院準備'),
          },
          {
            id: 'guide-admission-life',
            href: '/guide/admission-discharge/hospital-life',
            title: title('입원 생활', 'Hospital Life', '入院生活'),
          },
          {
            id: 'guide-discharge-process',
            href: '/guide/admission-discharge/discharge-process',
            title: title('퇴원 절차', 'Discharge Process', '退院手続き'),
          },
        ],
      },
      {
        id: 'guide-partner-hospital',
        href: '/guide/partner-hospital',
        title: title('의료협약병원', 'Partner Hospitals', '医療提携病院'),
        children: [
          {
            id: 'guide-partner-institutions',
            href: '/guide/partner-hospital/institutions',
            title: title(
              '협약기관 조회',
              'Partner Institution Search',
              '提携機関検索',
            ),
          },
          {
            id: 'guide-veterans-hospital',
            href: '/guide/partner-hospital/veterans-commissioned-hospital',
            title: title(
              '보훈위탁병원',
              'Veterans Commissioned Hospital',
              '報勲委託病院',
            ),
          },
        ],
      },
    ],
  },
];

export function getLocalizedLabel(
  value: LocalizedLabel,
  locale: Locale,
): string {
  return value[locale] ?? value.ko;
}

export function resolveNavigation(
  locale: Locale,
  items: NavigationItem[] = NAVIGATION,
): ResolvedNavigationItem[] {
  return items.map((item) => ({
    ...item,
    title: getLocalizedLabel(item.title, locale),
    children: item.children
      ? resolveNavigation(locale, item.children)
      : undefined,
  }));
}

export function getPrimaryNavigation(locale: Locale): ResolvedNavigationItem[] {
  return resolveNavigation(locale, NAVIGATION);
}

export function withLocale(locale: Locale, href: string): string {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

export function getLocalePath(
  pathname: string | null,
  nextLocale: Locale,
): string {
  if (!pathname || pathname === '/') {
    return `/${nextLocale}`;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join('/')}`;
}
