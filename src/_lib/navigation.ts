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
    id: 'mens-womens-medicine',
    href: '/mens-womens-medicine',
    title: title('남성·여성의학', 'Men’s & Women’s Health', '男性・女性医学'),
    children: [
      {
        id: 'womens-gynecology',
        href: '/mens-womens-medicine/womens-gynecologic-disease',
        title: title(
          '여성·부인과질환',
          'Women’s Gynecologic Disease',
          '女性・婦人科疾患',
        ),
        children: [
          {
            id: 'womens-uterine',
            href: '/mens-womens-medicine/womens-gynecologic-disease/uterine-disease',
            title: title('자궁질환', 'Uterine Disease', '子宮疾患'),
          },
          {
            id: 'womens-ovarian',
            href: '/mens-womens-medicine/womens-gynecologic-disease/ovarian-disease',
            title: title('난소질환', 'Ovarian Disease', '卵巣疾患'),
          },
          {
            id: 'womens-gynecology-general',
            href: '/mens-womens-medicine/womens-gynecologic-disease/gynecologic-disease',
            title: title('부인과질환', 'Gynecologic Disease', '婦人科疾患'),
          },
          {
            id: 'womens-clinic',
            href: '/mens-womens-medicine/womens-gynecologic-disease/womens-clinic',
            title: title('여성클리닉', 'Women’s Clinic', '女性クリニック'),
          },
        ],
      },
      {
        id: 'mens-prostate',
        href: '/mens-womens-medicine/mens-prostate-disease',
        title: title(
          '남성·전립선질환',
          'Men’s Prostate Disease',
          '男性・前立腺疾患',
        ),
        children: [
          {
            id: 'mens-prostate-disease',
            href: '/mens-womens-medicine/mens-prostate-disease/prostate-disease',
            title: title('전립선질환', 'Prostate Disease', '前立腺疾患'),
          },
          {
            id: 'mens-testicular-disease',
            href: '/mens-womens-medicine/mens-prostate-disease/testicular-disease',
            title: title('고환질환', 'Testicular Disease', '精巣疾患'),
          },
          {
            id: 'mens-clinic',
            href: '/mens-womens-medicine/mens-prostate-disease/mens-clinic',
            title: title('남성클리닉', 'Men’s Clinic', '男性クリニック'),
          },
        ],
      },
      {
        id: 'urology-common',
        href: '/mens-womens-medicine/common-urologic-disease',
        title: title(
          '남녀 비뇨기질환',
          'Common Urologic Disease',
          '男女の泌尿器疾患',
        ),
        children: [
          {
            id: 'urology-stones',
            href: '/mens-womens-medicine/common-urologic-disease/urinary-kidney-stones',
            title: title(
              '요로결석/신장결석',
              'Urinary / Kidney Stones',
              '尿路結石・腎結石',
            ),
          },
          {
            id: 'urology-voiding',
            href: '/mens-womens-medicine/common-urologic-disease/voiding-dysfunction',
            title: title('배뇨장애', 'Voiding Dysfunction', '排尿障害'),
          },
          {
            id: 'urology-infection',
            href: '/mens-womens-medicine/common-urologic-disease/urologic-infection',
            title: title(
              '비뇨기 감염질환',
              'Urologic Infection',
              '泌尿器感染症',
            ),
          },
        ],
      },
    ],
  },
  {
    id: 'chronic-integrated-care',
    href: '/chronic-integrated-care',
    title: title(
      '만성질환·통합관리',
      'Chronic Disease & Integrated Care',
      '慢性疾患・統合管理',
    ),
    children: [
      {
        id: 'chronic-disease',
        href: '/chronic-integrated-care/chronic-disease',
        title: title('만성질환', 'Chronic Disease', '慢性疾患'),
        children: [
          {
            id: 'chronic-metabolic-three',
            href: '/chronic-integrated-care/chronic-disease/three-major-metabolic-diseases',
            title: title(
              '3대 대사질환',
              'Three Major Metabolic Diseases',
              '3大代謝疾患',
            ),
          },
          {
            id: 'chronic-lymphedema',
            href: '/chronic-integrated-care/chronic-disease/lymphedema',
            title: title('림프부종', 'Lymphedema', 'リンパ浮腫'),
          },
          {
            id: 'chronic-gout',
            href: '/chronic-integrated-care/chronic-disease/gout',
            title: title('통풍', 'Gout', '痛風'),
          },
          {
            id: 'chronic-thyroid-hormone',
            href: '/chronic-integrated-care/chronic-disease/thyroid-hormone',
            title: title(
              '갑상성(호르몬)',
              'Thyroid (Hormone)',
              '甲状腺（ホルモン）',
            ),
          },
          {
            id: 'chronic-gout-second',
            href: '/chronic-integrated-care/chronic-disease/gout-care',
            title: title('통풍', 'Gout Care', '痛風'),
          },
        ],
      },
      {
        id: 'chronic-obesity-clinic',
        href: '/chronic-integrated-care/obesity-clinic',
        title: title('비만클리닉', 'Obesity Clinic', '肥満クリニック'),
        children: [
          {
            id: 'chronic-obesity-evaluation',
            href: '/chronic-integrated-care/obesity-clinic/evaluation-diagnosis',
            title: title(
              '비만 평가 및 진단',
              'Obesity Evaluation & Diagnosis',
              '肥満評価・診断',
            ),
          },
          {
            id: 'chronic-obesity-custom',
            href: '/chronic-integrated-care/obesity-clinic/custom-management',
            title: title(
              '맞춤 비만 관리',
              'Personalized Obesity Management',
              'オーダーメイド肥満管理',
            ),
          },
          {
            id: 'chronic-obesity-wegovy-saxenda',
            href: '/chronic-integrated-care/obesity-clinic/wegovy-saxenda',
            title: title(
              '위고비/삭센다',
              'Wegovy / Saxenda',
              'ウゴービ・サクセンダ',
            ),
          },
        ],
      },
      {
        id: 'chronic-hbot',
        href: '/chronic-integrated-care/hyperbaric-oxygen-therapy',
        title: title(
          '고압산소치료',
          'Hyperbaric Oxygen Therapy',
          '高圧酸素治療',
        ),
        children: [
          {
            id: 'chronic-hbot-emergency',
            href: '/chronic-integrated-care/hyperbaric-oxygen-therapy/emergency-disease',
            title: title('응급질환', 'Emergency Conditions', '救急疾患'),
          },
          {
            id: 'chronic-hbot-non-emergency',
            href: '/chronic-integrated-care/hyperbaric-oxygen-therapy/non-emergency-disease',
            title: title(
              '비응급질환',
              'Non-emergency Conditions',
              '非救急疾患',
            ),
          },
          {
            id: 'chronic-hbot-immunity-regeneration',
            href: '/chronic-integrated-care/hyperbaric-oxygen-therapy/immunity-regeneration-therapy',
            title: title(
              '면역/재생 테라피',
              'Immunity / Regeneration Therapy',
              '免疫・再生テラピー',
            ),
          },
        ],
      },
      {
        id: 'chronic-screening',
        href: '/chronic-integrated-care/advanced-screening-program',
        title: title(
          '정밀검진 프로그램',
          'Advanced Screening Program',
          '精密検診プログラム',
        ),
        children: [
          {
            id: 'chronic-screening-items',
            href: '/chronic-integrated-care/advanced-screening-program/items',
            title: title(
              '정밀검진 항목',
              'Advanced Screening Items',
              '精密検診項目',
            ),
          },
          {
            id: 'chronic-screening-special-equipment',
            href: '/chronic-integrated-care/advanced-screening-program/special-equipment-diagnosis',
            title: title(
              '특수장비 진단',
              'Special Equipment Diagnosis',
              '特殊機器診断',
            ),
          },
          {
            id: 'chronic-screening-wedding',
            href: '/chronic-integrated-care/advanced-screening-program/wedding-screening',
            title: title('웨딩 검진', 'Wedding Screening', 'ウェディング検診'),
          },
        ],
      },
      {
        id: 'chronic-recovery',
        href: '/chronic-integrated-care/recovery-management-program',
        title: title(
          '회복관리 프로그램',
          'Recovery Management Program',
          '回復管理プログラム',
        ),
        children: [
          {
            id: 'chronic-postoperative-care',
            href: '/chronic-integrated-care/postoperative-care-system',
            title: title(
              '수술후 케어시스템',
              'Postoperative Care System',
              '術後ケアシステム',
            ),
          },
          {
            id: 'chronic-lifelong-care',
            href: '/chronic-integrated-care/lifelong-care-program',
            title: title(
              '평생관리 프로그램',
              'Lifelong Care Program',
              '生涯管理プログラム',
            ),
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
