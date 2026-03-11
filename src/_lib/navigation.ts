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
    title: title('병원소개', 'About', '病院紹介'),
    children: [
      {
        id: 'about-cheongmaek',
        href: '/about/cheongmaek-hospital',
        title: title(
          '청맥병원 소개',
          'Cheongmaek Hospital',
          'チョンメク病院紹介',
        ),
        children: [
          {
            id: 'about-cheongmaek-greeting',
            href: '/about/cheongmaek-hospital/greeting-philosophy',
            title: title(
              '인사말 & 진료 철학',
              'Greeting & Medical Philosophy',
              'ごあいさつ・診療哲学',
            ),
          },
          {
            id: 'about-cheongmaek-history',
            href: '/about/cheongmaek-hospital/history',
            title: title('연혁', 'History', '沿革'),
          },
          {
            id: 'about-cheongmaek-social',
            href: '/about/cheongmaek-hospital/social-contribution',
            title: title('사회공헌', 'Social Contribution', '社会貢献'),
          },
        ],
      },
      {
        id: 'about-doctors-departments',
        href: '/about/doctors-departments',
        title: title(
          '의료진/진료과',
          'Doctors & Departments',
          '医療スタッフ・診療科',
        ),
        children: [
          {
            id: 'about-doctors-all',
            href: '/about/doctors-departments/doctors',
            title: title('의료진 전체보기', 'All Doctors', '医療スタッフ一覧'),
          },
          {
            id: 'about-doctors-detail',
            href: '/about/doctors-departments/detail',
            title: title('세부정보', 'Details', '詳細情報'),
          },
          {
            id: 'about-departments-all',
            href: '/about/doctors-departments/departments',
            title: title('진료과 전체보기', 'All Departments', '診療科一覧'),
          },
        ],
      },
      {
        id: 'about-tour',
        href: '/about/hospital-tour',
        title: title('병원 둘러보기', 'Hospital Tour', '院内案内'),
        children: [
          {
            id: 'about-tour-floor-guide',
            href: '/about/hospital-tour/floor-guide',
            title: title('층별안내', 'Floor Guide', 'フロア案内'),
          },
          {
            id: 'about-tour-facility-guide',
            href: '/about/hospital-tour/facility-guide',
            title: title('시설안내', 'Facility Guide', '施設案内'),
          },
        ],
      },
      {
        id: 'about-equipment',
        href: '/about/advanced-medical-equipment',
        title: title(
          '첨단의료장비',
          'Advanced Medical Equipment',
          '先端医療機器',
        ),
        children: [
          {
            id: 'about-equipment-special',
            href: '/about/advanced-medical-equipment/special-equipment',
            title: title('특수장비', 'Special Equipment', '特殊機器'),
          },
          {
            id: 'about-equipment-diagnostic',
            href: '/about/advanced-medical-equipment/diagnostic-equipment',
            title: title('진단장비', 'Diagnostic Equipment', '診断機器'),
          },
          {
            id: 'about-equipment-treatment',
            href: '/about/advanced-medical-equipment/treatment-equipment',
            title: title('치료장비', 'Treatment Equipment', '治療機器'),
          },
          {
            id: 'about-equipment-other',
            href: '/about/advanced-medical-equipment/other-equipment',
            title: title('기타장비', 'Other Equipment', 'その他の機器'),
          },
        ],
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
              '협심증/심근경색',
              'Angina / Myocardial Infarction',
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
            title: title('심부전증', 'Heart Failure', '心不全'),
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
            id: 'vascular-rare-nutcracker-kt',
            href: '/vascular-focus-care/rare-special-disease/nutcracker-syndrome-kt-syndrome',
            title: title(
              '호두까기증후군 KT증후군',
              'Nutcracker Syndrome / KT Syndrome',
              'ナットクラッカー症候群・KT症候群',
            ),
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
            href: '/vascular-focus-care/renal-dialysis-vascular/dialysis-center',
            title: title('인공신장실', 'Dialysis Center', '人工腎臓室'),
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
            id: 'vascular-renal-ckd',
            href: '/vascular-focus-care/renal-dialysis-vascular/chronic-kidney-disease',
            title: title('만성콩팥병', 'Chronic Kidney Disease', '慢性腎臓病'),
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
    id: 'urology-womens-medicine',
    href: '/urology-womens-medicine',
    title: title(
      '비뇨기·여성의학',
      'Urology & Women’s Health',
      '泌尿器・女性医学',
    ),
    children: [
      {
        id: 'womens-gynecology',
        href: '/urology-womens-medicine/gynecologic-disease',
        title: title(
          '여성 부인과질환',
          'Women’s Gynecologic Disease',
          '女性婦人科疾患',
        ),
        children: [
          {
            id: 'womens-uterine',
            href: '/urology-womens-medicine/gynecologic-disease/uterine-disease',
            title: title('자궁질환', 'Uterine Disease', '子宮疾患'),
          },
          {
            id: 'womens-ovarian',
            href: '/urology-womens-medicine/gynecologic-disease/ovarian-disease',
            title: title('난소질환', 'Ovarian Disease', '卵巣疾患'),
          },
          {
            id: 'womens-gynecology-general',
            href: '/urology-womens-medicine/gynecologic-disease/general-gynecology',
            title: title('부인과질환', 'Gynecologic Disease', '婦人科疾患'),
          },
          {
            id: 'womens-clinic',
            href: '/urology-womens-medicine/gynecologic-disease/womens-clinic',
            title: title('여성클리닉', 'Women’s Clinic', '女性クリニック'),
          },
        ],
      },
      {
        id: 'mens-prostate',
        href: '/urology-womens-medicine/mens-prostate-disease',
        title: title(
          '남성 전립선질환',
          'Men’s Prostate Disease',
          '男性前立腺疾患',
        ),
        children: [
          {
            id: 'mens-prostate-disease',
            href: '/urology-womens-medicine/mens-prostate-disease/prostate-disease',
            title: title('전립선질환', 'Prostate Disease', '前立腺疾患'),
          },
          {
            id: 'mens-testicular-disease',
            href: '/urology-womens-medicine/mens-prostate-disease/testicular-disease',
            title: title('고환질환', 'Testicular Disease', '精巣疾患'),
          },
          {
            id: 'mens-clinic',
            href: '/urology-womens-medicine/mens-prostate-disease/mens-clinic',
            title: title('남성클리닉', 'Men’s Clinic', '男性クリニック'),
          },
        ],
      },
      {
        id: 'urology-common',
        href: '/urology-womens-medicine/common-urologic-disease',
        title: title(
          '남녀 비뇨기질환',
          'Common Urologic Disease',
          '男女の泌尿器疾患',
        ),
        children: [
          {
            id: 'urology-stones',
            href: '/urology-womens-medicine/common-urologic-disease/urinary-kidney-stones',
            title: title(
              '요로결석·신장결석',
              'Urinary / Kidney Stones',
              '尿路結石・腎結石',
            ),
          },
          {
            id: 'urology-voiding',
            href: '/urology-womens-medicine/common-urologic-disease/voiding-dysfunction',
            title: title('배뇨장애', 'Voiding Dysfunction', '排尿障害'),
          },
          {
            id: 'urology-infection',
            href: '/urology-womens-medicine/common-urologic-disease/urologic-infection',
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
        id: 'chronic-metabolic',
        href: '/chronic-integrated-care/metabolic-disease',
        title: title('대사질환', 'Metabolic Disease', '代謝疾患'),
        children: [
          {
            id: 'chronic-metabolic-hypertension',
            href: '/chronic-integrated-care/metabolic-disease/hypertension',
            title: title('고혈압', 'Hypertension', '高血圧'),
          },
          {
            id: 'chronic-metabolic-dyslipidemia',
            href: '/chronic-integrated-care/metabolic-disease/dyslipidemia',
            title: title('고지혈증', 'Dyslipidemia', '脂質異常症'),
          },
          {
            id: 'chronic-metabolic-diabetes',
            href: '/chronic-integrated-care/metabolic-disease/diabetes',
            title: title('당뇨', 'Diabetes', '糖尿病'),
          },
          {
            id: 'chronic-metabolic-lymphedema',
            href: '/chronic-integrated-care/metabolic-disease/lymphedema',
            title: title('림프부종', 'Lymphedema', 'リンパ浮腫'),
          },
          {
            id: 'chronic-metabolic-gout',
            href: '/chronic-integrated-care/metabolic-disease/gout',
            title: title('통풍', 'Gout', '痛風'),
          },
          {
            id: 'chronic-metabolic-thyroid',
            href: '/chronic-integrated-care/metabolic-disease/thyroid',
            title: title('갑상선', 'Thyroid', '甲状腺'),
          },
          {
            id: 'chronic-metabolic-fatty-liver',
            href: '/chronic-integrated-care/metabolic-disease/fatty-liver',
            title: title('지방간', 'Fatty Liver', '脂肪肝'),
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
            href: '/chronic-integrated-care/obesity-clinic/evaluation',
            title: title('평가', 'Evaluation', '評価'),
          },
          {
            id: 'chronic-obesity-cause-analysis',
            href: '/chronic-integrated-care/obesity-clinic/cause-analysis',
            title: title('원인분석', 'Cause Analysis', '原因分析'),
          },
          {
            id: 'chronic-obesity-treatment',
            href: '/chronic-integrated-care/obesity-clinic/treatment-method',
            title: title('치료법', 'Treatment Method', '治療法'),
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
            id: 'chronic-hbot-specialized-care',
            href: '/chronic-integrated-care/hyperbaric-oxygen-therapy/specialized-care',
            title: title('전문치료', 'Specialized Care', '専門治療'),
          },
          {
            id: 'chronic-hbot-immunity-regeneration',
            href: '/chronic-integrated-care/hyperbaric-oxygen-therapy/immunity-cell-regeneration',
            title: title(
              '면역·세포재생',
              'Immunity & Cell Regeneration',
              '免疫・細胞再生',
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
            id: 'chronic-screening-special-equipment',
            href: '/chronic-integrated-care/advanced-screening-program/special-equipment',
            title: title('특수장비', 'Special Equipment', '特殊機器'),
          },
          {
            id: 'chronic-screening-diagnostic-tests',
            href: '/chronic-integrated-care/advanced-screening-program/diagnostic-tests',
            title: title('진단검사', 'Diagnostic Tests', '診断検査'),
          },
          {
            id: 'chronic-screening-partner-network',
            href: '/chronic-integrated-care/advanced-screening-program/partner-network',
            title: title('협력기관 연계', 'Partner Network', '協力機関連携'),
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
        title: title('청맥뉴스', 'Cheongmaek News', 'チョンメクニュース'),
      },
      {
        id: 'community-cases',
        href: '/community/case-study',
        title: title('치료사례', 'Treatment Cases', '治療事例'),
      },
      {
        id: 'community-consultation',
        href: '/community/medical-consultation',
        title: title('의학상담', 'Medical Consultation', '医療相談'),
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
        title: title('외래 진료안내', 'Outpatient Guide', '外来診療案内'),
        children: [
          {
            id: 'guide-outpatient-hours',
            href: '/guide/outpatient-care/hours',
            title: title('진료시간', 'Hours', '診療時間'),
          },
          {
            id: 'guide-outpatient-process',
            href: '/guide/outpatient-care/process',
            title: title(
              '절차 (초진/재진)',
              'Process (First / Follow-up Visit)',
              '手続き（初診・再診）',
            ),
          },
          {
            id: 'guide-outpatient-reservation',
            href: '/guide/outpatient-care/reservation',
            title: title('예약', 'Reservation', '予約'),
          },
          {
            id: 'guide-outpatient-location-parking',
            href: '/guide/outpatient-care/location-parking',
            title: title(
              '오시는길 주차',
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
            id: 'guide-admission-overview',
            href: '/guide/admission-discharge/overview',
            title: title('입·퇴원안내', 'Admission & Discharge', '入退院案内'),
          },
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
        id: 'guide-medical-cooperation',
        href: '/guide/medical-cooperation-service',
        title: title(
          '의료협력 서비스',
          'Medical Cooperation Service',
          '医療連携サービス',
        ),
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
